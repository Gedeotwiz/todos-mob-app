import OTPInputView from '@twotalltotems/react-native-otp-input'
import { Text, View } from 'react-native'

interface IProps {
  handleChange: (code: string) => void
  code: string
}

export default function OtpInput(props: IProps) {
  return (
    <View>
      <Text className='font-bold'>Enter Code</Text>
      <OTPInputView
        pinCount={6}
        style={{ width: '100%', height: 60 }}
        code={props.code}
        onCodeChanged={props.handleChange}
        autoFocusOnLoad
        codeInputFieldStyle={{
          width: 40,
          height: 45,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          color: "black",
          fontSize: 18,
        }}
      />
    </View>
  )
}
