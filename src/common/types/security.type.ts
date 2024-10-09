import { JwtRequestDto } from 'src/common/dto';

export type Authenticated<T> = T & {
  user: JwtRequestDto;
};
