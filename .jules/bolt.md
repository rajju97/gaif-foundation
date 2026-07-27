## 2024-05-20 - [Optimize order counts in seller orders]
**Learning:** In SellerOrders.jsx, multiple array `.filter()` operations were used in the render function to get order counts by status. This leads to $O(k \times N)$ time complexity on every render, which gets slow as the order array size increases.
**Action:** Replace multiple `.filter().length` calls inside render paths with a single-pass `reduce` over the array wrapped in a `useMemo` hook, making it an $O(N)$ lookup that gets cached effectively between renders.
