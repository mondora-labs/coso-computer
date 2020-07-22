import React from "react";

import {
  Dialog,
  DialogType,
  PrimaryButton,
  DialogFooter,
  ProgressIndicator
} from "office-ui-fabric-react";

const NormalDialog = ({
  hidden = true,
  onDismiss = () => { },
  title = "",
  subText = "",
  handleConfirm,
  confirmLabel = "Procedi",
  icon = "",
  progressLabel = "",
  percent
}) => {
  return (
    <Dialog
      hidden={hidden}
      onDismiss={onDismiss}
      dialogContentProps={{
        type: DialogType.largeHeader,
        title: title,
        subText: subText
      }}
    >
      {progressLabel && (
        <ProgressIndicator percentComplete={percent} description={progressLabel} />)}
      {handleConfirm && (
        <DialogFooter>
          <PrimaryButton iconProps={{ iconName: icon }} onClick={handleConfirm}>{confirmLabel}</PrimaryButton>
        </DialogFooter>
      )}
    </Dialog>
  );
};

export default NormalDialog;
