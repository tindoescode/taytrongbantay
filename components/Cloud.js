import tw, { styled } from "twin.macro";
import { getRndInteger } from "../utils/";

const CloudTemplate = styled.div`
  background-image: url("/images/cloud/${(props) => props.number}.svg");
  background-repeat: no-repeat;
  animation: flyFromLeft ${(props) => props.duration || "2"}s linear infinite;
  background-size: contain;
  width: 20rem;
  height: 14rem;
  top: ${(props) => props.top}vh;
  margin-left: calc(${(props) => props.marginLeft}px - 200px);
`;
const CloudWrapper = styled.div`
  position: fixed;
  z-index: -1;
  top: 0;
  bottom: 0;
`;
const Cloud = () => {
  let clouds = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  return (
    <CloudWrapper>
      {clouds.map((cloud, index) => {
        return (
          <CloudTemplate
            key={index}
            number={getRndInteger(1, 7)}
            duration={getRndInteger(15, 45)}
            top={getRndInteger((index - 1) * 10, index * 10)}
            marginLeft={getRndInteger(-150, 200)}
          />
        );
      })}
    </CloudWrapper>
  );
};

export default Cloud;
