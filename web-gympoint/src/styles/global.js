import { createGlobalStyle } from 'styled-components';
import { darken } from 'polished';
import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus{
    outline: 0;
  }

  html, body, #root{
    height: 100%;
  }

  body{
    -webkit-font-smoothing: antialiased; /* Deixa a fonte mais definida */
  }

  body, input, button, label, select{
    font: 14px 'Roboto', sans-serif;
  }
  a{
    text-decoration: none;
  }
  ul {
    list-style: none
  }
  button {
    cursor: pointer;
  }

  form{
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

    select {
      background: #fff;
      padding: 10px 25px;
      option {
        padding: 0 8px;
        font-size: 20px;
        line-height: 2rem;
      }
    }
  }


`;
