import { DataTypes, Sequelize } from 'sequelize';
import type { Migration } from 'src/database/types';

export const up: Migration = async ({ context }) => {
  await context.transaction(async (transaction) => {
    await context.getQueryInterface().createTable(
      'users',
      {
        id: {
          type: DataTypes.UUID,
          autoIncrement: false,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(256),
          allowNull: false,
        },
        cpf: {
          type: DataTypes.STRING(11),
          unique: true,
          allowNull: false,
        },
        birthDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(256),
          unique: true,
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING(11),
          allowNull: false,
        },
        s4eUserId: {
          type: DataTypes.BIGINT,
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
      .addIndex('users', ['cpf', 'birthDate', 'email', 's4eUserId'], { transaction });
  });
};

export const down: Migration = async ({ context }) => {
  await context.transaction(async (transaction) => {
    await context.getQueryInterface().dropTable('users', { transaction });
    await context
      .getQueryInterface()
      .removeIndex('users', ['cpf', 'birthDate', 'email', 's4eUserId'], { transaction });
  });
};
