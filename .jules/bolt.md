## 2023-10-27 - [Consolidating array passes for derived metrics]
**Learning:** Performing multiple chained `filter().reduce()` passes to compute concurrent metrics (like revenue, commission, and GST) from a single dataset results in O(N*M) iterations. In this codebase, doing so blocks the main thread noticeably on larger order histories.
**Action:** Always consolidate related metric calculations into a single `reduce` pass returning an accumulator object, and memoize it in React to prevent recalculation on unrelated re-renders.
