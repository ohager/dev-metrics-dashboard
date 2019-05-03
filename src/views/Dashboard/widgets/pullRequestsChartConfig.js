const delays2 = 80,
  durations2 = 500;

function createPullRequestsChartConfig(pullRequests) {
  // TODO: group by date and count pull requests
  const chartConfig = {
    data: {
      labels: [
        "Day 1",
        "Day 2",
        "Day 3",
        "Day 4",
        "Day 5",
        "Day 6",
        "Day 7"
      ],
      series: [[4, 7, 4, 5, 8, 2, 6]]
    },
    options: {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 20,
      chartPadding: {
        top: 0,
        right: 5,
        bottom: 0,
        left: 0
      }
    },
    responsiveOptions: [
      [
        "screen and (max-width: 640px)",
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function(value) {
              return value[0];
            }
          }
        }
      ]
    ],
    animation: {
      draw: function(data) {
        if (data.type === "bar") {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays2,
              dur: durations2,
              from: 0,
              to: 1,
              easing: "ease"
            }
          });
        }
      }
    }
  };

  return chartConfig;
}

export default createPullRequestsChartConfig;
