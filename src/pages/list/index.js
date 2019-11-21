import React, { useState, useEffect } from "react";

import { Link } from "@reach/router";
import {
  DetailsList,
  IconButton,
  Icon,
  PrimaryButton,
  Dialog,
  DialogFooter,
  DefaultButton,
  DialogType,
  Stack,
  SelectionMode,
} from "office-ui-fabric-react";

import Container from "../../components/container";

import { getMacs } from "../../utils/firebase";

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
    key: "hostName",
    fieldName: "hostName",
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
    onRender: item => (
      <Icon iconName={item.antivirus ? "CheckMark" : "BlockedSite"} />
    )
  },
  {
    key: "encryption",
    fieldName: "encryption",
    name: "Encryption",
    onRender: item => (
      <Icon iconName={item.encryption ? "CheckMark" : "BlockedSite"} />
    )
  }
];

const List = () => {
  const [items, setItems] = useState([]);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    getMacs().then(macs => setItems(macs));
  }, []);

  const columns = [
    ...columnsDefinitions,
    {
      key: "actions",
      name: "Actions",
      onRender: item => (
        <>
          <IconButton
            onClick={() => console.log("note")}
            iconProps={{ iconName: "More" }}
          />
          <Link to={`/item/${item.id}`}>
            <IconButton iconProps={{ iconName: "EditNote" }} />
          </Link>
          <IconButton
            onClick={() => setOpen(true)}
            iconProps={{ iconName: "Delete" }}
          />
        </>
      )
    }
  ];

  return (
    <Container>
      <Dialog
        hidden={!isOpen}
        onDismiss={() => setOpen(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: "Delete me oh?",
          subText: "Do you want to send this message without a subject?"
        }}
      >
        <DialogFooter>
          <PrimaryButton onClick={() => setOpen(false)}>
            {"Elimina"}
          </PrimaryButton>
          <DefaultButton onClick={() => setOpen(false)}>
            {"Annulla"}
          </DefaultButton>
        </DialogFooter>
      </Dialog>

      <h1>{"Elenco cose"}</h1>

      <DetailsList
        selectionMode={SelectionMode.none}
        columns={columns}
        items={items}
      />

      <br />

      <Stack>
        <Stack.Item align="center">
          <Link to="/item">
            <PrimaryButton text="New item" iconProps={{ iconName: "Add" }} />
          </Link>
        </Stack.Item>
      </Stack>
    </Container>
  );
};

export default List;
