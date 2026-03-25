import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Download, Loader2, CheckCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().optional(),
});

type EmailFormData = z.infer<typeof emailSchema>;

interface InlineEmailCaptureProps {
  onSubmit: (email: string, name?: string) => Promise<void>;
  subscriberCount?: number;
  downloadUrl?: string;
}

const InlineEmailCapture = ({ onSubmit, subscriberCount, downloadUrl }: InlineEmailCaptureProps) => {
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
      await onSubmit(data.email, data.name);
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
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
        <div className="absolute inset-0 border-y-2 border-crime-yellow/30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-block p-4 bg-black border-2 border-crime-yellow">
              <CheckCircle className="w-12 h-12 text-crime-yellow" />
            </div>
            <h3 className="text-3xl sm:text-4xl font-black text-crime-yellow uppercase tracking-tighter">
              Access Granted
            </h3>
            <p className="text-zinc-400">Your download link has been sent to your email.</p>
            {downloadUrl && (
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-crime-yellow text-black font-black uppercase tracking-wider hover:bg-crime-yellow/90 transition-all"
              >
                <Download className="w-5 h-5" />
                Download Now
              </a>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
      <div className="absolute inset-0 border-y-2 border-police-red/30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-police-red/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-police-red/10 border border-police-red/30">
              <Shield className="w-4 h-4 text-police-red" />
              <span className="text-police-red text-xs font-black uppercase tracking-[0.2em]">Classified Material</span>
            </div>

            <h3 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter leading-none">
              Join the <span className="text-police-red">Investigation</span>
            </h3>

            <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Get <span className="text-white font-bold">Bad Actors Volume 1</span> as a free download.
              Enter your email to receive the evidence.
            </p>

            {displayCount && (
              <p className="text-crime-yellow font-bold text-sm uppercase tracking-widest">
                {displayCount}+ investigators already have access
              </p>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-lg mx-auto">
            <div className="bg-black border-2 border-police-red/50 p-6 sm:p-8 space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-police-red" />
                <Input
                  type="email"
                  placeholder="your@email.com"
                  {...register("email")}
                  className="bg-zinc-950 border-2 border-police-red/30 text-foreground placeholder:text-zinc-600 focus-visible:ring-police-red focus-visible:border-police-red pl-10 h-12 text-base"
                />
                {errors.email && (
                  <p className="text-police-red text-sm font-bold uppercase mt-1">{errors.email.message}</p>
                )}
              </div>

              <Input
                type="text"
                placeholder="Your name (optional)"
                {...register("name")}
                className="bg-zinc-950 border-2 border-police-red/30 text-foreground placeholder:text-zinc-600 focus-visible:ring-police-red focus-visible:border-police-red h-12 text-base"
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-police-red text-white font-black uppercase tracking-wider hover:bg-red-700 transition-all h-14 text-base border-0"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Get Free Album Download
                  </>
                )}
              </Button>

              <p className="text-zinc-600 text-xs text-center uppercase tracking-wide">
                No spam. Unsubscribe anytime. Your email is secure.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default InlineEmailCapture;
