import styled from 'styled-components';
import { darken } from 'polished';
import { Form, Input } from '@rocketseat/unform';

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
  }
`;

export const OrdersTable = styled.table`
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

export const ConfigButtons = styled.div`
  direction: ltr;
  display: flex;
  justify-content: flex-end;
`;

export const BtnAnswer = styled.button`
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
export const ContentModal = styled.div`
  height: auto;
  min-width: 400px;
`;

export const QuestionStudent = styled.div`
  padding: 0 25px;
  display: inline;

  strong {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 14px;
    color: #444444;
    text-align: left;
    margin: 8px 0;
  }

  span {
    margin-top: 10px;
    padding-left: 25px;
    display: block;
    font-family: 'Roboto';
    font-size: 16px;
    color: #666666;
    line-height: 26px;
    text-align: left;
  }
`;
