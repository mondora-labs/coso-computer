export const isItemPersonal = (user, item) => {
  if (item.ownerEmail) {
    return item.ownerEmail.toLowerCase() === user.email.toLowerCase();
  }

  return item.owner.toLowerCase() === user.name.toLowerCase();
};
