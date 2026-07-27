
## 2024-11-14 - [AdminDashboard Optimization]
**Learning:** O(N) optimizations involving React state are especially potent when calculating multiple derived metrics (like revenue, commission, and taxes) concurrently in a single `.reduce()` pass and memoizing the result with `useMemo`.
**Action:** When seeing multiple `.filter().reduce()` chains operating on the same large array, consolidate them into a single pass returning an object to avoid redundant iterations and re-renders.
