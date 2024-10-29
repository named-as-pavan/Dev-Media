import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../../atom/authAtom";
import useShowToast from "../../hooks/useShowToast";
import { useState } from "react";
import userAtom from "../../atom/userAtom";
import { motion } from "framer-motion";
import { LogIn, Loader } from "lucide-react";
import React from "react";

const LoginCard = React.memo(() => {
  const [loading, setLoading] = useState(false);
  const showToast = useShowToast();
  const setUser = useSetRecoilState(userAtom);
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const setAuthScreenState = useSetRecoilState(authScreenAtom);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast("Error", data.error || "An unknown error occurred", "error");
        return;
      }
      localStorage.setItem("user-threads", JSON.stringify(data));
      setUser(data);
    } catch (error) {
      showToast("Error", "An error occurred while logging in", "error");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <motion.div
          className="sm:mx-auto sm:w-full sm:max-w-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Heading fontSize={"4xl"} textAlign="center">
            Login
          </Heading>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box
            rounded={"lg"}
            bg={useColorModeValue("red.50", "gray.900")}
            boxShadow={"lg"}
            p={8}
            w={{
              base: 'full',
              sm: "400px"
            }}
          >
            <Stack spacing={4}>
              <form onSubmit={handleLogin}>
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                    value={inputs.username}
                    placeholder="you@example.com"
                    _focus={{ borderColor: "blue.400" }}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    value={inputs.password}
                    placeholder="••••••••"
                    _focus={{ borderColor: "blue.400" }}
                  />
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Checkbox>Remember me</Checkbox>
                    <Text color={"blue.400"}>Forgot password?</Text>
                  </Stack>
                  <Button
                    bg={useColorModeValue("gray.600", "gray.700")}
                    loadingText="Logging in"
                    color={"white"}
                    _hover={{
                      bg: useColorModeValue("gray.700", "gray.800"),
                    }}
                    type="submit"
                    isLoading={loading}
                  >
                    {loading ? (
                      <>
                        <Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                        Loading...
                      </>
                    ) : (
                      <>
                        <LogIn className="mr-2 h-5 w-5" aria-hidden="true" />
                        Login
                      </>
                    )}
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={"center"}>
                    Don't have an account?{" "}
                    <Link
                      color={"blue.400"}
                      onClick={() => setAuthScreenState("signup")}
                    >
                      Sign up
                    </Link>
                  </Text>
                </Stack>
              </form>
            </Stack>
          </Box>
        </motion.div>
      </Stack>
    </Flex>
  );
});

export default LoginCard;
