import { ConfigType, registerAs } from '@nestjs/config';
import { cast } from 'typeable';

export type DatabaseConfigSlice = {
  host: string;
  port: number;
  name: string;
  username: string;
  password: string;
  timezone: string;
  logging: boolean;
  synchronize: boolean;
  autoLoadModels: boolean;
  alwaysMigrate: boolean;
  alwaysSeed: boolean;
  revertMigrationsTo: string;
  revertSeedsTo: string;
};

export const DATABASE_CONFIG = 'DATABASE_CONFIG';

export const DatabaseConfig = registerAs<DatabaseConfigSlice>(DATABASE_CONFIG, () => ({
  host: cast(process.env.DB_HOST, 'String'),
  port: cast(process.env.DB_PORT, 'Number'),
  name: cast(process.env.DB_NAME, 'String'),
  username: cast(process.env.DB_USERNAME, 'String'),
  password: cast(process.env.DB_PASSWORD, 'String'),
  timezone: cast(process.env.DB_TIMEZONE, 'String'),
  logging: cast(process.env.DB_LOGGING, 'Boolean'),
  synchronize: cast(process.env.DB_SYNCHRONIZE, 'Boolean'),
  autoLoadModels: cast(process.env.DB_AUTO_LOAD_MODELS, 'Boolean'),
  alwaysMigrate: cast(process.env.DB_ALWAYS_MIGRATE, 'Boolean'),
  alwaysSeed: cast(process.env.DB_ALWAYS_SEED, 'Boolean'),
  revertMigrationsTo: cast(process.env.DB_REVERT_MIGRATIONS_TO, 'String'),
  revertSeedsTo: cast(process.env.DB_REVERT_SEEDS_TO, 'String'),
}));

export type DatabaseConfigType = ConfigType<typeof DatabaseConfig>;
