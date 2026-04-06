/**
 * Bitform API Integration Service
 * Handles all API calls to Bitform for form submissions
 */

interface BitformConfig {
  baseUrl: string;
  apiKey: string;
  formId: number;
}

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
 * Get Bitform configuration from environment variables
 */
function getBitformConfig(): BitformConfig {
  const baseUrl = import.meta.env.VITE_BITFORM_BASE_URL || '';
  const apiKey = import.meta.env.VITE_BITFORM_API_KEY || '';
  const formId = parseInt(import.meta.env.VITE_BITFORM_FORM_ID || '0', 10);

  if (!baseUrl || !apiKey || !formId) {
    console.warn('Bitform configuration is incomplete. Please set environment variables.');
  }

  return { baseUrl, apiKey, formId };
}

/**
 * Submit form data to Bitform
 * @param data - Form submission data with name, email, phone, message
 * @returns Promise with API response
 */
export async function submitContactForm(
  data: FormSubmissionData
): Promise<BitformResponse> {
  const config = getBitformConfig();

  if (!config.baseUrl || !config.apiKey || !config.formId) {
    return {
      code: 5000,
      message: 'Bitform is not properly configured',
      success: false,
    };
  }

  try {
    const formPayload = {
      'b1-2': data.name, // Replace with your actual field keys from Bitform
      'b1-5': data.email,
      'b1-6': data.phone,
      'b1-3': data.message,
    };

    const response = await fetch(
      `${config.baseUrl}/wp-json/bitform/v1/entry/${config.formId}`,
      {
        method: 'POST',
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json',
          'Bitform-Api-Key': config.apiKey,
        },
        body: JSON.stringify(formPayload),
      }
    );

    const responseData = (await response.json()) as {
      code: number;
      message: string;
    };

    // Check for success codes from Bitform API
    const isSuccess =
      response.ok && responseData.code === 4000;

    return {
      code: responseData.code,
      message: responseData.message || 'Unknown error',
      success: isSuccess,
    };
  } catch (error) {
    console.error('Error submitting form to Bitform:', error);
    return {
      code: 5001,
      message:
        error instanceof Error ? error.message : 'Network error occurred',
      success: false,
    };
  }
}

/**
 * Get all forms from Bitform
 * Useful for debugging and testing
 */
export async function getBitformForms(): Promise<any[]> {
  const config = getBitformConfig();

  if (!config.baseUrl || !config.apiKey) {
    return [];
  }

  try {
    const response = await fetch(`${config.baseUrl}/wp-json/bitform/v1/forms`, {
      method: 'GET',
      headers: {
        'Bitform-Api-Key': config.apiKey,
      },
    });

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching Bitform forms:', error);
    return [];
  }
}

/**
 * Get form fields from Bitform
 * Useful for field mapping
 */
export async function getBitformFields(formId: number): Promise<any[]> {
  const config = getBitformConfig();

  if (!config.baseUrl || !config.apiKey) {
    return [];
  }

  try {
    const response = await fetch(
      `${config.baseUrl}/wp-json/bitform/v1/fields/${formId}`,
      {
        method: 'GET',
        headers: {
          'Bitform-Api-Key': config.apiKey,
        },
      }
    );

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching Bitform fields:', error);
    return [];
  }
}
