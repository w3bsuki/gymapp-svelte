# UI/UX Design Guide

This document outlines the design principles, components, and patterns for our fitness trainer web application. The goal is to create a cohesive, beautiful, and user-friendly experience inspired by modern web applications like IKEA's Svelte-based website.

## Design Principles

### 1. Clean and Focused
- Minimize clutter and distractions
- Focus on content and functionality
- Use whitespace effectively
- Limit color palette to enhance readability

### 2. Responsive and Adaptive
- Design for all screen sizes (mobile-first approach)
- Optimize critical user flows for each device type
- Ensure touch-friendly elements on mobile

### 3. Intuitive Navigation
- Clear hierarchy and information architecture
- Consistent navigation patterns
- Breadcrumbs for deep navigation structures
- Logical progression through user flows

### 4. Performance-oriented
- Optimize image loading (lazy loading, responsive images)
- Minimize animations on low-power devices
- Prioritize core content loading

### 5. Accessible
- Follow WCAG 2.1 AA standards
- Support keyboard navigation
- Ensure sufficient color contrast
- Provide text alternatives for non-text content

## Color Palette

### Primary Colors
- Primary: `#3182ce` (Blue)
- Secondary: `#805ad5` (Purple)
- Accent: `#38b2ac` (Teal)

### Neutrals
- Background: `#ffffff` (White)
- Surface: `#f7fafc` (Light Gray)
- Text Primary: `#1a202c` (Dark Gray)
- Text Secondary: `#4a5568` (Medium Gray)

### Semantic Colors
- Success: `#48bb78` (Green)
- Warning: `#ed8936` (Orange)
- Error: `#e53e3e` (Red)
- Info: `#4299e1` (Light Blue)

### Dark Mode Variants
- Background: `#1a202c` (Dark Gray)
- Surface: `#2d3748` (Medium Dark Gray)
- Text Primary: `#f7fafc` (Light Gray)
- Text Secondary: `#a0aec0` (Medium Light Gray)

## Typography

### Font Families
- Headings: Inter, sans-serif
- Body: Inter, sans-serif
- Monospace: Fira Code, monospace

### Font Sizes
- xs: 0.75rem (12px)
- sm: 0.875rem (14px)
- base: 1rem (16px)
- lg: 1.125rem (18px)
- xl: 1.25rem (20px)
- 2xl: 1.5rem (24px)
- 3xl: 1.875rem (30px)
- 4xl: 2.25rem (36px)
- 5xl: 3rem (48px)

### Font Weights
- Light: 300
- Regular: 400
- Medium: 500
- Semi-Bold: 600
- Bold: 700

## Component Library (shadcn/svelte)

We'll use shadcn/svelte as our component library foundation, with custom styling to match our brand.

### Core Components

#### Navigation
- **Header**: Main navigation with logo, menu, and user actions
- **Footer**: Site links, social media, and legal information
- **Sidebar**: Context-specific navigation for dashboard views
- **Breadcrumbs**: Show hierarchical position in site structure
- **Tabs**: Content organization within pages

#### Layout
- **Container**: Maximum width container with responsive padding
- **Grid**: Flexible grid system for layouts
- **Card**: Container for grouped content
- **Divider**: Visual separator between content sections

#### Input Elements
- **Button**: Primary, secondary, outline, ghost variants
- **Input**: Text fields with validation states
- **Select**: Dropdown selection with search capability
- **Checkbox**: Single selection toggle
- **Radio**: Option selection from a group
- **Switch**: Toggle for binary settings
- **Slider**: Range selection
- **Date Picker**: Calendar-based date selection

#### Display Elements
- **Avatar**: User profile images
- **Badge**: Status indicators
- **Alert**: Feedback messages
- **Toast**: Temporary notifications
- **Progress**: Visual indicator of completion
- **Skeleton**: Loading state placeholders

#### Course-Specific Components
- **Course Card**: Display course information in catalog
- **Lesson Player**: Video player with progress controls
- **Progress Tracker**: Visual representation of course completion
- **Exercise Diagram**: Interactive workout visualization (using Svelte Flow)

#### Community Components
- **Chat Bubble**: Message display in conversations
- **User List**: Online community members
- **Thread View**: Hierarchical comment display
- **Post Card**: Community post with engagement metrics

## Page Templates

### Homepage
- Hero section with CTA
- Featured courses section
- Trainer introduction
- Testimonials
- Benefits section

### Course Catalog
- Filtering and sorting controls
- Grid of course cards
- Category navigation
- Search functionality

### Course Detail
- Course header with title, image, and basic info
- Tabbed content (Overview, Curriculum, Reviews)
- Pricing and enrollment CTA
- Related courses

### Dashboard
- Progress summary
- Enrolled courses
- Upcoming schedules
- Recent community activity

### Community
- Chat interface
- Discussion forums
- Member directory

## Interaction Patterns

### Micro-interactions
- Button hover/focus states
- Form field focus and validation feedback
- Loading indicators
- Transition animations between states

### Animations
- Page transitions (subtle fade/slide)
- Component mounting/unmounting
- Content reveal animations
- Progress celebrations

### Responsive Behaviors
- Mobile: Single column layout, bottom navigation
- Tablet: Two-column layout where appropriate
- Desktop: Multi-column layout with sidebar navigation

## Implementation Guidelines

### Tailwind Implementation
- Use Tailwind for consistent spacing, colors, and typography
- Create component classes for repeated patterns
- Use @apply sparingly and only for complex patterns

```svelte
<!-- Good Tailwind Usage -->
<button class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:ring-2 focus:ring-primary-light focus:outline-none transition-colors">
  Click Me
</button>
```

### Component Architecture

```
src/
  lib/
    components/
      ui/            # shadcn components
        button.svelte
        card.svelte
        input.svelte
      layout/        # Layout components
        header.svelte
        footer.svelte
        sidebar.svelte
      courses/       # Course-specific components
        course-card.svelte
        lesson-player.svelte
      community/     # Community components
        chat-bubble.svelte
        message-list.svelte
```

### Accessibility Checklist
- Semantic HTML structure
- ARIA labels where necessary
- Keyboard navigation support
- Skip to content link
- Color contrast compliance
- Screen reader testing

## Design System Implementation

1. Create a `theme.css` with CSS variables for all design tokens
2. Configure Tailwind to use these variables
3. Implement shadcn components with our theming
4. Create documentation page showing all components

## Resources
- [Figma Design System](https://figma.com/file/example) (to be created)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/svelte Documentation](https://www.shadcn-svelte.com/)
- [WCAG Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)

## Inspiration
- [IKEA Website](https://www.ikea.com/) - Clean, modern Svelte implementation
- [Apple Fitness+](https://www.apple.com/apple-fitness-plus/) - Fitness content presentation
- [Peloton](https://www.onepeloton.com/) - Course structure and community features
