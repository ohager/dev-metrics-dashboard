import _ from "lodash";
import {
  subDays,
  differenceInHours,
  format,
  isWithinRange,
  parse
} from "date-fns";
import { PULL_REQUESTS_PERIOD_DAYS } from "../../../constants";

const extract = pullRequests =>
  pullRequests.nodes ? pullRequests.nodes : pullRequests;

export const isOpen = pullRequest => pullRequest.closedAt === null;
export const isMerged = pullRequest => pullRequest.mergedAt !== null;
export const isNotClosedWithoutMerge = pullRequest => isMerged(pullRequest) || (isOpen(pullRequest) && !isMerged(pullRequest))

const getNewestPullRequest = pullRequests =>
  pullRequests[pullRequests.length - 1];

function _getFromLastDays(pullRequests, numberOfDays) {
  const prs = extract(pullRequests);

  const mostRecentDate = parse(getNewestPullRequest(prs).createdAt);
  const oldestAcceptableDate = subDays(mostRecentDate, numberOfDays);

  return _.chain(prs)
    .filter(pr =>
      isWithinRange(pr.createdAt, oldestAcceptableDate, mostRecentDate)
    )
    .filter(isNotClosedWithoutMerge)
    .sortBy("createdAt")
    .value();
}

function _getPullRequestsStats(pullRequests) {
  const prs = getFromLastDays(pullRequests, PULL_REQUESTS_PERIOD_DAYS);
  const openPrs = prs.filter(isOpen);

  const oldestOpen = _.chain(openPrs)
    .sortBy("createdAt")
    .map(pr => parse(pr.createdAt))
    .head()
    .value();

  return {
    oldestOpen: oldestOpen ? format(oldestOpen, "MMM Do") : "---",
    period: `Last ${PULL_REQUESTS_PERIOD_DAYS} days`,
    total: prs.length,
    closed: prs.length - openPrs.length
  };
}

function _groupByDate(pullRequests) {
  const prs = extract(pullRequests);
  const mapped = _.chain(prs)
    .filter(isNotClosedWithoutMerge)
    .map(pr => ({
      ...pr,
      mergedAtFormatted: isOpen(pr) ? "open" : format(pr.mergedAt, "MMM Do"),
      duration: isOpen(pr)
        ? "open"
        : differenceInHours(pr.mergedAt, pr.createdAt)
    }))
    .value();
  return _.groupBy(mapped, "mergedAtFormatted");
}

export const groupByDate = _.memoize(_groupByDate);
export const getPullRequestsStats = _.memoize(_getPullRequestsStats);
export const getFromLastDays = _.memoize(_getFromLastDays);
