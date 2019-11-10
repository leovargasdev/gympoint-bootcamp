import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
  border: 2px solid #eee;
`;
export const Content = styled.div`
  height: 64px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    /* Alinha os itens na horizontal */
    display: flex;
    align-items: center;

    img {
      height: auto;
      width: 180px;
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      font-weight: bold;
      font-size: 15px;
      color: #444444;
      text-align: left;
      padding: 0 10px;
      text-transform: uppercase;
    }
  }
  aside {
    display: flex;
    align-items: center;
  }
`;
export const Profile = styled.div`
  display: flex;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #666666;
    }

    button {
      display: block;
      background: none;
      border: 0;
      margin-top: 2px;
      font-size: 14px;
      color: #de3b3b;
      text-align: right;
    }
  }
`;
