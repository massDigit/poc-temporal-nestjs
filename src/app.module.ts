import { Module } from '@nestjs/common';
import { TemporalModule } from './temporal/temporal.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [TemporalModule, OrderModule],
})
export class AppModule {}
