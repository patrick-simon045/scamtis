import styled from 'styled-components'

export const SideMenu = styled.div`
    width: 5vw;
    height: 90vh;
    margin-left: 20px;
    border-radius: 10px;
    background-color: yellowgreen;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    z-index: 10;
    position: absolute;
    left: 0;
    transition: ease-in-out all 0.2s;

    :hover {
        width: 20vw;
    }
`;

export const MenuItem = styled.div `
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
    height: 50px;
    background-color: whitesmoke;
`;