import React, { useState, useEffect } from "react";

import {
  DetailsList,
  IconButton,
  Icon,
  PrimaryButton
} from "office-ui-fabric-react";

import { Link } from "@reach/router";
import { getMacs } from "../../utils/firebase";

const columns = [
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
    name: "dateFrom"
  },
  {
    key: "dateTo",
    fieldName: "dateTo",
    name: "dateTo"
  },
  {
    key: "hostName",
    fieldName: "hostName",
    name: "hostName"
  },
  {
    key: "rentId",
    fieldName: "rentId",
    name: "rentId"
  },
  {
    key: "antivirus",
    fieldName: "antivirus",
    name: "antivirus",
    onRender: item => (
      <Icon iconName={item.antivirus ? "CheckMark" : "BlockedSite"} />
    )
  },
  {
    key: "encryption",
    fieldName: "encryption",
    name: "encryption",
    onRender: item => (
      <Icon iconName={item.encryption ? "CheckMark" : "BlockedSite"} />
    )
  },
  {
    key: "actions",
    name: "Azioni",
    minWidth: 320,
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
          onClick={() => console.log("ti eliminoh")}
          iconProps={{ iconName: "Delete" }}
        />
      </>
    )
  }
];

const List = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getMacs().then(macs => setItems(macs));
  }, []);

  return (
    <>
      <DetailsList
        selectionMode={0}
        columns={columns}
        items={items}
      ></DetailsList>
      <Link to="/item">
        <PrimaryButton text="New item" iconProps={{ iconName: "Add" }} />
      </Link>
    </>
  );
};

export default List;
