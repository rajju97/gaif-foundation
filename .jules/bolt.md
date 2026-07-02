## 2024-07-02 - Optimize Admin Dashboard Metrics Calculation
**Learning:** Multiple sequential `.filter` and `.reduce` operations on large arrays (like `orders`) scale poorly, performing 2N iterations and creating intermediate arrays.
**Action:** Consolidate multiple derived metrics into a single `.reduce` pass that returns an accumulator object, and wrap in `useMemo` to prevent recalculation on every re-render.
