import { parse } from 'path';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
  HealthCheckService,
  DiskHealthIndicator,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  SequelizeHealthIndicator,
} from '@nestjs/terminus';
import { ConfigurationService } from './configuration.service';
import { HealthCheckResultResponseDto } from 'src/common/dto';

@Injectable()
export class HealthService {
  constructor(
    private readonly configService: ConfigurationService,
    private readonly healthService: HealthCheckService,
    private readonly diskHealth: DiskHealthIndicator,
    private readonly httpHealth: HttpHealthIndicator,
    private readonly memoryHealth: MemoryHealthIndicator,
    private readonly sequelizeHealth: SequelizeHealthIndicator,
  ) {}

  async performChecks(): Promise<HealthCheckResultResponseDto> {
    const configs = this.configService.getConfigurations();

    const NETWORK_URL = 'https://google.com/';
    const S4E_HEALTH_URL = new URL('/healthcheck', configs.s4e.apiUrl).href;

    const MEMORY_RSS_CHECK_THRESHOLD = 1 * 1024 * 1024 * 1024; // 1GB
    const MEMORY_HEAP_CHECK_THRESHOLD = 2 * 1024 * 1024 * 1024; // 2GB

    const HTTP_PING_OPTIONS = {
      timeout: 3000,
    };

    const STORAGE_CHECK_OPTIONS = {
      thresholdPercent: 0.7,
      path: parse(process.cwd()).root,
    };

    await this.healthService.check([
      () =>
        this.httpHealth.pingCheck('network_connectivity', NETWORK_URL, HTTP_PING_OPTIONS),
      () => this.sequelizeHealth.pingCheck('db_connectivity', HTTP_PING_OPTIONS),
      () =>
        this.httpHealth.pingCheck('s4e_connectivity', S4E_HEALTH_URL, HTTP_PING_OPTIONS),
      () => this.memoryHealth.checkRSS('memory_rss', MEMORY_RSS_CHECK_THRESHOLD),
      () => this.memoryHealth.checkHeap('memory_heap', MEMORY_HEAP_CHECK_THRESHOLD),
      () => this.diskHealth.checkStorage('disk_space', STORAGE_CHECK_OPTIONS),
    ]);

    return plainToInstance(HealthCheckResultResponseDto, {
      environment: configs.root.environment,
      version: configs.server.version,
      isRunningUnderDebug: configs.server.debug,
    });
  }
}
