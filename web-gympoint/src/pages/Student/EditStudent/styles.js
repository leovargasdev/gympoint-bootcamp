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
`;
