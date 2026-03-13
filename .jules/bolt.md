
## 2024-11-20 - [Optimize ProductsPage rendering with useMemo]
**Learning:** Wrapping derived list states (e.g., filtering and sorting logic) in `useMemo` prevents synchronous main-thread blocking, which improves rendering performance. Furthermore, extracting invariant computations (like `.toLowerCase()`) outside iteration loops minimizes the per-item overhead.
**Action:** When rendering product catalogs or extensive lists, always implement `useMemo` for filtering and sorting, and ensure invariant calculations are done prior to array iteration logic.
