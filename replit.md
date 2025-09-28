# OneID Identity Protection Landing Page

## Overview

This is a React-based landing page application for an identity protection service called "OneID" or "trueLinQ". The application is designed as a security-focused marketing website that emphasizes trust, protection, and user empowerment. It features a modern, responsive design with a focus on conversion optimization and user engagement. The project serves as a comprehensive identity protection service landing page with fraud alerts, scam warnings, and consumer protection features.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, built using Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with a custom design system based on shadcn/ui components
- **Component Library**: Radix UI primitives for accessible, unstyled components
- **Design System**: Custom color palette with security-focused branding (Deep Security Blue, Trust Navy, Clean White)
- **Responsive Design**: Mobile-first approach with consistent spacing units and typography scales
- **State Management**: TanStack Query for server state management and React Hook Form for form handling

### Backend Architecture
- **Server Framework**: Express.js with TypeScript
- **API Design**: RESTful API structure with `/api` prefix for all endpoints
- **Middleware**: Request logging, JSON parsing, and error handling middleware
- **Development Server**: Vite development server integration with HMR support

### Database Architecture
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL with Neon serverless database provider
- **Schema Management**: Code-first approach with Drizzle schema definitions
- **Migration System**: Drizzle Kit for database migrations and schema management
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development

### Authentication & Security
- **User Management**: Basic user schema with username/password authentication
- **Session Management**: PostgreSQL session store using connect-pg-simple
- **Data Validation**: Zod schemas for runtime type validation
- **Security Headers**: CORS and security middleware for API protection

### Development Tooling
- **Build System**: Vite for frontend builds, esbuild for backend compilation
- **Type Safety**: Comprehensive TypeScript configuration with strict mode
- **Code Quality**: ESM modules throughout the codebase
- **Hot Reload**: Vite HMR for instant development feedback

## External Dependencies

### Core Frameworks & Libraries
- **React**: Frontend UI library with TypeScript support
- **Express.js**: Backend web framework for API development
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework

### Database & ORM
- **Drizzle ORM**: Type-safe database toolkit
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver
- **connect-pg-simple**: PostgreSQL session store for Express

### UI Components & Design
- **Radix UI**: Comprehensive set of accessible React components
- **shadcn/ui**: Design system built on Radix UI primitives
- **class-variance-authority**: Utility for component variant management
- **Lucide React**: Icon library for consistent iconography

### Form Handling & Validation
- **React Hook Form**: Performant form library with minimal re-renders
- **@hookform/resolvers**: Validation resolvers for React Hook Form
- **Zod**: TypeScript-first schema validation library
- **drizzle-zod**: Integration between Drizzle ORM and Zod schemas

### Data Fetching & State Management
- **TanStack Query**: Powerful data synchronization for React
- **date-fns**: Modern JavaScript date utility library

### Development & Build Tools
- **TypeScript**: Static type checking and enhanced developer experience
- **PostCSS**: CSS processing with autoprefixer
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **nanoid**: Unique ID generation utility

### Hosting & Infrastructure
- **Replit**: Development and hosting platform
- **Neon**: Serverless PostgreSQL database provider
- **Google Fonts**: Web font delivery (Inter font family)