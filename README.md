# Hilbert Financial - Onboarding Demo

A visually stunning, full-screen onboarding experience inspired by modern SaaS design, built with Next.js, React, and Tailwind CSS.

## Features

🚀 **Modern Welcome Page**
- Classy-inspired design with hero section
- Trust indicators and testimonials
- Interactive call-to-action buttons
- Professional branding and visual hierarchy

✨ **Full-Screen Onboarding Flow**
- Clean, distraction-free interface
- Enhanced progress tracking with animations
- Smooth page transitions
- Professional form layouts

🎨 **Modern UI Design**
- Purple/blue color scheme matching Classy theme
- Rounded corners and modern typography
- Subtle shadows and hover effects
- Responsive design for all devices
- Beautiful micro-interactions

📝 **Comprehensive Forms**
- Client selection with searchable dropdowns
- Account and product management
- Bank account integration
- Suitability and appropriateness confirmations
- Tax year selection with validation

🔧 **Technical Stack**
- Next.js 14.2.32 with App Router
- TypeScript for type safety
- Tailwind CSS with custom design system
- Framer Motion for smooth animations
- Heroicons for consistent iconography

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
onboarding-demo/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── Layout.tsx        # Main layout with sidebar
│   ├── OnboardingFlow.tsx # Multi-step form flow
│   ├── UserDetailsForm.tsx # User details form
│   └── ConfirmationStep.tsx # Review and confirmation
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind configuration
└── tsconfig.json         # TypeScript configuration
```

## Form Steps

1. **User Details** - Client, account, and product selection
2. **Bank Details** - Bank account management and compliance
3. **Confirmation** - Review all details before submission
4. **Complete** - Success confirmation

## Styling Features

- Custom CSS components for consistent styling
- Hover effects and transitions
- Loading states and animations
- Responsive grid layouts
- Professional color scheme

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Customization

The application is designed to be easily customizable:

- **Colors**: Update the color scheme in `tailwind.config.js`
- **Animation**: Modify animation settings in the CSS and Framer Motion components
- **Form Fields**: Add or remove fields in the form components
- **Styling**: Update component styles in `globals.css`

---

Built with ❤️ using Next.js and React
