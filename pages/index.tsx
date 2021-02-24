import {
  Box,
  ButtonGroup,
  Container,
  Divider,
  Flex,
  Heading,
  IconButton,
  Link,
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
import { AiFillMail } from "react-icons/ai";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { Photo } from "../components/Photo";
import { getFiles } from "../lib/file";

export type HomeProps = {
  images: string[];
};

export default function Home(props: HomeProps) {
  const { images } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState();
  const modalSize = useBreakpointValue({
    base: "md",
    md: "lg",
    lg: "6xl",
  });
  const footerIconSize = useBreakpointValue({
    base: "md",
    md: "lg",
  });

  function openModal(image) {
    setSelectedImage(image);
    onOpen();
  }

  return (
    <>
      <Container maxWidth="container.xl">
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

        <Flex direction="column" height="100vh">
          <Box mb={8} as="header" pt={8}>
            <Heading size="3xl" as="h1">
              Juho Haimila 📸
            </Heading>
            <Text fontSize="xl" as="h2">
              I'm a photographer from Finland. Click on a photo preview to open
              it in a popup.
            </Text>
          </Box>

          <Box as="main" flex="1">
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
          </Box>

          <Box as="footer" py={8}>
            <Divider mb={8} />
            <Flex direction="row" justifyContent="space-between">
              <Box>
                <Text fontSize="md" pt={2}>
                  © 2021 Juho Haimila
                </Text>
                <Text fontSize="sm" mt={2}>
                  Website crafted by{" "}
                  <Link href="https://iffa.dev" isExternal>
                    Santeri Elo
                  </Link>{" "}
                  💖
                </Text>
              </Box>
              <ButtonGroup size={footerIconSize} variant="ghost">
                <Link href={process.env.NEXT_PUBLIC_MAILTO_LINK} isExternal>
                  <IconButton
                    aria-label="Send me an email"
                    title="Send me an email"
                    icon={<AiFillMail />}
                  />
                </Link>
                <Link href={process.env.NEXT_PUBLIC_TWITTER_URL} isExternal>
                  <IconButton
                    aria-label="Visit my Twitter profile"
                    title="Visit my Twitter profile"
                    icon={<FaTwitter />}
                  />
                </Link>
                <Link href={process.env.NEXT_PUBLIC_INSTAGRAM_URL} isExternal>
                  <IconButton
                    aria-label="Visit my Instagram profile"
                    title="Visit my Instagram profile"
                    icon={<FaInstagram />}
                  />
                </Link>
              </ButtonGroup>{" "}
            </Flex>
          </Box>
        </Flex>
      </Container>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={modalSize}
        scrollBehavior="inside"
        allowPinchZoom={true}
        isCentered
      >
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
  // get all images from /public/images during build-time
  const images = await getFiles("public", "images");

  return {
    props: {
      // pass images as props to the component
      images,
    },
  };
};
