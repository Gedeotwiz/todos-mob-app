import { useRouter } from "expo-router";
import { Formik } from 'formik';
import { Text, View } from "react-native";
import OtpInputField from "../__ui__/otpCode";
import FormButton from "./formButton";

interface ResentFormValue{
    code:string
}

interface IProps{
    onPress: () =>void
}


export default function ResentForm(props:IProps){
    const router = useRouter()
    return (
        <View className="flex flex-col gap-5">
            <Formik<ResentFormValue>
             initialValues={{code:""}}
             onSubmit={(values, { setSubmitting }) => {
             setTimeout(() => {
             alert('Login successfult');
             setSubmitting(false);
              router.push("/")
            }, 400);
        }}
            >
                {({values, handleChange,handleSubmit, isSubmitting })=>(
                     <View className="flex flex-col gap-8 pt-20">
                        <OtpInputField code={values.code} handleChange={handleChange("code")} />
                        <FormButton onPress={handleSubmit} disabled={isSubmitting} name="Submit"/>
                    </View>
                    
                )}
            </Formik>
            <View className="flex flex-row items-center justify-start gap-1">
                <Text>Didn't see your email?</Text>
                <Text className="text-blue-600" onPress={props.onPress}>Resend</Text>
            </View>
        </View>
    )
}