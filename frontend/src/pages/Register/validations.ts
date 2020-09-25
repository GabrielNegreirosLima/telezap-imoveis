import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  cep: Yup.string()
    .min(8, "Muito curto")
    .max(50, "Muito longo")
    .required("O campo CEP é obrigatório"),
  city: Yup.string()
    .min(2, "Muito curto")
    .max(50, "Muito longo")
    .required("O campo cidade é obrigatório"),
  state: Yup.string()
    .min(2, "Muito curto")
    .max(50, "Muito longo")
    .required("O campo estado é obrigatório"),
  email: Yup.string().email("Invalid email").required("Required"),
});
