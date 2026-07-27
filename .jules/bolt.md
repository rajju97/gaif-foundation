## 2024-05-22 - Optimize Repeated Array Iterations in React
**Learning:** Performing multiple chained `filter` and `reduce` operations on the same array inside a React render path can create significant O(M * N) overhead when computing derived states (like totals). Here, 3 separate filters + reduces over the `orders` array were replaced by a single `reduce` returning an accumulator object.
**Action:** Always combine multi-pass array aggregations into a single `reduce` block that builds an accumulator, and wrap it in `useMemo` so that recalculations only happen when the dependencies change.
