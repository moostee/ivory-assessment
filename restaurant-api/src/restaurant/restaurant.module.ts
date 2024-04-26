import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantV1Controller } from './restaurant.controller';
import { MyValidation } from '../common/validation.pipe';
import { RateLimitMiddleware } from 'src/common/rate-limit.middleware';

@Module({
  providers: [RestaurantService, MyValidation, RateLimitMiddleware],
  controllers: [RestaurantV1Controller],
})
export class RestaurantModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RateLimitMiddleware).forRoutes('*');
  }
}
