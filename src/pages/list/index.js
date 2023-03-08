import React, { useState, useEffect } from "react";

import { useStoreState, useStoreActions } from "easy-peasy";
import stringify from "csv-stringify";

import moment from "moment";

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
  Text,
  Dropdown,
} from "office-ui-fabric-react";

import Container from "../../components/container";
import Tooltip from "../../components/tooltip";
import NormalDialog from "../../components/dialog";
import { ResidualBudget } from "../../utils/budget";
import { isItemPersonal } from "../../utils/misc";

import { ASSET_TYPES, ICONS, UPCYCLE_FACTOR, DATE_FORMAT } from "../../config";

const OWNERSHIP_DECORATIONS = {
  assigned: {
    label: "Il dispositivo è personale",
    icon: (device) => ICONS[device] || "Warning",
  },
  muletto: {
    label: "Il dispositivo è un muletto",
    icon: () => "ConstructionCone",
    color: "orange",
  },
};

const dropdownOptions = [
  { key: "tutti", text: "Tutti" },
  ...ASSET_TYPES,
  { key: "altro", text: "Altro..." },
];

const columnsDefinitions = [
  {
    key: "ownership",
    fieldName: "ownership",
    iconName: "Devices2",
    isIconOnly: true,
    minWidth: 18,
    maxWidth: 18,
    onRender: (item) => {
      const decorations = OWNERSHIP_DECORATIONS[item.ownership || "assigned"];
      return (
        <ListItem>
          <Tooltip cursor={"default"} content={decorations.label}>
            <Icon
              styles={{
                root: {
                  color: decorations.color,
                },
              }}
              iconName={decorations.icon(item.device)}
            />
          </Tooltip>
        </ListItem>
      );
    },
  },
  {
    key: "device",
    fieldName: "device",
    disabled: true,
  },
  {
    key: "ownerEmail",
    fieldName: "ownerEmail",
    disabled: true,
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
    key: "hostname",
    fieldName: "hostname",
    name: "Hostname",
    minWidth: 200,
  },
  {
    key: "dateFromString",
    fieldName: "dateFromString",
    name: "Data acquisto",
  },
  {
    key: "computedDateToString",
    fieldName: "computedDateToString",
    name: "Termine",
  },
  {
    key: "model",
    fieldName: "model",
    name: "Modello",
    minWidth: 176,
  },
  {
    key: "budget",
    fieldName: "budget",
    name: "Budget residuo",
    minWidth: 100,
    onRender: (item) => ResidualBudget(item.owner, item.ownerEmail) + " €",
  },
  {
    key: "antivirus",
    fieldName: "antivirus",
    iconName: "Bug",
    minWidth: 18,
    maxWidth: 18,
    onRender: (item) => (
      <ListItem>
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
      </ListItem>
    ),
  },
  {
    key: "encryption",
    fieldName: "encryption",
    iconName: "HardDriveLock",
    minWidth: 18,
    maxWidth: 18,
    onRender: (item) => (
      <ListItem>
        <Tooltip
          cursor={"default"}
          content={
            "I dati" + (!item.encryption ? " NON " : " ") + "sono cifrati"
          }
        >
          <Text>
            <Icon iconName={item.encryption ? "Accept" : "Warning"} />
          </Text>
        </Tooltip>
      </ListItem>
    ),
  },
];

const ListItem = ({ children, verticalAlign = "center" }) => (
  <Stack verticalAlign={verticalAlign} styles={{ root: { height: "100%" } }}>
    <Stack.Item>{children}</Stack.Item>
  </Stack>
);

const List = () => {
  const [search, setSearch] = useState("");
  const [assetType, setAssetType] = useState({ key: "tutti", text: "Tutti" });
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
  const user = useStoreState((store) => store.user);

  useEffect(() => {
    if (!fetched) {
      listMacs();
    }
  }, [fetched, listMacs]);

  const columns = columnsDefinitions
    .filter((column) => !column.disabled && column)
    .map((columnDefinition) => ({
      isSorted: columnDefinition.key === sort.key,
      isSortedDescending: sort.direction,
      onRender: (item, index, column) => (
        <ListItem>
          <Text variant="small">{item[column.fieldName]}</Text>
        </ListItem>
      ),
      isResizable: true,
      onColumnClick: (ev, column) => {
        setSort({
          key: column.key,
          direction: sort.key === column.key ? !sort.direction : false,
        });
      },
      ...columnDefinition,
    }));

  const isUnsafeDeleteEnabled =
    user.permissions.superUser && user.permissions.unsafeDelete;
  const isUnsafeEditEnabled =
    user.permissions.superUser && user.permissions.unsafeEdits;

  const actionsColumns = [
    {
      key: "actions",
      name: "Azioni",
      minWidth: 96,
      onRender: (item) => (
        <ListItem>
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
          {(isItemPersonal(user, item) || isUnsafeEditEnabled) && (
            <Tooltip content="Modifica" cursor={"pointer"}>
              <Link to={`/app/item/${item.id}`}>
                <IconButton iconProps={{ iconName: "EditNote" }} />
              </Link>
            </Tooltip>
          )}
          {isUnsafeDeleteEnabled && (
            <Tooltip content="Elimina" cursor={"pointer"}>
              <IconButton
                onClick={() => setRemove({ show: true, mac: item })}
                iconProps={{ iconName: "Delete" }}
              />
            </Tooltip>
          )}
        </ListItem>
      ),
    },
  ];

  const columnsFields = columnsDefinitions.map((column) => column.key);

  const filteredItems = items
    .map((item) => ({
      ...item,
      computedDateToString: moment
        .utc(item.dateFrom)
        .add(UPCYCLE_FACTOR, "days")
        .format(DATE_FORMAT),
      dateToString: moment.utc(item.dateTo).format(DATE_FORMAT),
      dateFromString: moment.utc(item.dateFrom).format(DATE_FORMAT),
    }))
    .map((item) => {
      return columnsFields.reduce(
        (itemState, fieldName) => {
          itemState[fieldName] = item[fieldName];
          return itemState;
        },
        { id: item.id }
      );
    })
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
    )
    .filter(
      (item) =>
        assetType.key === "tutti" ||
        (assetType.key === "altro" &&
          !ASSET_TYPES.some((type) => item.device === type.key)) ||
        item.device === assetType.key
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
      <Dropdown
        options={dropdownOptions}
        name="device"
        label="Tipologia dispositivo"
        defaultSelectedKey={assetType.key}
        value={assetType}
        onChange={(event, text) => setAssetType(text)}
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

      <Stack tokens={{ childrenGap: 8, padding: 16 }} horizontal reversed>
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
