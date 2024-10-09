import { ConfigType, registerAs } from '@nestjs/config';
import { cast } from 'typeable';

export type S4eConfigSlice = {
  apiUrl: string;
  apiKey: string;
};

export const S4E_CONFIG = 'S4E_CONFIG';

// Registers a configuration provider that extracts values from environment variables.
export const S4eConfig = registerAs<S4eConfigSlice>(S4E_CONFIG, () => ({
  apiUrl: cast(process.env.S4E_API_URL, 'String'),
  apiKey: cast(process.env.S4E_API_KEY, 'String'),
}));

// Defines a new type for the return of the configuration provider.
export type S4eConfigType = ConfigType<typeof S4eConfig>;
