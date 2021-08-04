import React, { useEffect } from "react";

import { useStoreState, useStoreActions } from "easy-peasy";

import {
  Persona,
  PersonaSize,
  DocumentCard,
  DocumentCardDetails,
  DocumentCardTitle,
  DocumentCardStatus,
} from "office-ui-fabric-react";

import styled from "styled-components";

import Container from "../../components/container";

const Card = styled(DocumentCard)`
  display: inline-block;
  margin: 16px;
`;

const Landing = () => {
  const user = useStoreState((state) => state.user);
  const { listMacs } = useStoreActions((store) => store.macs);
  const { items, fetched } = useStoreState((store) => store.macs);

  useEffect(() => {
    if (!fetched) {
      listMacs();
    }
  }, [fetched, listMacs]);

  const userItems = items.filter((item) => item.owner === user.name);

  const profile = {
    imageUrl: user.photo,
    text: user.name,
    secondaryText: user.email,
  };

  console.log(userItems);
  return (
    <Container>
      <Persona {...profile} size={PersonaSize.size120} />
      {userItems.map((item) => (
        <Card key={item.id}>
          <DocumentCardDetails>
            <DocumentCardTitle title={item.hostname} shouldTruncate />
            <DocumentCardTitle
              title={item.serial}
              shouldTruncate
              showAsSecondaryTitle
            />
            <DocumentCardStatus
              statusIcon={item.antivirus ? "Accept" : "Warning"}
              status="Antivirus"
            />
            <DocumentCardStatus
              statusIcon={item.encryption ? "Accept" : "Warning"}
              status="Cifratura disco"
            />
          </DocumentCardDetails>
        </Card>
      ))}
    </Container>
  );
};

export default Landing;
