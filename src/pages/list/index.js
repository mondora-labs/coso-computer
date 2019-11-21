import React from "react";

import uuid from "uuid/v4";

import {
  DetailsList,
  IconButton,
  Icon,
  PrimaryButton
} from "office-ui-fabric-react";
import {
  HoverCard,
  IPlainCardProps,
  HoverCardType
} from "office-ui-fabric-react/lib/HoverCard";

import { Link } from "@reach/router";

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
const items = [
  {
    id: uuid(),
    owner: "giorgio",
    serial: "C02VX19JHTDF",
    dateFrom: "20/01/2017",
    dateTo: "20/01/2017",
    hostName: "kunta",
    rentId: "514132",
    note: "ciao ciao ciao ciao",
    antivirus: true,
    encryption: true
  },
  {
    id: uuid(),
    owner: "giorgio2",
    serial: "C02VX19JHTDF",
    dateFrom: "20/01/2017",
    dateTo: "20/01/2017",
    hostName: "kunta",
    rentId: "514132",
    note: "ciao ciao ciao ciao",
    antivirus: false,
    encryption: true
  },
  {
    id: uuid(),
    owner: "giorgio3",
    serial: "C02VX19JHTDF",
    dateFrom: "20/01/2017",
    dateTo: "20/01/2017",
    hostName: "kunta",
    rentId: "514132",
    note: "ciao ciao ciao ciao",
    antivirus: false,
    encryption: true
  },
  {
    id: uuid(),
    owner: "giorgio4",
    serial: "C02VX19JHTDF",
    dateFrom: "20/01/2017",
    dateTo: "20/01/2017",
    hostName: "kunta",
    rentId: "514132",
    note: "ciao ciao ciao ciao",
    antivirus: true,
    encryption: true
  }
];

const onRenderPlainCard = () => {
  return <div>{"ciao"}</div>;
};

const List = () => {
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
      <HoverCard
        type={HoverCardType.plain}
        plainCardProps={{ onRenderPlainCard: onRenderPlainCard }}
        //   componentRef={this._hoverCard}
        //   onCardHide={this._onCardHide}
      >
        <div>{"Hover Over Me"}</div>
      </HoverCard>
    </>
  );
};

export default List;
