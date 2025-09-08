import { UseTogleEye } from '@/hooks/usetogle';
import { Input } from '@ui-kitten/components';
import { Formik } from 'formik';
import { useState } from 'react';
import { Alert, View } from "react-native";
import CheckBoxExample from '../__ui__/Checkbox';
import { useSignUpMutation } from '../Redux/auth/api.slice';
import { CreateUserInput } from '../Redux/types/integration.type';
import FormButton from './FormButton';
import PhoneNumberInput from './PhoneNumber';



export default function SignUpForm(){
     const [keepSignedIn, setKeepSignedIn] = useState(false); 
      const [signUp, { isLoading }] = useSignUpMutation();

      const {renderIcon,secureTextEntry} = UseTogleEye()

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
            {({ values, handleChange, handleBlur, handleSubmit, isSubmitting,setFieldValue }) => (
              <View className='flex gap-4'>
                <View>
                  <Input 
                     value={values.names}
                     placeholder="Your names"
                     onChangeText={handleChange('names')}
                     label='Your names'
                  />
                </View>
                <View>
                  <Input
                     value={values.email}
                     placeholder="tgedeon@gmail.com"
                     onChangeText={handleChange('email')}
                     onBlur={handleBlur('email')}
                     label='Email Address'
                  />
                </View>

                <View>
                    <PhoneNumberInput onChangeFormatted={(val) => setFieldValue('phone', val)}/>
                </View>
    
                 <View>
                   <Input 
                     value={values.password}
                     placeholder='***********'
                     label='Password'
                     onChangeText={handleChange('password')}
                     onBlur={handleBlur('password')}
                     accessoryRight={renderIcon}
                     secureTextEntry={secureTextEntry}
                   />
                
                </View>
                    <CheckBoxExample
                      label="By Creating an Account, i accept Hiring Hub terms of Use and Privacy Policy"
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
   )
}