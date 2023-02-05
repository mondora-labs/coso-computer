import moment from "moment";

import { UserItems } from "./misc";
import { BUDGET } from "../config";

const LatestComputer = (userItems) =>
  userItems.reduce((prev, curr) =>
    curr.device === "computer" &&
    curr.ownership !== "muletto" &&
    (prev.device !== "computer" ||
      prev.ownership === "muletto" ||
      curr.dateFrom >= prev.dateFrom)
      ? curr
      : prev
  );

export const ResidualBudget = (name, email) => {
  const userItems = UserItems(name, email);
  if (userItems.length) {
    const latestComputer = LatestComputer(userItems);
    const spent = userItems.reduce(
      (tot, item) =>
        item.ownership !== "muletto" && item.dateFrom >= latestComputer.dateFrom
          ? tot + Number(item.taxableAmount || 0)
          : tot,
      0
    );
    return BUDGET - spent;
  } else {
    return BUDGET;
  }
};

export const BudgetDate = (name, email) => {
  const userItems = UserItems(name, email);
  if (userItems.length) {
    const latestComputer = LatestComputer(userItems);
    return latestComputer.device === "computer" &&
      latestComputer.ownership !== "muletto"
      ? moment.utc(latestComputer.dateFrom)
      : 0;
  } else {
    return 0;
  }
};
