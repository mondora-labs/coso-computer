import firebase from "firebase";
import uuid from "uuid/v4";

firebase.initializeApp({
  apiKey: "AIzaSyCSrn0Muuaaa7qElThUF4qSVz7ejh97jUE",
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
  console.log("upsert a mac");

  try {
    await firebase
      .firestore()
      .collection("macs")
      .doc(mac.id || uuid())
      .set({
        id: uuid(),
        owner: "Owner Name",
        serial: "C02VX19JHTDF",
        dateFrom: "20/01/2017",
        dateTo: "20/01/2017",
        hostName: "hostName",
        rentId: "514132",
        note: "Nota",
        antivirus: true,
        encryption: true
      });
  } catch (error) {
    console.log(error);
  }
};
