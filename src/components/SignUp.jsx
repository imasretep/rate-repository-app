import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import { useNavigate } from "react-router-native";
import { useSignUp } from "../hooks/useSignUp";
import { useSignIn } from "../hooks/useSignIn";

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
    color: "#d73a4a",
  },
});


const SignUpContainer = ({ onSubmit }) => {

  const validationSchema = yup.object().shape({
    username: yup.string().min(5, "Username must be between 5 and 30 characters long").required("Username is required").max(30),
    password: yup.string().min(5, "Password must be between 5 and 50 characters long").required("Password is required").max(50),
    passwordConfirm: yup.string().required('Password confirm is required').oneOf([yup.ref('password'), null], 'Password confirm must be the same as password'),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirm: "",
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
        onChangeText={formik.handleChange("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.error}>{formik.errors.username}</Text>
      )}

      <TextInput
        style={styles.inputField}
        secureTextEntry={true}
        placeholder="password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.error}>{formik.errors.password}</Text>
      )}

      <TextInput
        style={styles.inputField}
        secureTextEntry={true}
        placeholder="password confirm"
        value={formik.values.passwordConfirm}
        onChangeText={formik.handleChange("passwordConfirm")}
      />
      {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
        <Text style={styles.error}>{formik.errors.passwordConfirm}</Text>
      )}


      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text fontWeight={"bold"} style={styles.buttonText}>
          Sign-up
        </Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signUp({ username, password });
      const { data } = await signIn({ username, password });
      console.log("SignUp.jsx", data);
      if (data.authenticate) {
        navigate("/repositories");
      }
    } catch (error) {
      console.log("SignUp.jsx", error);
    }
  };

  return (

    <SignUpContainer onSubmit={onSubmit} />
  );
};

export default SignUp;
