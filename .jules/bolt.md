## 2024-05-13 - Performance optimization of array operation in AdminDashboard
**Learning:** Found multiple distinct array `.filter().reduce()` loops iterating over the exact same dataset to extract different aggregations (`revenue`, `commission`, `gst`) on every render.
**Action:** Consolidate multiple simultaneous aggregations over a single dataset into a single `.reduce()` pass returning an accumulator object, and wrap it in `useMemo` when working within React components.
