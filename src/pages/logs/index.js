import React, { useEffect } from "react";

import moment from "moment";
import { useStoreActions, useStoreState } from "easy-peasy";

import { DetailsList, SelectionMode } from "office-ui-fabric-react";

import Container from "../../components/container";

const getDeletions = log => {
  return log.removed ? ["Rimosso record"] : [];
};

const getAdditions = log => {
  const additions = (log.diff && log.diff.additions) || [];
  return additions.map(
    edit => `Aggiunto campo "${edit.field}" → "${edit.value}"`
  );
};

const getEdits = log => {
  const edits = (log.diff && log.diff.edits) || [];
  return edits.map(
    edit =>
      `Modificato campo "${edit.field}": "${edit.value.old}" → "${edit.value.new}"`
  );
};

const getActions = log => {
  const actions = [
    ...getEdits(log),
    ...getAdditions(log),
    ...getDeletions(log)
  ];
  return actions;
};

const columns = [
  {
    key: "who",
    fieldName: "who",
    minWidth: 128,
    maxWidth: 256,
    name: "Utente"
  },
  {
    key: "action",
    name: "Azione",
    minWidth: 320,
    onRender: record => {
      return getActions(record).map((log, index) => (
        <span key={index}>
          {log}
          <br />
        </span>
      ));
    }
  },
  {
    key: "timestamp",
    name: "Quando",
    minWidth: 96,
    maxWidth: 112,
    onRender: record => {
      var duration = moment.duration(moment().diff(moment(record.timestamp)));
      return <span>{duration.humanize()} ago</span>;
    }
  }
];

const Logs = () => {
  const { listLogs } = useStoreActions(store => store.logs);
  const { items, fetched } = useStoreState(store => store.logs);

  useEffect(() => {
    if (!fetched) {
      listLogs();
    }
  }, [fetched, listLogs]);

  return (
    <Container>
      <DetailsList
        selectionMode={SelectionMode.none}
        columns={columns}
        items={items.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        )}
      />
    </Container>
  );
};

export default Logs;
