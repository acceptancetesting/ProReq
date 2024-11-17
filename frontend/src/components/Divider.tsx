import styled from "styled-components";

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.neutral.border};
  margin: ${(props) => props.theme.spacing(2)} 0;
`;

export default Divider;
