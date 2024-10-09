import type { Seeder } from 'src/database/types';

const Data = [
  {
    id: '168a7ed7-b6de-4d89-9c02-07c41c02a6fe',
    name: 'Muryllo Pimenta',
    cpf: '60652666809',
    birthDate: '2000-01-13',
    email: 'muryllopimenta@gmail.com',
    phone: '81973071117',
    s4eUserId: 302510959,
  },
  {
    id: 'e3fbb6f6-077b-46a4-80ec-750adf8b62f0',
    name: 'Felipe Macedo',
    cpf: '87453741122',
    birthDate: '1997-09-11',
    email: 'felipe.macedo17@gmail.com',
    phone: '81973071116',
    s4eUserId: 302410959,
  },
  {
    id: 'eee2140f-3490-4bc0-af82-3a28cbc6325e',
    name: 'João',
    cpf: '51542520630',
    birthDate: '2002-04-13',
    email: 'joaohac2002@gmail.com',
    phone: '81973071115',
    s4eUserId: 302310959,
  },
];

export const up: Seeder = async ({ context }) => {
  await context.getQueryInterface().bulkInsert('users', Data);
};

export const down: Seeder = async ({ context }) => {
  await context.getQueryInterface().bulkDelete('users', Data);
};
