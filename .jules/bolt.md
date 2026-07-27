## 2024-06-03 - O(N) single-pass calculation for Admin metrics
**Learning:** Consolidating multiple array operations (like sequential `filter` and `reduce`) into a single `reduce` pass returning an accumulator object minimizes iterations. Wrap these operations in `useMemo` where appropriate within React components to optimize calculations.
**Action:** Always verify calculations like total revenue, commission, and GST. When there are multiple map/filter/reduce loops iterating over the same dataset, consolidate them into one pass using an accumulator object within `useMemo`.
