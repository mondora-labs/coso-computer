import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { useStoreActions, useStoreState } from "easy-peasy";
import CodiceFiscale from "codice-fiscale-js";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { navigate } from "@reach/router";
import {
  PrimaryButton,
  DefaultButton,
  Stack,
  Text,
  MessageBar,
  MessageBarType,
} from "office-ui-fabric-react";

import createPdf from "../../utils/create-pdf/create-pdf";

import Container from "../../components/container";
import NormalDialog from "../../components/dialog";

import FormikCheckbox from "../../components/formik/checkbox";
import FormikTextfield from "../../components/formik/textfield";
import FormikDatepicker from "../../components/formik/datepicker";
import FormikPicker from "../../components/formik/formik-picker";
import FormikChoiceGroup from "../../components/formik/choicegroup";

import { GOOGLE_FOLDER } from "../../config";

const SuggestionBar = styled(MessageBar).attrs({
  messageBarType: MessageBarType.warning,
  isMultiline: true,
})`
  margin: 8px 0;
`;

const ITEM_INITIAL_VALUES = {
  owner: "",
  fiscalCode: "",
  ownership: "",
  device: "",
  model: "",
  serial: "",
  dateFrom: "",
  dateTo: "",
  hostname: "",
  rentId: "",
  note: "",
  antivirus: false,
  encryption: false,
};

const VALIDATION_SCHEMA = Yup.object().shape({
  owner: Yup.string()
    .min(2, "Numero di caratteri insufficiente")
    .max(50, "Numero di caratteri eccessivo")
    .required("Nome possessore richiesto"),
  ownerEmail: Yup.string()
    .email("Email non valida")
    .required("Email richiesta"),
  fiscalCode: Yup.string()
    .length(16, "Numero di caratteri incorretto")
    .test("cf test", "Codice fiscale non valido", (cf) =>
      CodiceFiscale.check(cf)
    )
    .required("Codice Fiscale richiesto"),
  ownership: Yup.string().required("Ownership dispositivo richiesta"),
  device: Yup.string().required("Tipologia dispositivo richiesta"),
  model: Yup.string()
    .min(2, "Numero di caratteri insufficiente")
    .max(50, "Numero di caratteri eccessivo")
    .required("Nome modello richiesto"),
  serial: Yup.string()
    .min(2, "Numero di caratteri insufficiente")
    .max(50, "Numero di caratteri eccessivo")
    .required("Codice seriale richiesto"),
  dateFrom: Yup.number().required("Seleziona data ricezione"),
  dateTo: Yup.number()
    .required("Seleziona data upcycle")
    .moreThan(
      Yup.ref("dateFrom"),
      "La data di upcycle deve essere successiva a quella di ricezione"
    ),
  rentId: Yup.string().required(
    "Il numero d'ordine é richiesto, controlla sullo store"
  ),
  taxableAmount: Yup.number()
    .typeError("Importo non corretto, [0-9]")
    .required("L'importo é richiesto, controlla sullo store"),
});

const ASSET_TYPES = [
  "Computer",
  "Tablet",
  "Mouse",
  "Tastiera",
  "Monitor",
  "Headset",
  "Accessori",
].map((item) => ({
  key: item.toLocaleLowerCase(),
  text: item,
}));

const ASSET_MODELS = [
  'MacBook Pro 16"',
  'MacBook Pro 15"',
  'MacBook Pro 14"',
  'MacBook Pro 13"',
  'MacBook Air 13"',
  "Dell XPS 15 9500",
  "Surface Pro 8",
  "Surface Pro 7",
  "Surface Book 3",
  "ThinkPad X1",
  "iPad Pro",
  "iPad Air",
  "iPad mini",
  "iPad",
  "Altro (Note)",
].map((item) => ({ key: item, text: item }));

