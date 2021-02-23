import { chakra } from "@chakra-ui/react";
import Image from "next/image";

export const Photo = chakra(Image, {
  shouldForwardProp: (prop) =>
    ["width", "height", "src", "alt", "layout"].includes(prop),
});
