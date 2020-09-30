import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { AxiosResponse } from "axios";

import { ApartmentSchema } from "../validations";

import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { createApartment, fetchNeighborhoods } from "../../../api";
import { FetchNeighborhoodResponse, Apartment } from "../../../api/types";

import { FormWrapper, TitleSection, Row } from "../styles";

interface ApartmentFormProps {
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
  floor: string;
  hasDoorman: boolean;
  dinnerRooms: string;
  priceCondominium: string;
  complement: string;
}
function ApartmentForm() {
  const [neighborhoods, setNeighborhoods] = useState(
    [] as Array<FetchNeighborhoodResponse>
  );

  function handleSubmit(values: ApartmentFormProps) {
    const price = Number(
      values.price.replace("R$", "").replace(".", "").replace(",", ".")
    );
    const priceCondominium = Number(
      values.priceCondominium
        .replace("R$", "")
        .replace(".", "")
        .replace(",", ".")
    );
    const apartment = {
      Floor: Number(values.floor),
      HasDoorman: values.hasDoorman,
      Number: Number(values.complement),
      PriceCondominium: priceCondominium,
      QtdDinerRooms: Number(values.dinnerRooms),
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
    } as Apartment;

    if (values.neighborhood === "other") {
      apartment.Immobile.Address.Neighborhood = {
        Name: values.newNeighborhood,
      };
    } else {
      apartment.Immobile.Address.NeighborhoodID = Number(values.neighborhood);
    }

    createApartment(apartment)
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
        floor: "",
        hasDoorman: false,
        dinnerRooms: "",
        priceCondominium: "",
        complement: "",
      }}
      enableReinitialize
      validationSchema={ApartmentSchema}
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
              placeholder="Ex: 2212"
            />
            <Input
              label="Número do apartamento"
              name="complement"
              type="number"
              placeholder="Ex: 101"
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
            <Row>
              <Input label="Andar" name="floor" type="number" placeholder="0" />
              <Input
                label="Salas de jantar"
                name="dinnerRooms"
                type="number"
                placeholder="0"
              />
            </Row>
            <Row>
              <Input
                label="Possui armario embutido"
                name="haveCloset"
                type="checkbox"
              />
              <Input
                label="Possui porteiro"
                name="hasDoorman"
                type="checkbox"
              />
            </Row>
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
            <Input
              money
              label="Valor do condomínio"
              name="priceCondominium"
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

export default ApartmentForm;
