import React from "react";

import { TooltipHost, DirectionalHint } from "office-ui-fabric-react";

const Tooltip = ({ children, cursor, ...rest }) => {
  return (
    <TooltipHost
      styles={{ root: { display: "inline-block", cursor: cursor }}}
      {...rest}
      directionalHint={DirectionalHint.bottomCenter}
    >
      {children}
    </TooltipHost>
  );
};

export default Tooltip;
