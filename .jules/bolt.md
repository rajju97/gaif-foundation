
## 2024-04-12 - Consolidating Iterations on Render
**Learning:** Found multiple instances where `.filter().reduce()` was called sequentially on the same array during component render (e.g., in AdminDashboard). Also found string operations inside `.filter` callbacks inside renders (in ProductsPage).
**Action:** Always extract static string operations out of `.filter` loops. Consolidate sequential `.filter().reduce()` chains over large datasets into a single `O(N)` pass using `.reduce()` directly, and strictly wrap these operations in `useMemo` to avoid recalculation on every render.
