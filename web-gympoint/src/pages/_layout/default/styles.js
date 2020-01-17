import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 100%;
  background: #f5f5f5;
`;
export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContentModal = styled.div`
  height: auto;
  min-width: 400px;
  display: flex;
  flex-direction: column;

  strong {
    font-size: 20px;
    font-weight: bold;
    color: #333;

    span {
      color: #ee4d64;
    }
  }
`;

export const ModalRemoveConfirm = styled.button`
  margin: 5px 0 0;
  height: 44px;
  background: #ee4d64;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  transition: background 0.3s;

  &:hover {
    background: ${darken(0.1, '#ee4d64')};
  }
`;

export const ModalCancelRemove = styled.button`
  margin: 5px 0 0;
  height: 44px;
  background: #04a8ce;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  transition: background 0.3s;

  &:hover {
    background: ${darken(0.1, '#04a8ce')};
  }
`;
