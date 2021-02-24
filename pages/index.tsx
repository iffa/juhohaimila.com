import {
  Box,
  Container,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { GetStaticProps } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { Photo } from "../components/Photo";
import { getFiles } from "../lib/file";

export type HomeProps = {
  images: string[];
};

export default function Home(props: HomeProps) {
  const { images } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState();
  const modalSize = useBreakpointValue({ base: "sm", md: "md", lg: "6xl" });

  function openModal(image) {
    setSelectedImage(image);
    onOpen();
    return true;
  }

  return (
    <>
      <Container maxWidth="container.xl" py={8}>
        <Head>
          <title>Juho Haimila - Photographer from Finland</title>
          <meta
            property="og:title"
            content="Juho Haimila - Photographer from Finland"
            key="title"
          />
          <meta
            property="og:description"
            content="Personal site of Juho Haimila, containing a glimpse into his photo portfolio."
            key="description"
          />
          <meta
            name="description"
            content="Personal site of Juho Haimila, containing a glimpse into his photo portfolio."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Flex direction="column">
          <Box mb={8} as="header">
            <Heading size="3xl" as="h1">
              Juho Haimila
            </Heading>
            <Text fontSize="xl" as="h2">
              I'm a photographer from Finland. Click on a photo preview to open
              it in a popup.
            </Text>
          </Box>

          <SimpleGrid spacing={4} columns={{ base: 2, md: 3, lg: 4 }}>
            {images.map((image, index) => (
              <Box
                as="button"
                onClick={() => openModal(image)}
                key={index}
                title="Open photo preview modal"
              >
                <Photo
                  src={`/images/${image}`}
                  alt="A photo"
                  width={300}
                  height={200}
                  layout="responsive"
                  borderRadius={8}
                />
              </Box>
            ))}
          </SimpleGrid>
        </Flex>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} size={modalSize} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedImage}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Photo
              src={`/images/${selectedImage}`}
              alt="A photo"
              width={300}
              height={200}
              layout="responsive"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const images = await getFiles("public", "images");

  return {
    props: {
      images,
    },
  };
};
