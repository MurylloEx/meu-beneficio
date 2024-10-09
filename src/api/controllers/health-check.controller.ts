import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthCheckResultResponseDto, HealthService } from 'src/common';

@ApiTags('Health Check')
@Controller('health-check')
export class HealthCheckController {
  constructor(private readonly healthService: HealthService) {}

  @ApiOperation({
    summary:
      'Realiza verificações de sanidade da API para indicar se está disponível para atender solicitações.',
    description: `
      1. Verificação de conectividade com a Internet;
      2. Verificação de conectividade com o banco de dados;
      3. Verificação de conectividade com a API S4e;
      4. Verificação da porção de memória resident set size (RSS);
      5. Verificação da porção de memória heap;
      6. Verificação da disponibilidade de espaço em disco.
    `,
  })
  @Get()
  async check(): Promise<HealthCheckResultResponseDto> {
    return await this.healthService.performChecks();
  }
}
