## 2024-11-20 - Memoizing Catalog Filtering
**Learning:** Product filtering in React components without memoization causes full list recalculations and repeated O(N) string transformations (`toLowerCase`) on every render (e.g., input keystrokes, sidebar toggles), causing significant UI thread blocking on large datasets.
**Action:** Always wrap heavy list transformations (filter/sort) in `useMemo` and extract invariant operations (like standardizing query strings) outside the loop to avoid redundant computation.
