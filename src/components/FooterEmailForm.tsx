import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Loader2, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const emailSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

type EmailFormData = z.infer<typeof emailSchema>;

interface FooterEmailFormProps {
  onSubmit: (email: string) => Promise<void>;
  subscriberCount?: number;
}

const FooterEmailForm = ({ onSubmit, subscriberCount }: FooterEmailFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const handleFormSubmit = async (data: EmailFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data.email);
      setIsSuccess(true);
    } catch {
      toast({
        title: "ERROR",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayCount = subscriberCount && subscriberCount > 10
    ? Math.floor(subscriberCount / 10) * 10
    : null;

  if (isSuccess) {
    return (
      <div className="flex items-center gap-3 p-4 bg-black border border-crime-yellow/30">
        <CheckCircle className="w-5 h-5 text-crime-yellow shrink-0" />
        <p className="text-crime-yellow font-bold text-sm uppercase">Access granted — check your email</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h4 className="text-white font-black text-lg uppercase tracking-tighter">
        Free Album Download
      </h4>
      <p className="text-zinc-500 text-sm">
        Get Bad Actors Volume 1 delivered to your inbox.
      </p>
      {displayCount && (
        <p className="text-crime-yellow text-xs font-bold uppercase tracking-widest">
          {displayCount}+ investigators joined
        </p>
      )}
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex gap-2">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-police-red" />
          <Input
            type="email"
            placeholder="your@email.com"
            {...register("email")}
            className="bg-black border border-police-red/30 text-foreground placeholder:text-zinc-600 focus-visible:ring-police-red pl-9 h-10 text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-police-red text-white font-bold text-sm uppercase tracking-wider hover:bg-red-700 transition-all shrink-0 disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Get It"
          )}
        </button>
      </form>
      {errors.email && (
        <p className="text-police-red text-xs font-bold">{errors.email.message}</p>
      )}
    </div>
  );
};

export default FooterEmailForm;
