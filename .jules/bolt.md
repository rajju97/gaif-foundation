## $(date +%Y-%m-%d) - [Consolidating Array Operations in React]
**Learning:** Performing multiple sequential .filter() and .reduce() operations on the same array inside a React component without memoization is an anti-pattern. It causes redundant O(n) array traversals on every re-render (e.g. typing in an input).
**Action:** Always consolidate multiple aggregate metrics from a single array into one .reduce() pass returning an accumulator object, and wrap the computation in useMemo to bind it to the data dependency.
