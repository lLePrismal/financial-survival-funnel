# Financial Survival Funnel - Project TODO

## Core Funnel Pages
- [x] Landing Page - Attention-grabbing headline with hook
- [x] Problem Page - Pain point validation
- [x] Free Offer Page - Lead magnet presentation
- [x] Mini Crisis Blueprint - Product page (₱149)
- [x] 24-Hour Reset - Product page (₱199 + ₱99 audio)
- [x] Rebuild Mindset - Premium product page (₱499)
- [x] Final Selection - Choice architecture with all options

## Design & UX
- [x] Dark theme with red/yellow/cyan color system
- [x] Responsive mobile-first design
- [x] Animated CTAs with pulse glow effect
- [x] Centered headlines for visual balance
- [x] Facebook-optimized meta tags
- [x] Fast loading and performance optimization

## Email Capture & Lead Generation
- [x] Email subscribers database schema
- [x] Email capture form component with validation
- [x] Backend API endpoint for email submission (subscribers.capture)
- [x] Download token generation system
- [x] Email gating on Free Offer page
- [x] Success state and download trigger
- [x] Vitest tests for email capture (10 tests passing)

## Backend Infrastructure
- [x] Upgraded to web-db-user template (backend + database + auth)
- [x] Database schema with emailSubscribers table
- [x] Database helper functions (subscribeEmail, markEmailAsDownloaded, getSubscriberByEmail)
- [x] tRPC router with subscribers.capture endpoint
- [x] Zod validation for email input

## Testing & Quality
- [x] TypeScript compilation (0 errors)
- [x] Email capture unit tests (9 tests)
- [x] Auth logout tests (1 test)
- [x] Dev server running and healthy

## Future Enhancements
- [ ] Implement Stripe payment processing for products
- [ ] Add email delivery system (send PDF to captured emails)
- [ ] Create admin dashboard to view subscribers
- [ ] Add email unsubscribe functionality
- [ ] Implement countdown timer for urgency
- [ ] Add exit-intent popup with discount offer
- [ ] Create FAQ section on Final Selection page
- [ ] Add testimonials and social proof
- [ ] Implement scroll progress indicator
- [ ] Add analytics tracking for conversion optimization
- [ ] Create email automation sequences
- [ ] Add SMS notifications for high-value leads

## Email Automation
- [x] Create PDF guide file with survival formula content
- [x] Upload PDF to S3 storage
- [x] Implement email sending service using Manus API
- [x] Create email template for guide delivery
- [x] Update email capture to trigger PDF delivery
- [x] Test email delivery flow end-to-end (18 tests passing)

## Stripe Payment Integration
- [x] Add Stripe feature to project
- [x] Create products database schema (stripeCustomers, stripeOrders tables)
- [x] Build Stripe checkout component (StripeCheckoutButton)
- [x] Update product pages with payment buttons (all 3 products)
- [x] Create payment success page (/payment-success)
- [x] Create payment cancelled page (/payment-cancelled)
- [x] Implement Stripe service with checkout session creation
- [x] Add payment router to tRPC (payment.createCheckout)
- [x] Create webhook handler for payment events
- [x] Add Stripe environment variables to env.ts
- [x] Create Stripe service tests (12 tests)
- [x] TypeScript compilation (0 errors)


## Countdown Timer for Urgency
- [x] Create reusable CountdownTimer component with localStorage persistence
- [x] Add timer to Mini Crisis product page (₱149)
- [x] Add timer to 24-Hour Reset product page (₱199)
- [x] Add timer to Rebuild Mindset product page (₱499)
- [x] Implement warning state when less than 2 hours remaining
- [x] Add expiration state and messaging
- [x] Create countdown timer tests (12 tests)
- [x] Test countdown functionality across all pages
