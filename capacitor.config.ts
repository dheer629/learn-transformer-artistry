
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.85efcc11540140bb9d4f86a5ecd2f495',
  appName: 'learn-transformer-artistry',
  webDir: 'dist',
  server: {
    url: 'https://85efcc11-5401-40bb-9d4f-86a5ecd2f495.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'always'
  },
  android: {
    contentInset: 'always'
  }
};

export default config;
