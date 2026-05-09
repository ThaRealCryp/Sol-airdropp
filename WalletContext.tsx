import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { clusterApiUrl } from '@solana/web3.js';
import { FC, ReactNode, useMemo } from 'react';

/**
 * Crypto-Native Minimalist Design: Wallet Context Provider
 * 
 * Configures Solana wallet adapters with support for:
 * - Phantom (desktop and mobile)
 * - WalletConnect (mobile-first, supports multiple wallets)
 * 
 * Mobile users will get better experience with WalletConnect modal
 * that can deep-link to installed wallet apps.
 */
interface WalletContextProviderProps {
  children: ReactNode;
}

export const WalletContextProvider: FC<WalletContextProviderProps> = ({ children }) => {
  const endpoint = useMemo(() => clusterApiUrl('mainnet-beta'), []);

  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};