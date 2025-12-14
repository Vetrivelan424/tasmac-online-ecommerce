# TASMAC E-commerce Client

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create .env file:
```bash
cp .env.example .env
```

3. Update .env with your API URL:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start development server:
```bash
npm start
```

The app will open at http://localhost:3000

## Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/         # React components
│   ├── LayoutModule/   # Header, Footer, Navbar
│   ├── ProductModule/  # Product listing and cards
│   ├── CartModule/     # Cart functionality
│   └── CheckoutModule/ # Checkout flow
├── redux/              # Redux store and slices
├── services/           # API services
├── utils/              # Helper functions
├── config/             # Configuration files
├── axios/              # Axios instance
└── styles/             # CSS files
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run dev` - Start with webpack-dev-server

## Features

- Product browsing with filters
- Shopping cart management
- Guest checkout
- Address validation (Tamil Nadu only)
- Multiple payment options
- Order confirmation
- Responsive design

## Technologies

- React 18
- Redux Toolkit
- React Router
- Axios
- Tailwind CSS
- Lucide React Icons
- Webpack 5
