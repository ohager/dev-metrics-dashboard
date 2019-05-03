import React from "react";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Icon from "@material-ui/core/Icon";
import Warning from "@material-ui/core/SvgIcon/SvgIcon";
import Danger from "components/Typography/Danger.jsx";

import { parse, addDays, isWithinRange } from "date-fns";

function getPullRequestsStats(pullRequests) {
  const PERIOD_DAYS = 7;
  let minDate = parse(pullRequests.nodes[0].createdAt);
  let targetDate = addDays(minDate, PERIOD_DAYS);

  let pullRequestsLastSevenDays = pullRequests.nodes.filter(pr =>
    isWithinRange(pr.createdAt, minDate, targetDate)
  );
  const prCount = pullRequestsLastSevenDays.length;

  let stats = {
    startDate: minDate,
    lastDate: pullRequestsLastSevenDays[prCount - 1],
    period: `Last ${PERIOD_DAYS} days`,
    total: prCount,
    closed: 0
  };

  pullRequestsLastSevenDays.forEach(pr => {
    if (pr.mergedAt) {
      stats.closed += 1;
    }
  });

  return stats;
}

const PullRequests = ({ classes, pullRequests }) => {
  const stats = getPullRequestsStats(pullRequests);

  return (
    <Card>
      <CardHeader color="warning" stats icon>
        <CardIcon color="warning">
          <Icon>merge_type</Icon>
        </CardIcon>
        <p className={classes.cardCategory}>Open Pull Requests</p>
        <h3 className={classes.cardTitle}>
          {`${stats.total - stats.closed}/${stats.total}`}
        </h3>
      </CardHeader>
      <CardFooter stats>
        <div className={classes.stats}>
          <Danger>
            <Warning />
          </Danger>
          {stats.period}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PullRequests;
