import * as Yup from "yup";

export const ApartmentSchema = Yup.object().shape({
  address: Yup.string().required("O campo endereço é obrigatório"),
  number: Yup.string().required("O campo número é obrigatório"),
  neighborhood: Yup.string().required("O campo bairro é obrigatório"),
  newNeighborhood: Yup.string().when("neighborhood", {
    is: (option) => option && option === "other",
    then: Yup.string().required("O campo novo bairro é obrigatório"),
  }),
  description: Yup.string().required("O campo descrição é obrigatório"),
  area: Yup.number().required("O campo área é obrigatório"),
  bedrooms: Yup.number().required("O campo quartos é obrigatório"),
  suites: Yup.number().required("O campo suites é obrigatório"),
  carSpaces: Yup.number().required("O campo vagas é obrigatório"),
  price: Yup.string().required("O campo preço é obrigatório"),
  complement: Yup.number().required("O campo complemento é obrigatório"),
  dinnerRooms: Yup.number().required("O campo salas de jantar é obrigatório"),
  floor: Yup.number().required("O campo andar é obrigatório"),
  priceCondominium: Yup.string().required(
    "O campo preço do condomínio é obrigatório"
  ),
});

export const HouseSchema = Yup.object().shape({
  address: Yup.string().required("O campo endereço é obrigatório"),
  number: Yup.string().required("O campo número é obrigatório"),
  neighborhood: Yup.string().required("O campo bairro é obrigatório"),
  newNeighborhood: Yup.string().when("neighborhood", {
    is: (option) => option && option === "other",
    then: Yup.string().required("O campo novo bairro é obrigatório"),
  }),
  description: Yup.string().required("O campo descrição é obrigatório"),
  area: Yup.number().required("O campo área é obrigatório"),
  bedrooms: Yup.number().required("O campo quartos é obrigatório"),
  suites: Yup.number().required("O campo suites é obrigatório"),
  carSpaces: Yup.number().required("O campo vagas é obrigatório"),
  price: Yup.string().required("O campo preço é obrigatório"),
});
