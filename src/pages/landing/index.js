import { Link } from "@reach/router";
import { useStoreActions, useStoreState } from "easy-peasy";
import moment from "moment";
import {
  DocumentCard,
  DocumentCardActions,
  DocumentCardDetails,
  DocumentCardStatus,
  Icon,
  Persona,
  PersonaPresence,
  PersonaSize,
  PrimaryButton,
  Stack,
  Text,
} from "office-ui-fabric-react";
import React, { useEffect, useState } from "react";

import Container from "../../components/container";
import NormalDialog from "../../components/dialog";

const FORMAT = "DD/MM/YYYY";
const ICONS = {
  notebook: "ThisPC",
  smartphone: "CellPhone",
  tablet: "Tablet",
  accessori: "Headset",
};

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

  const userItems = items
    .filter((item) => item.owner === user.name)
    .sort((a, b) => (a.dateFrom < b.dateFrom ? 1 : -1));

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

      <Stack tokens={{ childrenGap: 16 }}>
        <Persona {...profile} size={PersonaSize.size120} />

        <Text variant="xLargePlus">{"I miei dispositivi:"}</Text>

        <Stack horizontal tokens={{ childrenGap: 16 }} wrap>
          {userItems.length ? (
            userItems
              .map((item) => ({
                ...item,
                dateFrom: moment(item.dateFrom).format(FORMAT),
                dateTo: moment(item.dateTo).format(FORMAT),
              }))
              .map((item) => (
                <Stack.Item styles={{ root: { width: 320 } }} key={item.id}>
                  <DocumentCard>
                    <Stack
                      horizontal
                      tokens={{ padding: 24, childrenGap: -16 }}
                    >
                      <Stack.Item align="center">
                        <Persona
                          size={PersonaSize.size56}
                          presence={
                            moment(item.dateTo).isAfter(moment.now())
                              ? PersonaPresence.online
                              : PersonaPresence.busy
                          }
                          onRenderInitials={() => (
                            <Icon iconName={ICONS[item.device]} />
                          )}
                        />
                      </Stack.Item>
                      <Stack>
                        <Stack.Item>
                          <Text variant="xLarge">{item.hostname} </Text>
                        </Stack.Item>
                        <Stack.Item>
                          <Text>{item.model} </Text>
                        </Stack.Item>
                        <Stack.Item>
                          <Text>{item.serial} </Text>
                        </Stack.Item>
                      </Stack>
                    </Stack>
                    <DocumentCardDetails>
                      {item.ownership === "muletto" && (
                        <DocumentCardStatus
                          statusIcon="ConstructionCone"
                          status={"Muletto aziendale"}
                        />
                      )}
                      <DocumentCardStatus
                        statusIcon="Calendar"
                        status={`${item.dateFrom} - ${item.dateTo}`}
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
                  </DocumentCard>
                </Stack.Item>
              ))
          ) : (
            <Stack>
              <Stack.Item align="center">
                <Text>{"Nessun device trovato."}</Text>
              </Stack.Item>
              <Stack.Item align="center">
                <Text>{"Per iniziare, aggiungine uno."}</Text>
              </Stack.Item>
            </Stack>
          )}
        </Stack>

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
      </Stack>
    </Container>
  );
};

export default Landing;
