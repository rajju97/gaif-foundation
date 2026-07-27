const iterations = 5000000;
const orders = [];
for (let i = 0; i < iterations; i++) {
  orders.push({
    status: i % 2 === 0 ? 'delivered' : 'pending',
    total: 100,
    commissionAmount: 10,
    gstAmount: 5,
  });
}

const startUnoptimized = performance.now();
const revUnopt = orders.filter(o => o.status === 'delivered').reduce((s, o) => s + (o.total || 0), 0);
const commUnopt = orders.filter(o => o.status === 'delivered').reduce((s, o) => s + (o.commissionAmount || 0), 0);
const gstUnopt = orders.filter(o => o.status === 'delivered').reduce((s, o) => s + (o.gstAmount || 0), 0);
const timeUnoptimized = performance.now() - startUnoptimized;

const startOptimized = performance.now();
const statsOpt = orders.reduce((acc, o) => {
  if (o.status === 'delivered') {
    acc.revenue += o.total || 0;
    acc.commission += o.commissionAmount || 0;
    acc.gst += o.gstAmount || 0;
  }
  return acc;
}, { revenue: 0, commission: 0, gst: 0 });
const timeOptimized = performance.now() - startOptimized;

console.log(`Unoptimized Time: ${timeUnoptimized.toFixed(2)}ms`);
console.log(`Optimized Time: ${timeOptimized.toFixed(2)}ms`);
console.log(`Speedup: ${(timeUnoptimized / timeOptimized).toFixed(2)}x`);
