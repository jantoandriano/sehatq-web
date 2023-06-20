import styled from "@emotion/styled";

export const Spinner = styled.span`
  & {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    display: block;
    position: relative;
    background: #d6f1f4;
    box-shadow: -10px 0 #d6f1f4, 10px 0 #d6f1f4;
    box-sizing: border-box;
    animation: shadowPulse 1s linear infinite;
  }

  @keyframes shadowPulse {
    33% {
      background: #d6f1f4;
      box-shadow: -10px 0 #70cbcf, 10px 0 #d6f1f4;
    }
    66% {
      background: #70cbcf;
      box-shadow: -10px 0 #d6f1f4, 10px 0 #d6f1f4;
    }
    100% {
      background: #d6f1f4;
      box-shadow: -10px 0 #d6f1f4, 10px 0 #70cbcf;
    }
  }
`;
