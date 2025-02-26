import { Injectable } from '@nestjs/common';
import { Connection } from '@solana/web3.js';
import { TransactionsService } from 'src/transactions/transactions.service';

@Injectable()
export class PaymentGatewayService {
  private connection: Connection;

  constructor(private transactionsService: TransactionsService) {
    this.connection = new Connection(
      'https://api.mainnet-beta.solana.com',
      'confirmed',
    ); // Use mainnet or devnet
  }

  async processTransaction(signature: string, expectedReceiver: string) {
    const confirmedTx = await this.transactionsService.confirmTransaction(
      this.connection,
      signature,
      expectedReceiver,
    );

    //Update Transaction History
    const transaction = await this.transactionsService.createTransaction(
      confirmedTx.signature,
      confirmedTx.sender,
      confirmedTx.receiver,
      confirmedTx.destinationToken.amount as string,
    );

    console.log('Transaction', transaction);

    //Send update to the appplication registered Webhook

    return { message: 'Transaction successful', confirmedTx };
  }
}
