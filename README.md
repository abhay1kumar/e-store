# E-Commerce Store

A modern, fully-functional e-commerce website built with React, TypeScript, Redux Toolkit, and Tailwind CSS.

## Features

### 🏠 **Home Page**
- Premium hero section with clean design
- Trending products showcase
- Categories display
- Featured collections
- Newsletter subscription

### 🛍️ **Products Page**
- Grid/List view toggle
- Advanced filtering (price, category, rating, brand, stock)
- Search functionality with live filtering
- Multiple sorting options (price, rating, popularity, latest)
- Responsive design

### 📱 **Product Details**
- High-quality product images with gallery
- Detailed product information and specifications
- Add to cart with quantity selection
- Wishlist functionality
- Customer ratings and reviews display

### 🛒 **Shopping Cart**
- Add/remove items
- Quantity management
- Real-time total calculation
- Persistent cart state

### 💳 **Checkout Process**
- Complete checkout form
- Order summary
- Secure payment simulation
- Order confirmation

### ❤️ **Wishlist**
- Save favorite products
- Easy wishlist management
- Quick add to cart from wishlist

### 🎨 **UI/UX Features**
- Dark/Light theme toggle
- Fully responsive mobile-first design
- Modern, clean interface
- Smooth animations and transitions
- Professional component library

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Development**: ESLint, TypeScript

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── layout/          # Layout components (Navbar, Footer)
│   ├── ui/              # Basic UI components (Button, Card)
│   └── ProductCard.tsx  # Product display component
├── pages/               # Route-based page components
│   ├── HomePage.tsx
│   ├── ProductsPage.tsx
│   ├── ProductDetailPage.tsx
│   ├── CartPage.tsx
│   ├── CheckoutPage.tsx
│   ├── WishlistPage.tsx
│   └── NotFoundPage.tsx
├── redux/               # State management
│   ├── slices/          # Redux slices
│   └── store.ts         # Redux store configuration
├── data/                # Mock data
│   ├── products.json
│   └── categories.json
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── App.tsx              # Main application component
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features in Detail

### State Management
- **Products**: Manages product catalog and categories
- **Cart**: Handles shopping cart operations
- **Filters**: Controls product filtering and sorting
- **Theme**: Manages dark/light theme
- **Wishlist**: Handles favorite products

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Optimized for all screen sizes

### Performance Optimizations
- Lazy loading of images
- Memoized components and selectors
- Efficient re-renders with Redux Toolkit
- Optimized bundle size with Vite

## Data Structure

### Product Schema
```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  rating: number;
  reviewCount: number;
  stock: number;
  tags: string[];
  featured: boolean;
  trending: boolean;
  brand: string;
  specifications?: Record<string, string>;
}
```

## Customization

### Adding New Products
Edit `src/data/products.json` to add new products following the schema above.

### Adding New Categories
Edit `src/data/categories.json` to add new product categories.

### Styling
- Modify `tailwind.config.js` for theme customization
- Update color scheme in the config file
- Add custom components in `src/components/ui/`

### Adding New Features
1. Create new Redux slices in `src/redux/slices/`
2. Add new pages in `src/pages/`
3. Update routing in `src/App.tsx`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Images from Unsplash
- Icons from Lucide React
- UI inspiration from modern e-commerce platforms

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
