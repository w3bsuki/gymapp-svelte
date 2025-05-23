// src/lib/server/lucia.js
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { prisma } from '@lucia-auth/adapter-prisma';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export const auth = lucia({
  adapter: prisma(client),
  env: process.env.NODE_ENV === 'development' ? 'DEV' : 'PROD',
  middleware: sveltekit(),
  getUserAttributes: (data) => {
    return {
      id: data.id,
      email: data.email,
      username: data.username,
      name: data.name,
      avatarUrl: data.avatarUrl,
      role: data.role
    };
  }
});

export type Auth = typeof auth;
