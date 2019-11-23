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
  SelectionMode
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
    name: "Owner",
    onColumnClick: onColumnClick
  },
  {
    key: "serial",
    fieldName: "serial",
    name: "Serial",
    onColumnClick: onColumnClick
  },
  {
    key: "dateFrom",
    fieldName: "dateFrom",
    name: "From",
    onColumnClick: onColumnClick
  },
  {
    key: "dateTo",
    fieldName: "dateTo",
    name: "To",
    onColumnClick: onColumnClick
  },
  {
    key: "hostname",
    fieldName: "hostname",
    name: "HostName",
    onColumnClick: onColumnClick
  },
  {
    key: "rentId",
    fieldName: "rentId",
    name: "Rent #",
    onColumnClick: onColumnClick
  },
  {
    key: "antivirus",
    fieldName: "antivirus",
    name: "Antivirus",
    minWidth: 64,
    onColumnClick: onColumnClick,
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
    onColumnClick: onColumnClick,
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
  const { items } = useStoreState(store => store.macs);

  useEffect(() => {
    listMacs();
  }, [listMacs]);

  const columns = columnsDefinitions.map(columnDefinition => ({
    onRender: (item, index, column) => <Text>{item[column.fieldName]}</Text>,
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

      <h1>{"Elenco cose"}</h1>

      <DetailsList
        selectionMode={SelectionMode.none}
        columns={[...columns, ...actionsColumns]}
        items={items}
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