const Item = ({ itemId }) => {
  const { email, name, permissions } = useStoreState((state) => state.user);

  const { items, fetched } = useStoreState((store) => store.macs);
  const { addMac, listMacs } = useStoreActions((store) => store.macs);

  const item = items.find((item) => item.id === itemId);

  const [progress, setProgress] = useState({
    show: false,
    percent: 0,
    text: "",
  });

  const handleSubmit = async (values) => {
    if (values.isPdf) {
      setProgress({ show: true });
      await createPdf(item);
      setProgress({ show: true, percent: 100 });
    } else {
      addMac({ id: itemId, ...values });
      navigate("/app/landing");
    }
  };

  useEffect(() => {
    if (!fetched) {
      listMacs();
    }
  }, [fetched, listMacs]);

  const isUnsafeEditEnabled = permissions.superUser && permissions.unsafeEdits;

  return (
    <Container>
      <NormalDialog
        hidden={!progress.show}
        percent={progress.percent}
        title="Creazione PDF"
        subText="Ricorda di caricare il file nella apposita cartella"
        icon="OneDriveAdd"
        confirmLabel="Upload"
        progressLabel="Il download inizierà a breve ..."
        handleConfirm={() => window.open(GOOGLE_FOLDER, "_blank")}
        onDismiss={() => setProgress({ show: false })}
      />

      {console.log(item)}

      <Formik
        enableReinitialize={true}
        onSubmit={handleSubmit}
        initialValues={{
          ...ITEM_INITIAL_VALUES,
          ...{
            owner: item?.name || name,
            ownerEmail: item?.ownerEmail || email,
          },
          ...item,
        }}
        validationSchema={VALIDATION_SCHEMA}
      >
        {(props) => {
          return (
            <Form>
              <FormikTextfield
                disabled={!isUnsafeEditEnabled}
                name="owner"
                label="Nome e Cognome possessore"
                {...props}
              />
              {isUnsafeEditEnabled && (
                <SuggestionBar>
                  {"Da grandi poteri derivano grandi responsabilità"}
                </SuggestionBar>
              )}

              <FormikTextfield
                disabled={!isUnsafeEditEnabled}
                name="ownerEmail"
                label="Email possessore"
                {...props}
              />
              {isUnsafeEditEnabled && (
                <SuggestionBar>
                  <b>{"Attenzione: "}</b>
                  {
                    "l'email é il campo di correlazione che permette di capire chi é l'effettivo proprietario (ció che sará visualizzato in dashboard personale), assicurati che la mail corretta. "
                  }
                  <br />
                  <i>
                    {"Si assume che il proprietario sia chi modifica l'item."}
                  </i>
                </SuggestionBar>
              )}

              <FormikTextfield
                name="fiscalCode"
                label="Codice Fiscale"
                {...props}
              />
              <br />

              <FormikChoiceGroup
                label="Uso dispositivo"
                name="ownership"
                options={[
                  {
                    key: "assigned",
                    text: "Personale",
                    icon: "FabricUserFolder",
                  },
                  {
                    key: "muletto",
                    text: "Muletto",
                    icon: "Group",
                  },
                ]}
                {...props}
              />

              <FormikPicker
                options={ASSET_TYPES}
                name="device"
                label="Tipologia dispositivo"
                {...props}
              />
              <br />
              <FormikPicker
                options={ASSET_MODELS}
                name="model"
                label="Modello dispositivo"
                {...props}
              />
              <FormikTextfield
                name="deviceNote"
                label="Note modello"
                {...props}
              />

              <FormikTextfield
                name="serial"
                label="Numero di serie"
                {...props}
              />
              <SuggestionBar>
                <b>{"su Mac:"}</b>
                {" 'informazioni su questo Mac'"}
                <br />
                <b>{"su Windows: "}</b>
                {' cmd.exe > "wmic bios get serialnumber"'}
                <br />
                <i>{" es: C02VG3ULXDT6"}</i>
              </SuggestionBar>
              <FormikTextfield
                name="hostname"
                label="Nome computer"
                {...props}
              />
              <SuggestionBar>
                <b>{"su Mac:"}</b>
                {" Preferenze > condivisione > nome computer   "}
                <br />
                <b>{"su Windows: "}</b>
                {' cmd.exe > "ipconfig /all" > host name'}
                <br />
                <i>{" es: MacBook Pro di Pikachu"}</i>
              </SuggestionBar>
              <br />
              <FormikDatepicker
                name="dateFrom"
                label="Data acquisto"
                {...props}
              />
              <SuggestionBar>
                {
                  "Dalla data di acquisto, il periodo di vita di un computer é di "
                }
                <b>{"3.2 anni"}</b>
                {"."}
              </SuggestionBar>
              <FormikTextfield name="rentId" label="Numero ordine" {...props} />
              <FormikTextfield
                name="taxableAmount"
                label="Importo IVA esclusa"
                placeHolder="Inserisci importo"
                {...props}
              />
              <FormikTextfield name="note" label="Note" multiline {...props} />
              <Stack tokens={{ childrenGap: 16, padding: "16px 0" }}>
                <FormikCheckbox
                  name="antivirus"
                  label="Sul computer è stato installato un antivirus e non verrà disattivato durante l'uso"
                  {...props}
                />

                <FormikCheckbox
                  name="encryption"
                  label="Sul computer è attivo un sistema di cifratura del disco"
                  {...props}
                />
              </Stack>
              <Text>
                {"È inoltre "}
                <strong>{"obbligatorio"}</strong>
                {
                  " firmare la lettera di assegnamento in PDF e caricarla in questa folder  "
                }
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={GOOGLE_FOLDER}
                >
                  {"Google Drive"}
                </a>
                .
                <br />
                <br />
              </Text>
              <Stack horizontal tokens={{ childrenGap: 16 }}>
                <Stack.Item>
                  <DefaultButton onClick={() => navigate(-1)}>
                    {"Indietro"}
                  </DefaultButton>
                </Stack.Item>
                <Stack.Item>
                  <DefaultButton
                    type="submit"
                    onClick={(e) => {
                      props.setFieldValue("isPdf", true);
                    }}
                  >
                    {"Genera PDF"}
                  </DefaultButton>
                </Stack.Item>
                <Stack.Item>
                  <PrimaryButton
                    type="submit"
                    onClick={(e) => {
                      props.setFieldValue("isPdf", false);
                    }}
                  >
                    {"Salva"}
                  </PrimaryButton>
                </Stack.Item>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default Item;
