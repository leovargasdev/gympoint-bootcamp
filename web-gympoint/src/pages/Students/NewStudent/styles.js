import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 100%;
  min-width: 800px;
  margin-top: 15px;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    strong {
      font-size: 24px;
      color: #444444;
      text-align: right;
    }

    button {
      padding: 8px 15px;
      border: 0;
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

  form {
    background: #fff;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    padding: 10px 25px;

    label {
      text-transform: uppercase;
      font-weight: bold;
      font-size: 14px;
      color: #444444;
      text-align: left;
      margin: 8px 0;
    }

    input {
      background: none;
      border: 1px solid #eee;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      margin: 0 0 12px;
      color: #333;

      &::placeholder {
        font-size: 16px;
        color: #999999;
      }
    }

    button {
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
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }
  }
`;
