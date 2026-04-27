const ctx = document.getElementById('revenueChart').getContext('2d');

const revenueChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Revenue ₹',
      data: [5000, 7000, 6000, 9000],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true
  }
});
