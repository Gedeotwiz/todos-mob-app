import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { Formik } from 'formik';
import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CheckBoxExample from '../__ui__/checkbox';
import { useLoginMutation } from '../rtk/auth/api.slice';
import { loginInput } from '../rtk/types/integration.type';
import FormButton from './formButton';



interface IProps {
  onPress?: () => void;       
}

export default function LoginForm(Props:IProps) {
     const [showPassword, setShowPassword] = useState(false);
     const router = useRouter();

     const [login,{isLoading}] = useLoginMutation()
  return (
    <View>
      <Formik<loginInput>
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
          const errors: Partial<loginInput> = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          return errors;
        }}
        onSubmit={async(values, { setSubmitting }) => {
        try {
            const res = await login(values).unwrap();
             Alert.alert("Success", "login successfully!");
                    console.log("Response:", res);
                    router.push("/")
             } catch (error: any) {
              Alert.alert("Error", error?.data?.message || "Something went wrong");
              console.log("Error:", error);
              } finally {
                    setSubmitting(false);
                  }
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <View className='flex gap-4'>
            <View>
            <Text>Email Adress</Text>
            <TextInput
              placeholder="tgedeon@gmail.com"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              className='border border-gray-400 rounded-[8px] px-4 py-3'
            />
            {errors.email && touched.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
            </View>

             <View>
            <View className='flex flex-row justify-between items-center'>
                <Text>Password</Text>
                <Text className='text-blue-600' onPress={Props.onPress}>Forgot Password</Text>
            </View>
            <View className="flex-row items-center border border-gray-400 rounded-[8px] px-4">
            <TextInput
              className="flex-1"
              placeholder="*********"
              secureTextEntry={!showPassword}
             value={values.password}
             onChangeText={handleChange("password")}
            />
             <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
               <Ionicons
                name={showPassword ? 'eye' : 'eye-off'}
                size={20}
                color="gray"
               />
             </TouchableOpacity>
           </View>
            {errors.password && touched.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
            </View>

            <CheckBoxExample label='Keep me signed in'/>
            <View>
             <FormButton onPress={handleSubmit as any} name={isLoading ? "Loading..." : "Submit"}
                  disabled={isSubmitting || isLoading}/>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}
