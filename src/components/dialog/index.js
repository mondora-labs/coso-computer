import React from "react";

import {
  Dialog,
  DialogType,
  PrimaryButton,
  DialogFooter
} from "office-ui-fabric-react";

const NormalDialog = ({
  hidden = true,
  onDismiss = () => {},
  title = "",
  subText = "",
  handleConfirm,
  confirmLabel = "Procedi"
}) => {
  return (
    <Dialog
      hidden={hidden}
      onDismiss={onDismiss}
      dialogContentProps={{
        type: DialogType.normal,
        title: title,
        subText: subText
      }}
    >
      {handleConfirm && (
        <DialogFooter>
          <PrimaryButton onClick={handleConfirm}>{confirmLabel}</PrimaryButton>
        </DialogFooter>
      )}
    </Dialog>
  );
};

export default NormalDialog;
