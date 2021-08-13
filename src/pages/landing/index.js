import React, { useState, useEffect } from "react";

import { useStoreState, useStoreActions } from "easy-peasy";
import moment from "moment";
import { Link } from "@reach/router";
import {
  Persona,
  PersonaSize,
  DocumentCard,
  DocumentCardDetails,
  DocumentCardTitle,
  DocumentCardStatus,
  DocumentCardActions,
  DocumentCardLogo,
  PrimaryButton,
  Stack,
} from "office-ui-fabric-react";

import styled from "styled-components";

import Container from "../../components/container";
import NormalDialog from "../../components/dialog";

const Card = styled(DocumentCard)`
  display: inline-block;
  margin: 24px 32px 24px 0;
  max-width: 320px;
  width: 100%;
`;
const CardTitle = styled(DocumentCardTitle)`
  height: auto;
  padding: 8px;
`;
const Landing = () => {
  const user = useStoreState((state) => state.user);
  const [note, setNote] = useState({
    show: false,
    text: "",
  });
  const [remove, setRemove] = useState({
    show: false,
  });
  const { listMacs, removeMac } = useStoreActions((store) => store.macs);
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
      onClick: () => {
        window.location.href = `/app/item/${item.id}`;
      },
      ariaLabel: "Modifica elemento",
    },
    {
      iconProps: { iconName: "Delete" },
      onClick: () => setRemove({ show: true, mac: item }),
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

      <Persona {...profile} size={PersonaSize.size120} />
      <h2>{"I miei devices:"}</h2>
      {userItems.length ? (
        userItems.map((item) => (
          <Card key={item.id}>
            <Stack horizontal>
              <Stack.Item align="center">
                <DocumentCardLogo logoIcon={iconMap.get(item.device)} />
              </Stack.Item>
              <Stack.Item align="center">
                <CardTitle title={item.hostname} />
              </Stack.Item>
            </Stack>
            <br />
            <DocumentCardDetails>
              <CardTitle
                title={`Modello: ${item.model}`}
                showAsSecondaryTitle
              />
              <CardTitle
                title={`Seriale: ${item.serial}`}
                showAsSecondaryTitle
              />
              <DocumentCardStatus
                statusIcon="Calendar"
                status={`${moment(item.dateFrom).format(
                  "DD/MM/YYYY"
                )} - ${moment(item.dateFrom).format("DD/MM/YYYY")}`}
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
        ))
      ) : (
        <p>
          {"Nessun device trovato,"}
          <br />
          {"Inizia aggiungendone uno"}
        </p>
      )}

      <Stack horizontal>
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

export default Landing;
