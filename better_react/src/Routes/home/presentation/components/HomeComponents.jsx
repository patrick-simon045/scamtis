import styled from "styled-components";

export const NavBar = styled.div`
  width: 100vw;
  /* width: 90vw; */
  height: 8vh;
  padding: 0 5%;
  margin: 0 auto;
  /* margin-top: 5px; */
  /* border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px; */
  background-color: #10002b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; */
  z-index: 10;
`;

export const NavBarItem = styled.a`
  text-decoration: none;
  margin: 0 10px;
  padding: 10px 20px;
  /* border-radius: 10px; */
  font-weight: 600;
  color: white;
  background-color: transparent;
  /* background: transparent; */

  .active {
    font-weight: 800;
  }
`;

export const Content = styled.div`
  height: 92vh;
  width: 100vw;
  padding: 0 5%;
  background-color: white;

  .contents {
    width: 100%;
    height: 100%;
    background-color: whitesmoke;
    /* border-radius: 10px; */
  }
`;

export const LightText = styled.h4`
  font-weight: 200;
  font-size: 1em;
`;
