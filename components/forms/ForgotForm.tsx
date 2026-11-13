
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
  const [forGot, { isLoading }] = useForgotPasswordMutation();

  return (
    <View className="flex flex-col gap-5">
      <Formik<ForgotFormValue>
        initialValues={{ email: "" }}
        validate={(values) => {
          if (!values.email.trim()) return { email: "Email is required" };
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email.trim())) return { email: "Enter a valid email address" };
          return {};
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const res = await forGot(values).unwrap();
            Alert.alert("success", res.message);
            props.onPress(values.email);
          }catch (error: any) {
            console.log("error is", error); 
            Alert.alert("Error", error?.data?.message || "Something went wrong");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <View className="flex flex-col gap-5 pt-3">
            <View>
              <Input
                value={values.email}
                placeholder="you@example.com"
                onChangeText={handleChange("email")}
                label="Email address"
                onBlur={handleBlur("email")}
                keyboardType="email-address"
                autoCapitalize="none"
                status={values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email) ? "danger" : "basic"}
              />
            </View>
            <FormButton
              onPress={handleSubmit}
              disabled={isSubmitting || isLoading}
              name={isSubmitting || isLoading ? "Sending code..." : "Send reset code"}
            />
          </View>
        )}
      </Formik>

      <View className="flex flex-row items-center justify-center gap-1 pt-2">
        <Text className="text-[#858ba2] font-poppins">Remembered your password?</Text>
        <Text
          className="text-violet-600 font-poppins-medium"
          onPress={props.onClick}
        >
          Login to account
        </Text>
      </View>
    </View>
  );
}
