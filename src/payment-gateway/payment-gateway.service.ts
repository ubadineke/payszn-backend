import { Injectable } from '@nestjs/common';
import { Connection } from '@solana/web3.js';

@Injectable()
export class PaymentGatewayService {
  private connection: Connection;

  constructor() {
    this.connection = new Connection(
      'https://api.mainnet-beta.solana.com',
      'confirmed',
    ); // Use mainnet or devnet
  }

  async confirmTransaction(signature: string, expectedReceiver: string) {
    try {
      const transaction = await this.connection.getParsedTransaction(
        signature,
        { commitment: 'confirmed', maxSupportedTransactionVersion: 0 },
      );
      console.log('Transaction', transaction);

      if (!transaction) {
        throw new Error('Transaction not found or not confirmed.');
      }

      // Check if transaction was successful
      const success = transaction.meta?.err === null;
      // console.log('Successful?', success);
      if (!success) {
        return false;
      }

      // Verify if the expected receiver is in the transaction
      const receiverExists = transaction.transaction.message.accountKeys.some(
        (key) => key.pubkey.toBase58() === expectedReceiver,
      );

      if (!receiverExists) {
        return false;
      }
      // console.log('elon', receiverExists);
      return true;
    } catch (error) {
      console.error('Error confirming transaction:', error.message);
      return false;
    }
  }
}
