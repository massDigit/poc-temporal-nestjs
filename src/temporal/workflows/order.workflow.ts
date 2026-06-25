import { proxyActivities } from '@temporalio/workflow';
import type * as activities from '../../../activities';

const acts = proxyActivities<typeof activities>({
  startToCloseTimeout: '30s',
  retry: {
    maximumAttempts: 3,
  },
});

const { verifyStock, processPayment, sendEmail } = acts;

export async function orderWorkflow(input: {
  orderId: string;
}): Promise<string> {
  await verifyStock(input.orderId);
  await processPayment(input.orderId);
  await sendEmail(input.orderId);
  return `Order ${input.orderId} completed successfully`;
}
