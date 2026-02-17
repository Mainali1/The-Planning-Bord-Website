import express from 'express';

export const licenseRoutes = express.Router();

const getLicenseConfig = () => ({
  apiKey: process.env.LICENSE_SERVER_ADMIN_TOKEN,
  baseUrl: process.env.LICENSE_SERVER_URL
});

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

    const { apiKey, baseUrl } = getLicenseConfig();

    if (!apiKey || !baseUrl) {
      return res.status(500).json({
        valid: false,
        error: 'License validation service not configured',
        error_code: 'SERVICE_NOT_CONFIGURED'
      });
    }

    const response = await fetch(`${baseUrl}/api/validate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        key: license_key,
        device_id: machine_id
      })
    });

    const data = await response.json();

    if (data.valid) {
      return res.json({
        valid: true,
        tier: data.tier || 'professional',
        message: 'License is valid',
        expires_at: data.expires_at,
        max_activations: data.max_activations,
        activation_count: data.activation_count
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
    const { license_key, machine_id, device_name } = req.body;

    if (!license_key || !machine_id) {
      return res.status(400).json({
        valid: false,
        error: 'license_key and machine_id are required'
      });
    }

    const { apiKey, baseUrl } = getLicenseConfig();

    const response = await fetch(`${baseUrl}/api/activate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        key: license_key,
        device_id: machine_id,
        device_name: device_name || ''
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
    
    const { apiKey, baseUrl } = getLicenseConfig();

    const response = await fetch(`${baseUrl}/api/licenses/${key}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`
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
