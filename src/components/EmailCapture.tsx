import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Download, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().optional(),
});

type EmailFormData = z.infer<typeof emailSchema>;

interface EmailCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string, name?: string) => Promise<void>;
  downloadUrl?: string;
}

const EmailCapture = ({ isOpen, onClose, onSubmit, downloadUrl }: EmailCaptureProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const handleFormSubmit = async (data: EmailFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data.email, data.name);
      setIsSuccess(true);
      toast({
        title: "SUCCESS",
        description: "Your download link has been sent!",
      });
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

  const handleClose = () => {
    reset();
    setIsSuccess(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-black border-2 border-police-red shadow-[0_0_50px_hsl(var(--police-red)/0.4)] max-w-md animate-in fade-in-0 zoom-in-95 duration-300">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black uppercase tracking-wider text-police-red text-center">
            {isSuccess ? "DOWNLOAD READY" : "GET FREE ALBUM DOWNLOAD"}
          </DialogTitle>
          <DialogDescription className="text-crime-yellow font-bold uppercase tracking-wide text-center text-sm">
            {isSuccess
              ? "Check your email for the download link"
              : "Enter your email to receive your free download link"}
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center py-8 space-y-6">
            <div className="p-4 bg-black border-2 border-crime-yellow">
              <CheckCircle className="w-16 h-16 text-crime-yellow" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-foreground font-bold uppercase tracking-wide">
                Confirmation Sent
              </p>
              <p className="text-muted-foreground text-sm">
                Your download link has been sent to your email address.
              </p>
            </div>
            {downloadUrl && (
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-3 bg-crime-yellow text-black font-bold uppercase tracking-wide hover:bg-crime-yellow/90 transition-all duration-300 border-2 border-crime-yellow"
              >
                <Download className="w-5 h-5" />
                Download Now
              </a>
            )}
            <Button
              onClick={handleClose}
              className="bg-black border-2 border-police-red text-foreground font-bold uppercase tracking-wide hover:bg-police-red hover:text-white transition-all duration-300"
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 pt-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-bold uppercase tracking-wide text-sm">
                Email Address <span className="text-police-red">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-police-red" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  {...register("email")}
                  className="bg-black border-2 border-police-red text-foreground placeholder:text-muted-foreground focus-visible:ring-police-red focus-visible:border-crime-yellow pl-10"
                />
              </div>
              {errors.email && (
                <p className="text-police-red text-sm font-bold uppercase">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground font-bold uppercase tracking-wide text-sm">
                Name <span className="text-muted-foreground">(Optional)</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                {...register("name")}
                className="bg-black border-2 border-police-red text-foreground placeholder:text-muted-foreground focus-visible:ring-police-red focus-visible:border-crime-yellow"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-crime-yellow text-black font-bold uppercase tracking-wide hover:bg-crime-yellow/90 transition-all duration-300 border-2 border-crime-yellow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Get Free Download
                </>
              )}
            </Button>

            <p className="text-muted-foreground text-xs text-center uppercase tracking-wide">
              We respect your privacy. No spam, ever.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EmailCapture;
