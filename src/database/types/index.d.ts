import { Sequelize } from 'sequelize';
import { MigrationParams } from 'umzug';

export type Migration = (params: MigrationParams<Sequelize>) => Promise<void>;
export type Seeder = (params: MigrationParams<Sequelize>) => Promise<void>;
