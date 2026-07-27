
## 2024-05-24 - [Optimize calculation of concurrent metrics]
**Learning:** When calculating multiple distinct derived metrics (e.g., revenue, commission, GST) from a single large array (like `orders`), performing sequential `filter` and `reduce` operations for each metric results in multiple O(n) array iterations. This can become a performance bottleneck in high-frequency rendering components like React dashboards.
**Action:** Consolidate multiple sequential `filter` and `reduce` passes into a single `reduce` operation that returns an accumulator object containing all concurrent metrics. Wrap this consolidated operation in `useMemo` where appropriate within React components to prevent redundant recalculations on unrelated state updates.
