import { Box, Container, useMediaQuery } from "@chakra-ui/react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atom/userAtom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import ChatPage from "./pages/ChatPage";
import FootNavigation from "./components/FootNavigation";
import AccountSettings from "./components/AccountsSetting";
import { selectedConversationAtom } from "../atom/messagesAtom";
import CreatePost from "./components/CreatePost";

function App() {
  const { pathname } = useLocation();
  const user = useRecoilValue(userAtom);
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAtom
  );

  return (
    <Box position="relative" w="full">
      <Container maxW={{ base: "800px", md: "1200px" }}>
        <Routes>
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/auth"
            element={!user ? <AuthPage /> : <Navigate to="/" />}
          />
          {/* <Route
            path="/settings/accounts"
            element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />}
          /> */}
          <Route
            path="/settings/accounts"
            element={user ? <AccountSettings /> : <Navigate to="/auth" />}
          />
          {/* <Route
            path="/settings/notifications"
            element={user ? <NotificationSettings /> : <Navigate to="/auth" />}
          /> */}
          <Route
            path="/:username"
            element={
              user ? (
                <>
                  <UserPage />
                  <CreatePost />
                </>
              ) : (
                <UserPage />
              )
            }
          />
          <Route path="/:username/:post/:pid" element={<PostPage />} />
          <Route
            path="/chat"
            element={user ? <ChatPage /> : <Navigate to="/auth" />}
          />
          {/* <Route
            path="/settings"
            element={user ? <SettingsPage /> : <Navigate to="/auth" />}
          /> */}
        </Routes>
      </Container>
      {!selectedConversation._id && isMobile && (
        <Box
          position="fixed"
          overflow={"hidden"}
          bg="rgba(33, 33, 33, 0.5)"
          backdropFilter="blur(10px)"
          boxShadow="0 -2px 5px rgba(0, 0, 0, 0.1)"
          bottom={0}
          w="full"
        >
          <Container maxW={{ base: "800px", md: "1200px" }}>
            <FootNavigation />
          </Container>
        </Box>
      )}

      {!isMobile && (
        <Box
          position="fixed"
          overflow={"hidden"}
          bg="rgba(33, 33, 33, 0.5)"
          backdropFilter="blur(10px)"
          boxShadow="0 -2px 5px rgba(0, 0, 0, 0.1)"
          bottom={0}
          w="full"
        >
          <Container maxW={{ base: "800px", md: "1200px" }}>
            <FootNavigation />
          </Container>
        </Box>
      )}
    </Box>
  );
}

export default App;
