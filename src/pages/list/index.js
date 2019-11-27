import React, { useState, useEffect } from "react";

import { useStoreState, useStoreActions } from "easy-peasy";

import styled from "styled-components";

import { Link } from "@reach/router";
import {
  DetailsList,
  IconButton,
  Icon,
  PrimaryButton,
  Stack,
  SelectionMode,
  TextField
} from "office-ui-fabric-react";

import Container from "../../components/container";
import NormalDialog from "../../components/dialog";

const Text = styled.div`
  display: flex;
  height: 32px;
  align-items: center;
`;

const onColumnClick = () => {
  console.log("ciao");
};

const columnsDefinitions = [
  {
    key: "owner",
    fieldName: "owner",
    name: "Owner"
  },
  {
    key: "serial",
    fieldName: "serial",
    name: "Serial"
  },
  {
    key: "dateFrom",
    fieldName: "dateFrom",
    name: "From"
  },
  {
    key: "dateTo",
    fieldName: "dateTo",
    name: "To"
  },
  {
    key: "hostname",
    fieldName: "hostname",
    name: "HostName"
  },
  {
    key: "rentId",
    fieldName: "rentId",
    name: "Rent #"
  },
  {
    key: "antivirus",
    fieldName: "antivirus",
    name: "Antivirus",
    minWidth: 64,
    onRender: item => (
      <Text>
        <Icon iconName={item.antivirus ? "Accept" : "Warning"} />
      </Text>
    )
  },
  {
    key: "encryption",
    fieldName: "encryption",
    name: "Encryption",
    minWidth: 72,
    onRender: item => (
      <Text>
        <Icon iconName={item.encryption ? "Accept" : "Warning"} />
      </Text>
    )
  }
];

const List = () => {
  const [remove, setRemove] = useState({
    show: false,
    id: ""
  });
  const [note, setNote] = useState({
    show: false,
    text: ""
  });

  const { listMacs, removeMac } = useStoreActions(store => store.macs);
  const { items, fetched } = useStoreState(store => store.macs);

  useEffect(() => {
    if (!fetched) {
      listMacs();
    }
  }, [fetched, listMacs]);

  const columns = columnsDefinitions.map(columnDefinition => ({
    onRender: (item, index, column) => <Text>{item[column.fieldName]}</Text>,
    isResizable: true,
    onColumnClick: onColumnClick,
    ...columnDefinition
  }));

  const actionsColumns = [
    {
      key: "actions",
      name: "Actions",
      minWidth: 112,
      onColumnClick: onColumnClick,
      onRender: item => (
        <>
          <IconButton
            disabled={!item.note || item.note === "Nessuna nota."}
            onClick={() => setNote({ show: true, text: item.note })}
            iconProps={{ iconName: "More" }}
          />
          <Link to={`/app/item/${item.id}`}>
            <IconButton iconProps={{ iconName: "EditNote" }} />
          </Link>
          <IconButton
            onClick={() => setRemove({ show: true, id: item.id })}
            iconProps={{ iconName: "Delete" }}
          />
        </>
      )
    }
  ];

  const [search, setSearch] = useState("");
  const filteredItems = items.filter(
    item =>
      item.owner.toLowerCase().includes(search.toLowerCase()) ||
      item.serial.toLowerCase().includes(search.toLowerCase()) ||
      item.hostname.toLowerCase().includes(search.toLowerCase()) ||
      item.rentId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <NormalDialog
        title="Notes"
        subText={note.text}
        hidden={!note.show}
        onDismiss={() => setNote({ ...note, show: false })}
      />

      <NormalDialog
        title="Delete me oh?"
        subText="E se poi te ne penti?"
        hidden={!remove.show}
        onDismiss={() => setRemove({ show: false })}
        handleConfirm={() => {
          setRemove({ show: false });
          removeMac(remove.id);
        }}
      />
      

      <TextField
        value={search}
        onChange={(event, text) => setSearch(text)}
        label="Search:"
        placeholder="Search for owner, serial, hostname or rentId"
        iconProps={{ iconName: 'Search' }}
      />

      <DetailsList
        selectionMode={SelectionMode.none}
        columns={[...columns, ...actionsColumns]}
        items={filteredItems}
      />

      <br />

      <Stack>
        <Stack.Item align="center">
          <Link to="/app/item">
            <PrimaryButton text="New item" iconProps={{ iconName: "Add" }} />
          </Link>
        </Stack.Item>
      </Stack>
    </Container>
  );
};

export default List;
