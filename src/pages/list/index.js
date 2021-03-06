import React, { useState, useEffect } from "react";

import { useStoreState, useStoreActions } from "easy-peasy";
import stringify from "csv-stringify";

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
  Button,
} from "office-ui-fabric-react";

import Container from "../../components/container";
import Tooltip from "../../components/tooltip";
import NormalDialog from "../../components/dialog";

const Text = styled.div`
  display: flex;
  height: 32px;
  align-items: center;
`;

const columnsDefinitions = [
  {
    key: "owner",
    fieldName: "owner",
    name: "Possessore",
  },
  {
    key: "serial",
    fieldName: "serial",
    name: "Seriale",
  },
  {
    key: "dateFrom",
    fieldName: "dateFrom",
    name: "Inizio",
    onRender: (item) => (
      <Text>{moment(item.dateFrom).format("DD/MM/YYYY")}</Text>
    ),
  },
  {
    key: "dateTo",
    fieldName: "dateTo",
    name: "Termine",
    onRender: (item) => <Text>{moment(item.dateTo).format("DD/MM/YYYY")}</Text>,
  },
  {
    key: "hostname",
    fieldName: "hostname",
    minWidth: 240,
    name: "HostName",
  },
  {
    key: "rentId",
    fieldName: "rentId",
    name: "Affitto #",
  },
  {
    key: "antivirus",
    fieldName: "antivirus",
    name: "Antivirus",
    minWidth: 64,
    onRender: (item) => (
      <Tooltip
        cursor={"default"}
        content={
          "Sul dispositivo" +
          (!item.antivirus ? " NON " : " ") +
          "è attivo l' antivirus"
        }
      >
        <Text>
          <Icon iconName={item.antivirus ? "Accept" : "Warning"} />
        </Text>
      </Tooltip>
    ),
  },
  {
    key: "encryption",
    fieldName: "encryption",
    name: "Cifratura",
    minWidth: 64,
    onRender: (item) => (
      <Tooltip
        cursor={"default"}
        content={"I dati" + (!item.encryption ? " NON " : " ") + "sono cifrati"}
      >
        <Text>
          <Icon iconName={item.encryption ? "Accept" : "Warning"} />
        </Text>
      </Tooltip>
    ),
  },
];

const List = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [remove, setRemove] = useState({
    show: false,
  });
  const [note, setNote] = useState({
    show: false,
    text: "",
  });

  const { listMacs, removeMac } = useStoreActions((store) => store.macs);
  const { items, fetched } = useStoreState((store) => store.macs);

  useEffect(() => {
    if (!fetched) {
      listMacs();
    }
  }, [fetched, listMacs]);

  const columns = columnsDefinitions.map((columnDefinition) => ({
    isSorted: columnDefinition.key === sort.key,
    isSortedDescending: sort.direction,
    onRender: (item, index, column) => <Text>{item[column.fieldName]}</Text>,
    isResizable: true,
    onColumnClick: (ev, column) => {
      setSort({
        key: column.key,
        direction: sort.key === column.key ? !sort.direction : false,
      });
    },
    ...columnDefinition,
  }));

  const actionsColumns = [
    {
      key: "actions",
      name: "Modifica",
      minWidth: 112,
      onRender: (item) => (
        <>
          <Tooltip
            content={item.note !== "Nessuna nota." ? "Note" : "Nessuna nota"}
            cursor={"pointer"}
          >
            <IconButton
              disabled={!item.note || item.note === "Nessuna nota."}
              onClick={() => setNote({ show: true, text: item.note })}
              iconProps={{ iconName: "More" }}
            />
          </Tooltip>

          <Tooltip content="Modifica" cursor={"pointer"}>
            <Link to={`/app/item/${item.id}`}>
              <IconButton iconProps={{ iconName: "EditNote" }} />
            </Link>
          </Tooltip>

          <Tooltip content="Elimina" cursor={"pointer"}>
            <IconButton
              onClick={() => setRemove({ show: true, mac: item })}
              iconProps={{ iconName: "Delete" }}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  const filteredItems = items
    .sort((a, b) =>
      (sort.direction ? a[sort.key] < b[sort.key] : a[sort.key] > b[sort.key])
        ? 1
        : -1
    )
    .filter(
      (item) =>
        item.owner.toLowerCase().includes(search.toLowerCase()) ||
        item.serial.toLowerCase().includes(search.toLowerCase()) ||
        item.hostname.toLowerCase().includes(search.toLowerCase()) ||
        item.rentId.toLowerCase().includes(search.toLowerCase())
    );

  const handleExport = () => {
    const exportItems = filteredItems.map((item) => ({
      ...item,
      dateTo: moment.utc(item.dateTo).format("DD-MM-YYYY"),
      dateFrom: moment.utc(item.dateFrom).format("DD-MM-YYYY"),
    }));

    const options = {
      header: true,
    };

    stringify(exportItems, options, (err, output) => {
      var element = document.createElement("a");
      document.body.appendChild(element);

      element.setAttribute(
        "href",
        `data:text/csv;base64,${btoa(unescape(encodeURIComponent(output)))}`
      );
      element.setAttribute("target", "_blank");
      element.setAttribute("download", "export.csv");
      element.click();

      document.body.removeChild(element);
    });
  };

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

      <Stack tokens={{ childrenGap: "8px" }} horizontal reversed>
        <Stack.Item align="center">
          <Link to="/app/item">
            <PrimaryButton
              text="Aggiungi nuovo"
              iconProps={{ iconName: "Add" }}
            />
          </Link>
        </Stack.Item>
        <Stack.Item align="center">
          <Button
            text="Esporta .csv"
            iconProps={{ iconName: "DownloadDocument" }}
            onClick={handleExport}
          />
        </Stack.Item>
      </Stack>
    </Container>
  );
};

export default List;
