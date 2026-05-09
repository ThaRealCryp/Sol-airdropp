import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { WalletConnectWalletAdapter } from '@solana/wallet-adapter-walletconnect';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
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

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new WalletConnectWalletAdapter({
        network: 'mainnet-beta' as any,
        options: {
          projectId: 'solana-airdrop-dashboard',
          metadata: {
            name: 'Solana Airdrop Dashboard',
            description: 'Connect your wallet to claim your SOL airdrop',
            url: typeof window !== 'undefined' ? window.location.origin : '',
            icons: ['https://avatars.githubusercontent.com/u/14957082?s=200&v=4'],
          },
        },
      }),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};