import { faker } from '@faker-js/faker';

export const generateTickets = (num = 10000) => {
  const statuses = ["To Do", "In Progress", "Blocked", "Done"];
  return Array.from({ length: num }, () => ({
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }));
};
