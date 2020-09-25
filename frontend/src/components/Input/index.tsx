import React from "react";

import {
  Container,
  ErrorContainer,
  TextInput,
  ErrorMessage,
  Label,
} from "./styles";

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}
function Input({ label, error, ...rest }: InputProps) {
  return (
    <Container>
      <Label>{label}</Label>
      <TextInput {...rest} error={error} />
      {error && (
        <ErrorContainer>
          <ErrorMessage>{error}</ErrorMessage>
        </ErrorContainer>
      )}
    </Container>
  );
}

export default Input;
