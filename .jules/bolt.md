## 2024-04-08 - Array pass consolidation for derived state
**Learning:** Found multiple instances where the same array (`orders`) was filtered and mapped/reduced over multiple times for derived metrics on dashboards (`AdminDashboard.jsx`, `SellerDashboard.jsx`). This O(K * N) behavior causes unnecessary CPU overhead.
**Action:** Consolidate multiple sequential `filter` and `reduce` operations into a single O(N) `reduce` pass, and wrap the calculation in a `useMemo` hook to prevent recalculation on every React re-render.
