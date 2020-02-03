import React, { useState, useEffect } from "react";

import { useStoreState, useStoreActions } from "easy-peasy";

import { faiCose2 } from "../../utils/firebase";

import moment from "moment";

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
    name: "Inizio",
    onRender: item => moment.unix(item.dateFrom / 1000).format("DD/MM/YYYY")
  },
  {
    key: "dateTo",
    fieldName: "dateTo",
    name: "Termine",
    onRender: item => moment.unix(item.dateTo / 1000).format("DD/MM/YYYY")
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
        styles={hostStylesIcon}
        directionalHint={DirectionalHint.bottomCenter}
        content={
          "Sul dispositivo" +
          (!item.antivirus ? " NON " : " ") +
          "è attivo l' antivirus"
        }
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
        styles={hostStylesIcon}
        directionalHint={DirectionalHint.bottomCenter}
        content={"I dati" + (!item.encryption ? " NON " : " ") + "sono cifrati"}
      >
        <Text>
          <Icon iconName={item.encryption ? "Accept" : "Warning"} />
        </Text>
      </TooltipHost>
    )
  }
];

const List = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
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
    isSorted: columnDefinition.key === sort.key,
    isSortedDescending: sort.direction,
    onRender: (item, index, column) => <Text>{item[column.fieldName]}</Text>,
    isResizable: true,
    onColumnClick: (ev, column) => {
      setSort({
        key: column.key,
        direction: sort.key === column.key ? !sort.direction : false
      });
    },
    ...columnDefinition
  }));

  const actionsColumns = [
    {
      key: "actions",
      name: "Modifica",
      minWidth: 112,
      onRender: item => (
        <>
          <TooltipHost
            content={item.note !== "Nessuna nota." ? "Note" : "Nessuna nota"}
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

  const filteredItems = items
    .sort((a, b) =>
      (sort.direction
      ? a[sort.key] < b[sort.key]
      : a[sort.key] > b[sort.key])
        ? 1
        : -1
    )
    .filter(
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
