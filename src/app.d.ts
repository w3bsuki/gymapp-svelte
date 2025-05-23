/// <reference types="lucia" />
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  interface Locals {
    auth: import('lucia').AuthRequest;
    user: import('lucia').User | null;
    session: import('lucia').Session | null;
  }

  // interface Platform {}

  // interface PrivateEnv {}

  // interface PublicEnv {}
}

declare namespace Lucia {
  type Auth = import('$lib/server/lucia').Auth;
  type DatabaseUserAttributes = {
    email: string;
    username?: string | null;
    name?: string | null;
    avatarUrl?: string | null;
    role: import('@prisma/client').Role;
  };
  type DatabaseSessionAttributes = {};
}
