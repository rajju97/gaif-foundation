
## 2024-05-02 - Array Iteration String Allocation
**Learning:** Extracting string normalization logic (like `.toLowerCase()`) outside of tight array loops (e.g., inside `.filter`) for large datasets avoids massive re-allocations and can yield >80% speedups on derived catalogs. Additionally, wrapping these iterations in `useMemo` prevents unnecessary calculations on re-renders, adhering to project architectural standards.
**Action:** When filtering array results by query string, pull string normalization (with fallbacks) outside the loop before the array operation, and ensure the derivation is wrapped in `useMemo` based on search, category, or other filter criteria state variables.
