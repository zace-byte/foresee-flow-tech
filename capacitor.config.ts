import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.6c056f95ef2c4cdc9a35adeb5ac9fb85',
  appName: 'Commercial Wallet سلام',
  webDir: 'dist',
  server: {
    url: 'https://6c056f95-ef2c-4cdc-9a35-adeb5ac9fb85.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;