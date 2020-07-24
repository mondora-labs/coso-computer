import React from "react";

import { Formik, Form } from "formik";
import {
    Dialog,
    DialogType,
    Stack,
    PrimaryButton,
    DefaultButton
} from "office-ui-fabric-react";

import FormikCheckbox from "../../components/formik/checkbox";
import FormikTextfield from "../../components/formik/textfield";

const UpcycleDialog = ({
    hidden = true,
    onDismiss = () => { },
    item = ""
}) => {
    const handleSubmit = async (values) => {
        console.log("ciao sono submit");
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
                initialValues={{ item }}
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
                            <FormikTextfield name="orgNote" label="Note" multiline {...props} />
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
