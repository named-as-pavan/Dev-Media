import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Stack,
  Button,
  Heading,
  Text,
  Link,
  useColorModeValue,
  Input,
} from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import authScreenAtom from '../../atom/authAtom';
import useShowToast from '../../hooks/useShowToast';
import { useState } from 'react';
import userAtom from '../../atom/userAtom';
import { motion } from 'framer-motion'; // Import motion
import { UserPlus, Loader } from "lucide-react"; // Icons for better UI
 // Import ShadCN UI Input

const MotionStack = motion(Stack); // Create a motion variant of Stack

const SignUpCard = () => {
  const [loading, setLoading] = useState(false);
  const showToast = useShowToast();
  const setUser = useSetRecoilState(userAtom);
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const setAuthScreenState = useSetRecoilState(authScreenAtom);

  const handleSignUp = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users/signup", {
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
      showToast("Error", "An error occurred while signing up", "error");
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <motion.div
          className="sm:mx-auto sm:w-full sm:max-w-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Heading fontSize={'4xl'} textAlign="center">Sign Up</Heading>
        </motion.div>

        <MotionStack
          as={Box}
          rounded={'lg'}
          bg={useColorModeValue('red.50', 'gray.900')}
          boxShadow={'lg'}
          p={8}
          w={{
            base: 'full',
            sm: "400px"
          }}
          initial={{ opacity: 0, y: 20 }} // Initial state for motion
          animate={{ opacity: 1, y: 0 }} // Animate to this state
          transition={{ duration: 0.8 }} // Transition duration
        >
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input
                type="text"
                onChange={(e) => setInputs((inputs) => ({ ...inputs, name: e.target.value }))}
                value={inputs.name}
                placeholder="Your Full Name"
                onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }} // Prevent default behavior on Enter
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                onChange={(e) => setInputs((inputs) => ({ ...inputs, username: e.target.value }))}
                value={inputs.username}
                placeholder="Your Username"
                onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }} // Prevent default behavior on Enter
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={(e) => setInputs((inputs) => ({ ...inputs, email: e.target.value }))}
                value={inputs.email}
                placeholder="you@example.com"
                onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }} // Prevent default behavior on Enter
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => setInputs((inputs) => ({ ...inputs, password: e.target.value }))}
                value={inputs.password}
                placeholder="••••••••"
                onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }} // Prevent default behavior on Enter
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={useColorModeValue('gray.600', 'gray.700')}
                loadingText="Signing up"
                color={'white'}
                _hover={{
                  bg: useColorModeValue('gray.700', "gray.800"),
                }}
                onClick={handleSignUp}
                isLoading={loading}
              >
                {loading ? (
                  <>
                    <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                    Signing up...
                  </>
                ) : (
                  <>
                    <UserPlus className='mr-2 h-5 w-5' aria-hidden='true' />
                    Sign Up
                  </>
                )}
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already have an account? <Link color={'blue.400'} onClick={() => setAuthScreenState("login")}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </MotionStack>
      </Stack>
    </Flex>
  );
}

export default SignUpCard;
