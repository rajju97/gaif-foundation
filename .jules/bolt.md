
## 2024-05-24 - [Consolidating React Derivations]
**Learning:** Multiple array traversals (e.g., `filter(...).reduce(...)` chains) for calculating derived metrics in React components can cause significant performance degradation (O(N * M)) as the dataset scales.
**Action:** When deriving multiple related aggregate metrics from the same array, always consolidate them into a single `reduce` pass returning an accumulator object and wrap it in `useMemo` to prevent redundant O(N) recalculations on every re-render.
