import { Worker, NativeConnection } from '@temporalio/worker';
import * as activities from './activities';

async function run() {
  const connection = await NativeConnection.connect({
    address: process.env.TEMPORAL_GRPC_PORT
      ? `localhost:${process.env.TEMPORAL_GRPC_PORT}`
      : 'localhost:7233',
  });

  const worker = await Worker.create({
    connection,
    namespace: 'default',
    taskQueue: process.env.TEMPORAL_TASK_QUEUE ?? 'orders',
    workflowsPath: require.resolve('./src/temporal/workflows/order.workflow'),
    activities,
  });

  console.log('Worker démarré, en attente de tâches...');
  await worker.run();
}

run().catch((err) => {
  console.error('Erreur Worker:', err);
  process.exit(1);
});
