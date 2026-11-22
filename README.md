# TechNest — React Smartphone Store

TechNest is an online store that sells smartphones from various brands.
It provides a user-friendly interface for browsing, searching, filtering, and comparing mobile phones.
Users can view product details, add phones to their cart, and complete the checkout process.

## Features

- Responsive home page and smartphone catalogue with 12 local product records.
- Search across product name, brand, description, and chipset.
- Combined brand, RAM, maximum-price, and in-stock filters; visible active filters and clear-all.
- Sorting by featured, price, rating, and name.
- Parameterized product detail route (`/product/:id`) with structured specifications and availability.
- Side-by-side comparison for up to three phones.
- Shared cart state, quantity controls, simulated checkout, field validation, calculated order summary, and confirmation.
- Cart, comparison selection, and last order persisted in `localStorage`.
- Loading state, empty search state, unavailable stock state, invalid product route, fallback product images, and a labelled catalogue-load failure demonstration control with retry.
- Three reusable business-rule functions and Node's built-in tests.

## Requirements

- Node.js 18+ recommended
- npm

## Install and run

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Tests

```bash
npm test
# or
node --test
```

## Routes

| Route           | Purpose                                   |
| --------------- | ----------------------------------------- |
| `/`             | Home and featured phones                  |
| `/shop`         | Search, filter, sort and browse           |
| `/product/:id`  | Product details                           |
| `/compare`      | Compare up to three selected phones       |
| `/cart`         | Change quantities and review totals       |
| `/checkout`     | Validated simulated delivery form         |
| `/confirmation` | Confirmation for the last simulated order |

## Business rules

1. **Availability / capacity:** Each product has a stock count. Users cannot add or increase a quantity beyond available stock.
2. **Eligibility / quantity limit:** A maximum of five units of one phone can be ordered in a single order. Quantity must be an integer from 1 to 5 and cannot exceed stock.
3. **Pricing / fulfilment:** Standard delivery costs Rs. 250. Delivery is free when the subtotal is at least Rs. 200,000. The threshold and fee are displayed in product details and the order summary.

The same rule functions are in `src/utils/businessRules.js`. Tests cover valid quantity, the exact maximum, an invalid quantity above the maximum, insufficient stock, free-delivery boundary, and comparison capacity. The shop filter panel includes a labelled control to demonstrate a catalogue load failure; the error screen offers retry.

## Reference problems addressed

1. **Product discovery / filters:** The shop combines live search, brand, RAM, price, and stock filters; filter changes work together and active filters can be individually removed or cleared.
2. **Product comparison:** Users can select up to three products and inspect their core specifications in one comparison table.
3. **Information organization:** Product details are grouped into a clear specification table, price, stock status, and delivery information. Product cards also show key summary details.

## Project structure

```text
technest/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── DECISIONS.md
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── components/
│   ├── data/products.js
│   ├── pages/
│   ├── utils/businessRules.js
│   ├── utils/businessRules.test.js
│   └── styles.css
└── .gitignore
```

## Notes and limitations

- All orders are simulated in the browser. No backend, account system, payment gateway, or real order processing is included.
- Product details, prices, ratings, and stock are sample data for the project and should not be treated as current market information.
- Product images are remotely loaded illustrative images. Internet access may be required for them; a placeholder is used if an image fails.
- `localStorage` is browser-local and can be cleared by the user.
- For deployment with Vite, configure the host to serve `index.html` as a fallback for nested routes (SPA rewrite). The app uses `BrowserRouter`. Run `npm install` to generate the platform-specific `package-lock.json` before committing/deploying if one is not already present.
- This project uses React, React Router, Vite, authored CSS, and no component library or ready-made template.

## Concept map

| Concept                            | Location                                                      |
| ---------------------------------- | ------------------------------------------------------------- |
| Components, props and callbacks    | `src/components/`, `src/pages/`                               |
| React state and functional updates | `src/App.jsx`, `src/pages/Shop.jsx`, `src/pages/Checkout.jsx` |
| Routing and URL parameters         | `src/App.jsx`, `src/pages/ProductDetails.jsx`                 |
| Derived values                     | `src/pages/Cart.jsx`, `src/pages/Checkout.jsx`                |
| Effects and localStorage           | `src/App.jsx`                                                 |
| Business rules                     | `src/utils/businessRules.js`                                  |
| Automated tests                    | `src/utils/businessRules.test.js`                             |
| Responsive design and focus states | `src/styles.css`                                              |

## Accessibility

Semantic headings, labels, native form controls, action buttons, navigation links, keyboard-operable controls, visible focus outlines, alternative text for product images, and text labels alongside stock status are included. Test at 390px and 1280px viewport widths.
