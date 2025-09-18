import { useRouter,useLocalSearchParams } from "expo-router";
import { Formik } from 'formik';
import { Text, View,Alert } from "react-native";
import OtpInputField from "../__ui__/OtpCode";
import FormButton from "./FormButton";
import { useVerifyOtpMutation } from "../Redux/auth/api.slice";

interface ResentFormValue{
    code:string
}

interface IProps{
    onClick: () => void,
    onPress:(email:string,otp:string) => void
}


export default function VerfyForm(props:IProps){
    const router = useRouter()

    const { email } = useLocalSearchParams<{ email: string }>();
    const [Verify] = useVerifyOtpMutation()

    return (
        <View className="flex flex-col gap-5">
            <Formik<ResentFormValue>
             initialValues={{code:""}}
             onSubmit={async(values, { setSubmitting }) => {
              try {
                const res = await Verify({email,otp:values.code}).unwrap()
                Alert.alert("Success", res.message);
               setSubmitting(false);
               props.onPress(email,values.code);
              } catch (error) {
                console.log(`error is ${error}`)
              }
        }}
            >
                {({values, handleChange,handleSubmit, isSubmitting })=>(
                     <View className="flex flex-col gap-8 pt-20">
                        <OtpInputField code={values.code} handleChange={handleChange("code")} />
                        <FormButton onPress={handleSubmit} disabled={isSubmitting} name="Verify"/>
                    </View>
                    
                )}
            </Formik>
            <View className="flex flex-row items-center justify-start gap-2">
                <Text className="text-white font-poppins">Didn't see your email?</Text>
                <Text className="text-blue-600 font-poppins" onPress={props.onClick}>Resend</Text>
            </View>
        </View>
    )
}