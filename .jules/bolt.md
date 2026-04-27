## 2024-04-27 - [Single Pass Aggregation in React Components]
**Learning:** Chained array operations (`filter().reduce()`) duplicated for multiple statistics in a React render body create severe O(k*n) performance bottlenecks on every render loop, especially for large datasets like `orders`.
**Action:** When extracting multiple derived statistics (e.g., sum of X, sum of Y) from a single dataset based on a common condition, always use a single `reduce` pass wrapped in `useMemo` to achieve O(n) complexity and avoid unnecessary re-calculations on re-renders.
