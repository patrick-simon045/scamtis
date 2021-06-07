import styled, { css } from 'styled-components'

const ContentContainer = styled.div `
    width: 15%;
    border-radius: ${props => props.squared ? "0px": "10px"};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3em 5em;
    margin: 1em 0;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    transition: all ease-in 0.3s;


    ${props => props.contents && css`
        background-color: black;
        color: white;

        :hover {
            background-color: red;
            color: wheat;
            cursor: pointer;
        }
    `}
    
    ${props => props.heads && css`
        background-color: white;
        color: black;

        :hover {
            background-color: black;
            color: white;
            cursor: pointer;
        }
    `}
`;

export default ContentContainer;