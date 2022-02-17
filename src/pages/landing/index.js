import { Link } from "@reach/router";
import { useStoreActions, useStoreState } from "easy-peasy";
import moment from "moment";
import {
  DefaultButton,
  DocumentCard,
  DocumentCardDetails,
  DocumentCardStatus,
  Icon,
  IconButton,
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

import { isItemPersonal } from "../../utils/misc";

const FORMAT = "DD/MM/YYYY";
const UPCYCLE_FACTOR = 365 * 3.2;
const ICONS = {
  notebook: "ThisPC",
  computer: "ThisPC",
  tablet: "Tablet",
  mouse: "KeyboardClassic",
  tastiera: "KeyboardClassic",
  monitor: "TVMonitor",
  headset: "Headset",
  accessori: "Puzzle",
  smartphone: "CellPhone",
};

const Landing = () => {
  const [note, setNote] = useState({
    show: false,
    text: "",
  });
  const [remove, setRemove] = useState({
    show: false,
  });

  const { listMacs, removeMac } = useStoreActions((store) => store.macs);
  const { items, fetched } = useStoreState((store) => store.macs);
  const user = useStoreState((state) => state.user);

  useEffect(() => {
    if (!fetched) {
      listMacs();
    }
  }, [fetched, listMacs]);

  const userItems = items
    .filter((item) => isItemPersonal(user, item))
    .sort((a, b) => (a.dateFrom < b.dateFrom ? 1 : -1));

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
                computedDateTo: moment
                  .utc(item.dateFrom)
                  .add(UPCYCLE_FACTOR, "days")
                  .format(FORMAT),
                dateFrom: moment.utc(item.dateFrom).format(FORMAT),
                dateTo: moment.utc(item.dateTo).format(FORMAT),
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
                            moment
                              .utc(item.dateTo, FORMAT)
                              .isAfter(moment.utc())
                              ? PersonaPresence.online
                              : PersonaPresence.busy
                          }
                          onRenderInitials={() => (
                            <Icon iconName={ICONS[item.device] || "Help"} />
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
                      <DocumentCardStatus
                        statusIcon={
                          (item.ownership === "muletto" && "Group") ||
                          (item.ownership === "assigned" && "UserFollowed") ||
                          "Warning"
                        }
                        status={
                          (item.ownership === "muletto" &&
                            "Muletto aziendale") ||
                          (item.ownership === "assigned" && "Uso personale") ||
                          "Non assegnato"
                        }
                      />

                      <DocumentCardStatus
                        statusIcon="Calendar"
                        status={`${item.dateFrom} - ${item.computedDateTo}`}
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

                    <Stack horizontal tokens={{ padding: 12, childrenGap: 8 }}>
                      <Stack.Item>
                        <IconButton
                          iconProps={{ iconName: "More" }}
                          onClick={() =>
                            setNote({ show: true, text: item.note })
                          }
                        />
                      </Stack.Item>
                      <Stack.Item>
                        <Link to={`/app/item/${item.id}`}>
                          <IconButton iconProps={{ iconName: "EditNote" }} />
                        </Link>
                      </Stack.Item>
                      <Stack.Item>
                        <IconButton
                          iconProps={{ iconName: "Delete" }}
                          onClick={() => setRemove({ show: true, mac: item })}
                        />
                      </Stack.Item>
                    </Stack>
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

        <Stack horizontal tokens={{ childrenGap: 8 }}>
          <Stack.Item align="center">
            <Link to="/app/item">
              <PrimaryButton
                text="Aggiungi nuovo"
                iconProps={{ iconName: "Add" }}
              />
            </Link>
          </Stack.Item>
          <Stack.Item align="center">
            <a
              href="https://mondora-store.mmn.it/"
              target="_blank"
              rel="noreferrer"
            >
              <DefaultButton
                text="Richiedi device"
                iconProps={{ iconName: "Money" }}
              />
            </a>
          </Stack.Item>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Landing;
