import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { useStoreActions, useStoreState } from "easy-peasy";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, navigate } from "@reach/router";
import {
  PrimaryButton,
  DefaultButton,
  Stack,
  Text,
  MessageBar,
  MessageBarType
} from "office-ui-fabric-react";

import createPdf from "../../utils/create-pdf/create-pdf";

import Container from "../../components/container";
import NormalDialog from "../../components/dialog";

import FormikCheckbox from "../../components/formik/checkbox";
import FormikTextfield from "../../components/formik/textfield";
import FormikDatepicker from "../../components/formik/datepicker";
import FormikDevicepicker from "../../components/formik/device-picker";

const SuggestionBar = styled(MessageBar).attrs({
  messageBarType: MessageBarType.warning,
  isMultiline: true,
})`
  margin: 8px 0;
`;

const itemInitialValues = {
  owner: "",
  fiscalCode: "",
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

const Item = ({ itemId }) => {
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

  return (
    <Container>
      <NormalDialog
        hidden={!progress.show}
        percent={progress.percent}
        title = "Creazione PDF"
        subText = "Ricorda di caricare il file nella apposita cartella"
        icon = "OneDriveAdd"
        confirmLabel = "Upload"
        progressLabel = "Il download inizierà a breve ..."
        handleConfirm={() => window.open("https://drive.google.com/drive/folders/1EJbn-tS3_d8R8r0_OCFq2Ib301GstInm", "_blank")}
        onDismiss={() => setProgress({ show: false })}
      />

      <Formik
        enableReinitialize={true}
        onSubmit={handleSubmit}
        initialValues={{ ...itemInitialValues, ...item }}
        validationSchema={Yup.object().shape({
          owner: Yup.string()
            .min(2, "Numero di caratteri insufficiente")
            .max(50, "Numero di caratteri eccessivo")
            .required("Nome possessore richiesto"),
          fiscalCode: Yup.string()
            .length(16, "Numero di caratteri incorretto")
            .required("Codice Fiscale richiesto"),
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
        })}
      >
        {(props) => {
          return (
            <Form>
              <FormikTextfield
                name="owner"
                label="Nome e Cognome possessore"
                {...props}
              />
              <FormikTextfield
                name="fiscalCode"
                label="Codice Fiscale"
                {...props}
              />
              <br />
              <FormikDevicepicker
                name="device"
                label="Tipologia dispositivo"
                {...props}
              />
              <FormikTextfield
                name="model"
                label="Modello dispositivo"
                {...props}
              />
              <SuggestionBar>
                <b>{"su Mac: "}</b>
                {" 'informazioni su questo Mac'"}
                <br />
                <b>{"su Windows: "}</b>
                {' cmd.exe > "wmic computersystem get model"'}
                <br />
                <i>{" es: MacBook Pro (15-inch, 2017)"}</i>
              </SuggestionBar>
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
                label="Data ricezione"
                {...props}
              />
              <FormikDatepicker name="dateTo" label="Data upcycle" {...props} />
              <SuggestionBar>
                {"Consideriamo la vita utile di "}
                <b>{"3 anni"}</b>
                {" dalla data di ricezione"}
              </SuggestionBar>
              <FormikTextfield
                name="rentId"
                label="Codice contratto noleggio"
                {...props}
              />
              <SuggestionBar>
                <b>{"Non necessario"}</b>
                {
                  " se è il dispositivo è stato acquistato ed è previsto l'upcycle"
                }
              </SuggestionBar>
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
                  href="https://drive.google.com/drive/u/0/folders/1tkTVZ5snIbjTXbUL0FgCnBrD0fKWXUTj"
                >
                  {"Google Drive"}
                </a>
                .
                <br />
                <br />
              </Text>
              <Stack horizontal tokens={{ childrenGap: 16 }}>
                <Stack.Item>
                  <Link to="/app/list">
                    <DefaultButton>{"Indietro"}</DefaultButton>
                  </Link>
                </Stack.Item>
                <Stack.Item>
                  <DefaultButton type="submit" onClick={(e) => {
                    props.setFieldValue('isPdf', true)
                  }}>{"Genera PDF"}</DefaultButton>
                </Stack.Item>
                <Stack.Item>
                  <PrimaryButton type="submit" onClick={(e) => {
                    props.setFieldValue('isPdf', false)
                  }}>{"Salva"}</PrimaryButton>
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
