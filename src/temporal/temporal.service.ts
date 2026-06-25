import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Connection, Client } from '@temporalio/client';

@Injectable()
export class TemporalService implements OnModuleInit, OnModuleDestroy {
  private connection!: Connection;
  private client!: Client;

  async onModuleInit() {
    this.connection = await Connection.connect({
      address: process.env.TEMPORAL_GRPC_PORT
        ? `localhost:${process.env.TEMPORAL_GRPC_PORT}`
        : 'localhost:7233',
    });

    this.client = new Client({
      connection: this.connection,
    });
  }

  async onModuleDestroy() {
    await this.connection.close();
  }

  getClient(): Client {
    return this.client;
  }
}
