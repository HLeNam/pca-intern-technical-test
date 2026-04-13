/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from './modules/users/entities/user.entity';
import { dataSourceOptions } from './config/typeorm.config';

config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const SEED_COUNT = 100;

async function seedDatabase() {
  const dataSource = new DataSource(dataSourceOptions);

  try {
    await dataSource.initialize();
    console.log('Database connected');

    const userRepository = dataSource.getRepository(User);

    // Clear existing users
    await userRepository.clear();
    console.log('Cleared existing users');

    // Generate fake users
    const users: User[] = [];
    const emails = new Set<string>();

    for (let i = 0; i < SEED_COUNT; i++) {
      let email: string;
      // Ensure unique emails
      do {
        email = faker.internet.email();
      } while (emails.has(email));
      emails.add(email);

      const hashedPassword = await bcrypt.hash('password123', 10);

      const user = new User();
      user.email = email;
      user.firstName = faker.person.firstName();
      user.lastName = faker.person.lastName();
      user.password = hashedPassword;
      user.deleted = false;

      users.push(user);
    }

    // Insert all users
    await userRepository.save(users);
    console.log(`Successfully seeded ${SEED_COUNT} users`);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await dataSource.destroy();
  }
}

seedDatabase();
