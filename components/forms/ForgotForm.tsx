
import { Input } from '@ui-kitten/components';
import { Formik } from 'formik';
import { Alert, Text, View } from "react-native";
import FormButton from "./FormButton";
import { useForgotPasswordMutation } from '../Redux/auth/api.slice';

interface ForgotFormValue{
    email:string
}

interface IProps {
  onPress: (email: string) => void;
  onClick: () => void;
}

export default function ForgotForm(props: IProps) {
  const [forGot] = useForgotPasswordMutation();

  return (
    <View className="flex flex-col gap-5">
      <Formik<ForgotFormValue>
        initialValues={{ email: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const res = await forGot(values).unwrap();
            Alert.alert("success", res.message);
            setSubmitting(false);

            props.onPress(values.email);
          } catch (error) {
            console.log(`error is ${error}`);
          }
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <View className="flex flex-col gap-8 pt-20">
            <View>
              <Input
                value={values.email}
                placeholder="tgedeon@gmail.com"
                onChangeText={handleChange("email")}
                label="Email Address"
                onBlur={handleBlur("email")}
              />
            </View>
            <FormButton
              onPress={handleSubmit}
              disabled={isSubmitting}
              name="Submit"
            />
          </View>
        )}
      </Formik>

      <View className="flex flex-row items-center justify-start gap-1">
        <Text className="text-white font-poppins">Remembered password?</Text>
        <Text
          className="text-blue-600 font-poppins"
          onPress={props.onClick}
        >
          Login to account
        </Text>
      </View>
    </View>
  );
}
