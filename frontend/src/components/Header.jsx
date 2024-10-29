import { Image, useColorMode} from "@chakra-ui/react";
import React from "react";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div>
      {/* {" "}
      <Image
        cursor="pointer"
        alt="logo"
        w={6}
        src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
        onClick={toggleColorMode}
      /> */}
    </div>
  );
};

export default Header;
