
## 2024-05-23 - Optimize Array Operations in React Render Loops
**Learning:** React render loops that perform filtering and sorting on large arrays without memoization cause severe performance degradation on every re-render (e.g. typing in a search bar). Also, applying invariant string operations (like `toLowerCase()`) inside the array iteration methods performs poorly due to redundant computations.
**Action:** Always wrap heavy filter/sort operations in `useMemo` with minimal dependencies. Additionally, extract invariant derivations out of the loop.
