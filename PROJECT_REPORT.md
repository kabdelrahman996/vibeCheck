# Vibecheck Project Report

## 1. Project Overview

Vibecheck is a modern e-commerce storefront built with Next.js. The application is designed to let users browse fashion products, view curated collections, sign in with Google, manage an account, save items to a cart, and complete checkout.

The project combines a polished storefront experience with account-based functionality and backend persistence through Supabase.

## 2. Project Purpose

The app aims to provide a simple and visually appealing online shopping experience for a fashion brand. Its main goals are to:

- showcase featured products and collections,
- allow product exploration by category and season,
- support user authentication and account pages,
- manage cart and order flow,
- provide a responsive experience across desktop and mobile devices.

## 3. Main Features

- Home page with hero section, category highlights, offers, gallery, and curated product sections
- Product listing pages for categories such as graphic tees, oversized collection, new arrivals, best sellers, and summer collection
- Product detail pages with add-to-cart functionality
- User authentication using Google OAuth
- Account area with profile information, profile update, order history, and order details
- Shopping cart and checkout workflow
- Order creation and persistence through Supabase
- Responsive UI components built with Tailwind CSS

## 4. Technology Stack

### Frontend

- Next.js 16
- React 19
- Tailwind CSS 4
- React Icons
- Sonner for toast notifications

### Backend / Data

- Supabase for database and storage access
- NextAuth for authentication

### Development Tools

- ESLint
- PostCSS
- Node.js / npm

## 5. Project Structure

The project follows a typical App Router structure:

- app/ - main application pages and layouts
  - app/page.js - homepage
  - app/products/ - product listing and detail pages
  - app/cart/ - shopping cart page
  - app/checkout/ - checkout flow
  - app/account/ - authenticated user account pages
  - app/api/ - route handlers and auth endpoints
- app/\_components/ - reusable UI and section components
- app/\_lib/ - server-side API helpers, auth config, and actions
- public/ - static assets and images

## 6. Architecture and Data Flow

### Client and Server Components

The app uses Next.js App Router with a mix of server and client components. Server components handle data fetching, auth checks, and database access, while smaller interactive UI elements are implemented as client components where needed.

### Authentication

Authentication is handled through NextAuth with Google provider support. During sign-in, the app upserts a matching profile in Supabase for the user.

### Database Access

Supabase is used for core business data:

- products
- profiles
- carts
- orders
- order_items

The app uses dedicated API helper modules in app/\_lib/ to abstract these operations.

## 7. Core User Journeys

### Browsing Products

Users can land on the homepage, explore categories, and open individual product pages.

### Adding Items to Cart

From the product detail view, users can add selected items to their cart. Cart data is associated with the authenticated profile.

### Checkout and Orders

Users can review their cart, enter shipping information, and place an order. Order and order item records are then stored in Supabase.

### Account Management

Authenticated users can view and edit their profile information and inspect their previous orders.

## 8. UI / UX Notes

The interface is styled with a warm, modern visual language centered on a fashion e-commerce aesthetic. The app uses a custom design system with a small set of brand colors and typography utilities.

The UI includes:

- strong hero storytelling,
- card-based product displays,
- clear call-to-action buttons,
- responsive layouts for desktop and mobile,
- an account dashboard for personal and order-related actions.

## 9. Environment Requirements

The application depends on environment variables for authentication and database access, including:

- Google OAuth credentials
- Supabase URL and API key

These values are required for the app to run correctly.

## 10. Current Status

The project is a functional e-commerce prototype with a complete browsing, authentication, cart, checkout, and account-management flow. It is well-structured for further expansion, such as:

- payment integration,
- admin product management,
- order status automation,
- search and filtering,
- improved testing coverage.

## 11. Summary

Vibecheck is a polished fashion e-commerce app built with Next.js and Supabase. It provides a modern user experience with authentication, product discovery, cart management, checkout, and profile-based account features. The codebase is organized around reusable components and clear server-side data access layers, making it easy to extend.
