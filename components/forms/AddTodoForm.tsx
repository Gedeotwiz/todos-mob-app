import { Input } from "@ui-kitten/components";
import { Formik } from "formik";
import { View } from "react-native";
import FormButton from "./FormButton";



export default function AddTodoForm(props: { onPress: (data: { title: string,summary:string, description: string }) => void }) {
    
    return (
        <Formik
          initialValues={{ title: '', summary:'',description: '' }}
          onSubmit={(values) => props.onPress(values)}
        >
        {({ values, handleBlur, handleChange, handleSubmit }) => (
          <View className="flex flex-col gap-4">
               <Input 
                   placeholder="e.g. Prepare sprint review"
                   value={values.title}
                   onChangeText={handleChange('title')}
                   onBlur={handleBlur('title')}
                   label='Task title'
               />
               <Input 
                   placeholder="What does success look like?"
                   value={values.summary}
                   size='large'
                   onChangeText={handleChange('summary')}
                   onBlur={handleBlur('summary')}
                   label='Short summary'
                />
              <Input 
                   placeholder="Add details, notes, or steps..."
                   multiline={true}
                   textStyle={{ minHeight: 92, textAlignVertical: "top" }}
                   value={values.description}
                   onChangeText={handleChange('description')}
                   onBlur={handleBlur('description')}
                   label='Description (optional)'
              />
              <FormButton name="Continue to due date" onPress={() => handleSubmit()}/>
           </View>
        )}
        </Formik>
    )
}
