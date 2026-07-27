## 2024-10-24 - Consolidate array operations in Admin Dashboard
**Learning:** Consolidating multiple array operations (like sequential `filter` and `reduce`) into a single `reduce` pass returning an accumulator object significantly improves performance, especially when deriving multiple categorized results or concurrent metrics from a single large array.
**Action:** Wrap these consolidated operations in `useMemo` within React components to avoid recalculations on every render.
