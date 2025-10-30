# 🎭 EGO Web App

A mobile-first interactive web application for the EGO event, featuring two engaging games designed to break the ice and connect people.

## ✨ Visual Improvements

### Design Enhancements

#### 🎨 **Color System**

- **Deep Black** (`#000000`) - Main background with radial gradients
- **Gold** (`#d4af37`) - Premium accents and highlights
- **Fire Orange** (`#f16b06`) - Action buttons and energy
- **Vital Yellow** (`#fabf3c`) - Cards and interactive elements
- **White** (`#FFFFFF`) - Clean, readable text

#### 🎬 **Smooth Animations**

- **Fade In/Out**: Smooth entrance animations for all components
- **Scale & Float**: Logo and emoji animations with gentle floating effects
- **Shimmer & Glow**: Dynamic light effects on cards and buttons
- **Bounce**: Attention-grabbing chevron animation
- **Celebrate**: Success state animations with rotation and scale
- **Hover Effects**: Interactive feedback on all clickable elements

#### 🧩 **Reusable Components**

**Button Component** (`src/components/ui/Button.jsx`)

- Three variants: `primary`, `secondary`, `outline`
- Ripple effect on focus
- Pulse animation option
- Smooth hover transitions with shadow effects

**Card Components** (`src/components/ui/Card.jsx`)

- `Card`: Base card with hover effects and optional glow
- `Panel`: Enhanced card with gradient backdrop
- `Container`: Responsive container with max-width

**Input Components** (`src/components/ui/Input.jsx`)

- `Input`: Enhanced text input with focus states
- `Select`: Styled dropdown with smooth transitions
- `Label`: Consistent label styling

### Page-Specific Improvements

#### 🏠 **Landing Page**

- Full-screen viewport with radial gradient background
- Animated pattern overlay
- Logo integration with glow effect
- Floating animation on logo
- Gradient text title
- Interactive chevron with smooth scroll functionality
- Staggered animation entrance

#### 🎮 **Game Menu**

- Two-column responsive grid
- Enhanced gradient cards with shimmer effects
- Hover animations: scale, float, and border glow
- Card descriptions for better context
- Improved emoji presentation
- Smooth transitions between states

#### 💥 **Sticker Match Game**

- Enhanced code display with monospace font
- Animated emoji with pulse effect
- Improved form styling with better focus states
- Success state with celebration animation
- Error feedback with clear messaging
- Info box with example code
- Smooth transitions between states

#### 🍹 **Zodiac Game**

- Complete 12-sign zodiac data
- Enhanced result cards with sparkle animation
- Shimmer background effect
- Better content organization (Challenge vs Phrase)
- Emoji integration for each sign
- Smooth card transitions
- Empty state with contextual message

#### 🔙 **Game Page**

- Sticky header with backdrop blur
- Enhanced back button
- Consistent background treatment
- Improved not-found state

### 📱 **Mobile-First Features**

- Responsive breakpoints for different screen sizes
- Touch-optimized tap targets (min 44x44px)
- Smooth scroll behavior
- Tap highlight removal for cleaner UX
- Optimized font sizes for mobile readability
- Flexible layouts that adapt to screen width

### ♿ **Accessibility**

- Semantic HTML structure
- ARIA labels on interactive elements
- Focus-visible states with outline
- Reduced motion support for users who prefer less animation
- Keyboard navigation support
- High contrast color combinations

### 🎨 **Advanced CSS Features**

- Custom scrollbar styling
- CSS gradients (linear and radial)
- Backdrop filters for frosted glass effect
- CSS animations with cubic-bezier easing
- Pseudo-elements for decorative effects
- CSS variables for consistent theming
- Optimized autofill styling

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Tech Stack

- **React 18** - UI library with Hooks
- **React Router DOM** - Client-side routing
- **Styled Components** - CSS-in-JS with theming
- **Vite** - Fast build tool and dev server

## 🎯 Features

### Sticker Match

- Random code generation (4-character alphanumeric)
- Random emoji "sticker" assignment
- Match validation system
- Icebreaker question on successful match
- Real-time error feedback

### Tu Trago del Destino

- Complete 12-sign zodiac system
- Multiple phrases/challenges per sign
- Rotating content on re-selection
- Animated result cards
- Challenge vs Phrase categorization

## 🎨 Animation Philosophy

All animations follow these principles:

- **Purposeful**: Each animation serves a UX purpose
- **Smooth**: 60fps performance with hardware acceleration
- **Accessible**: Respects `prefers-reduced-motion`
- **Delightful**: Adds personality without being distracting

## 📱 Responsive Breakpoints

```css
Mobile: < 480px (base styles)
Tablet: 480px - 768px
Desktop: > 768px
Max Content Width: 720px
```

## 🎭 Component Architecture

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   └── Input.jsx
│   ├── Landing.jsx
│   ├── GameMenu.jsx
│   ├── StickerMatch.jsx
│   └── ZodiacGame.jsx
├── pages/
│   ├── Home.jsx
│   └── Game.jsx
├── assets/
│   └── logo-ego.png
├── colors.js         # Color palette constants
├── App.jsx           # Router configuration
├── main.jsx          # App entry point
└── index.css         # Global styles
```

## 💡 Usage Tips

1. **Logo Customization**: Replace `/src/assets/logo-ego.png` with your logo
2. **Color Adjustments**: Modify `/src/colors.js` for theme changes
3. **Animation Control**: Adjust keyframes in component files
4. **Add More Signs**: Extend `zodiacData` in `ZodiacGame.jsx`
5. **Custom Icebreakers**: Add more questions in `StickerMatch.jsx`

## 🎉 What's New

- ✅ Integrated actual logo from assets
- ✅ Created reusable Button, Card, and Input components
- ✅ Added smooth animations throughout
- ✅ Enhanced visual hierarchy with gradients
- ✅ Improved hover and focus states
- ✅ Added all 12 zodiac signs with rich content
- ✅ Implemented accessibility features
- ✅ Optimized for mobile-first experience
- ✅ Added smooth scroll behavior
- ✅ Enhanced typography and spacing

## 🔮 Future Enhancements

- Add loading states for better UX
- Implement localStorage for session persistence
- Add sound effects for interactions
- Create share functionality for zodiac results
- Add dark/light theme toggle
- Implement progressive web app (PWA) features
- Add analytics tracking

---

**Built with ❤️ for EGO**
