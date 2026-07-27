## 2024-05-24 - [O(N) Reduce Optimization for Stats]
**Learning:** Consolidating multiple array operations (like sequential `filter` and `reduce`) into a single `reduce` pass returning an accumulator object minimizes iterations. This is particularly effective when deriving multiple categorized results or concurrent metrics (e.g., revenue, commission, GST) from a single large array.
**Action:** Wrap these operations in `useMemo` where appropriate within React components to avoid recalculations on every render, and use a single `reduce` pass to build multiple metrics.
