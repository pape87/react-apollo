import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 10px 20px;
  box-sizing: border-box;
  justify-content: center;
  align-items: stretch;
  
  @media (min-width: 400px) {
    width: 85%;
  }
  @media (min-width: 550px) {
    width: 80%;
  }
  &:after {
    content: "";
    display: table;
    clear: both;
  }
`