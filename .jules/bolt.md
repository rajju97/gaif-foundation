## 2024-05-24 - ProductsPage.jsx missing useMemo
**Learning:** Found an opportunity to optimize `ProductsPage.jsx` by wrapping `filteredProducts` in `useMemo` and extracting the loop invariant `.toLowerCase()` string operations outside the filter.
**Action:** Use useMemo for list filtering/sorting and lift invariant string ops outside of loops.
