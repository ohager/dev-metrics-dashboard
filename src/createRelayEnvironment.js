/* eslint-disable github/no-then */
import {
  Environment,
  Network,
  RecordSource,
  Store,
  Observable
} from "relay-runtime";

function fetchQuery(operation, variables) {
  return Observable.create(sink => {
    fetch("/graphql", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query: operation.text, variables })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.errors) {
          sink.error(data.errors);
          return;
        }
        sink.next(data);
        sink.complete();
      });
  });
}

const network = Network.create(fetchQuery);
const source = new RecordSource();
const store = new Store(source);

export default new Environment({ network, store });
