## 2024-06-18 - [Optimize AdminDashboard Metrics]
**Learning:** Consolidating multiple array operations (like sequential `filter` and `reduce`) into a single `reduce` pass returning an accumulator object minimizes iterations. This avoids O(N*3) array passes when deriving multiple metrics like revenue, commission, and GST from a single dataset.
**Action:** Always wrap these consolidated iterations in `useMemo` where appropriate within React components to prevent unnecessary re-renders.
