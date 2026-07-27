## 2024-06-12 - Consolidate Multiple Array Iterations into Single Pass
**Learning:** Performing multiple chained `.filter().reduce()` operations on the same large array to derive different metrics (like revenue, commission, and GST) is highly inefficient, as it iterates over the entire array multiple times.
**Action:** Consolidate multiple array derivations into a single `.reduce()` pass that returns an accumulator object containing all the needed metrics, and wrap it in `useMemo` to prevent re-computation on every render.
