import { addDays, isWithinRange, parse } from "date-fns";

export function getPullRequestsStats(pullRequests) {
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
