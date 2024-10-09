import { DataTypes, Sequelize } from 'sequelize';
import type { Migration } from 'src/database/types';

export const up: Migration = async ({ context }) => {
  await context.transaction(async (transaction) => {
    await context.getQueryInterface().createTable(
      'user_roles',
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
        role: {
          type: DataTypes.INTEGER,
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
      .addIndex('user_roles', ['ownerId', 'role'], { transaction });
  });
};

export const down: Migration = async ({ context }) => {
  await context.transaction(async (transaction) => {
    await context.getQueryInterface().dropTable('user_roles', { transaction });
    await context
      .getQueryInterface()
      .removeIndex('user_roles', ['ownerId', 'role'], { transaction });
  });
};
