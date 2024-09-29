import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import { useSignIn } from '../hooks/useSignIn';
import { useNavigate } from "react-router-native";

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      marginBottom: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    inputField: {
      height: 40,
      borderRadius: 5,
      borderColor: "gray",
      borderWidth: 1,
      paddingHorizontal: 10,
      backgroundColor: "white",
      marginBottom: 10,
      width: "100%",
    },
    button: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 8,
      paddingHorizontal: 8,
      borderRadius: 4,
      alignSelf: 'stretch',
      marginTop: 5,
      marginBottom: 10,

    },
    buttonText: {
      color: theme.colors.textAppBar,
      textAlign: "center",
    },
    error: {
      color: "#d73a4a"
    }
  });

  const validationSchema = yup.object().shape({
    username: yup.string().min(4, "Username must be 4 or more characters long").required("Username is required"),
    password: yup.string().min(4, "Password must be 4 or more characters long").required("Password is required"),
  });


  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await signIn({ username, password })
      if (data.authenticate) {
        navigate("/repositories");
      }
    } catch (error) {
      console.log("SignIn.jsx", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputField}
        placeholder="username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")} />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.error}>{formik.errors.username}</Text>
      )}

      <TextInput
        style={styles.inputField}
        secureTextEntry={true}
        placeholder="password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")} />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.error}>{formik.errors.password}</Text>
      )}


      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text fontWeight={"bold"} style={styles.buttonText}>Sign-in</Text>
      </Pressable>
    </View>
  )
};

export default SignIn;
