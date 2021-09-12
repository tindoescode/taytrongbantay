import tw, { styled } from "twin.macro";
import { getRndInteger } from "../utils/";

const CloudTemplate = styled.div`
  background-image: url("/images/cloud/${(props) => props.number}.svg");
  background-repeat: no-repeat;
  animation: flyFromLeft ${(props) => props.duration || "2"}s linear infinite;
  position: fixed;
  z-index: -1;
  background-size: contain;
  background-position: 100% 100%;
  width: 20rem;
  height: 14rem;
  top: ${(props) => props.top}vh;
  margin-left: calc(${(props) => props.marginLeft}px - 200px);
`;

const Cloud = () => {
  let clouds = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  return (
    <div id="Cloud">
      {clouds.map((cloud, index) => {
        return (
          <CloudTemplate
            key={index}
            number={getRndInteger(1, 7)}
            duration={getRndInteger(15, 40)}
            top={getRndInteger(index * 10, (index + 1) * 10)}
            marginLeft={getRndInteger(-150, 200)}
          />
        );
      })}
    </div>
  );
};

export default Cloud;
