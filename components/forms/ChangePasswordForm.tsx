import { Input } from '@ui-kitten/components';
import { Formik } from 'formik';
import { Alert, View, Text } from "react-native";
import FormButton from "./FormButton";
import { useChangePasswordMutation } from '../Redux/auth/api.slice';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { UseTogleEye } from '@/hooks/usetogle';

interface ForgotFormValue {
  newPassword: string;
  confrimPassword: string;
}

export default function ChangePasswordForm() {
  const [ChangePassword] = useChangePasswordMutation();

  const { email, otp } = useLocalSearchParams<{ email: string; otp: string }>();
  const { renderIcon, secureTextEntry } = UseTogleEye();
  const router = useRouter();

  return (
    <View className="flex flex-col gap-5">
      <Formik<ForgotFormValue>
        initialValues={{ newPassword: "", confrimPassword: "" }}
        validate={(values) => {
          const errors: Partial<ForgotFormValue> = {};
          if (!values.newPassword) {
            errors.newPassword = "New password is required";
          }
          if (values.newPassword !== values.confrimPassword) {
            errors.confrimPassword = "Passwords do not match";
          }
          return errors;
        }}
       onSubmit={async (values, { setSubmitting }) => {
  try {
    const res = await ChangePassword({
      email,
      otp,
      newPassword: values.newPassword,
    }).unwrap();

    Alert.alert("Success", res.message,[
        {
            text:'OK',
            onPress:() => router.push("/auth/Login")
        }
    ]);
  } catch (error: any) {
    console.log("ChangePassword error:", JSON.stringify(error, null, 2));

    const errorMessage =
      error?.data?.message || error?.error || "Failed to change password";

    Alert.alert("Error", errorMessage,[
        {
            text:'OK',
            onPress:() => router.push("/auth/ForgotPassword")
        }
    ]);
    router.push("/auth/ForgotPassword")
  } finally {
    setSubmitting(false);
  }
}}

      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
          isSubmitting,
        }) => (
          <View className="flex flex-col gap-8 pt-20">
            <View className='flex flex-col gap-2'>
              <Input
                value={values.newPassword}
                onChangeText={handleChange("newPassword")}
                placeholder="*********"
                accessoryRight={renderIcon}
                secureTextEntry={secureTextEntry}
                label="New Password"
                onBlur={handleBlur("newPassword")}
              />
              {touched.newPassword && errors.newPassword && (
                <Text className="text-red-500">{errors.newPassword}</Text>
              )}

              <Input
                value={values.confrimPassword}
                onChangeText={handleChange("confrimPassword")}
                placeholder="*********"
                accessoryRight={renderIcon}
                secureTextEntry={secureTextEntry}
                label="Confirm Password"
                onBlur={handleBlur("confrimPassword")}
              />
              {touched.confrimPassword && errors.confrimPassword && (
                <Text className="text-red-500">{errors.confrimPassword}</Text>
              )}
            </View>

            <FormButton
              onPress={handleSubmit}
              disabled={isSubmitting}
              name="Submit"
            />
          </View>
        )}
      </Formik>
    </View>
  );
}
