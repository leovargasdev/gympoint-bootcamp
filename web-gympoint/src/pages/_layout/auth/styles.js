import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 380px;
  background: #fff;
  padding: 30px 18px;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

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
  }
`;
