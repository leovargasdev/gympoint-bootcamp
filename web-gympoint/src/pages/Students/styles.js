import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 100%;
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

  thead th {
    color: #999;
    text-align: left;
    padding: 12px;
  }
  tbody td {
    padding: 12px;
    border-bottom: 1px solid #eee;
  }
  img {
    height: 100px;
  }

  strong {
    color: #333;
    display: block;
  }

  span {
    margin-top: 5px;
    font-size: 18px;
    font-weight: bold;
    display: block;
  }
  div {
    display: flex;
    align-items: center;

    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      color: #666;
      padding: 6px;
      width: 50px;
    }
  }
  button {
    background: none;
    border: 0;
    padding: 6px;
  }
`;
