import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;
interface TextInputProps {
  error?: string;
}
export const TextInput = styled.input<TextInputProps>`
  padding: 12px;
  border: 1px solid #979797;
  border-color: ${(props) => (props.error ? "#a50000" : "#979797")};
  border-radius: 4px;
`;
export const TextAreaInput = styled.textarea.attrs({
  cols: 30,
  rows: 10,
})<TextInputProps>`
  padding: 12px;
  border: 1px solid #979797;
  border-color: ${(props) => (props.error ? "#a50000" : "#979797")};
  border-radius: 4px;
`;
export const Select = styled.select<TextInputProps>`
  padding: 12px;
  border: 1px solid #979797;
  border-color: ${(props) => (props.error ? "#a50000" : "#979797")};
  border-radius: 4px;
`;
export const ErrorContainer = styled.div`
  margin: 2px;
`;
export const ErrorMessage = styled.span`
  color: #a50000;
  font-size: 0.75rem;
`;
export const Label = styled.span`
  color: #6f6f6f;
  font-size: 1rem;
  margin-bottom: 8px;
`;
