import { Link } from "react-router-dom";
import shallow from "zustand/shallow";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import { chakra } from "@chakra-ui/system";

import useStore from "../store/useStore";

const Wrapper = chakra("div", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
});

const LoginFormBox = chakra(Box, {
  baseStyle: {
    width: 500,
  },
});

const LoginPage = () => {
  const { login } = useStore((state) => {
    console.log("state", state);
    return {
      login: state.authSlide.login,
      setStreet: state.authSlide.setStreet,
      post: state.authSlide.post,
      increment: state.countSlide.increment,
    };
  }, shallow);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (form) => {
    try {
      setIsSubmitting(true);
      await login(form);
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log("render", errors.username);
  return (
    <Wrapper>
      <LoginFormBox boxShadow="xs" p="6" m={2}>
        <Text fontSize="2xl">Login</Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.username}>
            <FormLabel>Email address</FormLabel>
            <Input
              {...register("username", { required: "Email is required." })}
            />
            {errors.username && (
              <FormErrorMessage>{errors.username.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              {...register("password", { required: "Password is required." })}
            />
            {errors.password && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </FormControl>

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
            loadingText="Loading"
          >
            Submit
          </Button>
        </form>
      </LoginFormBox>
    </Wrapper>
  );
};

export default LoginPage;
