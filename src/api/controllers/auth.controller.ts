import { Body, Controller, HttpCode, HttpStatus, Post, Version } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  AuthService,
  ConfirmCodeRequestDto,
  ConfirmCodeResponseDto,
  LoginAttemptRequestDto,
  LoginAttemptResponseDto,
  SendCodeRequestDto,
  SendCodeResponseDto,
  SignupRequestDto,
  SignupResponseDto,
} from 'src/common';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary:
      'Realiza a triagem do usuário checando se ele existe na base de dados do aplicativo ou do S4e.',
    description: `
      Este endpoint realiza basicamente as seguintes verificações:
      
      1. Verifica se é o primeiro acesso do usuário;
      2. Verifica se o usuário consta no S4e caso não tenha sido encontrado na base de dados do aplicativo.
    `,
  })
  @ApiOkResponse({
    type: () => LoginAttemptResponseDto,
  })
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() body: LoginAttemptRequestDto): Promise<LoginAttemptResponseDto> {
    return await this.authService.login(body);
  }

  @ApiOperation({
    summary:
      'Realiza o cadastro do usuário no aplicativo caso seu usuário seja elegível para tal.',
    description: `
      Nesta etapa o usuário informa seus dados pessoais, sendo eles:

      1. CPF;
      2. Data de nascimento;
      3. E-mail a ser utilizado no aplicativo.
    `,
  })
  @ApiOkResponse({
    type: () => SignupResponseDto,
  })
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @Post('/signup')
  async signup(@Body() body: SignupRequestDto): Promise<SignupResponseDto> {
    return await this.authService.signup(body);
  }

  @ApiOperation({
    summary:
      'Envia ao e-mail do usuário um código de acesso de uso único mas que tem elegibilidade de uso por até 30 dias.',
  })
  @ApiOkResponse({
    type: () => SendCodeResponseDto,
  })
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @Post('/code/send')
  async sendCode(@Body() body: SendCodeRequestDto): Promise<SendCodeResponseDto> {
    return await this.authService.sendCode(body);
  }

  @ApiOperation({
    summary:
      'Confirma o código de acesso enviado ao e-mail do usuário e devolve um bearer token para acessar endpoints protegidos.',
  })
  @ApiOkResponse({
    type: () => ConfirmCodeResponseDto,
  })
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @Post('/code/confirm')
  async confirmCode(
    @Body() body: ConfirmCodeRequestDto,
  ): Promise<ConfirmCodeResponseDto> {
    return await this.authService.confirmCode(body);
  }
}
