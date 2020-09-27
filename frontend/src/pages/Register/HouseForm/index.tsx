import React, { useState } from "react";
import { Formik } from "formik";
import Input from "../../../components/Input";

import { RegisterSchema } from "../validations";

import {
  Form,
  TitleSection,
  Row,
} from "../styles";
import Button from "../../../components/Button";

function HouseForm() {
  return (
    <Formik
      initialValues={{
        cep: "",
        city: "",
        state: "",
        address: "",
        number: "",
        neighborhood: "",
        decription: "",
        area: "",
        bathrooms: "",
        bedrooms: "",
        suites: "",
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
            type="number"
            placeholder="00000-000"
            maxlength="8"
          />
          <Input label="Estado" name="state" type="text" />
          <Input label="Cidade" name="city" type="text" />
          <Input label="Bairro" name="neighborhood" type="text" />
          <Input label="Endereço" name="address" type="text" />
          <Input
            label="Número"
            name="number"
            type="number"
            placeholder="Ex: 221"
          />

          <TitleSection>Dados principais do imóvel</TitleSection>

          <Row>
            <Input label="Área (m²)" name="area" type="number" placeholder="0" />
            <Input label="Quartos" name="bedrooms" type="number" placeholder="0" />
          </Row>
          <Row>
            <Input label="Banheiros" name="bathrooms" type="number" placeholder="0" />
            <Input label="Suítes" name="suites" type="number" placeholder="0" />
          </Row>
          <Row>
            <Input label="Vagas" name="carspaces" type="number" placeholder="0" />
          </Row>
          <Input textarea label="Descrição" name="description" type="number" />

          <TitleSection>Quanto custa o imóvel?</TitleSection>

          <Input
            label="Valor"
            name="cep"
            type="number"
            placeholder=""
          />

          <Button title="Salvar" primary type="submit" />
        </Form>
      )}
    </Formik>
  );
}

export default HouseForm;