
## 2024-05-16 - [Performance Optimization] Memoize product catalog filtering
**Learning:** In React functional components, deriving state like filtering and sorting a large list of products inside the render function without memoization can cause unnecessary performance overhead on every re-render. Additionally, repetitive string operations like `.toLowerCase()` inside a loop multiply the computational cost.
**Action:** Use `useMemo` to cache expensive derived data computations like sorting and filtering arrays. Always lift invariant string operations (like casting search queries to lowercase) outside of loop callbacks to minimize overhead during iteration.
