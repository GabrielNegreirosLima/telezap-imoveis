import React from "react";
import { Formik, useField } from "formik";

import {
  Container,
  ErrorContainer,
  TextInput,
  ErrorMessage,
  Label,
  TextAreaInput
} from "./styles";

interface InputProps {
  error?: string;
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  maxlength?: string;
  textarea?: boolean;
}
   
   function Input({ label, textarea, ...props}: InputProps) {
    const [field, meta] = useField(props);
  return (
    <Container>
      <Label>{label}</Label>
      {
        textarea ? (
          <TextAreaInput {...field} {...props}/>
        ) : (

          <TextInput {...field} {...props}/>
        )
      }

      {meta.touched && meta.error && (
        <ErrorContainer>
          <ErrorMessage>{meta.error}</ErrorMessage>
        </ErrorContainer>
      )}
    </Container>
  );
}

export default Input;
