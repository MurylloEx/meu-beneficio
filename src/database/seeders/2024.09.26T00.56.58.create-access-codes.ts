import type { Seeder } from 'src/database/types';

const Data = [
  {
    id: '168a7ed7-b6de-4d89-9c02-07c41c02a6fe',
    ownerId: '168a7ed7-b6de-4d89-9c02-07c41c02a6fe',
    code: 'mUrYlO',
  },
  {
    id: 'e3fbb6f6-077b-46a4-80ec-750adf8b62f0',
    ownerId: 'e3fbb6f6-077b-46a4-80ec-750adf8b62f0',
    code: 'FELIPE',
  },
  {
    id: 'eee2140f-3490-4bc0-af82-3a28cbc6325e',
    ownerId: 'eee2140f-3490-4bc0-af82-3a28cbc6325e',
    code: 'JOAOHA',
  },
];

export const up: Seeder = async ({ context }) => {
  await context.getQueryInterface().bulkInsert('access_codes', Data);
};

export const down: Seeder = async ({ context }) => {
  await context.getQueryInterface().bulkDelete('access_codes', Data);
};
