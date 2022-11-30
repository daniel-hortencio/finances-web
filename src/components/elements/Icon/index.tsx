import * as Fa from "react-icons/fa";
import * as Md from "react-icons/md";
import * as Fi from "react-icons/fi";
import * as Cg from "react-icons/cg";
import * as Bi from "react-icons/bi";
import * as Io from "react-icons/io";
import * as Bs from "react-icons/bs";

export const AllIcons = { ...Fi, ...Md, ...Fa, ...Cg, ...Bi, ...Io, ...Bs };

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  hoverColor?: string;
}

const Icon = ({ name, size, color = "" }: IconProps) => {
  const RIcon = AllIcons[name as keyof typeof AllIcons]
    ? AllIcons[name as keyof typeof AllIcons]
    : AllIcons["FaRegWindowClose"];

  return <RIcon size={size} color={color} />;
};

export const getAllIcons = (searchName = "") => {
  let icons: string[] = [];

  if (searchName.length <= 2) return [];

  for (let key in AllIcons) {
    if (searchName) {
      const { name = "" } = AllIcons[key as keyof typeof AllIcons];
      if (name.toLowerCase().includes(searchName.toLowerCase())) {
        icons.push(AllIcons[key as keyof typeof AllIcons].name);
      }
    } else {
      icons.push(AllIcons[key as keyof typeof AllIcons].name);
    }
  }

  return icons;
};

export default Icon;
