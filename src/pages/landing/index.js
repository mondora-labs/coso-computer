import { Link } from "@reach/router";
import { useStoreActions, useStoreState } from "easy-peasy";
import moment from "moment";
import {
  MessageBar,
  MessageBarType,
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
  Separator,
} from "office-ui-fabric-react";
import React, { useState } from "react";

import Container from "../../components/container";
import NormalDialog from "../../components/dialog";

import { ResidualBudget, BudgetDate } from "../../utils/budget";
import { UserItems } from "../../utils/misc";

import { ICONS, UPCYCLE_FACTOR, DATE_FORMAT, BUDGET } from "../../config";

const Landing = () => {
  const [note, setNote] = useState({
    show: false,
    text: "",
  });
  const [remove, setRemove] = useState({
    show: false,
  });
  const [budgetDialog, setBudgetDialog] = useState({
    show: false,
  });

  const { removeMac } = useStoreActions((store) => store.macs);
  const user = useStoreState((state) => state.user);
  const userItems = UserItems(user.name, user.email);

  const budgetDate = BudgetDate(user.name, user.email);
  const budgetEndDate = moment.utc(budgetDate).add(UPCYCLE_FACTOR, "days");

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
        title="Budget"
        subText={
          "Il budget per ciascuna persona corrisponde a " +
          BUDGET +
          " € iva esclusa, viene calcolato a partire dal primo computer acquistato e può essere rinnovato dopo " +
          UPCYCLE_FACTOR / 365 +
          " anni. Nel calcolo del budget residuo vengono considerati tutti i dispositivi aggiunti in seguito al computer ad eccezione dei muletti."
        }
        hidden={!budgetDialog.show}
        onDismiss={() => setBudgetDialog({ show: false })}
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

        <Text variant="xLargePlus">
          {"Budget: " + ResidualBudget(user.name, user.email) + " €  "}
          <IconButton
            iconProps={{ iconName: "Info" }}
            onClick={() => setBudgetDialog({ show: true })}
          />
        </Text>
        <Text variant="medium">
          {"Calcolato a partire dal  " +
            (budgetDate
              ? budgetDate.format(DATE_FORMAT)
              : "primo computer aggiunto")}
        </Text>
        {budgetEndDate.isBefore(new Date()) && (
          <MessageBar
            messageBarType={MessageBarType.warning}
            isMultiline={true}
          >
            <b>
              {"Sono passati più di " +
                UPCYCLE_FACTOR / 365 +
                " anni dall'ultimo rinnovo del budget"}
            </b>
            <br />
            {"Il tuo budget verrà rinnovato appena inserisci un nuovo computer"}
          </MessageBar>
        )}

        <Separator />

        <Text variant="xLargePlus">{"I miei dispositivi:"}</Text>

        <Stack horizontal tokens={{ childrenGap: 16 }} wrap>
          {userItems.length ? (
            userItems
              .map((item) => ({
                ...item,
                computedDateTo: moment
                  .utc(item.dateFrom)
                  .add(UPCYCLE_FACTOR, "days")
                  .format(DATE_FORMAT),
                dateFrom: moment.utc(item.dateFrom).format(DATE_FORMAT),
                dateTo: moment.utc(item.dateTo).format(DATE_FORMAT),
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
                              .utc(item.dateTo, DATE_FORMAT)
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
                          <Text variant="xLarge">{item.model} </Text>
                        </Stack.Item>
                        <Stack.Item>
                          <Text>{item.serial} </Text>
                        </Stack.Item>
                        <Stack.Item>
                          <Text>{item.device} </Text>
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

        <Link to="/app/item">
          <PrimaryButton
            text="Aggiungi nuovo"
            iconProps={{ iconName: "Add" }}
          />
        </Link>
      </Stack>
    </Container>
  );
};

export default Landing;
