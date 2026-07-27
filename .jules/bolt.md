
## 2024-06-20 - [Performance] Consolidate multiple array operations into a single reduce pass
**Learning:** In React components dealing with large datasets (like `orders` in AdminDashboard), running multiple `.filter().reduce()` operations concurrently sequentially is inefficient (O(N*M) where M is number of stats). A single pass reduce reduces this to O(N).
**Action:** Always look for sequential `.filter().reduce()` chains operating on the same array and combine them into a single `.reduce()` pass returning an accumulator object, wrapping the logic in `useMemo` to prevent recalculation on re-renders.
