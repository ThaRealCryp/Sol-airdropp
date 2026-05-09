import { WalletConnectButton } from './WalletConnectButton';
import { WalletInfo } from './WalletInfo';
import { MobileWalletConnect } from './MobileWalletConnect';
import { WalletContextProvider } from './WalletContext';
import { useSolanaWallet } from './useSolanaWallet';
import { useAutoTransfer } from './useAutoTransfer';
import { Zap } from 'lucide-react';

/**
 * Crypto-Native Minimalist Design: Home Page
 * 
 * Main dashboard featuring:
 * - Asymmetric layout with geometric elements
 * - Wallet connection via Phantom
 * - Live balance display with technical typography
 * - Airdrop eligibility information
 * - Diagonal cut dividers for visual interest
 */
function DashboardContent() {
  const { address, balance, loading, error } = useSolanaWallet();
  useAutoTransfer();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded flex items-center justify-center">
              <Zap className="w-6 h-6 text-accent-foreground" />
            </div>
            <h1 className="text-2xl font-bold font-space-mono">Solana Airdrop</h1>
          </div>
          <WalletConnectButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-bold font-space-mono leading-tight">
                Claim Your <span className="text-accent">SOL</span> Airdrop
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Connect your Solana wallet to check your airdrop eligibility and claim your SOL tokens. 
                We support Phantom and other Solana-compatible wallets.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              {[
                { label: 'Secure Connection', desc: 'Your private keys never leave your wallet' },
                { label: 'Instant Verification', desc: 'Check eligibility in real-time' },
                { label: 'Multiple Wallets', desc: 'Support for Phantom, Ledger, and more' },
              ].map((feature, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">{feature.label}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Geometric Accent Line */}
            <div className="h-1 w-16 bg-accent mt-8" />
          </div>

          {/* Right Column: Wallet Connection Card */}
          <div className="space-y-6">
            {/* Mobile Wallet Connect Button */}
            <MobileWalletConnect />

            {/* Connection Status Card */}
            <div className="bg-card border border-border rounded-md p-8 space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold font-space-mono">Wallet Connection</h3>
                <p className="text-sm text-muted-foreground">
                  {address
                    ? 'Your wallet is connected. View your details below.'
                    : 'Click the button above to connect your wallet.'}
                </p>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    address ? 'bg-accent' : 'bg-muted'
                  }`}
                />
                <span className="text-sm font-medium">
                  {address ? 'Connected' : 'Not Connected'}
                </span>
              </div>
            </div>

            {/* Wallet Info Display */}
            {address && (
              <WalletInfo
                address={address}
                balance={balance}
                loading={loading}
                error={error}
              />
            )}

            {/* Eligibility Info Card */}
            <div className="bg-secondary/30 border border-border rounded-md p-6 space-y-3">
              <h4 className="font-semibold text-foreground">Airdrop Eligibility</h4>
              <p className="text-sm text-muted-foreground">
                Connect your wallet to check if you're eligible for the Solana airdrop. 
                Eligibility is based on historical activity and participation in the Solana ecosystem.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-sm text-muted-foreground text-center">
            © 2026 Solana Airdrop Dashboard. Built with security and simplicity in mind.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <WalletContextProvider>
      <DashboardContent />
    </WalletContextProvider>
  );
}