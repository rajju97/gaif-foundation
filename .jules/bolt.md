## 2024-05-18 - [Admin Dashboard Arrays Optimization]
**Learning:** Sequential `.filter().reduce()` chains over the same large array result in multiple iterations (O(k * n)). In the Admin Dashboard, metrics for revenue, commission, and GST were calculated using three separate passes over the `orders` array.
**Action:** Consolidate multiple array operations into a single `.reduce()` pass returning an accumulator object to minimize iterations. Always wrap derived state operations in `useMemo` to prevent recalculation on every render.
