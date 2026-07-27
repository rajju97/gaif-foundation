## 2024-06-19 - Admin Dashboard Stats Optimization
**Learning:** Found multiple O(N) array iterations computing total revenue, commission, and GST concurrently in `src/pages/AdminDashboard.jsx`. The iterations were performing `filter().reduce()` chained calls inline for each metric, doing redundant passes over the large orders dataset.
**Action:** Consolidate concurrent aggregations on the same dataset into a single `reduce()` pass using an accumulator object. Wrap the calculation in a `useMemo` block to eliminate the calculations on unrelated component renders.
