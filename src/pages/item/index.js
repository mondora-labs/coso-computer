import React, { useEffect } from "react";

import styled from "styled-components";
import useForm from "react-hook-form";

import {
  TextField,
  DatePicker,
  PrimaryButton,
  DefaultButton,
  Checkbox,
  Stack
} from "office-ui-fabric-react";
import { Link } from "@reach/router";

import Container from "../../components/container";

import { upsertMac } from "../../utils/firebase";

const Item = () => {
  const { register, handleSubmit, setValue } = useForm();

  const handleChange = ({ target }) => {
    setValue(target.name, target.value);
    console.log(target);
  };
  const handleDateChange = (date) => {
    setValue("dateFrom", date);
  };

  const onSubmit = (data, e) => {
    console.log("Submit event", e);
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

  return (
    <Container>
      <h1>{"Inserisci cose"}</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          onChange={handleChange}
          label="Possessore"
          name="owner"
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
            <Link to="/list">
              <DefaultButton>{"Annulla"}</DefaultButton>
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
