import styled from "styled-components";

interface i {
  buttonAdv?: boolean;
}
export const CadastrarAgendamentoFooter = styled.div`
  display: flex !important;
  justify-content: space-between !important;
`;
export const CadastrarAgendamento = styled.div`
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

export const Buttons = styled.button<i>`
  // width: 5rem;
  // height: 2 rem;
  // padding: 4px;
  // font-size: 18px;
  // border-radius: 10px;
  // margin-top: 15px;
  // margin-bottom: 15px;
  // cursor: pointer;
  // color: gray;
  // margin: 0 10px;
  // background: white;

  outline: none;
  border: ${(props) => (props.buttonAdv ? "none" : "1px solid #cccccc")};
  height: 4.3rem;
  background: ${(props) => (props.buttonAdv ? "#b49797" : "#ffffff")};
  margin-top: 1rem;
  border-radius: 10px;
  color: ${(props) => (props.buttonAdv ? "#ffffff" : "#cccccc")};
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  width: 48%;
  margin-top: 1.6rem;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;
