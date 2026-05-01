
## $(date +%Y-%m-%d) - Optimize string operations in filter loops
**Learning:** In React components dealing with catalog filtering (like `ProductsPage.jsx`), calling `.toLowerCase()` on state variables (like `searchQuery`) inside the `.filter()` loop results in redundant O(N) operations.
**Action:** Extract invariant string transformations and logical checks outside the loop, and wrap the entire derived data computation in `useMemo` to prevent recalculation on unrelated re-renders (like opening a mobile sidebar).
