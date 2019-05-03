import ChartistGraph from "react-chartist";
import AccessTime from "@material-ui/core/SvgIcon/SvgIcon";
import React from "react";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import createPullRequestsChartConfig from "./pullRequestsChartConfig";

const PullRequestsChart = ({ classes, pullRequests }) => {
  const chartConfig = createPullRequestsChartConfig(pullRequests);

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
        <h4 className={classes.cardTitle}>Closed Pull Requests</h4>
        <p className={classes.cardCategory}>Avg. PR/day: 4.17</p>
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
