## 2024-06-29 - O(N) Consolidation in AdminDashboard

**Learning:** Deriving multiple aggregate metrics (like revenue, commission, and GST) from the same data array using chained `.filter().reduce()` for each metric causes redundant array iterations, degrading performance linearly as data grows.
**Action:** When calculating concurrent metrics from an array, use a single `.reduce()` pass that accumulates an object containing all required metrics. Wrap the calculation in `useMemo` to prevent recalculation on unrelated re-renders. This changes time complexity from O(3N) to O(N).
