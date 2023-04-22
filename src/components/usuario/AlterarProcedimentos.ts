import styled from "styled-components";

export const AlterarProcedimentos = styled.div`
  label {
    color: gray;
    margin-top: 1.6rem;
    margin-bottom: 0.4rem;
  }

  input[type="text"],
  [type="password"],
  [type="email"],
  [type="number"],
  select {
    background: #f5f5f5;
    border: none;
    border-radius: 10px;
    height: 3.4rem;
    outline: none;
    padding: 0 0.8rem;
    color: #5f5f5f;
    width: 100%;

    &:focus {
      box-shadow: 0 0 5px #a2a2a2;
    }
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      font-weight: bold;
      color: gray;
      margin: 0 0.3rem;
    }

    a {
      color: gray;
    }
  }
`;
