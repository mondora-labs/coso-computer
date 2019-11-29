import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import moment from "moment";
import uuid from "uuid/v4";

import getDiff from "./diff";

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

export const getCollection = async collectionName => {
  let items = [];

  const querySnapshot = await firebase
    .firestore()
    .collection(collectionName)
    .get();

  querySnapshot.forEach(doc => items.push(doc.data()));
  console.log("list collection", collectionName, items);

  return items;
};

export const getLogs = async () => {
  const logs = await getCollection("logs");
  return logs;
};

export const getMacs = async () => {
  const macs = await getCollection("macs");
  return macs;
};

export const upsertMac = async mac => {
  try {
    const firestore = firebase.firestore();
    const batch = firestore.batch();

    const oldDocRef = await firestore
      .collection("macs")
      .doc(mac.id)
      .get();

    const oldMac = oldDocRef.data() || {};

    const newMac = {
      id: mac.id,
      owner: mac.owner || "",
      serial: mac.serial || "",
      dateFrom: mac.dateFrom || "",
      dateTo: mac.dateTo || "",
      hostname: mac.hostname || "",
      rentId: mac.rentId || "",
      note: mac.note || "Nessuna nota.",
      antivirus: mac.antivirus || false,
      encryption: mac.encryption || false
    };

    const diff = getDiff(oldMac, newMac);
    const log = {
      who: firebase.auth().currentUser.email,
      timestamp: moment.utc().format(),
      diff
    };

    console.log("upsert a mac", mac, log);

    const logRef = firestore.collection("logs").doc(uuid());
    const macRef = firestore.collection("macs").doc(newMac.id);

    batch.set(logRef, log);
    batch.set(macRef, newMac);
    batch.commit();
  } catch (error) {
    console.log(error);
  }
};

export const deleteMac = async mac => {
  try {
    const log = {
      who: firebase.auth().currentUser.email,
      timestamp: moment.utc().format(),
      removed: true,
      record: mac
    };
    console.log("delete a mac", mac, log);

    const firestore = firebase.firestore();
    const batch = firestore.batch();

    const logRef = firestore.collection("logs").doc(uuid());
    const macRef = firestore.collection("macs").doc(mac.id);

    batch.set(logRef, log);
    batch.delete(macRef);
    batch.commit();
  } catch (error) {
    console.log(error);
  }
};
