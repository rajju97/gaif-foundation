## 2024-06-12 - [Consolidate Array Iterations]
**Learning:** Multiple sequential `filter` and `reduce` operations on the same array to calculate distinct but related metrics (e.g., revenue, commission, gst from orders) cause unnecessary performance overhead (N+N+N loops).
**Action:** Consolidate multiple array operations into a single `reduce` pass returning an accumulator object, and wrap the calculation in a `useMemo` hook to prevent redundant calculations across re-renders. This is particularly effective for large datasets.
