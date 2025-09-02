import { Input } from "@ui-kitten/components";
import { Formik } from "formik";
import { View } from "react-native";
import FormButton from "./formButton";

interface IProps{
    onPress:()=>void
}

export default function AddTodoForm(props: { onPress: (data: { title: string, description: string }) => void }) {
    return (
        <Formik
          initialValues={{ title: '', description: '' }}
          onSubmit={(values) => props.onPress(values)}
        >
        {({ values, handleBlur, handleChange, handleSubmit }) => (
           <View className="flex flex-col gap-6">
               <Input 
                   placeholder="Enter title"
                   value={values.title}
                   onChangeText={handleChange('title')}
                   onBlur={handleBlur('title')}
                   label='Title'
               />
              <Input 
                   placeholder="Enter description"
                   value={values.description}
                   onChangeText={handleChange('description')}
                   onBlur={handleBlur('description')}
                   label='Description'
              />
              <FormButton name="Next" onPress={() => handleSubmit()}/>
           </View>
        )}
        </Formik>
    )
}
