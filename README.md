# DocBook - Appointment Booking System

A production-ready appointment booking system built with Next.js 16, featuring multi-clinic support, payment processing, and real-time notifications.

## Features

- 🏥 **Multi-Clinic Support** - Doctors can work at multiple locations
- 💳 **Payment Integration** - Stripe-powered payment processing
- 📧 **Smart Notifications** - Email, SMS, and push notifications
- 🔐 **Secure Authentication** - NextAuth.js with role-based access control
- 📊 **Comprehensive Dashboards** - For patients, doctors, and admins
- 🤖 **AI Features** - Symptom checker and wearable device integration

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp env.example .env
# Edit .env with your database URL and secrets

# Generate Prisma Client
npm run db:generate

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

Visit `http://localhost:3000`

## Environment Variables

Required variables in `.env`:

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"
ENCRYPTION_KEY="your-encryption-key"
```

Optional for full functionality:
- `STRIPE_SECRET_KEY` - Payment processing
- `SENDGRID_API_KEY` - Email notifications
- `TWILIO_*` - SMS notifications

## Project Structure

```
src/
├── app/              # Next.js pages and API routes
├── components/       # React components
└── lib/
    ├── services/     # Business logic
    ├── validations.ts # Input validation
    └── encryption.ts  # Security utilities
```

## User Roles

- **Patient** - Book appointments, view history, manage payments
- **Doctor** - Manage appointments, access patient records
- **Admin** - System management, user administration, analytics

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run db:generate  # Generate Prisma Client
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Prisma Studio
```

## Documentation

- `PRODUCTION_SETUP.md` - Detailed setup guide
- `ENHANCEMENTS.md` - Feature documentation
- `walkthrough.md` - Complete feature walkthrough

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js
- **Payments**: Stripe
- **Styling**: Tailwind CSS + shadcn/ui
- **Validation**: Zod

## License

MIT
# antigravity-doc-book-system-next
