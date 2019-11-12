import styled from 'styled-components';
import { darken } from 'polished';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 100%;
  margin: 40px 80px;
  /* Deixa todos os itens um abaixo do outro */
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    strong {
      font-size: 24px;
      color: #444444;
      text-align: right;
    }

    a {
      /* display: flex;
      align-items: center; */
      padding: 8px 15px;
      background: #ee4d64;
      font-weight: bold;
      color: #fff;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.3s;
      margin-right: 10px;

      &:hover {
        background: ${darken(0.1, '#ee4d64')};
      }

      span {
        margin-right: 5px;
      }
    }

    input {
      background: #fff;
      border: 1px solid #eee;
      border-radius: 4px;
      height: 44px;
      width: 200px;
      padding: 0 15px;
      margin: 0 0 12px;
      color: #333;

      &::placeholder {
        font-size: 16px;
        color: #999999;
      }
    }
  }
`;

export const StudentsTable = styled.table`
  width: 100%;
  background: #fff;
  border-radius: 6px;
  padding: 5px 10px;

  thead th {
    color: #999;
    text-align: left;
    font-size: 16px;
    font-weight: bold;
    color: #444;
    padding: 12px;
  }

  tbody td {
    padding: 12px;
    border-bottom: 1px solid #eee;
  }

  span {
    color: #666;
    display: block;
    line-height: 20px;
    font-weight: 500;
  }
`;

export const Age = styled.span`
  display: flex;
  align-self: center;
`;
export const ConfigButtons = styled.div`
  direction: ltr;
  display: flex;
  justify-content: flex-end;
`;

export const BtnEdit = styled(Link)`
  background: none;
  border: 0;
  font-size: 15px;
  padding: 5px;
  border-radius: 4px;
  color: #4d85ee;
  margin-right: 12px;

  &:hover {
    background: #4d85ee;
    color: #fff;
  }
`;
export const BtnRemove = styled.button`
  color: #de3b3b;
  background: none;
  border: 0;
  font-size: 15px;
  padding: 5px;
  border-radius: 4px;

  &:hover {
    background: #de3b3b;
    color: #fff;
  }
`;
