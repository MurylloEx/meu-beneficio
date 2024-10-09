import { DataTypes, Sequelize } from 'sequelize';
import type { Migration } from 'src/database/types';

export const up: Migration = async ({ context }) => {
  await context.transaction(async (transaction) => {
    await context.getQueryInterface().createTable(
      'access_codes',
      {
        id: {
          type: DataTypes.UUID,
          autoIncrement: false,
          primaryKey: true,
          allowNull: false,
        },
        ownerId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: 'users', key: 'id' },
        },
        code: {
          type: DataTypes.STRING(6),
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
        },
        deletedAt: {
          type: DataTypes.DATE,
        },
      },
      { transaction },
    );

    await context
      .getQueryInterface()
      .addIndex('access_codes', ['ownerId', 'code'], { transaction });
  });
};

export const down: Migration = async ({ context }) => {
  await context.transaction(async (transaction) => {
    await context.getQueryInterface().dropTable('access_codes', { transaction });
    await context
      .getQueryInterface()
      .removeIndex('access_codes', ['ownerId', 'code'], { transaction });
  });
};
