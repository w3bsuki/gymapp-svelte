# FitTrainer - Fitness Trainer Web Application

A comprehensive web application for fitness trainers to showcase their portfolio, sell courses, and build a community. Built with SvelteKit, Svelte Flow, and shadcn/svelte.

![Fitness Trainer Web Application](/static/banner.png)

## Features

- **Portfolio**: Showcase trainer achievements, testimonials, and services
- **Course Platform**: Sell and deliver fitness courses with progress tracking
- **Community**: Chat functionality and discussion forums
- **User Profiles**: Personalized dashboards with progress tracking
- **Admin Interface**: Content and user management tools

## Developing

## Technology Stack

- **SvelteKit**: Full-stack framework for building the application
- **Svelte Flow**: For interactive diagrams and workout flows
- **shadcn/svelte**: For consistent, accessible UI components
- **Tailwind CSS**: For utility-first styling
- **Prisma**: For database ORM
- **Lucia Auth**: Authentication library for Svelte
- **Socket.io**: For real-time chat functionality

## Project Structure

- `/src/lib/components`: Reusable UI components
- `/src/lib/server`: Server-only code
- `/src/lib/utils`: Utility functions
- `/src/routes`: SvelteKit routes
- `/docs`: Comprehensive project documentation
- `/prisma`: Database schema and migrations

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Set up environment variables:

```bash
cp .env.example .env
```

3. Set up the database:

```bash
pnpm prisma db push
```

4. Start the development server:

```bash
pnpm run dev
```

## Development

- Check the detailed documentation in the `/docs` folder
- Follow the implementation roadmap in `/docs/planning/implementation-roadmap.md`
- Use the component architecture guide in `/docs/architecture/component-architecture.md`

## Building for Production

```bash
pnpm run build
```

You can preview the production build with:

```bash
pnpm run preview
```

## Deployment

This application can be deployed to various platforms:

- Vercel: Optimized for SvelteKit applications
- Netlify: Easy deployment with continuous integration
- Digital Ocean App Platform: Scalable hosting solution

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
