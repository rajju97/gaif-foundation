## 2024-05-24 - ProductsPage Optimization
**Learning:** In React components rendering large lists (like ProductsPage), performing complex operations (like `.toLowerCase()` multiple times) directly inside `.filter()` blocks the main thread synchronously on every render.
**Action:** Extract loop invariant properties (e.g. `const queryLower = searchQuery.toLowerCase()`) outside of the loop and wrap the entire expensive `.filter()` and `.sort()` operations inside a `useMemo()` hook. This avoids redundant and expensive loop computations.
