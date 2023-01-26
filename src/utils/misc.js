import { useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";

export const isItemPersonal = (user, item) => {
  if (item.ownerEmail && user.email) {
    return item.ownerEmail.toLowerCase() === user.email.toLowerCase();
  }

  return item.owner.toLowerCase() === user.name.toLowerCase();
};

export const UserItems = (name, email) => {
  const { listMacs } = useStoreActions((store) => store.macs);
  const { items, fetched } = useStoreState((store) => store.macs);

  const user = {
    name: name,
    email: email,
  };

  useEffect(() => {
    if (!fetched) {
      listMacs();
    }
  }, [fetched, listMacs]);

  return items
    .filter((item) => isItemPersonal(user, item))
    .sort((a, b) => (a.dateFrom < b.dateFrom ? 1 : -1));
};
