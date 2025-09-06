// Debug script to check environment variables
console.log('🔍 Environment Debug Information:');
console.log('================================');

// Check if we're in the right environment
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('import.meta.env.PROD:', import.meta.env.PROD);
console.log('import.meta.env.DEV:', import.meta.env.DEV);

// List all VITE_ environment variables
const viteEnvVars = Object.keys(import.meta.env)
  .filter(key => key.startsWith('VITE_'))
  .reduce((acc, key) => {
    acc[key] = import.meta.env[key] ? '[SET]' : '[EMPTY]';
    return acc;
  }, {});

console.log('VITE Environment Variables:');
console.table(viteEnvVars);

// Specifically check communications vars
console.log('Communications Function URL:', import.meta.env.VITE_COMMUNICATIONS_FUNCTION_URL || '[NOT SET]');
console.log('Communications Function Key:', import.meta.env.VITE_COMMUNICATIONS_FUNCTION_KEY ? '[SET]' : '[NOT SET]');

export {};
