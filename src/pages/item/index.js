import React from "react";

import styled from "styled-components";

import {
  TextField,
  DatePicker,
  PrimaryButton,
  DefaultButton,
  Checkbox
} from "office-ui-fabric-react";
import { Link } from "@reach/router";

import Container from "../../components/container";

import { upsertMac } from "../../utils/firebase";

const Item = () => {
  return (
    <Container>
      <h1>{"Inserisci cose"}</h1>

      <TextField label="Possessore" placeholder="Please enter text here" />
      <TextField label="Numero di serie" placeholder="Please enter text here" />

      <DatePicker
        placeholder="Select a date..."
        label="Data inizio contratto"
        styles={{ root: { width: 200 } }}
      />

      <DatePicker
        placeholder="Select a date..."
        label="Data fine contratto"
        styles={{ root: { width: 200 } }}
      />

      <TextField label="Nome computer" placeholder="Please enter text here" />
      <TextField
        label="Codice contratto"
        placeholder="Please enter text here"
      />

      <TextField label="Note" multiline placeholder="Please enter text here" />

      <Checkbox label="Sul computer è stato installato un antivirus e non verrà disattivato durante l'uso" />
      <Checkbox label="Sul computer è attivo un sistema di cifratura del disco" />

      <Link to="/list">
        <DefaultButton>{"Annulla"}</DefaultButton>
      </Link>

      <PrimaryButton onClick={upsertMac}>{"Salva"}</PrimaryButton>
    </Container>
  );
};

export default Item;
