import max from 'lodash/max'
import {groupByDate, isNotClosedWithoutMerge} from "./pullRequestsUtils";

const delays2 = 80,
  durations2 = 500;

function createPullRequestsChartConfig(pullRequests) {

  const groupedByDate = groupByDate(pullRequests);
  const groups = Object.keys(groupedByDate);
  const labels = groups;
  const series = groups.map(g => groupedByDate[g].length);
  const chartConfig = {
    data: {
      labels,
      series: [series]
    },
    options: {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: max(series),
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
