import styled from "styled-components";

interface LoginFormButtonType {
  buttonAdv: boolean;
}

export const LoginContainer = styled.div`
  background: linear-gradient(#bc8f8f 57.5%, #fff 43.5%);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LoginLogo = styled.img`
  height: 2.5rem;
  margin-bottom: 2rem;
`;

export const LoginFormContainer = styled.div`
  width: calc(30% - 3.3rem);
  height: calc(70% - 3.3rem);
  background: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 3.3rem;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);

  label {
    color: gray;
    margin-top: 1.4rem;
    margin-bottom: 0.4rem;
    font-size: 0.9rem;
  }

  input {
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

  button {
    /* outline: none;
      border: none;
      height: 4rem;
      background: #4ed1d1;
      margin-top: 1rem;
      border-radius: 10px;
      color: white;
      cursor: pointer;

      &:disabled {
         background: #ccc;
      } */
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20%;

    span {
      font-weight: bold;
      color: gray;
      margin: 0 0.3rem;
      font-size: 0.9rem;
    }

    a {
      color: gray;
      font-size: 0.95rem;
    }
  }
`;
export const LoginWelcome = styled.div`
  width: calc(30% - 3.3rem);
  height: calc(70% - 3.3rem);
  background: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 3.3rem;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20%;
    font-size: 1.2rem;

    a {
      color: gray;
      font-size: 0.95rem;
    }

    h1 {
      color: gray;
    }
  }
`;
export const LoginFooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  font-size: 0.9rem;

  span {
    margin-right: 0.2rem;
  }

  button {
    margin-left: 0.2rem;
    background: #946565;
    outline: none;
    border-radius: 2rem;
    height: 2.5rem;
    font-size: 0.8rem;
    cursor: pointer;
    width: 10rem;
    border: none;
    color: white;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const LoginFormFirstButton = styled.button`
  outline: none;
  border: none;
  height: 4.5rem;
  background: #bc8f8f;
  margin-top: 1rem;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  cursor: pointer;

  background-position: center;
  transition: background 0.8s;

  &:hover {
    background: #946565 radial-gradient(circle, transparent 1%, #946565 1%)
      center/15000%;
  }

  &:active {
    background-color: #946565;
    background-size: 100%;
    transition: background 0s;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const LoginPassIcon = styled.img`
  position: absolute;
  top: 34%;
  left: 90%;
  width: 1.8rem;
  cursor: pointer;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.92);
  }
`;
