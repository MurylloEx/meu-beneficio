import { DataTypes, Sequelize } from 'sequelize';
import type { Migration } from 'src/database/types';

export const up: Migration = async ({ context }) => {
  await context.transaction(async (transaction) => {
    await context.getQueryInterface().createTable(
      'user_addresses',
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
        zipCode: {
          type: DataTypes.STRING(8),
          allowNull: false,
        },
        state: {
          type: DataTypes.STRING(2),
          allowNull: false,
        },
        city: {
          type: DataTypes.STRING(256),
          allowNull: false,
        },
        neighborhood: {
          type: DataTypes.STRING(256),
          allowNull: false,
        },
        street: {
          type: DataTypes.STRING(256),
          allowNull: false,
        },
        number: {
          type: DataTypes.STRING(8),
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
      .addIndex('user_addresses', ['ownerId', 'zipCode'], { transaction });
  });
};

export const down: Migration = async ({ context }) => {
  await context.transaction(async (transaction) => {
    await context.getQueryInterface().dropTable('user_addresses', { transaction });
    await context
      .getQueryInterface()
      .removeIndex('user_addresses', ['ownerId', 'zipCode'], { transaction });
  });
};
