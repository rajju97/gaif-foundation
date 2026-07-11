## 2024-05-24 - Consolidated Array Iteration
**Learning:** Sequential calls to `.filter().reduce()` or `.filter().length` on the same large array cause redundant full iterations. In this codebase, Admin and Seller dashboards were running 3-5 passes over the orders array on every render to derive aggregated metrics, creating a performance bottleneck when order volume grows.
**Action:** Use `useMemo` and a single `.reduce()` pass returning an accumulator object to calculate all necessary metrics or categorizations simultaneously, turning O(K*N) complexity into O(N).
