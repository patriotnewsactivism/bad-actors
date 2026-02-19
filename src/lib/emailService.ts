import emailjs from '@emailjs/browser';

interface SendDownloadEmailParams {
  email: string;
  name?: string;
  downloadUrl?: string;
}

interface EmailResponse {
  success: boolean;
  message: string;
  simulation?: boolean;
}

const isConfigured = (): boolean => {
  return !!(
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY &&
    import.meta.env.VITE_EMAILJS_SERVICE_ID &&
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  );
};

const init = (): void => {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  
  if (publicKey) {
    emailjs.init(publicKey);
  }
};

const sendDownloadEmail = async (
  email: string,
  name?: string,
  downloadUrl?: string
): Promise<EmailResponse> => {
  if (!email) {
    throw new Error('Email address is required');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email address format');
  }

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

  if (!isConfigured()) {
    console.log('[EmailJS Simulation] Would send email:', {
      to: email,
      name: name || 'Not provided',
      downloadUrl: downloadUrl || 'Not provided',
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      success: true,
      message: 'Email simulated successfully (development mode)',
      simulation: true,
    };
  }

  try {
    const templateParams: Record<string, string> = {
      to_email: email,
    };

    if (name) {
      templateParams.to_name = name;
    }

    if (downloadUrl) {
      templateParams.download_url = downloadUrl;
    }

    const response = await emailjs.send(serviceId, templateId, templateParams);

    return {
      success: true,
      message: 'Email sent successfully',
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Failed to send email: ${errorMessage}`);
  }
};

export const emailService = {
  init,
  sendDownloadEmail,
};

export type { EmailResponse, SendDownloadEmailParams };
