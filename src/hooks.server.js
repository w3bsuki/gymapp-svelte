/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  // This is a stub for auth handling
  // Uncomment when auth is properly set up
  /*
  // Get auth data
  event.locals.auth = auth.handleRequest(event);
  
  // Get session data
  const session = await event.locals.auth.validate();
  event.locals.user = session?.user ?? null;
  event.locals.session = session;
  */

  return await resolve(event);
}
