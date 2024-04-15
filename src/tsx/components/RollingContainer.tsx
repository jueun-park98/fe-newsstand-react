import React from "react";
import styled from "styled-components";

function RollingContainer() {
  return (
    <Container>
      <TextBox></TextBox>
      <TextBox></TextBox>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
`;

const TextBox = styled.div`
  width: 32.85em;
  height: 3.43em;
  border: 1px solid #d2dae0;
  background-color: #f5f7f9;
  overflow: hidden;
`;

export default RollingContainer;
