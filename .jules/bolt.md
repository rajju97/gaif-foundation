
## 2024-05-18 - [Consolidating Array Filtering]
**Learning:** Found an anti-pattern where components like AdminDashboard and SellerOrders perform multiple O(n) array `.filter()` and `.reduce()` or `.length` operations per render cycle (e.g., calculating different stats from an orders array). This causes redundant iterations.
**Action:** Consolidate multiple filter/reduce/length passes on large lists into a single `.reduce()` pass returning an object map, and wrap the calculation in `useMemo` to prevent recalculation on unrelated state changes.
