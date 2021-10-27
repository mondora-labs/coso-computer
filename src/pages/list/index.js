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
const StyledIcon = styled(Icon)`
  ${(props) => props.color && "color: green;"};
  margin: auto;
  font-size: 16px;
  margin-top: 10px;
`;

const DATE_FORMAT = "DD/MM/YYYY";

const ICONS = {
  notebook: "ThisPC",
  smartphone: "CellPhone",
  tablet: "Tablet",
  accessori: "Headset",
};

const columnsDefinitions = [
  {
    key: "ownership",
    fieldName: "ownership",
    iconName: "Devices2",
    isIconOnly: true,
    minWidth: 16,
    maxWidth: 16,
    background: "red",
    onRender: (item) => (
      <Tooltip
        cursor={"default"}
        content={
          "Il dispositivo è " +
          (!item.ownership
            ? "affidato a livello personale "
            : "un muletto aziendale")
        }
      >
        <StyledIcon
          color={item.ownership === "muletto"}
          iconName={
            item.ownership === "muletto"
              ? "ConstructionCone"
              : ICONS[item.device]
          }
        />
      </Tooltip>
    ),
  },
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
    key: "dateFromString",
    fieldName: "dateFromString",
    name: "Inizio",
  },
  {
    key: "dateToString",
    fieldName: "dateToString",
    name: "Termine",
  },
  {
    key: "model",
    fieldName: "model",
    name: "Modello",
    minWidth: 176,
  },
  {
    key: "antivirus",
    fieldName: "antivirus",
    name: "Antivirus",
    minWidth: 60,
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
    minWidth: 56,
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
    .map((item) => ({
      ...item,
      dateToString: moment(item.dateTo).format(DATE_FORMAT),
      dateFromString: moment(item.dateFrom).format(DATE_FORMAT),
    }))
    .sort((a, b) =>
      (sort.direction ? a[sort.key] < b[sort.key] : a[sort.key] > b[sort.key])
        ? 1
        : -1
    )
    .sort((a, b) => (a.ownership === "muletto" ? -1 : 1))
    .filter((item) =>
      Object.values(item)
        .map((val) => `${val}`.toLocaleLowerCase())
        .some((val) => val.includes(search.toLocaleLowerCase()))
    );

  const handleExport = () => {
    const options = {
      header: true,
    };

    stringify(filteredItems, options, (err, output) => {
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
        placeholder="Cerca possessore, seriale..."
        iconProps={{ iconName: "Search" }}
      />

      <DetailsList
        selectionMode={SelectionMode.none}
        columns={[...columns, ...actionsColumns]}
        items={filteredItems}
      />

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
