## 2024-03-01 - [Consolidating array passes for derived metrics]
**Learning:** [Using multiple filter/reduce passes for derived metrics on the same dataset creates an O(k*N) bottleneck. Consolidating into a single pass returns an accumulator object in O(N). The 16x speedup on 5 million items shows how avoiding repeated iterations over the same array can dramatically decrease time spent.]
**Action:** [Always use a single reduce pass when calculating multiple metrics from the same array.]
