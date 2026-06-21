
## 2024-03-01 - Consolidate Array Operations
**Learning:** Multiple consecutive array passes (like chaining multiple filters and reducers) on large dynamic collections in React components cause repetitive O(N) operations and unnecessary execution time.
**Action:** Consolidate multiple metrics calculations derived from the same array (such as revenue, commission, and GST from an orders array) into a single `reduce` pass returning an object, and wrap it in `useMemo` to minimize iterations and execution overhead on re-renders.
