import React from "react";
import graphql from "babel-plugin-relay/macro";
import {QueryRenderer} from "react-relay";
import environment from "../../createRelayEnvironment";
import DashboardContent from "./DashboardContent";

// eslint-disable-next-line react/prop-types
const renderQuery = ({error, props}) => {
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
      query={graphql`
        query DashboardQuery($prCount: Int!) {
          repository(owner: "holding-digital", name: "livia-web") {
            pullRequests(last: $prCount) {
              nodes {
                number
                createdAt
                mergedAt
              }
            }
          }
        }
      `}
      variables={{
        prCount: 50
      }}
      cacheConfig={{
        poll: 60 * 1000
      }}
      render={renderQuery}
    />
  );
};

export default DashboardQuery;
