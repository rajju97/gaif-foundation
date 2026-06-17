
## 2024-06-17 - Consolidating Array Operations with useMemo
**Learning:** When calculating multiple metrics (e.g., revenue, commission, GST) from a single dataset like an array of orders, performing separate `filter` and `reduce` operations for each metric results in redundant O(N) traversals. This can cause unnecessary performance bottlenecks, especially with large datasets on the dashboard.
**Action:** Consolidate these operations into a single `reduce` pass that returns an accumulator object containing all metrics. Wrap this in a `useMemo` hook to ensure the calculation only runs when the underlying data changes, significantly improving component rendering performance.
