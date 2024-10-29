import {
  VStack,
  Box,
  Flex,
  Avatar,
  Text,
  Link,
  useToast,
  Button,
  PortalManager,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { Menu, MenuButton, MenuItem, MenuList, Portal } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import userAtom from "../../atom/userAtom";
import { Link as RouterLink } from "react-router-dom";
import useShowToast from "../../hooks/useShowToast";
import useFollowUnfollow from "../../hooks/useFollowUnfollow";

const UserHeader = ({ user }) => {
  const toast = useToast();

  // this is current account owner
  const currentUser = useRecoilValue(userAtom);

  const { handleFollowUnfollow, updating, following } = useFollowUnfollow(user);

  const copyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast({
        title: `Profile link coppoed`,
        status: "success",
        isClosable: true,
      });
    });
  };

  return (
    <VStack gap={4} alignItems={"start"}  top={'10px'}
    position={'relative'}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"}>{user.name}</Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>{user.username}</Text>
            <Text
              fontSize={"sm"}
              useColorModeValue={"gray.300"}
              bg={useColorModeValue("gray.300", "gray.700")}
              color={"gray.light"}
              p={1}
              borderRadius={"full"}
            >
              dev.media
            </Text>
          </Flex>
        </Box>
        {user.profilePic && (
          <Avatar
            // name={user.name}
            src={user.profilePic}
            size={{ base: "md", md: "xl" }}
          />
        )}

        {!user.profilePic && (
          // removed name mention in avatar to prevent defalut image as user names starting latter 
          // to provide uinque img for all
          <Avatar src="" size={{ base: "md", md: "xl" }} />
        )}
      </Flex>
      <Text>{user.bio}</Text>

      {currentUser?._id === user._id && (
        // router link from react-router dom is used instead of ui becauset to prevent refresh page and maintain statemanagement(client side routing)
        <Link as={RouterLink} to="/settings/accounts">
          <Button size={"sm"}>Update Profile</Button>
        </Link>
      )}

      {currentUser?._id !== user._id && (
        <Button size={"sm"} onClick={handleFollowUnfollow} isLoading={updating}>
          {following ? "Unfollow" : "Follow"}
        </Button>
      )}

      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text gap={2} color={"gray.light"}>
            {user.followers.length}Followers
          </Text>
          <Box w="1" h="1" bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>devhub.com</Link>
        </Flex>

        <Flex>
          <Box className="icon-container">
            <BsInstagram size={24} cursor={"pointer"} />
          </Box>
        </Flex>
      </Flex>

      <Flex w={"full"}>
        <Flex
          flex={1}
          borderBottom={"1.5px solid white"}
          justifyContent={"center"}
          pb={3}
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Works</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={"1.5px solid gray"}
          justifyContent={"center"}
          pb={3}
          cursor={"pointer"}
          color={"gray.light"}
        >
          <Text fontWeight={"bold"}>Replies</Text>
        </Flex>
      </Flex>
      <Box></Box>
    </VStack>
  );
};

export default UserHeader;
