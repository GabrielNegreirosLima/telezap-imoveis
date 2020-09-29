import React from "react";
import { useField } from "formik";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

import {
  Container,
  ErrorContainer,
  TextInput,
  ErrorMessage,
  Label,
  TextAreaInput,
  Select,
} from "./styles";

const moneyMaskOptions = {
  prefix: "R$",
  suffix: "",
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ".",
  allowDecimal: true,
  decimalSymbol: ",",
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 7, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
};

interface InputProps {
  error?: string;
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  maxlength?: string;
  textarea?: boolean;
  select?: boolean;
  children?: React.ReactNode;
  money?: boolean;
}

function Input({
  label,
  textarea,
  select,
  money,
  children,
  ...props
}: InputProps) {
  const [field, meta] = useField(props);
  return (
    <Container>
      <Label>{label}</Label>
      {textarea ? (
        <TextAreaInput error={meta.error} {...field} {...props} />
      ) : select ? (
        <Select error={meta.error} {...field} {...props}>
          {children}
        </Select>
      ) : money ? (
        <MaskedInput
          {...field}
          {...props}
          mask={createNumberMask(moneyMaskOptions)}
          style={{
            padding: 12,
            border: "1px solid #979797",
            borderRadius: 4,
            borderColor: meta.error ? "#a50000" : "#979797",
          }}
        />
      ) : (
        <TextInput error={meta.error} {...field} {...props} />
      )}

      {meta.touched && meta.error && (
        <ErrorContainer>
          <ErrorMessage>{meta.error}</ErrorMessage>
        </ErrorContainer>
      )}
    </Container>
  );
}

export default Input;
