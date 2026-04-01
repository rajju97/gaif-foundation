## 2024-11-20 - [Optimize Array Operations in AdminDashboard]
**Learning:** Found an opportunity to consolidate multiple array operations (`filter` + `reduce`) into a single `reduce` pass to minimize iterations. This is particularly effective when deriving multiple categorized results from a single source array.
**Action:** Always look for opportunities to consolidate multiple array operations into a single pass. Wrap these operations in `useMemo` where appropriate within React components.
