import React from "react";
import graphql from "babel-plugin-relay/macro";
import { QueryRenderer } from "react-relay";
import environment from "createRelayEnvironment";
import {PULL_REQUESTS_FETCH_COUNT, POLLING_INTERVAL} from "../../constants";
import DashboardContent from "./DashboardContent";

const query = graphql`
  query DashboardQuery($prCount: Int!) {
    repository(owner: "holding-digital", name: "livia-web") {
      pullRequests(last: $prCount) {
        nodes {
          number
          createdAt
          mergedAt
          closedAt
        }
      }
    }
  }
`;

// eslint-disable-next-line react/prop-types
const renderQuery = ({ error, props }) => {
  if (error) {
    return <div>{error.message}</div>;
  } else if (props) {
    return <DashboardContent {...props} />;
  }
  return <div>Loading</div>;
};

const DashboardQuery = () => {
  return (
    <QueryRenderer
      environment={environment}
      query={query}
      variables={{
        prCount: PULL_REQUESTS_FETCH_COUNT
      }}
      cacheConfig={{
        poll: POLLING_INTERVAL
      }}
      render={renderQuery}
    />
  );
};

export default DashboardQuery;
