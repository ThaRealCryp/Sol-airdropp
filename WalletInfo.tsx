import { Copy, Loader2 } from 'lucide-react';
import { FC, useState } from 'react';
import { Button } from './components/ui/button';

/**
 * Crypto-Native Minimalist Design: Wallet Info Display
 * 
 * Displays connected wallet address and SOL balance with geometric styling.
 * Uses Space Mono for technical values (addresses, balances) to reinforce
 * the technical, minimalist aesthetic.
 */
interface WalletInfoProps {
  address: string | null;
  balance: number | null;
  loading: boolean;
  error: string | null;
}

export const WalletInfo: FC<WalletInfoProps> = ({ address, balance, loading, error }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!address) {
    return null;
  }

  return (
    <div className="space-y-6 mt-8">
      {/* Wallet Address Card */}
      <div className="bg-card border border-border rounded-md p-6 space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Wallet Address
        </h3>
        <div className="flex items-center justify-between gap-3">
          <code className="font-space-mono text-sm text-foreground break-all bg-secondary/50 p-3 rounded flex-1">
            {address}
          </code>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="flex-shrink-0 hover:bg-accent hover:text-accent-foreground"
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>
        {copied && (
          <p className="text-xs text-accent font-medium">Copied to clipboard</p>
        )}
      </div>

      {/* SOL Balance Card */}
      <div className="bg-card border border-border rounded-md p-6 space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          SOL Balance
        </h3>
        <div className="flex items-center justify-between">
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-accent" />
              <span className="text-sm text-muted-foreground">Loading...</span>
            </div>
          ) : error ? (
            <p className="text-sm text-destructive">{error}</p>
          ) : (
            <div className="space-y-1">
              <p className="font-space-mono text-3xl font-bold text-accent">
                {balance?.toFixed(4) ?? '0.0000'}
              </p>
              <p className="text-xs text-muted-foreground">SOL</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};