import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { user, userDetails } from "../../utils/userDB";
import useAuth from "../../Hooks/useAuth";

export default function LoginForm() {
  const [error, setError] = useState("");
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: (formValue) => {
      setError("");
      const { username, password } = formValue;

      if (username !== user.username || password !== user.password) {
        setError("User o Password incorrects");
        console.log("User o Password incorrects");
      } else {
        login(userDetails);
        console.log("Login Succesfilled");
        console.log(userDetails);
      }
    },
  });

  return (
    <View>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        placeholder="User name"
        style={styles.input}
        autoCapitalize="none"
        value={formik.values.username}
        onChangeText={(text) => formik.setFieldValue("username", text)}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        autoCapitalize="none"
        secureTextEntry="true"
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue("password", text)}
      />
      <Button title="Sign In" onPress={formik.handleSubmit} />
      <Text style={styles.error}>{formik.errors.username}</Text>
      <Text style={styles.error}>{formik.errors.password}</Text>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
}

function initialValues() {
  return {
    username: "",
    password: "",
  };
}

function validationSchema() {
  return {
    username: Yup.string().required("The user is required"),
    password: Yup.string().required("The password is required"),
  };
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  error: {
    textAlign: "center",
    color: "red",
    marginTop: 20,
  },
});
