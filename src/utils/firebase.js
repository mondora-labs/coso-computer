import firebase from "firebase";
import uuid from "uuid/v4";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "coso-computer.firebaseapp.com",
  projectId: "coso-computer"
});

export const login = async () => {
  try {
    const result = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider());

    console.log({ result });
    return true;
  } catch (error) {
    console.error({ error });
    return false;
  }
};

export const getMacs = async () => {
  let items = [];

  const querySnapshot = await firebase
    .firestore()
    .collection("macs")
    .get();

  querySnapshot.forEach(doc => items.push(doc.data()));

  items.forEach(x => console.log(x.id));

  return items;
};

export const upsertMac = async mac => {
  console.log("upsert a mac", mac);

  const id = mac.id || uuid();

  try {
    await firebase
      .firestore()
      .collection("macs")
      .doc(id)
      .set({
        id: id,
        owner: mac.owner || "",
        serial: mac.serial || "",
        dateFrom: mac.dateFrom || "",
        dateTo: mac.dateTo || "",
        hostname: mac.hostname || "<...>",
        rentId: mac.rentId || "#",
        note: mac.note || "Nessuna nota.",
        antivirus: mac.antivirus || false,
        encryption: mac.encryption || false
      });
  } catch (error) {
    console.log(error);
  }
};

export const deleteMac = async id => {
  console.log("delete a mac", id);

  if (!id) {
    return;
  }

  try {
    await firebase
      .firestore()
      .collection("macs")
      .doc(id)
      .delete()
      .then(function() {
        console.log("Document successfully deleted!");
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
  } catch (error) {
    console.log(error);
  }
};
