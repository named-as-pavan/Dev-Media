import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Image,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../../atom/userAtom";
import { BsCheck2All, BsFillImageFill } from "react-icons/bs";
import { selectedConversationAtom } from "../../atom/messagesAtom";
import UserPage from "./../pages/UserPage";
import { Link } from "react-router-dom";

const Conversation = ({ conversation, isOnline }) => {
  const user = conversation.participants[0];

  const currentUser = useRecoilValue(userAtom);

  const colorMode = useColorMode();

  const lastMessage = conversation.lastMessage;

  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAtom
  );

  return (
    <Flex
      gap={4}
      alignItems={"center"}
      p={1}
      _hover={{
        cursor: "pointer",
        bg: useColorModeValue("gray.600", "gray.dark"),
        color: "white",
      }}
      borderRadius={"md"}
      onClick={() =>
        setSelectedConversation({
          _id: conversation._id,
          userId: user._id,
          userProfilePic: user.profilePic,
          username: user.username,
          mock: conversation.mock,
        })
      }
      bg={
        selectedConversation?._id === conversation._id
          ? colorMode === "light"
            ? "gray.400"
            : "gray.500"
          : ""
      }
    >
      <WrapItem>
        <Link to={`/${user.username}`}>
          <Avatar
            size={{
              base: "sm",
              sm: "md",
              md: "md",
            }}
            src={user.profilePic}
          >
            {isOnline ? <AvatarBadge boxSize={"1em"} bg={"green.600"} /> : ""}
          </Avatar>
        </Link>
      </WrapItem>

      <Stack direction={"column"} fontSize={"sm"}>
        <Text fontWeight={"700"} display={"flex"} alignItems={"center"}>
          {user.username}
          <Image src="/verified.png" w={4} h={4} ml={1} />
        </Text>
        <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
          {currentUser._id === lastMessage.sender ? (
            <Box color={lastMessage.seen ? "blue.400" : ""}>
              <BsCheck2All size={16} />
            </Box>
          ) : (
            ""
          )}
          {lastMessage.text.length > 15
            ? lastMessage.text.substring(0, 18) + "..."
            : lastMessage.text || <BsFillImageFill size={15} />}
        </Text>
      </Stack>
    </Flex>
  );
};

export default Conversation;
