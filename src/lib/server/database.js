// src/lib/server/database.js
import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();
