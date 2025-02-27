import { Injectable } from '@nestjs/common';
import { Connection } from '@solana/web3.js';
import { TransactionsService } from 'src/transactions/transactions.service';
import { UsersService } from 'src/users/users.service';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PaymentGatewayService {
  private connection: Connection;

  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly usersService: UsersService,
    private readonly httpService: HttpService,
  ) {
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
      true,
    );

    // console.log('Transaction', transaction);
    //Send Notification mail to Merchant

    //Send update to the appplication registered Webhook
    // const user = await this.usersService.findUserByWallet(expectedReceiver);
    // const webhookUrl = user.webhookUrl;
    const webhookUrl = 'https://3583-102-215-57-96.ngrok-free.app/webhook';
    const callbackUrl = 'http:/dff.com/ad';

    if (webhookUrl) {
      try {
        await this.httpService.post(webhookUrl, {
          status: 'success',
          transaction,
        });
      } catch (error) {
        console.error('Webhook failed:', error);
      }
    }

    // Return Data for Callback URL Redirect
    return {
      message: 'Transaction successful',
      transaction,
      callbackUrl: callbackUrl, // Frontend will redirect the user here
    };
  }
}
