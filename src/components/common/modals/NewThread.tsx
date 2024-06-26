import { useRef, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  useDisclosure,
  Box,
  Input,
  Image,
  HStack,
  VStack,
  Textarea,
} from "@chakra-ui/react";
import SolidButton from "../button/SolidButton";
import { ThreadDTO } from "../../../types/ThreadDTO";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../configs/Api";
import { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { ThreadEntity } from "../../../types/ThreadEntity";
import useAuth from "../../../features/auth/hooks/useAuth";
import CardImage from "../card/CardImage";

export default function NewThread({ refetch }: { refetch: () => void }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  const { user } = useAuth();
  const { register, handleSubmit } = useForm<ThreadDTO>({
    mode: "onSubmit",
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { mutateAsync } = useMutation<ThreadEntity, AxiosError, ThreadDTO>({
    mutationFn: async (newThread) => {
      const formData = new FormData();
      formData.append("content", newThread.content);
      const userId = Number(user.id);
      formData.append("userId", String(userId));
      if (newThread.image && newThread.image.length > 0) {
        formData.append("image", newThread.image[0]);
      }
      const response = await api.post("/threads", formData);
      return response.data;
    },
  });

  const onSubmit: SubmitHandler<ThreadDTO> = async (data) => {
    try {
      await mutateAsync(data);
      console.log("Success Upload Thread!");
      refetch();
      onClose();
    } catch (error) {
      console.log("Failed Upload Thread!:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <VStack width={"100%"}>
      <SolidButton text="Create Post" onClick={onOpen} width={"100%"} />

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor={"#1D1D1D"}>
          <ModalCloseButton color={"#FFF"} />
          <FormControl
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            width={"100%"}
          >
            <ModalBody p={6}>
              <HStack alignItems={"flex-start"} gap={3}>
                <CardImage />
                <Textarea
                  color={"#FFF"}
                  placeholder="What is happening?!"
                  variant="unstyled"
                  fontSize={".9rem"}
                  width={"100%"}
                  resize="none"
                  {...register("content")}
                />
              </HStack>
            </ModalBody>
            <VStack width="100%">
              {previewImage && (
                <Image
                  borderRadius={25}
                  p={5}
                  src={previewImage}
                  alt="Preview"
                />
              )}
            </VStack>

            <ModalFooter>
              <HStack
                width={"100%"}
                justifyContent={"space-between"}
                borderTop={"1px solid #3F3F3F"}
                pt={5}
              >
                <Box position="relative" cursor="pointer" width={"100%"}>
                  <Image
                    src="https://cdn-icons-png.flaticon.com/128/3039/3039527.png"
                    alt="Upload Icon"
                    boxSize={6}
                  />
                  <Input
                    type="file"
                    accept="image/*"
                    position="absolute"
                    top={0}
                    left={0}
                    opacity={0}
                    width="100%"
                    cursor="pointer"
                    {...register("image")}
                    onChange={handleFileChange}
                  />
                </Box>
                <SolidButton
                  type="submit"
                  text="Post"
                  width={"75px"}
                  height={"33px"}
                  fontSize={".9rem"}
                />
              </HStack>
            </ModalFooter>
          </FormControl>
        </ModalContent>
      </Modal>
    </VStack>
  );
}
