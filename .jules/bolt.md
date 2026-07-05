## 2024-07-05 - [Admin Dashboard Re-render Optimization]
**Learning:** Found multiple distinct O(N) array filter + reduce chains in `AdminDashboard.jsx` calculating derived metrics (revenue, commission, GST) without any memoization, resulting in heavy recalculations during re-renders, particularly as the `orders` array grows in a production scenario.
**Action:** Consolidate sequential `.filter().reduce()` chains operating on the same array into a single O(N) `.reduce()` pass and wrap the calculation in a `useMemo` hook to prevent redundant execution and improve efficiency.
