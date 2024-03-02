import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    // Example of login logic
    try {
      const data = await login(email, password);
      if (data.token) {
        auth.login(data.token); // Pass the token to the login function
        navigate("/plans");
      } else {
        // Handle login failure
        console.error("Login failed: No token received");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <VStack
      spacing={4}
      p={8}
      backgroundColor={useColorModeValue("gray.50", "gray.700")}
      borderRadius="lg"
      boxShadow="lg"
      maxWidth="400px"
      margin="auto"
      marginTop="50px"
    >
      <Heading>Login</Heading>
      <Box as="form" onSubmit={handleSubmit} width="100%">
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isRequired
          />
        </FormControl>
        <FormControl id="password" mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isRequired
          />
        </FormControl>
        <Button mt={4} width="100%" colorScheme="blue" type="submit">
          Login
        </Button>
      </Box>
      <Text color={useColorModeValue("gray.600", "gray.200")}>
        Don't have an account? Sign up
      </Text>
    </VStack>
  );
};

export default Login;
