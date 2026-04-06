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
    // Format phone number according to Bitform format: +c #### ### ###
    let phoneFormatted = data.phone.trim();
    
    // Remove all non-digits except leading +
    const cleanPhone = phoneFormatted.replace(/^\+\d+/, (match) => {
      return match; // Keep country code
    }).replace(/\D/g, '');
    
    // Extract country code if present
    let countryCode = '';
    if (phoneFormatted.startsWith('+')) {
      const match = phoneFormatted.match(/^\+(\d+)/);
      if (match) {
        countryCode = match[1];
      }
    }
    
    // If no country code, assume +91 (India)
    if (!countryCode) {
      countryCode = '91';
    }
    
    // Extract just the digits from the phone number part
    const digits = cleanPhone.replace(countryCode, '');
    
    // Format as +c #### ### ###
    if (digits.length >= 10) {
      const part1 = digits.substring(0, 4);
      const part2 = digits.substring(4, 7);
      const part3 = digits.substring(7, 10);
      phoneFormatted = `+${countryCode} ${part1} ${part2} ${part3}`;
    } else {
      // Fallback if number is invalid
      phoneFormatted = `+${countryCode} ${digits}`;
    }

    const fieldData = {
      'b1-2': data.name.trim(),
      'b1-5': data.email.trim().toLowerCase(),
      'b1-6': phoneFormatted,
      'b1-3': data.message.trim(),
    };

    const formPayload = fieldData;

    console.log('Submitting form payload:', formPayload);
    console.log('Payload JSON:', JSON.stringify(formPayload));

    // Create form-urlencoded body
    const bodyParams = new URLSearchParams();
    Object.entries(fieldData).forEach(([key, value]) => {
      bodyParams.append(key, value);
    });

    const response = await fetch(
      `${config.baseUrl}/wp-json/bitform/v1/entry/${config.formId}`,
      {
        method: 'POST',
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Bitform-Api-Key': config.apiKey,
        },
        body: bodyParams.toString(),
      }
    );

    console.log('HTTP Status:', response.status);

    const responseText = await response.text();
    console.log('Raw Response:', responseText);

    let responseData;
    try {
      responseData = JSON.parse(responseText) as {
        code: number;
        message: string;
        errors?: Record<string, string>;
        data?: Record<string, unknown>;
      };
    } catch (e) {
      console.error('Failed to parse response JSON:', e);
      return {
        code: 5002,
        message: `Invalid response format: ${responseText}`,
        success: false,
      };
    }

    console.log('Bitform response:', responseData);

    // Check for success codes from Bitform API
    const isSuccess =
      response.ok && responseData.code === 4000;

    // If validation errors exist, include them in the message
    const errorMessage =
      responseData.message ||
      (responseData.errors
        ? `Validation error: ${JSON.stringify(responseData.errors)}`
        : 'Unknown error');

    return {
      code: responseData.code,
      message: errorMessage,
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
