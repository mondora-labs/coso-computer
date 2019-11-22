import React, { useEffect } from "react";

import { useStoreActions, useStoreState } from "easy-peasy";
import useForm from "react-hook-form";

import { Link, navigate } from "@reach/router";
import {
  TextField,
  DatePicker,
  PrimaryButton,
  DefaultButton,
  Checkbox,
  Stack
} from "office-ui-fabric-react";

import Container from "../../components/container";

const Item = ({ itemId }) => {
  const { items } = useStoreState(store => store.macs);

  const item = items.find(item => item.id === itemId) || {
    owner: ""
  };

  console.log({ items, item, itemId });

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: item
  });

  const { addMac, listMacs } = useStoreActions(store => store.macs);

  const handleChange = ({ target }) => {
    setValue(target.name, target.value);
  };
  const handleDateChange = (date, e) => {
    console.log(e);

    // setValue("dateFrom", date);
  };

  const onSubmit = data => {
    addMac(data);

    navigate("/app/list");
  };

  useEffect(() => {
    register({ name: "owner" });
    register({ name: "serial" });
    register({ name: "dateFrom" });
    register({ name: "dateTo" });
    register({ name: "hostName" });
    register({ name: "rentId" });
    register({ name: "note" });
    register({ name: "antivirus" });
    register({ name: "encryption" });
  }, [register]);

  useEffect(() => {
    listMacs();
  }, [listMacs]);

  return (
    <Container>
      <h1>{itemId ? "Aggiorna cose" : "Inserisci cose"}</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Possessore"
          name="owner"
          onChange={handleChange}
          defaultValue={item.owner || ""}
          placeholder="Please enter text here"
        />
        <TextField
          onChange={handleChange}
          name="serial"
          label="Numero di serie"
          placeholder="Please enter text here"
        />

        <DatePicker
          onSelectDate={handleDateChange}
          name="dateFrom"
          placeholder="Select a date..."
          label="Data inizio contratto"
          styles={{ root: { width: 200 } }}
        />

        <DatePicker
          onSelectDate={handleDateChange}
          name="dateTo"
          placeholder="Select a date..."
          label="Data fine contratto"
          styles={{ root: { width: 200 } }}
        />

        <TextField
          onChange={handleChange}
          name="hostName"
          label="Nome computer"
          placeholder="Please enter text here"
        />
        <TextField
          onChange={handleChange}
          name="rentId"
          label="Codice contratto"
          placeholder="Please enter text here"
        />

        <TextField
          onChange={handleChange}
          name="note"
          label="Note"
          multiline
          placeholder="Please enter text here"
        />

        <Stack tokens={{ childrenGap: 16, padding: "16px 0" }}>
          <Checkbox
            onChange={handleChange}
            name="antivirus"
            label="Sul computer è stato installato un antivirus e non verrà disattivato durante l'uso"
          />
          <Checkbox
            onChange={handleChange}
            name="encryption"
            label="Sul computer è attivo un sistema di cifratura del disco"
          />
        </Stack>

        <Stack horizontal tokens={{ childrenGap: 8 }}>
          <Stack.Item>
            <Link to="/app/list">
              <DefaultButton>{"Indietro"}</DefaultButton>
            </Link>
          </Stack.Item>
          <Stack.Item>
            <PrimaryButton type="submit">{"Salva"}</PrimaryButton>
          </Stack.Item>
        </Stack>
      </form>
    </Container>
  );
};

export default Item;
