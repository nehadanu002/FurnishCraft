# FurnishCraft – Online Furniture Retail Website

**Project Title:** FurnishCraft: Modern Web Architecture for Online Furniture Retail  
**Developed by:** Indrajeet Kumar

## About the Project

FurnishCraft is a responsive online furniture retail website developed using React. It allows users to explore furniture products, view product details, manage their wishlist, add products to a shopping cart and place demo orders.

The project demonstrates the development of a modern e-commerce frontend with product management, user authentication and a simple checkout workflow.

## Features

- Responsive home page with furniture collections.
- Product listing and product details.
- Product search.
- Add and remove products from wishlist.
- Shopping cart with quantity management.
- Stock availability checks.
- User authentication using Clerk.
- Checkout and demo order placement.
- Order history and order confirmation.
- Local storage for cart, wishlist and order data.

## Technologies Used

- React.js
- Vite
- JavaScript
- Tailwind CSS
- React Router
- Axios
- Clerk Authentication
- SweetAlert2
- Lucide React

## Project Structure

```text
src/
├── components/
├── Context/
├── Hooks/
├── Layout/
├── pages/
├── Routes/
├── App.jsx
├── index.css
└── main.jsx

public/
└── images/
```

## Installation and Setup

1. Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

2. Open the project folder:

```bash
cd FurnishCraft
```

3. Install dependencies:

```bash
npm install
```

4. Configure your Clerk publishable key using the environment variable expected by your application.

5. Start the development server:

```bash
npm run dev
```

6. Open the local URL displayed in the terminal.

## Important Notes

- Product information is loaded from a JSON file.
- Cart, wishlist and order information are stored in browser local storage.
- Checkout is a demonstration workflow; no real payment is processed.
- Clerk is used for user authentication.

## Future Enhancements

- Backend integration and database storage.
- Real payment gateway integration.
- Admin dashboard for product management.
- User-specific wishlist and cart synchronization.
- Order tracking and delivery updates.

## Developer

**Indrajeet Kumar**

FurnishCraft – Modern Web Architecture for Online Furniture Retail.
