import React, { useState } from "react";

import Header from "../../components/Header";
import Button from "../../components/Button";
import HouseForm from "./HouseForm";

import {
  Container,
  ContentContainer,
  FormTitle,
  ButtonContainer,
} from "./styles";
import ApartmentForm from "./ApartmentForm";

enum ImmobileType {
  house = "house",
  apartment = "apartment",
}

function Register() {
  const [immobileType, setImmobileType] = useState(ImmobileType.house);
  return (
    <Container>
      <Header />
      <ContentContainer>
        <FormTitle>Seu imóvel é:</FormTitle>
        <ButtonContainer>
          <Button
            title="Casa"
            primary={immobileType === ImmobileType.house}
            onClick={() => setImmobileType(ImmobileType.house)}
          />
          <Button
            title="Apartamento"
            primary={immobileType === ImmobileType.apartment}
            onClick={() => setImmobileType(ImmobileType.apartment)}
          />
        </ButtonContainer>
        {immobileType === ImmobileType.house ? (
          <HouseForm />
        ) : (
          <ApartmentForm />
        )}
      </ContentContainer>
    </Container>
  );
}

export default Register;
