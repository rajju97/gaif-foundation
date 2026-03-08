## 2024-03-08 - AdminDashboard User Filtering Bug
**Learning:** In `src/pages/AdminDashboard.jsx`, there was a pre-existing unused variable `customers`. When refactoring the users filtering using `reduce`, I accidentally removed `customers` from the destructured assignment which would have been a bug.
**Action:** When converting multiple `.filter` calls into a single `.reduce` pass, ensure all original variables extracted are preserved exactly, even if they appear unused, unless instructed otherwise.
