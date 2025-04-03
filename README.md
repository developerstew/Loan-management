# Loan Management System

A modern full-stack application for managing loans built with Next.js, TypeScript, Tailwind CSS, and Prisma.

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: PostgreSQL with Prisma ORM
- **API**: tRPC
- **Form Handling**: React Hook Form
- **Testing**: Jest, Playwright
- **Package Manager**: pnpm

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up your environment variables:
   Create a `.env` file in the root directory with:

   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/loan_management"
   ```

4. Initialize the database:

   ```bash
   pnpm prisma db push
   ```

5. Run the development server:
   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
│   └── ui/          # shadcn/ui components
├── lib/             # Utility functions and shared logic
├── server/          # Server-side code and API routes
└── types/           # TypeScript type definitions
```

## Features

- Create, view, update, and delete loans
- Track loan status and payments
- User-friendly interface with modern design
- Responsive layout for all devices
- Type-safe API calls with tRPC
- Form validation with React Hook Form
- Database interactions with Prisma ORM

## Development

- Run tests: `pnpm test`
- Run e2e tests: `pnpm test:e2e`
- Format code: `pnpm format`
- Lint code: `pnpm lint`
