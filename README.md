# Loan Management System

A modern full-stack application for managing loans built with Next.js, TypeScript, Tailwind CSS, and Prisma.

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: Supabase (PostgreSQL) with Prisma ORM
- **Authentication**: Supabase Auth
- **Form Handling**: React Hook Form
- **Data Fetching**: React Query
- **Testing**: Jest
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
   NEXT_PUBLIC_SUPABASE_URL="your-supabase-project-url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
   DATABASE_URL="your-supabase-pooler-connection-string"
   DIRECT_URL="your-supabase-direct-connection-string"
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

## Development

- Run tests: `pnpm test`
- Format code: `pnpm format`
