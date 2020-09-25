import React from "react";

import { Container, Text } from "./styles";

interface ButtonProps {
  title: string;
  onClick?: () => any;
  primary?: boolean;
}

function Button({ title, onClick, primary }: ButtonProps) {
  return (
    <Container onClick={onClick} primary={primary}>
      <Text primary={primary}>{title}</Text>
    </Container>
  );
}

export default Button;
