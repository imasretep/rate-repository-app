import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from "react-router-native";

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
    height: 50,
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
    paddingVertical: 15,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'stretch',
    marginTop: 10,
    marginBottom: 5,
  },
  buttonText: {
    color: theme.colors.textAppBar,
    textAlign: "center",
  },
  error: {
    color: "#d73a4a",
    marginBottom: 5,
  },
});

const ReviewForm = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName: values.repositoryOwner,
            repositoryName: values.repositoryName,
            rating: parseInt(values.rating, 10),
            text: values.review,
          }
        }
      });
      console.log(data)
      navigate(`/repository/${data.createReview.repositoryId}`);
    } catch (error) {
      console.log(error);
    }
  }

  const validationSchema = yup.object().shape({
    repositoryOwner: yup.string().required("Repository owner is required"),
    repositoryName: yup.string().required("Repository name is required"),
    rating: yup.number().required("Rating must be between 0 - 100").positive().min(0).max(100),
    review: yup.string()
  });

  const formik = useFormik({
    initialValues: {
      repositoryOwner: "",
      repositoryName: "",
      rating: 0,
      review: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputField}
        placeholder="Repository owner"
        value={formik.values.repositoryOwner}
        onChangeText={formik.handleChange("repositoryOwner")}
      />
      {formik.touched.repositoryOwner && formik.errors.repositoryOwner && (
        <Text style={styles.error}>{formik.errors.repositoryOwner}</Text>
      )}

      <TextInput
        style={styles.inputField}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={styles.error}>{formik.errors.repositoryName}</Text>
      )}

      <TextInput
        style={styles.inputField}
        placeholder="Rating"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.error}>{formik.errors.rating}</Text>
      )}

      <TextInput
        style={styles.inputField}
        placeholder="Review"
        value={formik.values.review}
        multiline={true}
        onChangeText={formik.handleChange("review")}
      />
      {formik.touched.review && formik.errors.review && (
        <Text style={styles.error}>{formik.errors.review}</Text>
      )}


      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text fontWeight={"bold"} style={styles.buttonText}>
          Create a review
        </Text>
      </Pressable>
    </View>
  )
};

export default ReviewForm;
