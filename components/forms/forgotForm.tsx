import { useRouter } from "expo-router";
import { Formik } from 'formik';
import { Text, TextInput, View } from "react-native";
import FormButton from "./formButton";

interface ForgotFormValue{
    email:string
}

interface IProps{
    onPress: () =>void
}


export default function ForgotForm(props:IProps){
    const router = useRouter()
    return (
        <View className="flex flex-col gap-5">
            <Formik<ForgotFormValue>
             initialValues={{email:""}}
             onSubmit={(values, { setSubmitting }) => {
             setTimeout(() => {
             alert('Login successfult');
             setSubmitting(false);
              router.push("./resentPassword")
            }, 400);
        }}
            >
                {({values, handleChange, handleBlur, handleSubmit, isSubmitting })=>(
                     <View className="flex flex-col gap-8 pt-20">
                       <View>
                         <Text>Email Adress</Text>
                         <TextInput
                            placeholder="tgedeon@gmail.com"
                            onChangeText={handleChange('email')}
                             onBlur={handleBlur('email')}
                             value={values.email}
                             className='border border-gray-400 rounded-[8px] px-4 py-3'
                        />
                       </View>
                        <FormButton onPress={handleSubmit} disabled={isSubmitting} name="Submit"/>
                    </View>
                    
                )}
            </Formik>
            <View className="flex flex-row items-center justify-start gap-1">
                <Text>Rembered password?</Text>
                <Text className="text-blue-600" onPress={props.onPress}>Login to account</Text>
            </View>
        </View>
    )
}