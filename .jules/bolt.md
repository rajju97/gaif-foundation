## 2024-05-24 - [Optimize Admin Dashboard Stats]
**Learning:** Consolidating multiple array iterations and memoizing the results is highly effective for performance.
**Action:** Use single `reduce` passes wrapped in `useMemo` to compute multiple metrics from a single array.
