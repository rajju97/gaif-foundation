## 2024-05-19 - [Consolidated Reduce Passes]
**Learning:** In the `AdminDashboard.jsx`, the component calculates `totalRevenue`, `commissionCollected`, and `gstCollected` by repeatedly filtering and reducing the `orders` array. This results in three separate O(N) passes over the orders array to sum up these properties, which is inefficient.
**Action:** Consolidate multiple array operations (like sequential `filter` and `reduce`) into a single `reduce` pass to minimize iterations.
