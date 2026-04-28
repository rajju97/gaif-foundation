## 2024-05-18 - Memoizing Filter/Sort Derived State
**Learning:** In product catalogs or list views, recalculating filtered/sorted arrays on every render (e.g. from UI state changes like sidebar toggles) can cause jank on large datasets. Additionally, `toLowerCase()` string operations inside the filter loop add unnecessary overhead.
**Action:** Always wrap derived filtering/sorting logic in `useMemo` with minimal dependencies, and extract invariant loop operations like string `.toLowerCase()` conversions outside the `.filter` callback to improve rendering performance.
