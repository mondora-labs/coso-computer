import React from "react";

import { navigate } from "@reach/router";
import {
    Dialog,
    DialogType,
    PrimaryButton,
    DialogFooter
} from "office-ui-fabric-react";

const UpcycleDialog = ({
    hidden = true,
    onDismiss = () => { },
}) => {
    return (
        <Dialog
            hidden={hidden}
            onDismiss={onDismiss}
            dialogContentProps={{
                type: DialogType.largeHeader,
                title: "Upcycle",
            }}
        >
            <DialogFooter>
                <PrimaryButton onClick={() => { navigate("/app/upcycled") }}>{"Salva"}</PrimaryButton>
            </DialogFooter>
        </Dialog>
    );
};

export default UpcycleDialog;
