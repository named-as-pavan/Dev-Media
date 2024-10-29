// Sidebar.js
import React from "react";
import { Box, VStack, Text, Button } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  return (
    <Box
      w={{ base: "full", sm: "20%" }}
      display={{ base: "none", sm: "block" }}
    >
      <VStack spacing={5} align="start">
        <Link to="/settings/accounts">
          <Text
            as="button"
            borderLeft="4px solid"
            borderColor={isActive("/settings/accounts") ? "blue.700" : "transparent"}
            px={2}
            py={2}
            fontWeight="bold"
            color={isActive("/settings/accounts") ? "blue.700" : "inherit"}
            _hover={{ borderColor: "blue.300", color: "blue.700" }}
          >
            Accounts
          </Text>
        </Link>

        <Link to="/settings/notifications">
          <Text
            as="button"
            borderLeft="4px solid"
            borderColor={isActive("/settings/notifications") ? "blue.700" : "transparent"}
            px={2}
            py={2}
            fontWeight="bold"
            color={isActive("/settings/notifications") ? "blue.700" : "inherit"}
            _hover={{ borderColor: "blue.300", color: "blue.700" }}
          >
            Notifications
          </Text>
        </Link>

        <Link to="/settings/users">
          <Text
            as="button"
            borderLeft="4px solid"
            borderColor={isActive("/settings/users") ? "blue.700" : "transparent"}
            px={2}
            py={2}
            fontWeight="bold"
            color={isActive("/settings/users") ? "blue.700" : "inherit"}
            _hover={{ borderColor: "blue.300", color: "blue.700" }}
          >
            Users
          </Text>
        </Link>

        <Link to="/settings/profile">
          <Text
            as="button"
            borderLeft="4px solid"
            borderColor={isActive("/settings/profile") ? "blue.700" : "transparent"}
            px={2}
            py={2}
            fontWeight="bold"
            color={isActive("/settings/profile") ? "blue.700" : "inherit"}
            _hover={{ borderColor: "blue.300", color: "blue.700" }}
          >
            Profile
          </Text>
        </Link>

        <Link to="/settings/billing">
          <Text
            as="button"
            borderLeft="4px solid"
            borderColor={isActive("/settings/billing") ? "blue.700" : "transparent"}
            px={2}
            py={2}
            fontWeight="bold"
            color={isActive("/settings/billing") ? "blue.700" : "inherit"}
            _hover={{ borderColor: "blue.300", color: "blue.700" }}
          >
            Billing
          </Text>
        </Link>

        <Link to="/settings/integrations">
          <Text
            as="button"
            borderLeft="4px solid"
            borderColor={isActive("/settings/integrations") ? "blue.700" : "transparent"}
            px={2}
            py={2}
            fontWeight="bold"
            color={isActive("/settings/integrations") ? "blue.700" : "inherit"}
            _hover={{ borderColor: "blue.300", color: "blue.700" }}
          >
            Integrations
          </Text>
        </Link>
      </VStack>
    </Box>
  );
};

export default Sidebar;
