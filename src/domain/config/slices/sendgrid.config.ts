import { ConfigType, registerAs } from '@nestjs/config';
import { cast } from 'typeable';

export type SendgridConfigSlice = {
  sender: string;
  apiKey: string;
};

export const SENDGRID_CONFIG = 'SENDGRID_CONFIG';

// Registers a configuration provider that extracts values from environment variables.
export const SendgridConfig = registerAs<SendgridConfigSlice>(SENDGRID_CONFIG, () => ({
  sender: cast(process.env.SENDGRID_SENDER, 'String'),
  apiKey: cast(process.env.SENDGRID_API_KEY, 'String'),
}));

// Defines a new type for the return of the configuration provider.
export type SendgridConfigType = ConfigType<typeof SendgridConfig>;
