# Frontend Decisions

## 1. Filter accessibility and search within filtered results
- **Problem:** The filter controls are not user-friendly because users have to scroll too much to reach and apply filters. Also, when a filter is applied, the search should narrow the already-filtered products rather than search the entire store and ignore the selected filters.
- **Decision:** Keep the search and filter controls together in an easy-to-reach section of the shop page. Treat search, brand, RAM, price ceiling, stock-only, and sorting as controlled React state, and derive the visible products by applying all active criteria together. Search results must respect the currently selected filters. Show removable active-filter chips and a clear-all action.
- **Alternative:** Place filters in a separate advanced-search page and perform search independently across the entire catalogue.
- **Reason:** Users can find products with fewer scrolling and navigation steps, and can refine their current filtered results without losing the selected criteria.
- **Tradeoff:** More filter state and derived filtering logic must be maintained, and the filter section needs responsive layout choices on smaller screens.
- **Code location:** `src/pages/Shop.jsx`, `src/components/ProductCard.jsx`, `src/styles.css`.
- **Evidence to capture:** Apply a brand or RAM filter, then search for a model. Confirm the search only returns products matching the active filter. Capture how the filter controls are positioned and how active filters can be removed individually or cleared.

## 2. Side-by-side phone comparison
- **Problem:** Comparing specifications across separate product pages requires customers to remember details or switch tabs.
- **Decision:** Let users select up to three phones and show their main specifications in one horizontally scrollable comparison table. The selected IDs are shared in the app and persisted in localStorage.
- **Alternative:** Put a long specification list on each product card.
- **Reason:** A comparison table makes differences visible at the same time while keeping cards readable.
- **Tradeoff:** The table needs horizontal scrolling on small screens, and the three-phone limit keeps it manageable.
- **Code location:** `src/App.jsx`, `src/pages/Compare.jsx`, `src/components/ProductCard.jsx`.
- **Evidence to capture:** Select three phones, open Compare, inspect differences, then remove one selection.

## 3. Structured product information
- **Problem:** Important details such as specifications, price, stock, and delivery conditions can be difficult to scan when scattered.
- **Decision:** Use a concise card summary and a dedicated details route with price and stock near the purchase action, delivery terms nearby, and a labelled specification table below.
- **Alternative:** Put every specification directly on the product listing card.
- **Reason:** Customers can scan the catalogue quickly, then inspect full details before adding a product.
- **Tradeoff:** The customer takes one extra navigation step to see all specifications.
- **Code location:** `src/components/ProductCard.jsx`, `src/pages/ProductDetails.jsx`, `src/styles.css`.
- **Evidence to capture:** Compare a listing card with the details page at desktop and mobile widths; show the labelled specification table and stock/delivery status.
