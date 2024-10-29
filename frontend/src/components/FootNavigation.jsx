import { background, Button, Flex, Image, Link, useColorMode } from "@chakra-ui/react";
import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../../atom/userAtom";
import { Link as RouterLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import useLogout from "../../hooks/useLogout";
import authScreenAtom from "../../atom/authAtom";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { MdOutlineSettings } from "react-icons/md";

const FootNavigation = () => {


  const logout = useLogout();
  const user = useRecoilValue(userAtom);
  const { colorMode, toggleColorMode } = useColorMode();
  const setAuthScreen = useSetRecoilState(authScreenAtom);

  return (

<Flex
justifyContent="space-around"
alignItems="center"
p={{ base: 1, md: 1 }}
maxW={{ base: "100%", md: "800px", lg: "1200px" }}


>

{user ? (
  <>
    <Link as={RouterLink} to="/">
      <AiFillHome size={24} />
    </Link>
    <Link as={RouterLink} to={`/${user.username}`}>
      <RxAvatar size={24} />
    </Link>
    <Link as={RouterLink} to="/chat">
      <BsFillChatQuoteFill size={24} />
    </Link>
    <Link as={RouterLink} to="/settings/accounts">
      <MdOutlineSettings size={24} />
    </Link>
    

    <Image
        cursor="pointer"
        alt="logo"
        w={12}
        h={12}
        src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
        onClick={toggleColorMode}
      />
      {/* Uncomment this if you want a logout button */}
          {/* <Button onClick={logout} variant="ghost">
            <FiLogOut size={24} />
          </Button> */}
  </>
) : (
  <>
  <Button>

    <Link as={RouterLink} to="/auth" onClick={() => setAuthScreen("login")}>
      Login
    </Link>
  </Button>
  <Button>
    <Link as={RouterLink} to="/auth" onClick={() => setAuthScreen("signup")}>
      Signup
    </Link>
    </Button>
  </>
)}
</Flex>
  );
};

export default FootNavigation;





