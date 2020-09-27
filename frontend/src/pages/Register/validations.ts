import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  cep: Yup.string()
    .min(8, "CEP inválido")
    .max(8, "CEP inválido")
    .required("O campo CEP é obrigatório"),
  city: Yup.string().required("O campo cidade é obrigatório"),
  state: Yup.string().required("O campo estado é obrigatório"),
  address: Yup.string().required("O campo endereço é obrigatório"),
  number: Yup.string().required("O campo número é obrigatório"),
  neighborhood: Yup.string().required("O campo bairro é obrigatório"),
  description: Yup.string().required("O campo descrição é obrigatório"),
  area: Yup.number().required("O campo área é obrigatório"),
  bedrooms: Yup.number().required("O campo quartos é obrigatório"),
  bathrooms: Yup.number().required("O campo banheiros é obrigatório"),
  suites: Yup.number().required("O campo suites é obrigatório"),
  carspaces: Yup.number().required("O campo vagas é obrigatório"),

});
