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
  TextField,
  TooltipHost,
  DirectionalHint
} from "office-ui-fabric-react";

import Container from "../../components/container";
import NormalDialog from "../../components/dialog";

const hostStylesLink = { root: { display: "inline-block", cursor: "pointer" } };
const hostStylesIcon = { root: { display: "inline-block", cursor: "default" } };

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
    name: "Possessore"
  },
  {
    key: "serial",
    fieldName: "serial",
    name: "Seriale"
  },
  {
    key: "dateFrom",
    fieldName: "dateFrom",
    name: "Inizio"
  },
  {
    key: "dateTo",
    fieldName: "dateTo",
    name: "Termine"
  },
  {
    key: "hostname",
    fieldName: "hostname",
    minWidth: 240,
    name: "HostName"
  },
  {
    key: "rentId",
    fieldName: "rentId",
    name: "Affitto #"
  },
  {
    key: "antivirus",
    fieldName: "antivirus",
    name: "Antivirus",
    minWidth: 64,
    onRender: item => (
      <TooltipHost
        content={
          "Sul dispositivo" +
          (!item.antivirus ? " NON " : " ") +
          "è attivo l' antivirus"
        }
        styles={hostStylesIcon}
        directionalHint={DirectionalHint.bottomCenter}
      >
        <Text>
          <Icon iconName={item.antivirus ? "Accept" : "Warning"} />
        </Text>
      </TooltipHost>
    )
  },
  {
    key: "encryption",
    fieldName: "encryption",
    name: "Cifratura",
    minWidth: 64,
    onRender: item => (
      <TooltipHost
        content={"I dati" + (!item.encryption ? " NON " : " ") + "sono cifrati"}
        styles={hostStylesIcon}
        directionalHint={DirectionalHint.bottomCenter}
      >
        <Text>
          <Icon iconName={item.encryption ? "Accept" : "Warning"} />
        </Text>
      </TooltipHost>
    )
  }
];

const List = () => {
  const [remove, setRemove] = useState({
    show: false
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
      name: "Modifica",
      minWidth: 112,
      onColumnClick: onColumnClick,
      onRender: item => (
        <>
          <TooltipHost
            content={item.note != "Nessuna nota." ? "Note" : "Nessuna nota"}
            styles={hostStylesLink}
            directionalHint={DirectionalHint.bottomCenter}
          >
            <IconButton
              disabled={!item.note || item.note === "Nessuna nota."}
              onClick={() => setNote({ show: true, text: item.note })}
              iconProps={{ iconName: "More" }}
            />
          </TooltipHost>

          <TooltipHost
            content="Modifica"
            styles={hostStylesLink}
            directionalHint={DirectionalHint.bottomCenter}
          >
            <Link to={`/app/item/${item.id}`}>
              <IconButton iconProps={{ iconName: "EditNote" }} />
            </Link>
          </TooltipHost>

          <TooltipHost
            content="Elimina"
            styles={hostStylesLink}
            directionalHint={DirectionalHint.bottomCenter}
          >
            <IconButton
              onClick={() => setRemove({ show: true, mac: item })}
              iconProps={{ iconName: "Delete" }}
            />
          </TooltipHost>
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
        title="Note"
        subText={note.text}
        hidden={!note.show}
        onDismiss={() => setNote({ ...note, show: false })}
      />

      <NormalDialog
        title="Mi vuoi cancellare oh?"
        subText="E se poi te ne penti?"
        hidden={!remove.show}
        onDismiss={() => setRemove({ show: false })}
        handleConfirm={() => {
          setRemove({ show: false });
          removeMac(remove.mac);
        }}
      />

      <TextField
        value={search}
        onChange={(event, text) => setSearch(text)}
        label="Cerca:"
        placeholder="Cerca possessore, seriale, hostname o rentId"
        iconProps={{ iconName: "Search" }}
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
            <PrimaryButton
              text="Aggiungi nuovo"
              iconProps={{ iconName: "Add" }}
            />
          </Link>
        </Stack.Item>
      </Stack>
    </Container>
  );
};

export default List;
