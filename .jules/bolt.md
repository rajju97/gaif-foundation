## 2024-10-25 - [Optimize Order Metrics Calculation]
**Learning:** Consolidating multiple array operations (like sequential `filter` and `reduce`) into a single `reduce` pass returning an accumulator object minimizes iterations and improves performance.
**Action:** When deriving multiple categorized results or concurrent metrics from a single large array, wrap these operations in a single `reduce` pass and use `useMemo` where appropriate within React components to avoid re-calculating on every re-render.
