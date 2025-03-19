
import { useState, useEffect } from 'react';

export function useDeviceDetection() {
  const [isMobile, setIsMobile] = useState(false);

  // Detect if user is on mobile
  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    setIsMobile(mobileRegex.test(userAgent));
  }, []);

  return { isMobile };
}
