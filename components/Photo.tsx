import { chakra } from "@chakra-ui/react";
import Image from "next/image";

/**
 * Wrapper for the Next.js Image component with Chakra UI styling.
 */
export const Photo = chakra(Image, {
  shouldForwardProp: (prop) =>
    ["width", "height", "src", "alt", "layout"].includes(prop),
});
