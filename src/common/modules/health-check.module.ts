import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

const TerminusModuleAsync = TerminusModule.forRoot({
  errorLogStyle: 'pretty',
});

@Module({
  imports: [TerminusModuleAsync],
  exports: [TerminusModuleAsync],
})
export class HealthCheckModule {}
