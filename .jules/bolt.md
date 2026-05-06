
## 2024-05-06 - [Products List Optimization]
**Learning:** O(n) array operations on derived state like product catalogs can become a bottleneck when rendering if not wrapped in `useMemo`, and operations like string transformation (e.g., `toLowerCase()`) should be extracted out of the loops to avoid redundant computations on every iteration.
**Action:** Always wrap derived filtering/sorting logic in `useMemo` for lists in React, and extract loop-invariant string operations (like standardizing query cases) prior to `filter` passes to reduce overhead.
