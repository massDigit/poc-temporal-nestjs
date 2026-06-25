import { Injectable } from '@nestjs/common';
import { TemporalService } from '../temporal/temporal.service';

@Injectable()
export class OrderService {
  constructor(private readonly temporal: TemporalService) {}

  async createOrder(orderId: string) {
    const handle = await this.temporal
      .getClient()
      .workflow.start('orderWorkflow', {
        taskQueue: process.env.TEMPORAL_TASK_QUEUE ?? 'orders',
        workflowId: `order-${orderId}`,
        args: [{ orderId }],
      });

    return {
      workflowId: handle.workflowId,
      status: 'started',
    };
  }
}
