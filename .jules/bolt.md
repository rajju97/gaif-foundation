## 2024-04-18 - [Optimize Admin Dashboard order calculations]
**Learning:** Found an inefficiency in how the `AdminDashboard` component calculates aggregate statistics (total revenue, total commission, and total GST). The component originally used chained array operations (`.filter().reduce()`) directly in the component body. This was problematic in two ways:
1. It ran these heavy O(N) array iterations on every single render.
2. It iterated the potentially large `orders` array completely three separate times.
**Action:** Replaced the three separate iterations with a single `useMemo` block that uses a single `for` loop to compute all three aggregates simultaneously. This optimizes both CPU time (single pass instead of three) and prevents recalculation unless the `orders` array actually changes.
