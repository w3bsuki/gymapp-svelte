<script lang="ts">
  import { page } from '$app/stores';
  import '../app.css';
</script>

<div class="min-h-screen flex flex-col">
  <header class="fixed top-0 w-full bg-white dark:bg-gray-900 shadow-sm z-50">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <div class="flex items-center">
        <a href="/" class="text-2xl font-bold text-primary">FitTrainer</a>
        <nav class="hidden md:flex ml-8 space-x-6">
          <a 
            href="/" 
            class="text-gray-700 dark:text-gray-200 hover:text-primary transition"
            class:text-primary={$page.url.pathname === '/'}
          >
            Home
          </a>
          <a 
            href="/courses" 
            class="text-gray-700 dark:text-gray-200 hover:text-primary transition"
            class:text-primary={$page.url.pathname.startsWith('/courses')}
          >
            Courses
          </a>
          <a 
            href="/community" 
            class="text-gray-700 dark:text-gray-200 hover:text-primary transition"
            class:text-primary={$page.url.pathname.startsWith('/community')}
          >
            Community
          </a>
          <a 
            href="/about" 
            class="text-gray-700 dark:text-gray-200 hover:text-primary transition"
            class:text-primary={$page.url.pathname === '/about'}
          >
            About
          </a>
        </nav>
      </div>
      
      <div class="flex items-center space-x-4">
        <!-- Temporary login/register links - will be replaced with components -->
        <a href="/auth/login" class="text-gray-700 dark:text-gray-200 hover:text-primary transition">Login</a>
        <a href="/auth/register" class="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition">Sign Up</a>
      </div>
    </div>
  </header>

  <main class="flex-1 pt-16">
    <slot />
  </main>

  <footer class="bg-gray-100 dark:bg-gray-900 py-12 mt-auto">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <a href="/" class="text-xl font-bold text-primary">FitTrainer</a>
          <p class="mt-4 text-gray-600 dark:text-gray-400">
            Professional fitness training and community for all levels.
          </p>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li><a href="/" class="text-gray-600 dark:text-gray-400 hover:text-primary">Home</a></li>
            <li><a href="/courses" class="text-gray-600 dark:text-gray-400 hover:text-primary">Courses</a></li>
            <li><a href="/community" class="text-gray-600 dark:text-gray-400 hover:text-primary">Community</a></li>
            <li><a href="/about" class="text-gray-600 dark:text-gray-400 hover:text-primary">About</a></li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Help & Support</h3>
          <ul class="space-y-2">
            <li><a href="/contact" class="text-gray-600 dark:text-gray-400 hover:text-primary">Contact Us</a></li>
            <li><a href="/faq" class="text-gray-600 dark:text-gray-400 hover:text-primary">FAQ</a></li>
            <li><a href="/privacy" class="text-gray-600 dark:text-gray-400 hover:text-primary">Privacy Policy</a></li>
            <li><a href="/terms" class="text-gray-600 dark:text-gray-400 hover:text-primary">Terms of Service</a></li>
          </ul>
        </div>
        
        <div>
        <h3 class="text-lg font-semibold mb-4">Follow Us</h3>
          <div class="flex space-x-4">
            <a href="/social/facebook" aria-label="Visit our Facebook page" class="text-gray-600 dark:text-gray-400 hover:text-primary">
              <span class="sr-only">Facebook</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="/social/twitter" aria-label="Visit our Twitter page" class="text-gray-600 dark:text-gray-400 hover:text-primary">
              <span class="sr-only">Twitter</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
            <a href="/social/instagram" aria-label="Visit our Instagram page" class="text-gray-600 dark:text-gray-400 hover:text-primary">
              <span class="sr-only">Instagram</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="/social/youtube" aria-label="Visit our YouTube channel" class="text-gray-600 dark:text-gray-400 hover:text-primary">
              <span class="sr-only">YouTube</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
          </div>
        </div>
      </div>
      
      <div class="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} FitTrainer. All rights reserved.
        </p>
      </div>
    </div>  </footer>
</div>

<style>
  /* Any additional styling can go here */
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
