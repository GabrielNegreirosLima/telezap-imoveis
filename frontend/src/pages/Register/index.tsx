import React, { useState } from "react";
import { Formik, Field } from "formik";

import Header from "../../components/Header";
import Button from "../../components/Button";
import Input from "../../components/Input";

import { RegisterSchema } from "./validations";

import {
  Container,
  ContentContainer,
  FormTitle,
  ButtonContainer,
  Form,
  TitleSection,
} from "./styles";

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
          <Formik
            initialValues={{
              cep: "",
              city: "",
              state: "",
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values) => {
              // same shape as initial values
              console.log(values);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <TitleSection>Onde fica seu imóvel?</TitleSection>

                <Input
                  label="CEP"
                  name="cep"
                  type="text"
                  error={errors.cep || "dfsfa"}
                />
                <Input
                  label="Cidade"
                  name="city"
                  error={touched.city ? errors.city : ""}
                />
                <Input
                  label="Estado"
                  name="state"
                  error={touched.state ? errors.state : ""}
                />

                <button type="submit">Submit</button>
              </Form>
            )}
          </Formik>
        ) : null}
      </ContentContainer>
    </Container>
  );
}

export default Register;
