import { Input } from "@ui-kitten/components";
import { Formik } from "formik";
import { View } from "react-native";
import FormButton from "./formButton";



export default function AddTodoForm(props: { onPress: (data: { title: string,summary:string, description: string }) => void }) {
    
    return (
        <Formik
          initialValues={{ title: '', summary:'',description: '' }}
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
                   placeholder="Enter summary"
                   value={values.summary}
                   size='large'
                   onChangeText={handleChange('summary')}
                   onBlur={handleBlur('summary')}
                   label='Todo summary'
                />
              <Input 
                   placeholder="Enter description"
                   multiline={true}
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
