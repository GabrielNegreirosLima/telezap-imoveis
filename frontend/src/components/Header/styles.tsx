import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 64px;
  background-color: #fff;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.24);

  padding: 8px 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.img.attrs({
  src: process.env.PUBLIC_URL + "/assets/TeleZapLogo.png",
})`
  width: 200px;
  height: 50px;
`;

export const LogoCefet = styled.img.attrs({
  src: process.env.PUBLIC_URL + "/assets/logo-cefetmg.png",
})`
  width: 90px;
  height: 45px;
`;
