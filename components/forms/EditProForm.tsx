import { View } from "react-native";
import { useUserLogedInQuery } from "../Redux/auth/api.slice";
import { Formik } from "formik";
import PhoneNumberInput from "./PhoneNumber";
import { Input } from "@ui-kitten/components";
import FormButton from "./FormButton";

type FormValues = {
  names: string;
  email: string;
  phone: string;
};

export default function EditProfileForm({ onSubmit }: { onSubmit: (values: FormValues) => void }) {
  const { data: user } = useUserLogedInQuery();

  const { names, email, phone } = user.payload;

  return (
    <Formik<FormValues>
      enableReinitialize
      initialValues={{
        names: names ?? "",
        email: email ?? "",
        phone: phone ?? "",
      }}
      onSubmit={(values) => onSubmit(values)}
    >
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
        <View className="flex gap-4">
          <Input value={values.names} onChangeText={handleChange('names')} label="Your names" />
          <Input value={values.email} onChangeText={handleChange('email')} onBlur={handleBlur('email')} label="Email Address" />
          <PhoneNumberInput onChangeFormatted={(val) => setFieldValue('phone', val)} />
          <FormButton name="Save" onPress={handleSubmit} disabled={isSubmitting}/>
        </View>
      )}
    </Formik>
  );
}