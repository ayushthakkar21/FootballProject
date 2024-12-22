import { useState, useEffect } from 'react';

function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [isSlowNetwork, setIsSlowNetwork] = useState(false);

  useEffect(() => {
    // Check initial network status
    setIsOnline(navigator.onLine);

    // Detect slow network conditions using the Network Information API
    const updateNetworkStatus = () => {
      if (navigator.connection) {
        setIsSlowNetwork(navigator.connection.effectiveType === '2g' || navigator.connection.effectiveType === 'slow-2g');
      }
    };

    // Listen for network status changes
    window.addEventListener('online', () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));

    // Listen for changes in network speed
    if (navigator.connection) {
      navigator.connection.addEventListener('change', updateNetworkStatus);
      updateNetworkStatus();
    }

    return () => {
      window.removeEventListener('online', () => setIsOnline(true));
      window.removeEventListener('offline', () => setIsOnline(false));

      if (navigator.connection) {
        navigator.connection.removeEventListener('change', updateNetworkStatus);
      }
    };
  }, []);

  return { isOnline, isSlowNetwork };
}

export default useNetworkStatus;
