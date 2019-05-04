import ChartistGraph from "react-chartist";
import AccessTime from "@material-ui/core/SvgIcon/SvgIcon";
import React from "react";
import sumBy from "lodash/sumBy";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import createPullRequestsChartConfig from "./pullRequestsChartConfig";
import { getFromLastDays, groupByDate, isMerged } from "./pullRequestsUtils";
import { PULL_REQUESTS_PERIOD_DAYS } from "../../../constants";

const getAverages = pullRequests => {
  const groupedByDate = groupByDate(pullRequests);
  const prCount = pullRequests.length;
  const dayCount = Object.keys(groupedByDate).length;
  const durationInDays = Object.values(groupedByDate).reduce(
    (p, group) => p + sumBy(group, "duration"),
    0
  );

  return {
    avgDuration: (durationInDays / prCount).toFixed(2),
    avgPerDay: (prCount / dayCount).toFixed(2)
  };
};

const PullRequestsChart = ({ classes, pullRequests }) => {
  const prs = getFromLastDays(pullRequests, PULL_REQUESTS_PERIOD_DAYS).filter(
    isMerged
  );
  const chartConfig = createPullRequestsChartConfig(prs);
  const averages = getAverages(prs);
  return (
    <Card chart>
      <CardHeader color="success">
        <ChartistGraph
          className="ct-chart"
          data={chartConfig.data}
          type="Bar"
          options={chartConfig.options}
          responsiveOptions={chartConfig.responsiveOptions}
          listener={chartConfig.animation}
        />
      </CardHeader>
      <CardBody>
        <h4 className={classes.cardCategory}>Merged Pull Requests</h4>
        <div className={classes.cardInline}>
          <h3 className={classes.cardTitle}>{`Avg. PR/day: ${
            averages.avgPerDay
          }`}</h3>
          <h3 className={classes.cardTitle}>{`Avg. PR duration: 
        ${averages.avgDuration}h`}</h3>
        </div>
      </CardBody>
      <CardFooter chart>
        <div className={classes.stats}>
          <AccessTime /> Foo Bar
        </div>
      </CardFooter>
    </Card>
  );
};

export default PullRequestsChart;
