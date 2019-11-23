import React, { useEffect } from "react";

import { useStoreActions, useStoreState } from "easy-peasy";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, navigate } from "@reach/router";
import { PrimaryButton, DefaultButton, Stack } from "office-ui-fabric-react";

import Container from "../../components/container";

import FormikCheckbox from "../../components/formik/checkbox";
import FormikTextfield from "../../components/formik/textfield";
import FormikDatepicker from "../../components/formik/datepicker";

const Item = ({ itemId }) => {
  const { items } = useStoreState(store => store.macs);
  const { addMac, listMacs } = useStoreActions(store => store.macs);

  const item = items.find(item => item.id === itemId) || {
    owner: "",
    serial: "",
    dateFrom: "",
    dateTo: "",
    hostname: "",
    rentId: "",
    antivirus: false,
    encryption: false
  };

  const handleSubmit = values => {
    addMac({ id: itemId, ...values });
    navigate("/app/list");
    //console.log("ciaone");
  };

  useEffect(() => {
    listMacs();
  }, [listMacs]);

  return (
    <Container>
      <h1>{itemId ? "Aggiorna cose" : "Inserisci cose"}</h1>

      <Formik
        enableReinitialize={true}
        onSubmit={handleSubmit}
        initialValues={item}
        validationSchema={Yup.object().shape({
          owner: Yup.string().required("owner is required"),
          serial: Yup.string().required("serial is required"),
          antivirus: Yup.string().required("antivirus is required"),
          encryption: Yup.string().required("encryption is required")
        })}
      >
        {props => {
          {
            const { touched, errors } = props;
            return (
              <Form>
                <FormikTextfield
                  error={errors.owner}
                  touchedField={touched.owner}
                  name="owner"
                  label="Possessore"
                  {...props}
                />
                <FormikTextfield
                  error={errors.serial}
                  name="serial"
                  label="Numero di serie"
                  {...props}
                />
                <FormikDatepicker
                  name="dateFrom"
                  label="Data inizio contratto"
                  {...props}
                />
                <FormikDatepicker
                  name="dateTo"
                  label="Data inizio contratto"
                  {...props}
                />
                <FormikTextfield
                  error={errors.hostname}
                  name="hostname"
                  label="Nome computer"
                  {...props}
                />
                <FormikTextfield
                  error={errors.rentId}
                  name="rentId"
                  label="Codice contratto"
                  {...props}
                />
                <FormikTextfield
                  error={errors.note}
                  name="note"
                  label="Note"
                  multiline
                  {...props}
                />

                <Stack tokens={{ childrenGap: 16, padding: "16px 0" }}>
                  <FormikCheckbox
                    error={errors.antivirus}
                    name="antivirus"
                    label="Sul computer è stato installato un antivirus e non verrà disattivato durante l'uso"
                    {...props}
                  />

                  <FormikCheckbox
                    error={errors.encryption}
                    name="encryption"
                    label="Sul computer è attivo un sistema di cifratura del disco"
                    {...props}
                  />
                </Stack>

                <Stack horizontal tokens={{ childrenGap: 8 }}>
                  <Stack.Item>
                    <Link to="/app/list">
                      <DefaultButton>{"Indietro"}</DefaultButton>
                    </Link>
                  </Stack.Item>
                  <Stack.Item>
                    <PrimaryButton type="submit">{"Salva"}</PrimaryButton>
                  </Stack.Item>
                </Stack>
              </Form>
            );
          }
        }}
      </Formik>
    </Container>
  );
};

export default Item;
