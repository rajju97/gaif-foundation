
## 2024-05-18 - [Optimize Array Iterations for Derived Stats]
**Learning:** Multiple array methods (`.filter()`, `.reduce()`, `.length`) chained or run sequentially on the same large array to derive dashboard metrics (like counts, revenue, commission) result in multiple full iterations over the data (O(m*n)).
**Action:** When deriving multiple metrics from the same dataset in a dashboard, consolidate them into a single `.reduce()` pass returning an accumulator object with all the metrics, and wrap it in a `useMemo` hook to run in O(n) time and avoid unnecessary recalculations on every render.
