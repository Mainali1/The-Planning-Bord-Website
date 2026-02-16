import express from 'express';

export const licenseRoutes = express.Router();

licenseRoutes.post('/validate', async (req, res) => {
  try {
    const { license_key, machine_id } = req.body;

    if (!license_key || !machine_id) {
      return res.status(400).json({
        valid: false,
        error: 'license_key and machine_id are required',
        error_code: 'MISSING_PARAMS'
      });
    }

    const apiKey = process.env.SIMPLE_LICENSE_API_KEY;
    const baseUrl = process.env.SIMPLE_LICENSE_BASE_URL;

    if (!apiKey) {
      return res.status(500).json({
        valid: false,
        error: 'License validation service not configured',
        error_code: 'SERVICE_NOT_CONFIGURED'
      });
    }

    const response = await fetch(`${baseUrl}/validate/`, {
      method: 'POST',
      headers: {
        'Authorization': `ApiKey ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        license_key,
        machine_id
      })
    });

    const data = await response.json();

    if (data.valid) {
      const licenseData = data.license_data || {};
      const productName = (licenseData.product_name || '').toLowerCase();
      
      let tier = 'professional';
      if (productName.includes('enterprise')) {
        tier = 'enterprise';
      }

      return res.json({
        valid: true,
        tier,
        message: data.message || 'License is valid',
        license_data: licenseData
      });
    } else {
      return res.json({
        valid: false,
        error: data.error || 'License validation failed',
        error_code: data.error_code || 'VALIDATION_FAILED'
      });
    }
  } catch (error) {
    console.error('License validation error:', error);
    return res.status(500).json({
      valid: false,
      error: 'Internal server error',
      error_code: 'INTERNAL_ERROR'
    });
  }
});

licenseRoutes.post('/activate', async (req, res) => {
  try {
    const { license_key, machine_id } = req.body;

    if (!license_key || !machine_id) {
      return res.status(400).json({
        valid: false,
        error: 'license_key and machine_id are required'
      });
    }

    const apiKey = process.env.SIMPLE_LICENSE_API_KEY;
    const baseUrl = process.env.SIMPLE_LICENSE_BASE_URL;

    const response = await fetch(`${baseUrl}/activate/`, {
      method: 'POST',
      headers: {
        'Authorization': `ApiKey ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        license_key,
        machine_id
      })
    });

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error('License activation error:', error);
    return res.status(500).json({
      valid: false,
      error: 'Internal server error'
    });
  }
});

licenseRoutes.get('/check/:key', async (req, res) => {
  try {
    const { key } = req.params;
    
    const apiKey = process.env.SIMPLE_LICENSE_API_KEY;
    const baseUrl = process.env.SIMPLE_LICENSE_BASE_URL;

    const response = await fetch(`${baseUrl}/keys/${key}/`, {
      method: 'GET',
      headers: {
        'Authorization': `ApiKey ${apiKey}`
      }
    });

    if (!response.ok) {
      return res.status(404).json({
        error: 'License key not found'
      });
    }

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error('License check error:', error);
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
});
