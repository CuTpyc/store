# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting
experience. You can use whatever css framework you prefer. See
the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.


# Ecommerce CMS Technical Task v1.0

## Task Description
Need to create a simple CMS for an e-commerce website.
### The CMS should have the following features:
- Admin User authentication +
- ----
- Admin User roles (Admin, Staff) +
- Admin has full access to all features +
- Staff can create, update, and view products +-
- ----
- Implement a simple product management system -
- Implement a simple product category management system -
- ----
- Implement a simple order management system -
- Implement a simple cart management system -
- ----
- Implement a simple customer management system +-
- Implement a simple customerAddress management system
- ----
- Implement a dashboard for Admin (carts, orders, products, customers) +-

### The store should have the following features:
- Product listing (filter, sort)
- ----
- Customer authentication (register, login, logout)
- Customer page (profile, orders, cart)
- ----
- Cart page (add, remove, checkout)
- Cart modal (quick view, add, remove)
- ----
- Checkout page (shipping, payment)

## Tech Stack
### CMS
- Node.js
- Remix (React)
- PostgreSQL
- Prisma
- Polaris UI (Shopify)
- Modules CSS
- Axios
- Minio (S3)
- Nginx

### Store
- Node.js
- Remix (React)
- PostgreSQL
- Prisma
- Tailwind CSS
