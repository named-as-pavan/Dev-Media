import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Text,
  Avatar,
  Center,
  Stack,
  useColorModeValue,
  space,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import userAtom from "../../atom/userAtom";
import usePreviewImg from "../../hooks/usePreviewImg";
import useShowToast from "../../hooks/useShowToast";
import useLogout from "../../hooks/useLogout";
import { FiLogOut } from "react-icons/fi";

const AccountSettings = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const showToast = useShowToast();
  const [updating, setUpdating] = useState(false);
  const fileRef = useRef(null);

  const [inputs, setInputs] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    password: "",
    bio: user.bio,
  });

  const { handleImageChange, imgUrl } = usePreviewImg();

  const handleSubmit = async (e) => {
    setUpdating(true);
    if (updating) return;

    e.preventDefault();

    try {
      const res = await fetch(`/api/users/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputs, profilePic: imgUrl }),
      });

      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
      }

      setInputs(data);
      localStorage.setItem("user-threads", JSON.stringify(data));

      if (!res.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      showToast("Success", "Profile updated successfully", "success");
      setUser(data);
    } catch (error) {
      console.error("Error updating profile:", error);
      showToast("Error", error.message, "error");
    } finally {
      setUpdating(false);
    }
  };

  const freezeAccount = async () => {
    if (!window.confirm("Are you sure want to freeze your account")) return;

    try {
        const res = await fetch("/api/users/freeze",{
            method:"PUT",
            headers:{
                "Content-type" : "application/json",
            }
        })
        const data = await res.json();
        if(data.error){
            return showToast("Error",data.error,"error")
        }
        if(data.success){
            await logout();
            showToast("Info", "Account deactivated", "info");
        }
    } catch (error) {
        showToast("Error",error.message,"error")
    }
   

}

  const logout = useLogout();

  return (
    <form onSubmit={handleSubmit}>
      <Flex align={"center"} justify={"center"} my={8}>
        <Stack
          spacing={4}
          w={"full"}
          maxW={"lg"}
          bg={useColorModeValue("gray.100", "gray.dark")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={8}
          position="relative"
        >
          <Flex position="absolute" top={4} right={4} gap={2}>
            <Button size={{base:'xs', md:'sm'}} colorScheme="red" onClick={freezeAccount}>
              Deactivate
            </Button>
            <Button size={{base:'xs', md:'sm'}} onClick={logout}>
              <FiLogOut size={20} />
            </Button>
          </Flex>
          <Heading lineHeight={1.1} fontSize={{ base: "xl", sm: "2xl" }}>
            Account Settings
          </Heading>
          <Box display={'grid'} gap={5}>

          
          <FormControl id="userName">
            <FormLabel textColor={'gray.500'}>Profile Pic</FormLabel>
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                <Avatar size="xl" src={imgUrl || user.profilePic} />
              </Center>
              <Center w="full">
                <Button w="full" onClick={() => fileRef.current.click()}>
                  Change Avatar
                </Button>
                <Input
                  type="file"
                  hidden
                  ref={fileRef}
                  onChange={handleImageChange}
                />
              </Center>
            </Stack>
          </FormControl>
          <FormControl>
            <FormLabel textColor={'gray.500'}>Full name</FormLabel>
            <Input
              onChange={(e) =>
                setInputs((inputs) => ({ ...inputs, name: e.target.value }))
              }
              value={inputs.name}
              placeholder="Full name"
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <FormControl>
            <FormLabel textColor={'gray.500'}>User name</FormLabel>
            <Input
              placeholder="UserName"
              onChange={(e) =>
                setInputs((inputs) => ({ ...inputs, username: e.target.value }))
              }
              value={inputs.username}
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <FormControl>
            <FormLabel textColor={'gray.500'}>Email address</FormLabel>
            <Input
              onChange={(e) =>
                setInputs((inputs) => ({ ...inputs, email: e.target.value }))
              }
              value={inputs.email}
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
            />
          </FormControl>
          <FormControl>
            <FormLabel textColor={'gray.500'}>Password</FormLabel>
            <Input
              placeholder="password"
              _placeholder={{ color: "gray.500" }}
              type="password"
            />
          </FormControl>
          <FormControl>
            <FormLabel textColor={'gray.500'}>Bio</FormLabel>
            <Input
              onChange={(e) =>
                setInputs((inputs) => ({ ...inputs, bio: e.target.value }))
              }
              placeholder="BIO"
              value={inputs.bio}
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          </Box>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={useColorModeValue("gray.600", "black")}
              color={"white"}
              w="full"
              _hover={{
                bg: useColorModeValue("gray.700", "black"),
              }}
            >
              Cancel
            </Button>
            <Button
              bg={useColorModeValue("black", "gray.400")}
              color={"white"}
              w="full"
              loadingText="updating"
              _hover={{
                bg: useColorModeValue("gray.400", "gray.600"),
              }}
              type="submit"
              isLoading={updating}
            >
              Update
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
};

export default AccountSettings;
