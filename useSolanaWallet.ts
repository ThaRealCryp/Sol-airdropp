import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { useEffect, useState } from 'react';

export interface WalletInfo {
  address: string | null;
  balance: number | null;
  loading: boolean;
  error: string | null;
}

export const useSolanaWallet = (): WalletInfo => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!publicKey) {
      setBalance(null);
      setError(null);
      return;
    }

    const fetchBalance = async () => {
      try {
        setLoading(true);
        setError(null);
        const lamports = await connection.getBalance(publicKey);
        const sol = lamports / LAMPORTS_PER_SOL;
        setBalance(sol);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch balance');
        setBalance(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();

    // Subscribe to balance changes
    const subscription = connection.onAccountChange(publicKey, (account) => {
      setBalance(account.lamports / LAMPORTS_PER_SOL);
    });

    return () => {
      connection.removeAccountChangeListener(subscription);
    };
  }, [publicKey, connection]);

  return {
    address: publicKey?.toBase58() ?? null,
    balance,
    loading,
    error,
  };
};