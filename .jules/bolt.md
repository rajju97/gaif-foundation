## 2025-05-18 - [Optimization] Extracted Invariant String Methods Outside Array Iterators
**Learning:** Calling `.toLowerCase()` directly inside `.filter()` predicates for invariant variables like query parameters evaluates the string operation repetitively for every single item in the collection (O(N) operations for O(1) semantic value).
**Action:** Always hoist derivation of query variables and search strings (like `.toLowerCase()`) completely outside of the array methods so they are computed only once per execution context.
