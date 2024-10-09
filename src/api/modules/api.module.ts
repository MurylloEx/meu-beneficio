import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common';
import {
  AuthController,
  HealthCheckController,
} from 'src/api/controllers';

@Module({
  imports: [CommonModule],
  controllers: [
    AuthController,
    HealthCheckController,
  ],
})
export class ApiModule {}
