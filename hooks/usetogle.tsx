import { MaterialIcons } from '@expo/vector-icons';
import { useState } from "react";


export const UseTogleEye=()=>{
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

   const renderIcon = (props: any) => (
      <MaterialIcons
        name={secureTextEntry ? "visibility-off" : "visibility"}
        size={24}
        color="gray"
        onPress={toggleSecureEntry}
        {...props}
      />
    );

    return {secureTextEntry ,renderIcon}

}