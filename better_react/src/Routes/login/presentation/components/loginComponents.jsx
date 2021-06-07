import styled from "styled-components";
import {
  centeredContentDiv,
  globalDesignVariables,
} from "../../../../globalvariables";

export const BackgroundDiv = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: whitesmoke;
`;

export const CenteredContentDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${centeredContentDiv.background_color};
  padding: ${centeredContentDiv.padding};
  border-radius: ${centeredContentDiv.border_radius};
  border: ${centeredContentDiv.border};
  box-shadow: ${globalDesignVariables.shadow};
`;
