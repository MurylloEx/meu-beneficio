import type { Seeder } from 'src/database/types';

const Data = [
  {
    id: '168a7ed7-b6de-4d89-9c02-07c41c02a6fe',
    ownerId: '168a7ed7-b6de-4d89-9c02-07c41c02a6fe',
    zipCode: '51350320',
    state: 'PE',
    city: 'Recife',
    neighborhood: 'Ipsep',
    street: 'Rua Professor José Vicente',
    number: '470',
  },
  {
    id: 'e3fbb6f6-077b-46a4-80ec-750adf8b62f0',
    ownerId: 'e3fbb6f6-077b-46a4-80ec-750adf8b62f0',
    zipCode: '69077090',
    state: 'AM',
    city: 'Manaus',
    neighborhood: 'Japiim',
    street: 'Rua Fernando de Córdoba',
    number: '24',
  },
  {
    id: 'eee2140f-3490-4bc0-af82-3a28cbc6325e',
    ownerId: 'eee2140f-3490-4bc0-af82-3a28cbc6325e',
    zipCode: '59122540',
    state: 'RN',
    city: 'Natal',
    neighborhood: 'Redinha',
    street: 'Rua José Soares',
    number: '72',
  },
];

export const up: Seeder = async ({ context }) => {
  await context.getQueryInterface().bulkInsert('user_addresses', Data);
};

export const down: Seeder = async ({ context }) => {
  await context.getQueryInterface().bulkDelete('user_addresses', Data);
};
