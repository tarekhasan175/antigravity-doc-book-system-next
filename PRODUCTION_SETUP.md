# Production Setup Guide

## Prerequisites
- PostgreSQL installed locally or cloud database (e.g., Neon, Supabase, Railway)
- Node.js 18+ installed

## Step 1: Database Setup

### Option A: Local PostgreSQL
```bash
# Install PostgreSQL (if not installed)
# macOS: brew install postgresql
# Ubuntu: sudo apt-get install postgresql

# Create database
createdb docbook_db

# Set DATABASE_URL in .env
DATABASE_URL="postgresql://user:password@localhost:5432/docbook_db"
```

### Option B: Cloud Database (Recommended)
1. Sign up for [Neon](https://neon.tech) or [Supabase](https://supabase.com)
2. Create a new project
3. Copy the connection string
4. Add to `.env` file

## Step 2: Environment Variables

Create a `.env` file in the project root:

```bash
# Copy from env.example
cp env.example .env
```

Edit `.env` and set:

```env
# Required
DATABASE_URL="your-postgresql-connection-string"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="run: openssl rand -base64 32"

# Generate encryption key
# Run: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
ENCRYPTION_KEY="your-64-char-hex-string"
```

## Step 3: Database Migration

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Seed database with sample data
npx prisma db seed
```

## Step 4: Verify Setup

```bash
# Check database connection
npx prisma studio

# This opens a GUI at http://localhost:5555
```

## Step 5: Run Application

```bash
npm run dev
```

## What's Been Implemented

### ✅ Phase 1: Database & Authentication
- Prisma schema with all models (User, Patient, Doctor, Appointment, etc.)
- NextAuth.js with credentials provider
- Role-based access control (ADMIN, DOCTOR, PATIENT)
- Protected routes with middleware

### ✅ Phase 2: API Layer
- Server actions for booking, canceling, rescheduling appointments
- Conflict detection to prevent double-bookings
- Zod validation schemas for all inputs

### ✅ Phase 3: Security
- AES-256-GCM encryption for sensitive data
- Audit logging for all critical actions
- Password hashing with bcrypt

## Next Steps (Optional)

### Rate Limiting
```bash
npm install @upstash/ratelimit @upstash/redis
```
Set up Upstash Redis and add credentials to `.env`

### Error Tracking
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

### Email/SMS Notifications
```bash
npm install @sendgrid/mail twilio
```
Add API keys to `.env`

## Testing

### Create Test User
```typescript
// In Prisma Studio or seed script
{
  email: "admin@test.com",
  password: "hashed-password", // Use bcrypt
  name: "Admin User",
  role: "ADMIN"
}
```

### Test Authentication
1. Navigate to `/auth/signin`
2. Enter credentials
3. Verify redirect based on role

## Troubleshooting

### Database Connection Error
- Verify PostgreSQL is running
- Check DATABASE_URL format
- Ensure database exists

### Migration Errors
```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Force push schema
npx prisma db push --force-reset
```

### NextAuth Errors
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Clear browser cookies

## Production Deployment

### Environment Variables
Ensure all required variables are set in your hosting platform:
- Vercel: Project Settings → Environment Variables
- Railway: Project → Variables
- AWS/Azure: Application Configuration

### Database
- Use connection pooling (PgBouncer)
- Enable SSL for production databases
- Set up automated backups

### Security
- Rotate NEXTAUTH_SECRET regularly
- Use strong ENCRYPTION_KEY
- Enable CORS only for trusted domains
- Set up rate limiting

## Support

For issues or questions:
1. Check Prisma docs: https://www.prisma.io/docs
2. NextAuth docs: https://next-auth.js.org
3. Review implementation_plan.md for architecture details
