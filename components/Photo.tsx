import { chakra } from "@chakra-ui/react";
import Image from "next/image";

export const Photo = chakra(Image, {
  baseStyle: { maxH: 120, maxW: 120 },
  shouldForwardProp: (prop) =>
    ["width", "height", "src", "alt", "layout"].includes(prop),
});
