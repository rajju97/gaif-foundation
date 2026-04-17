
## 2024-04-17 - [Optimized Derived State in React]
**Learning:** Computing derived state directly in the render body is expensive when the state relies on string operations (like `toLowerCase()`) inside loop iterations. `useMemo` is essential here, but furthermore, extracting invariant string operations outside of `.filter` prevents redundant processing and object allocations on every item.
**Action:** Always extract invariant transformations (like `searchQuery.toLowerCase()`) outside of `.filter`/`.map` loops, and memoize the resulting arrays with `useMemo` when rendering lists based on complex filters or sorts.
