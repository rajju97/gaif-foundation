## 2024-05-24 - [Optimize array iterations in AdminDashboard]
**Learning:** Multiple consecutive `.filter().reduce()` chains on large datasets significantly degrade performance compared to a single `reduce` pass, especially when rendering derived state.
**Action:** Consolidate multiple array operations into a single `reduce` pass returning an accumulator object to minimize iterations. Wrap these operations in `useMemo` where appropriate within React components.
