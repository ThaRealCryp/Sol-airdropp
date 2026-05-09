import { useWallet } from '@solana/wallet-adapter-react';
import { Button } from '@/components/ui/button';
import { Smartphone, Loader2 } from 'lucide-react';
import { FC, useState } from 'react';

/**
 * Crypto-Native Minimalist Design: Mobile Wallet Connection
 * 
 * Handles mobile-specific wallet connection with deep-linking to Phantom app.
 * For iOS: Uses phantom:// deep-link protocol
 * For Android: Uses intent:// protocol or direct app link
 */
export const MobileWalletConnect: FC = () => {
  const { publicKey, connect, connecting, disconnect } = useWallet();
  const [loading, setLoading] = useState(false);

  const isMobile = () => {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  };

  const isPhantomInstalled = () => {
    return typeof window !== 'undefined' && 'phantom' in window;
  };

  const handlePhantomConnect = async () => {
    try {
      setLoading(true);

      // Check if Phantom is installed
      if (isPhantomInstalled()) {
        // Use the Phantom provider directly
        const provider = (window as any).phantom?.solana;
        if (provider) {
          const response = await provider.connect();
          console.log('Connected:', response.publicKey.toString());
          return;
        }
      }

      // Fallback: Try to open Phantom app with deep-link
      const deepLink = 'phantom://';
      
      // For iOS
      if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        window.location.href = deepLink;
        // Fallback to App Store if app not installed
        setTimeout(() => {
          window.location.href = 'https://apps.apple.com/app/phantom/id1598432977';
        }, 1500);
      } 
      // For Android
      else if (/Android/.test(navigator.userAgent)) {
        window.location.href = deepLink;
        // Fallback to Play Store if app not installed
        setTimeout(() => {
          window.location.href = 'https://play.google.com/store/apps/details?id=app.phantom';
        }, 1500);
      }
    } catch (error) {
      console.error('Connection error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (publicKey) {
    return (
      <Button
        onClick={() => disconnect()}
        variant="outline"
        className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
      >
        Disconnect Wallet
      </Button>
    );
  }

  if (!isMobile()) {
    return null;
  }

  return (
    <Button
      onClick={handlePhantomConnect}
      disabled={loading || connecting}
      className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
    >
      {loading || connecting ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <Smartphone className="w-4 h-4" />
          Connect Phantom Wallet
        </>
      )}
    </Button>
  );
};