
import { Input } from '@ui-kitten/components';
import { Formik } from 'formik';
import { Text, View } from "react-native";
import FormButton from "./FormButton";

interface ForgotFormValue{
    email:string
}

interface IProps{
    onPress: () =>void
}


export default function ForgotForm(props:IProps){
    return (
        <View className="flex flex-col gap-5">
            <Formik<ForgotFormValue>
             initialValues={{email:""}}
             onSubmit={(values, { setSubmitting }) => {
             setTimeout(() => {
             alert('Login successfult');
             setSubmitting(false);
            }, 400);
        }}
            >
                {({values, handleChange, handleBlur, handleSubmit, isSubmitting })=>(
                     <View className="flex flex-col gap-8 pt-20">
                       <View>
                          <Input 
                             value={values.email}
                             placeholder="tgedeon@gmail.com"
                             onChangeText={handleChange('email')}
                             label='Email Address'
                          />
                       </View>
                        <FormButton onPress={handleSubmit} disabled={isSubmitting} name="Submit"/>
                    </View>
                    
                )}
            </Formik>
            <View className="flex flex-row items-center justify-start gap-1">
                <Text className='text-white font-poppins'>Rembered password?</Text>
                <Text className="text-blue-600 font-poppins" onPress={props.onPress}>Login to account</Text>
            </View>
        </View>
    )
}