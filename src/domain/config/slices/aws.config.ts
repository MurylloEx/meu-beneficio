import { ConfigType, registerAs } from '@nestjs/config';
import { cast } from 'typeable';

export type AwsConfigSlice = {
  defaultRegion: string;
  accessKeyId: string;
  secretAccessKey: string;
};

export const AWS_CONFIG = 'AWS_CONFIG';

// Registers a configuration provider that extracts values from environment variables.
export const AwsConfig = registerAs<AwsConfigSlice>(AWS_CONFIG, () => ({
  defaultRegion: cast(process.env.AWS_DEFAULT_REGION, 'String'),
  accessKeyId: cast(process.env.AWS_ACCESS_KEY_ID, 'String'),
  secretAccessKey: cast(process.env.AWS_SECRET_ACCESS_KEY, 'String'),
}));

// Defines a new type for the return of the configuration provider.
export type AwsConfigType = ConfigType<typeof AwsConfig>;
