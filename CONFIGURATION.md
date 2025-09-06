# Australis Energy - Configuration Guide

## Environment Variables Setup

This application uses environment variables for secure configuration management. Follow these steps to set up your local development environment:

### 1. Copy Environment Template

```bash
cp .env.example .env.local
```

### 2. Fill in Your Values

Edit `.env.local` with your actual configuration values:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Azure Configuration
VITE_AZURE_MAPS_KEY=your_azure_maps_key
VITE_AZURE_STORAGE_ACCOUNT=your_storage_account
VITE_AZURE_STORAGE_KEY=your_storage_key

# API Configuration
VITE_API_BASE_URL=https://australis-energy-dev-app.azurewebsites.net/api
VITE_API_KEY=your_api_key

# Azure Functions
VITE_GEOSERVICES_FUNCTION_URL=https://your-geoservices-function-app.azurewebsites.net
VITE_GEOSERVICES_FUNCTION_KEY=your_geoservices_function_key

# Communications Function (Email sending)
VITE_COMMUNICATIONS_FUNCTION_URL=https://your-communications-function-app.azurewebsites.net
VITE_COMMUNICATIONS_FUNCTION_KEY=your_communications_function_key

# Azure Service Bus
VITE_SERVICE_BUS_CONNECTION_STRING=your_service_bus_connection_string

# Application Insights
VITE_APPINSIGHTS_INSTRUMENTATION_KEY=your_appinsights_key

# Environment
VITE_APP_ENV=development
```

### 3. Security Best Practices

#### For Development:
- **Never commit `.env.local`** - it's in `.gitignore`
- Use development/staging keys, not production
- Rotate keys regularly

#### For Production Deployment:
- Set environment variables in your hosting platform (Vercel, Netlify, Azure, etc.)
- Use separate production keys
- Enable environment variable encryption if available

### 4. Getting Your Keys

#### Supabase:
1. Go to your Supabase project dashboard
2. Navigate to Settings → API
3. Copy the "Project URL" and "anon/public" key

#### Azure Maps:
1. Go to Azure Portal → Azure Maps accounts
2. Select your account → Authentication
3. Copy the Primary or Secondary key

#### Azure Storage:
1. Go to Azure Portal → Storage accounts
2. Select your account → Access keys
3. Copy the account name and key

#### Azure Functions:
1. Go to Azure Portal → Function Apps
2. Select your function app → Functions → App keys
3. Copy the function URL and key

#### Australis API:
1. Contact your backend team for the API key
2. Or generate one through the API management portal

### 5. Using Configuration in Code

```typescript
import { config } from '@/lib/config';
import { apiService } from '@/services/apiService';
import { geoServicesClient } from '@/services/geoServices';

// Configuration is automatically loaded
console.log(config.env); // 'development'

// API service uses configuration automatically
const projects = await apiService.getProjects();

// GeoServices client uses configuration automatically
const result = await geoServicesClient.startCalculation(request);
```

### 6. Environment-Specific Configuration

The app supports different environments:

- **development**: Local development with debug logging
- **staging**: Pre-production testing environment
- **production**: Live production environment

Set `VITE_APP_ENV` to control environment-specific behavior.

### 7. Troubleshooting

#### Missing Environment Variables:
- Check console for configuration warnings
- Ensure `.env.local` exists and contains required variables
- Restart development server after adding variables

#### Invalid Configuration:
- Check that URLs are valid and accessible
- Verify API keys have correct permissions
- Test connections using browser network tab

#### CORS Issues:
- Ensure your API endpoints allow requests from your domain
- Check Azure Function CORS settings
- Verify Supabase allowed origins

### 8. Production Deployment

#### Vercel:
```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
# ... add all variables
```

#### Netlify:
1. Go to Site settings → Environment variables
2. Add each variable manually

#### Azure Static Web Apps:
1. Go to Configuration → Application settings
2. Add each variable

## Security Notes

- **Frontend variables are public** - don't put secrets in VITE_ variables
- Use backend APIs for sensitive operations
- Implement proper authentication and authorization
- Monitor API usage and implement rate limiting
