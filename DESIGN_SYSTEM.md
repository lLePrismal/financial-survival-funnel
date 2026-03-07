# Financial Survival Funnel - Design System

## Design Philosophy
**"Urgency Meets Clarity"** - A high-contrast, emotionally resonant design that speaks directly to financial anxiety while offering clear pathways to solutions. The design uses bold typography, strategic color blocking, and directional visual cues to create a sense of momentum through the funnel.

## Color Palette

| Name | Color | Usage |
|------|-------|-------|
| **Dark Background** | #1a1a1a | Primary page background |
| **Accent Red** | #FF4444 | Headline callout boxes, urgency signals |
| **Accent Yellow** | #FFD700 | Key benefits, CTAs, emphasis text |
| **Accent Cyan** | #00D9FF | Secondary CTAs, prices, interactive elements |
| **Text White** | #FFFFFF | Body text, primary content |
| **Text Gray** | #CCCCCC | Secondary text, descriptions |
| **Dark Gray Box** | #2a2a2a | Content containers, "What You Get" sections |

## Typography

- **Display Font**: Poppins Bold (700) - Headlines, callout boxes
- **Heading Font**: Poppins SemiBold (600) - Section headers
- **Body Font**: Inter Regular (400) - Body text
- **Accent Font**: Poppins Bold (700) - Emphasis within text

### Hierarchy
1. **Main Headline**: Poppins 700, 2.5rem, white on red background
2. **Subheading**: Poppins 600, 1.5rem, white
3. **Body Text**: Inter 400, 1rem, white
4. **Emphasis**: Poppins 700, inline, yellow or cyan
5. **Small Text**: Inter 400, 0.875rem, gray

## Component Patterns

### Callout Box (Red Headline)
- Background: #FF4444
- Text: White, Poppins Bold
- Padding: 1.5rem
- Border Radius: 1rem
- Box Shadow: 0 10px 30px rgba(255, 68, 68, 0.3)

### Content Container (Dark Gray)
- Background: #2a2a2a
- Text: White
- Padding: 2rem
- Border Radius: 0.75rem
- Border: 1px solid rgba(255, 255, 255, 0.1)

### CTA Button
- **Primary (Yellow)**: #FFD700 background, black text, 1rem padding, rounded
- **Secondary (Cyan)**: #00D9FF background, dark text, 1rem padding, rounded
- **Animated**: Pulse effect, shadow on hover, scale transform
- **Directional Arrows**: Orange (#FF8C00) arrows flanking button

### List Items
- Checkmark: ✓ (white)
- Bullet: • (yellow)
- Icon: Emoji accents (🔥, ⚠️, 📕, 🎵, 👉)

## Layout Principles

1. **Vertical Flow**: Single-column layout optimized for mobile scrolling
2. **Breathing Room**: 3rem+ margin between major sections
3. **Visual Breaks**: Color blocks, emoji, arrows create visual rhythm
4. **CTA Prominence**: Buttons centered, large, with surrounding whitespace
5. **Mobile-First**: All elements scale responsively

## Animation Guidelines

- **Button Hover**: Scale 1.05, shadow intensify
- **Button Pulse**: Subtle pulse animation on load
- **Entrance**: Fade-in on scroll (optional, light touch)
- **Transitions**: 300ms ease-in-out for all interactive elements

## Responsive Design

- **Mobile (< 640px)**: Full-width, 1rem padding, 1.25rem text
- **Tablet (640px - 1024px)**: 2rem padding, 1.5rem text
- **Desktop (> 1024px)**: max-width 900px centered, 2rem padding

## Performance Targets

- **Page Load**: < 2s on 4G
- **First Contentful Paint**: < 1s
- **Lighthouse Score**: > 90
- **Image Optimization**: WebP format, lazy loading

## Accessibility

- **Contrast Ratio**: 7:1 for all text (WCAG AAA)
- **Font Size**: Minimum 16px on mobile
- **Touch Targets**: Minimum 44x44px for buttons
- **Semantic HTML**: Proper heading hierarchy, ARIA labels
