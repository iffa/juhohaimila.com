import {
  AspectRatio,
  Container,
  Flex,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import Head from "next/head";
import { Photo } from "../components/Photo";

export default function Home() {
  const images = ["iska2edit.jpg", "engels.jpg", "luna.jpg", "stack2.jpg"];

  return (
    <Container maxWidth="container.xl" py={4}>
      <Head>
        <title>Juho Haimila - Photographer from Finland</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex direction="column">
        <Heading mb={8}>Juho Haimila</Heading>

        <SimpleGrid spacing={4} minChildWidth="320px">
          {images.map((image, index) => (
            <AspectRatio ratio={3 / 2} key={index}>
              <Photo src={`/images/${image}`} layout="fill" borderRadius={4} />
            </AspectRatio>
          ))}
        </SimpleGrid>
      </Flex>
    </Container>
  );
}
