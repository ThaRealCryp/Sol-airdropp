import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { FC } from 'react';

/**
 * Crypto-Native Minimalist Design: Wallet Connection Button
 * 
 * Uses Solana's built-in wallet adapter UI with custom styling.
 * The button integrates with the design system's Solana purple accent color
 * and monochromatic aesthetic.
 */
export const WalletConnectButton: FC = () => {
  return (
    <div className="flex justify-end">
      <WalletMultiButton 
        className="!bg-accent !text-accent-foreground !rounded-md !font-space-mono hover:!shadow-lg hover:!shadow-accent/50 transition-all duration-300"
      />
    </div>
  );
};
