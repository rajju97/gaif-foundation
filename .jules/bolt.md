## 2024-06-13 - [Consolidating Array Iterations]
**Learning:** Sequential `.filter().reduce()` chains for deriving multiple metrics (revenue, commission, GST) from a single dataset (`orders`) cause redundant O(N) array traversals, which scales poorly for large lists. Wrapping this in `useMemo` prevents it from running on every component re-render.
**Action:** Consolidate multiple array operations into a single `.reduce()` pass returning an accumulator object, and wrap the calculation in `useMemo` to cache the results unless dependencies change.
