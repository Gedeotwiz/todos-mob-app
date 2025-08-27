import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View ,Alert} from "react-native";
import CheckBoxExample from '../__ui__/checkbox';
import FormButton from './formButton';
import PhoneNumberInput from './phoneNumber';
import { useSignUpMutation } from '../rtk/auth/api.slice';
import { CreateUserInput } from '../rtk/types/integration.type';



export default function SignUpForm(){
     const [showPassword, setShowPassword] = useState(false);

      const [signUp, { isLoading }] = useSignUpMutation();

   return(
    <View>
          <Formik<CreateUserInput>
            initialValues={{names:"", email: '',phone:"", password: '' }}
            validate={(values) => {
              const errors: Partial<CreateUserInput> = {};
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
            onSubmit={async (values, { setSubmitting }) => {
          try {
            const res = await signUp(values).unwrap();
            Alert.alert("Success", "Account created successfully!");
            console.log("Response:", res);
          } catch (error: any) {
            Alert.alert("Error", error?.data?.message || "Something went wrong");
            console.log("Error:", error);
          } finally {
            setSubmitting(false);
          }
        }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting,setFieldValue }) => (
              <View className='flex gap-4'>
                <View>
                <Text>Full Name</Text>
                <TextInput
                  placeholder="Your names"
                  onChangeText={handleChange('names')}
                  onBlur={handleBlur('names')}
                  value={values.names}
                  className='border border-gray-400 rounded-[8px] px-4 py-3'
                />
                {errors.names && touched.names && <Text style={{ color: 'red' }}>{errors.names}</Text>}
                </View>
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
                    <PhoneNumberInput onChangeFormatted={(val) => setFieldValue('phone', val)}/>
                </View>
    
                 <View>
                <View className='flex flex-row justify-between items-center'>
                    <Text>Password</Text>
                    <Text className='text-blue-600'>Forgot Password</Text>
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
                  <CheckBoxExample label='By Creating an Account, i accept Hiring Hub terms of Use and Privacy Policy'/>
                <View>
                 <FormButton onPress={handleSubmit as any} name={isLoading ? "Loading..." : "Submit"}
                  disabled={isSubmitting || isLoading}/>
                </View>
              </View>
            )}
          </Formik>
        </View>
   )
}