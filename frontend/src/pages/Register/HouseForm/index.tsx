import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { AxiosResponse } from "axios";

import { HouseSchema } from "../validations";

import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { createHouse, fetchNeighborhoods } from "../../../api";
import { FetchNeighborhoodResponse, House } from "../../../api/types";

import { FormWrapper, TitleSection, Row } from "../styles";

interface HouseFormProps {
  price: string;
  bedrooms: string;
  haveCloset: boolean;
  area: string;
  carSpaces: string;
  suites: string;
  description: string;
  address: string;
  number: string;
  neighborhood: string;
  newNeighborhood: string;
}
function HouseForm() {
  const [neighborhoods, setNeighborhoods] = useState(
    [] as Array<FetchNeighborhoodResponse>
  );

  function handleSubmit(values: HouseFormProps) {
    const price = Number(values.price.replace("R$", "").replace(",", "."));
    const house = {
      Immobile: {
        Price: price,
        QtdBedrooms: Number(values.bedrooms),
        HaveCloset: values.haveCloset,
        Area: Number(values.area),
        QtdCarspaces: Number(values.carSpaces),
        QtdRooms: 0,
        QtdSuites: Number(values.suites),
        Summary: values.description,
        Address: {
          Street: values.address,
          Number: Number(values.number),
        },
      },
    } as House;

    if (values.neighborhood === "other") {
      house.Immobile.Address.Neighborhood = {
        Name: values.newNeighborhood,
      };
    } else {
      house.Immobile.Address.NeighborhoodID = Number(values.neighborhood);
    }

    createHouse(house)
      .then((response) => {
        console.log(response);
        alert("Sucesso\n\nImóvel criado com sucesso");
      })
      .catch((err) => alert("Ops\n\nAlgo deu errado ao tentar criar o imóvel"));
  }

  useEffect(() => {
    fetchNeighborhoods().then(
      (response: AxiosResponse<Array<FetchNeighborhoodResponse>>) => {
        setNeighborhoods(response.data);
      }
    );
  }, []);
  return (
    <Formik
      initialValues={{
        address: "",
        number: "",
        neighborhood: "",
        newNeighborhood: "",
        description: "",
        area: "",
        bedrooms: "",
        suites: "",
        haveCloset: false,
        carSpaces: "",
        price: "",
      }}
      enableReinitialize
      validationSchema={HouseSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ errors, touched, values }) => (
        <Form>
          <FormWrapper>
            <TitleSection>Onde fica seu imóvel?</TitleSection>

            <Input select label="Bairro" name="neighborhood" type="text">
              <option value={undefined} selected>
                Escolha o bairro
              </option>
              {neighborhoods.map((neighborhood) => (
                <option value={neighborhood.ID}>{neighborhood.Name}</option>
              ))}
              <option value="other">Outro</option>
            </Input>
            {values.neighborhood === "other" && (
              <Input label="Novo bairro" name="newNeighborhood" type="text" />
            )}
            <Input label="Endereço" name="address" type="text" />
            <Input
              label="Número"
              name="number"
              type="number"
              placeholder="Ex: 221"
            />

            <TitleSection>Dados principais do imóvel</TitleSection>

            <Row>
              <Input
                label="Área (m²)"
                name="area"
                type="number"
                placeholder="0"
              />
              <Input
                label="Quartos"
                name="bedrooms"
                type="number"
                placeholder="0"
              />
            </Row>
            <Row>
              <Input
                label="Suítes"
                name="suites"
                type="number"
                placeholder="0"
              />
              <Input
                label="Vagas"
                name="carSpaces"
                type="number"
                placeholder="0"
              />
            </Row>
            <Input
              label="Possui armario embutido"
              name="haveCloset"
              type="checkbox"
            />
            <Input
              textarea
              label="Descrição"
              name="description"
              type="number"
            />

            <TitleSection>Quanto custa o imóvel?</TitleSection>

            <Input
              money
              label="Valor"
              name="price"
              type="text"
              placeholder=""
            />

            <Button title="Salvar" primary type="submit" />
          </FormWrapper>
        </Form>
      )}
    </Formik>
  );
}

export default HouseForm;
