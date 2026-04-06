/**
 * Backend Proxy API Service
 * This service calls your backend API instead of directly calling Bitform
 * This is more secure as it keeps the API key on the server
 */

interface FormSubmissionData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface BitformResponse {
  code: number;
  message: string;
  success: boolean;
}

/**
 * Submit form data via backend proxy
 * The backend endpoint will handle CORS and forward to Bitform
 * 
 * Backend endpoint should be at: /api/contact or similar
 * Backend receives the form data and handles Bitform API call
 */
export async function submitContactFormViaProxy(
  data: FormSubmissionData
): Promise<BitformResponse> {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || window.location.origin;
  const apiEndpoint = `${backendUrl}/api/contact/submit`;

  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies if needed
      body: JSON.stringify(data),
    });

    const responseData = (await response.json()) as {
      code: number;
      message: string;
      success?: boolean;
    };

    const isSuccess = response.ok && (responseData.success || responseData.code === 4000);

    return {
      code: responseData.code,
      message: responseData.message || 'Unknown error',
      success: isSuccess,
    };
  } catch (error) {
    console.error('Error submitting form via proxy:', error);
    return {
      code: 5001,
      message:
        error instanceof Error ? error.message : 'Network error occurred',
      success: false,
    };
  }
}
