import { Outlet, useParams } from "react-router-dom";
import * as S from "./styles";

export function Forms() {
  const { id } = useParams();

  return (
    <>
      <Outlet />
      <div>
        <h1>minhamae</h1>
        <h2>ID: {id}</h2>
        <S.Root>
          <S.Trigger>Um botão</S.Trigger>
          <S.Portal>
            <S.Overlay />
            <S.Content>
              <S.Title>Title</S.Title>
              <S.Description>Description</S.Description>
              <S.Close>X</S.Close>
              <button>Confirmar</button>
            </S.Content>
          </S.Portal>
        </S.Root>
      </div>
    </>
  );
}
