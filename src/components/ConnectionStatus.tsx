
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, AlertTriangle } from 'lucide-react';
import { checkSupabaseConnection } from '@/integrations/supabase/client';

export const ConnectionStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check Supabase connection
    const checkConnection = async () => {
      const connected = await checkSupabaseConnection();
      setIsSupabaseConnected(connected);
    };

    checkConnection();
    const interval = setInterval(checkConnection, 30000); // Check every 30 seconds

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  const getStatusInfo = () => {
    if (!isOnline) {
      return {
        icon: WifiOff,
        text: 'Offline',
        variant: 'destructive' as const,
        color: 'text-red-500'
      };
    }

    if (isSupabaseConnected === false) {
      return {
        icon: AlertTriangle,
        text: 'Database Offline',
        variant: 'secondary' as const,
        color: 'text-yellow-500'
      };
    }

    if (isSupabaseConnected === true) {
      return {
        icon: Wifi,
        text: 'Connected',
        variant: 'default' as const,
        color: 'text-green-500'
      };
    }

    return {
      icon: Wifi,
      text: 'Checking...',
      variant: 'secondary' as const,
      color: 'text-gray-500'
    };
  };

  const status = getStatusInfo();
  const StatusIcon = status.icon;

  return (
    <Badge variant={status.variant} className="flex items-center space-x-1">
      <StatusIcon className={`h-3 w-3 ${status.color}`} />
      <span>{status.text}</span>
    </Badge>
  );
};
