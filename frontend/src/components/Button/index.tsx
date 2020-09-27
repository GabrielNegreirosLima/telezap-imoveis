import React from "react";

import { Container, Text } from "./styles";

interface ButtonProps {
  title: string;
  onClick?: () => any;
  primary?: boolean;
  type?: any;
}

function Button({ title, primary, ...props }: ButtonProps) {
  return (
    <Container {...props} primary={primary}>
      <Text primary={primary}>{title}</Text>
    </Container>
  );
}

export default Button;
