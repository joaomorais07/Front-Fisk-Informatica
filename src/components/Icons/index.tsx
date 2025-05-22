import { ReactSVG } from "react-svg";

import aluno from "/assets/icons/aluno.svg";
import responsavel from "/assets/icons/responsavel.svg";
import { useTheme } from "styled-components";


const iconsMap = {
  Aluno: aluno,
  Responsavel: responsavel,

};


type IconProps = {
  name: keyof typeof iconsMap;
  color?: string;
  size?: number;
  rotation?: number;
  className?: string;
};

export default function Icon(props: IconProps) {
  const { name, color, size, rotation, className } = props;

  const { colors } = useTheme();

  const IconPath = iconsMap[name];

  return (
    <ReactSVG
      src={IconPath}
      className={className}
      beforeInjection={(svg) => {
        svg.setAttribute("fill", color ?? colors.primary);
        if (size) {
          svg.setAttribute("width", size.toString());
          svg.setAttribute("height", size.toString());
        }
        if (rotation) {
          svg.setAttribute("style", `transform: rotate(${rotation}deg)`);
        }
      }}
    />
  );
}
