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

interface SaveSubscriberResult {
  success: boolean;
  duplicate: boolean;
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
    console.log('[EmailJS] Not configured — skipping email send for:', email);

    return {
      success: true,
      message: 'Email service not configured (download available via button)',
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

const saveSubscriber = async (
  email: string,
  name?: string,
  source: string = 'website'
): Promise<SaveSubscriberResult> => {
  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, source }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('[Database] Failed to save subscriber:', errorData.error || response.statusText);
      return { success: false, duplicate: false };
    }

    const data = await response.json();
    return { success: data.success, duplicate: data.duplicate || false };
  } catch (error) {
    console.error('[Database] Error saving subscriber:', error);
    return { success: false, duplicate: false };
  }
};

const getSubscriberCount = async (): Promise<number> => {
  try {
    const response = await fetch('/api/subscribers-count');

    if (!response.ok) {
      return 0;
    }

    const data = await response.json();
    return data.count || 0;
  } catch {
    return 0;
  }
};

export const emailService = {
  init,
  sendDownloadEmail,
  saveSubscriber,
  getSubscriberCount,
};

export type { EmailResponse, SendDownloadEmailParams, SaveSubscriberResult };
