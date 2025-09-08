
import { UseTogleEye } from '@/hooks/usetogle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input } from '@ui-kitten/components';
import { Formik } from 'formik';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import CheckBoxExample from '../__ui__/Checkbox';
import { useLoginMutation } from '../Redux/auth/api.slice';
import { loginInput } from '../Redux/types/integration.type';
import FormButton from './FormButton';






interface IProps {
  onPress?: () => void;
  onLogin?:() => void       
}

export default function LoginForm(Props:IProps) {
      const [keepSignedIn, setKeepSignedIn] = useState(false); 


     const [login,{isLoading}] = useLoginMutation()
     const {renderIcon,secureTextEntry} = UseTogleEye()
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
             const token = res.payload?.accessToken
              if (token) {
                 await AsyncStorage.setItem('token', token);
               }
                 Alert.alert("Success", "login successfully!", [
                   {
                    text: "OK",
                     onPress: () => {
                    if (Props.onLogin) Props.onLogin();
                  },
                    },
                  ]);
             } catch (error: any) {
              Alert.alert("Error", error?.data?.message || "Something went wrong");
              console.log("Error:", error);
              } finally {
                    setSubmitting(false);
                  }
        }}
      >
        {({ values,handleBlur,handleChange,handleSubmit, isSubmitting }) => (
          <View className='flex gap-4'>
            <View>
            <Input value={values.email}
              label='Email Adress'
              placeholder='tgedeon@gmail.com'
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
            </View>

             <View>
            <View className='flex flex-row justify-end items-end'>
                <Text className='text-blue-600 font-poppins' onPress={Props.onPress}>Forgot Password</Text>
            </View>
              <Input 
                value={values.password}
                onChangeText={handleChange("password")}
                placeholder="*********"
                accessoryRight={renderIcon}
                secureTextEntry={secureTextEntry}
                label="Password"
                onBlur={handleBlur('password')}
              />
            </View>

            <CheckBoxExample
              label="Keep me signed in"
              value={keepSignedIn}
              onChange={setKeepSignedIn}
            />
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
