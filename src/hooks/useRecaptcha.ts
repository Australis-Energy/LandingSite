import { useCallback, useEffect, useState } from 'react';

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
    recaptchaLoaded?: boolean;
    onRecaptchaLoad?: () => void;
  }
}

const RECAPTCHA_SITE_KEY = '6LdGy3wqAAAAAK-lI-udrJl57MD9ijxtC8ocDPdp';
const IS_DEVELOPMENT = import.meta.env.MODE === 'development';

export const useRecaptcha = () => {
  const [isReady, setIsReady] = useState(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [skipRecaptcha, setSkipRecaptcha] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let attempts = 0;
    const maxAttempts = 20; // Reduced attempts

    console.log('🔒 Initializing reCAPTCHA hook...');
    console.log('🌍 Environment:', IS_DEVELOPMENT ? 'development' : 'production');
    console.log('🔗 Origin:', window.location.origin);
    
    // Check if we should skip reCAPTCHA (development mode or known issues)
    if (IS_DEVELOPMENT && window.location.hostname === 'localhost') {
      console.log('🚧 Development mode detected - implementing reCAPTCHA bypass');
      setSkipRecaptcha(true);
      setIsReady(true);
      setLoadingError(null);
      return;
    }

    const checkRecaptcha = () => {
      attempts++;
      
      // Check multiple indicators
      const hasGrecaptcha = !!window.grecaptcha;
      const hasLoadedFlag = !!window.recaptchaLoaded;
      
      console.log(`🔍 Check ${attempts}/${maxAttempts}: grecaptcha=${hasGrecaptcha}, loadedFlag=${hasLoadedFlag}`);
      
      if (hasGrecaptcha) {
        console.log('✅ reCAPTCHA script detected, waiting for ready state...');
        try {
          window.grecaptcha.ready(() => {
            setIsReady(true);
            setLoadingError(null);
            console.log('🎉 reCAPTCHA is now ready!');
          });
          return; // Exit the retry loop
        } catch (error) {
          console.error('❌ Error calling grecaptcha.ready:', error);
          setLoadingError(`Error initializing reCAPTCHA: ${error}`);
        }
      }
      
      if (attempts >= maxAttempts) {
        console.warn('⚠️ reCAPTCHA failed to load, enabling fallback mode');
        
        // In development, just skip reCAPTCHA
        if (IS_DEVELOPMENT) {
          console.log('🚧 Development fallback: skipping reCAPTCHA validation');
          setSkipRecaptcha(true);
          setIsReady(true);
          setLoadingError(null);
        } else {
          const errorMsg = 'reCAPTCHA unavailable. Forms will still work but without bot protection.';
          console.error('❌', errorMsg);
          setLoadingError(errorMsg);
          setSkipRecaptcha(true);
          setIsReady(true);
        }
        
        return;
      }
      
      timeoutId = setTimeout(checkRecaptcha, 100);
    };

    // Start checking immediately
    checkRecaptcha();

    // Cleanup timeout on unmount
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const executeRecaptcha = useCallback(async (action: string): Promise<string | null> => {
    console.log(`🔒 Attempting to execute reCAPTCHA for action: ${action}`);
    console.log(`📊 Ready: ${isReady}, Skip: ${skipRecaptcha}, Error: ${!!loadingError}`);

    // If we're skipping reCAPTCHA (development or fallback), return null
    if (skipRecaptcha) {
      console.log('🚧 Skipping reCAPTCHA validation (development/fallback mode)');
      return null;
    }

    if (loadingError) {
      console.warn('⚠️ reCAPTCHA loading error, skipping validation:', loadingError);
      return null;
    }

    if (!window.grecaptcha) {
      console.warn('⚠️ reCAPTCHA script not loaded, skipping validation');
      return null;
    }

    if (!isReady) {
      console.warn('⚠️ reCAPTCHA not ready yet, skipping validation');
      return null;
    }

    try {
      console.log(`🚀 Executing reCAPTCHA with site key: ${RECAPTCHA_SITE_KEY.substring(0, 10)}...`);
      const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
      console.log(`✅ reCAPTCHA token generated successfully (length: ${token.length})`);
      return token;
    } catch (error) {
      console.error('❌ reCAPTCHA execution failed:', error);
      return null;
    }
  }, [isReady, loadingError, skipRecaptcha]);

  return { 
    executeRecaptcha, 
    isReady: isReady || skipRecaptcha,
    loadingError: skipRecaptcha ? null : loadingError,
    skipRecaptcha,
    // Expose for debugging
    debug: {
      isReady,
      loadingError,
      skipRecaptcha,
      isDevelopment: IS_DEVELOPMENT,
      grecaptchaAvailable: typeof window !== 'undefined' && !!window.grecaptcha,
      recaptchaLoadedFlag: typeof window !== 'undefined' && !!window.recaptchaLoaded
    }
  };
};