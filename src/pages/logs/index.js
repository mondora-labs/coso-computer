import React, { useEffect, useState } from "react";

import moment from "moment";
import { useStoreActions, useStoreState } from "easy-peasy";

import { DetailsList, SelectionMode, TextField } from "office-ui-fabric-react";

import Container from "../../components/container";

const getDeletions = (log) => {
  if (!log.removed) {
    return [];
  }

  return [
    `Eliminato device "serial" ${log.record.serial} di ${log.record.owner}`,
  ];
};

const getAdditions = (log) => {
  const additions = (log.diff && log.diff.additions) || [];

  return additions.map((edit) => {
    const value = getRenderValue(edit.field, edit.value);
    return `Aggiunto campo "${edit.field}" → "${value}"`;
  });
};

const getEdits = (log) => {
  const edits = (log.diff && log.diff.edits) || [];

  return edits.map((edit) => {
    const oldValue = getRenderValue(edit.field, edit.value.old);
    const newValue = getRenderValue(edit.field, edit.value.new);

    return `Modificato campo "${edit.field}": "${oldValue}" → "${newValue}"`;
  });
};

const getRenderValue = (fieldName, value) =>
  ["dateFrom", "dateTo"].includes(fieldName)
    ? moment.utc(value).format("DD/MM/YYYY")
    : value;

const getActions = (log) => {
  const actions = [
    ...getEdits(log),
    ...getAdditions(log),
    ...getDeletions(log),
  ];
  return actions;
};

const columns = [
  {
    key: "who",
    fieldName: "who",
    minWidth: 128,
    maxWidth: 256,
    name: "Utente",
  },
  {
    key: "action",
    name: "Azione",
    minWidth: 320,
    onRender: (record) => {
      return getActions(record).map((log, index) => (
        <span key={index}>
          {log}
          <br />
        </span>
      ));
    },
  },
  {
    key: "timestamp",
    name: "Quando",
    minWidth: 96,
    maxWidth: 112,
    onRender: (record) => {
      var duration = moment.duration(
        moment.utc().diff(moment.utc(record.timestamp))
      );
      return <span>{duration.humanize()} ago</span>;
    },
  },
];

const Logs = () => {
  const { listLogs } = useStoreActions((store) => store.logs);
  const { items = [], fetched } = useStoreState((store) => store.logs);

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!fetched) {
      listLogs();
    }
  }, [fetched, listLogs]);

  const filteredItems = items.filter(
    ({
      diff: { additions = [], deletes = [], edits = [] } = {},
      record = {},
    }) => {
      const filterText = ({ value }) =>
        `${value}`.toLowerCase().includes(search.toLowerCase());

      const mergedEdits = edits.reduce(
        (accumulator, { field, value }) => [
          ...accumulator,
          { field, value: value.new },
          { field, value: value.old },
        ],
        []
      );

      const removalEdits = Object.keys(record).map((key) => ({
        field: key,
        value: record[key],
      }));

      const addedSearch = additions.find(filterText);
      const deletedSearch = deletes.find(filterText);
      const editedSearch = mergedEdits.find(filterText);
      const removedSearch = removalEdits.find(filterText);

      return addedSearch || deletedSearch || editedSearch || removedSearch;
    }
  );

  const sortedItems = filteredItems.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <Container>
      <TextField
        value={search}
        onChange={(event, text) => setSearch(text)}
        label="Cerca:"
        placeholder="Cerca per whatever..."
        iconProps={{ iconName: "Search" }}
      />

      <DetailsList
        selectionMode={SelectionMode.none}
        columns={columns}
        items={sortedItems}
      />
    </Container>
  );
};

export default Logs;
