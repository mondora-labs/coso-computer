import React, { useState, useEffect } from "react";

import { useStoreState, useStoreActions } from "easy-peasy";
import moment from "moment";

import {
  Persona,
  PersonaSize,
  DocumentCard,
  DocumentCardDetails,
  DocumentCardTitle,
  DocumentCardStatus,
  DocumentCardActions,
  DocumentCardLogo,
} from "office-ui-fabric-react";

import styled from "styled-components";

import Container from "../../components/container";
import NormalDialog from "../../components/dialog";

const Card = styled(DocumentCard)`
  display: inline-block;
  margin: 16px;
  max-width: 320px;
  width: 100%;
`;

const Landing = () => {
  const user = useStoreState((state) => state.user);
  const [note, setNote] = useState({
    show: false,
    text: "",
  });
  const { listMacs } = useStoreActions((store) => store.macs);
  const { items, fetched } = useStoreState((store) => store.macs);

  useEffect(() => {
    if (!fetched) {
      listMacs();
    }
  }, [fetched, listMacs]);

  const userItems = items.filter((item) => item.owner === user.name);

  const documentCardActions = (item) => [
    {
      iconProps: { iconName: "More" },
      onClick: () => setNote({ show: true, text: item.note }),
      ariaLabel: "Note",
    },
    {
      iconProps: { iconName: "EditNote" },
      onClick: () => console.log("Edit"),
      ariaLabel: "Modifica elemento",
    },
    {
      iconProps: { iconName: "Delete" },
      onClick: () => console.log("Elimina"),
      ariaLabel: "Elimina elemento",
    },
  ];

  const profile = {
    imageUrl: user.photo,
    text: user.name,
    secondaryText: user.email,
  };

  const iconMap = new Map();
  iconMap.set("notebook", "ThisPC");
  iconMap.set("smartphone", "CellPhone");
  iconMap.set("tablet", "Tablet");
  iconMap.set("accessori", "Headset");

  return (
    <Container>
      <NormalDialog
        title="Note"
        subText={note.text}
        hidden={!note.show}
        onDismiss={() => setNote({ ...note, show: false })}
      />
      <Persona {...profile} size={PersonaSize.size120} />

      {userItems.map((item) => (
        <Card key={item.id}>
          <DocumentCardLogo logoIcon={iconMap.get(item.device)} />
          <DocumentCardDetails>
            <DocumentCardTitle title={item.hostname} shouldTruncate />
            <DocumentCardTitle
              title={`Modello: ${item.model}`}
              shouldTruncate
              showAsSecondaryTitle
            />
            <DocumentCardTitle
              title={`Seriale: ${item.serial}`}
              shouldTruncate
              showAsSecondaryTitle
            />
            <DocumentCardStatus
              statusIcon="Calendar"
              status={`${moment(item.dateFrom).format("DD/MM/YYYY")} - ${moment(
                item.dateFrom
              ).format("DD/MM/YYYY")}`}
            />
            <DocumentCardStatus
              statusIcon={item.antivirus ? "Accept" : "Warning"}
              status="Antivirus"
            />
            <DocumentCardStatus
              statusIcon={item.encryption ? "Accept" : "Warning"}
              status="Cifratura disco"
            />
          </DocumentCardDetails>
          <DocumentCardActions actions={documentCardActions(item)} />
        </Card>
      ))}
    </Container>
  );
};

export default Landing;
