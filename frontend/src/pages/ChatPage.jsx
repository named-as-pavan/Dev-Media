import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Conversation from "../components/Conversation";
import { GiConversation } from "react-icons/gi";
import MessageContainer from "../components/MessageContainer";
import useShowToast from "../../hooks/useShowToast";
import {
  conversationsAtom,
  selectedConversationAtom,
} from "../../atom/messagesAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../../atom/userAtom";
import { useSocket } from "../../context/SocketContext";

const ChatPage = () => {
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAtom
  );
  const [conversations, setConversations] = useRecoilState(conversationsAtom);
  const [searchText, setSearchText] = useState("");
  const [searchingUser, setSearchingUser] = useState(false);
  const currentUser = useRecoilValue(userAtom);
  const showToast = useShowToast();
  const { socket, onlineUsers = [] } = useSocket();

  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [isTablet] = useMediaQuery(
    "(min-width: 768px) and (max-width: 1024px)"
  );
  const [isLargeScreen] = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    socket?.on("messagesSeen", ({ conversationId }) => {
      setConversations((prev) => {
        const updatedConversation = prev.map((conversation) => {
          if (conversation._id === conversationId) {
            return {
              ...conversation,
              lastMessage: {
                ...conversation.lastMessage,
                seen: true,
              },
            };
          }
          return conversation;
        });
        return updatedConversation;
      });
    });

    return () => socket?.off("messagesSeen");
    
  }, [socket, setConversations]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        if (selectedConversation.mock) return;

        const res = await fetch("/api/messages/conversations");
        const data = await res.json();

        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setConversations(data);
        // to give footer navigation
        setSelectedConversation("")
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoadingConversations(false);
      }
    };
    getConversations();
  }, [showToast, setConversations]);

  const handleConversationSearch = async (e) => {
    e.preventDefault();
    setSearchingUser(true);
    try {
      const res = await fetch(`/api/users/profile/${searchText}`);
      const searchedUser = await res.json();

      if (searchedUser.error) {
        showToast("Error", searchedUser.error, "error");
        return;
      }

      const messagingYourself = searchedUser._id === currentUser._id;
      if (messagingYourself) {
        showToast("Error", "Don't try to message yourself", "error");
        return;
      }
      const conversationAlreadyExists = conversations.find(
        (conversation) => conversation.participants[0]._id === searchedUser._id
      );
      if (conversationAlreadyExists) {
        setSelectedConversation({
          _id: conversationAlreadyExists._id,
          userId: searchedUser._id,
          username: searchedUser.username,
          userProfilePic: searchedUser.profilePic,
        });
        return;
      }

      const mockConversation = {
        mock: true,
        lastMessage: {
          text: "",
          sender: "",
        },
        _id: Date.now(),
        participants: [
          {
            _id: searchedUser._id,
            username: searchedUser.username,
            profilePic: searchedUser.profilePic,
          },
        ],
      };

      setConversations((prevConv) => [...prevConv, mockConversation]);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setSearchingUser(false);
    }
  };

  return (
    <>
      <Flex
        gap={4}
        flexDirection={{
          base: "column",
          md: "row",
        }}
        maxW={{
          base: "600px", // Adjusted for base screens
          md: "85%", // Adjusted for medium screens
          lg: "1200px", // Increased for larger displays
        }}
        mx={"auto"}
      >
        {/* Your Conversations Section */}
        <Flex
          flex={40}
          gap={2}
          flexDirection={"column"}
          maxW={{
            base: "100%", // Full width on small screens
            md: "600px", // Wider on medium screens
            lg: "450px", // Larger width on large screens
          }}
          mx={"auto"}
          p={4} // Added padding for more space
        >
          {/* <Text
            fontWeight={700}
            fontSize="xl"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            Your Conversations
          </Text> */}

          {/* Searching user section */}
          {!isMobile && (
            <form onSubmit={handleConversationSearch}>
              <Flex alignItems={"center"} gap={2}>
                <Input
                  placeholder="Search for a user"
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                  size="lg" // Increased input size
                />
                <Button
                  size={"lg"}
                  onClick={handleConversationSearch}
                  isLoading={searchingUser}
                >
                  <SearchIcon />
                </Button>
              </Flex>
            </form>
          )}

          {/* placed ._id checking because react soemtimes takes state management as true without initialising it */}

          {isMobile && !selectedConversation._id && (
            <form onSubmit={handleConversationSearch}>
              <Flex alignItems={"center"} gap={2}>
                <Input
                  placeholder="Search for a user"
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                  h={'45px'}
                  w={'full'}
                  size="lg" // Increased input size
                />
                <Button
                  size={"lg"}
                  h={'45px'}
                  onClick={handleConversationSearch}
                  isLoading={searchingUser}
                >
                 <SearchIcon background="transparent" />
                </Button>
              </Flex>
            </form>
          )}
          {loadingConversations &&
            [1, 2, 3, 4, 5].map((_, i) => (
              <Flex
                key={i}
                gap={4}
                alignItems={"center"}
                p={1}
                borderRadius={"md"}
              >
                <Box>
                  <SkeletonCircle size={10} />
                </Box>
                <Flex w={"full"} flexDirection={"column"} gap={3}>
                  <Skeleton h={"10px"} w={"80%"} />
                  <Skeleton h={"8px"} w={"90%"} />
                </Flex>
              </Flex>
            ))}
          {!loadingConversations &&
            !isMobile &&
            conversations.map((conversation) => (
              <Conversation
                key={conversation._id}
                conversation={conversation}
                isOnline={onlineUsers.includes(
                  conversation.participants[0]._id
                )}
              />
            ))}

          {/* simple logic just checking mobile users strictly to provide clean ui  */}

          {!loadingConversations &&
            isMobile &&
            !selectedConversation?._id &&
            conversations.map((conversation) => (
              <Conversation
                key={conversation._id}
                conversation={conversation}
                isOnline={onlineUsers.includes(
                  conversation.participants[0]._id
                )}
              />
            ))}
        </Flex>

        {/* Placeholder or Selected Conversation Section */}
        {!selectedConversation?._id && !isMobile && (
          <Flex
            flex={60}
            borderRadius={"md"}
            padding={4}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"400px"}
          >
            <GiConversation size={100} />
            <Text fontSize={24} textAlign="center">
              Select A Conversation To Start Messaging
            </Text>
          </Flex>
        )}

        {selectedConversation?._id && <MessageContainer />}
      </Flex>
    </>
  );
};

export default ChatPage;
