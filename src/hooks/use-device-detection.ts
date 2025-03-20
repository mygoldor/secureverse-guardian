
import { useState, useEffect } from 'react';

interface DeviceDetectionResult {
  isMobile: boolean;
  isDesktop: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isSafari: boolean;
  isChrome: boolean;
  isFirefox: boolean;
  isEdge: boolean;
}

export function useDeviceDetection(): DeviceDetectionResult {
  const [deviceInfo, setDeviceInfo] = useState<DeviceDetectionResult>({
    isMobile: false,
    isDesktop: true,
    isIOS: false,
    isAndroid: false,
    isSafari: false,
    isChrome: false,
    isFirefox: false,
    isEdge: false
  });

  useEffect(() => {
    const detectDevice = () => {
      const userAgent = window.navigator.userAgent;
      const isIOSDevice = /iPhone|iPad|iPod/i.test(userAgent);
      const isAndroidDevice = /Android/i.test(userAgent);
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      
      // Browser detection
      const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(userAgent);
      const isChromeBrowser = /chrome|chromium|crios/i.test(userAgent) && !/edge|edg/i.test(userAgent);
      const isFirefoxBrowser = /firefox|fxios/i.test(userAgent);
      const isEdgeBrowser = /edge|edg/i.test(userAgent);

      setDeviceInfo({
        isMobile: isMobileDevice,
        isDesktop: !isMobileDevice,
        isIOS: isIOSDevice,
        isAndroid: isAndroidDevice,
        isSafari: isSafariBrowser,
        isChrome: isChromeBrowser,
        isFirefox: isFirefoxBrowser,
        isEdge: isEdgeBrowser
      });
    };

    detectDevice();

    // Add event listener for screen size changes
    const handleResize = () => {
      detectDevice();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return deviceInfo;
}
