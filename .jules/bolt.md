## 2024-05-16 - Synchronous Derived State Calculation Anti-pattern
**Learning:** Derived state operations like `.filter()` and `.sort()` on large arrays inside the component body block the main thread synchronously during every render. Further, invariant computations (like `toLowerCase()`) inside `.filter()` loops compound the overhead per item.
**Action:** Extract repeated invariants outside of loops and wrap expensive derived state operations in `useMemo` hooks, leveraging optional chaining and nullish coalescing for safety.
