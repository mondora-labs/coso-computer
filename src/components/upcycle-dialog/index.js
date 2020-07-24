import React from "react";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
    Dialog,
    DialogType,
    Stack,
    PrimaryButton,
    DefaultButton
} from "office-ui-fabric-react";

import FormikCheckbox from "../../components/formik/checkbox";
import FormikTextfield from "../../components/formik/textfield";

const itemInitialValues = {
    orgName: "",
    orgAddress: "",
    orgKind: "",
    formatted: false,
};

const UpcycleDialog = ({
    hidden = true,
    onDismiss = () => { },
    item = ""
}) => {
    const handleSubmit = async (values) => {
        console.log("ciao sono submit");
        console.log(values);
    };
    return (
        <Dialog
            hidden={hidden}
            onDismiss={onDismiss}
            minWidth="600px"
            dialogContentProps={{
                type: DialogType.largeHeader,
                title: "Upcycle",
                subText: "Inserisci i dati dell'ente a cui verrà donato il device"
            }}
        >
            <Formik enableReinitialize={true}
                onSubmit={handleSubmit}
                initialValues={{ ...itemInitialValues, ...item }}
                validationSchema={Yup.object().shape({
                    orgName: Yup.string()
                        .min(2, "Numero di caratteri insufficiente")
                        .max(100, "Numero di caratteri eccessivo")
                        .required("Nome ente richiesto"),
                    orgAddress: Yup.string()
                        .min(2, "Numero di caratteri insufficiente")
                        .max(100, "Numero di caratteri eccessivo")
                        .required("Indirizzo ente richiesto"),
                    orgKind: Yup.string()
                        .min(2, "Numero di caratteri insufficiente")
                        .max(100, "Numero di caratteri eccessivo")
                        .required("Tipologia ente richiesta"),
                    formatted: Yup.bool().oneOf([true], "Il device deve essere formattato")
                })}
            >
                {(props) => {
                    return (
                        <Form>
                            <FormikTextfield
                                name="orgName"
                                label="Nome ente"
                                {...props}
                            />
                            <FormikTextfield
                                name="orgAddress"
                                label="Sede legale"
                                {...props}
                            />
                            <FormikTextfield
                                name="orgKind"
                                label="Tipologia ente"
                                {...props}
                            />
                            <br />
                            <FormikTextfield name="note" label="Note" multiline {...props} />
                            <Stack tokens={{ padding: "16px 0" }}>
                                <FormikCheckbox
                                    name="formatted"
                                    label="Il device è stato formattato"
                                    {...props}
                                />
                            </Stack>

                            <Stack horizontal tokens={{ childrenGap: 16 }}>
                                <Stack.Item>
                                    <DefaultButton onClick={() => {
                                        console.log("Indietro")
                                    }}>{"Indietro"}</DefaultButton>
                                </Stack.Item>
                                <Stack.Item>
                                    <PrimaryButton type="submit">{"Salva"}</PrimaryButton>
                                </Stack.Item>
                            </Stack>
                        </Form>
                    );
                }}
            </Formik>
        </Dialog>
    );
};

export default UpcycleDialog;
