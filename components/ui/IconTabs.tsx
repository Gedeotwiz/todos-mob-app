import { MaterialIcons } from '@expo/vector-icons';



 export  const userIcon = (props: any) => (
    <MaterialIcons
        name='person-outline'
        size={24}
        color="gray"
        {...props}
    />
 );

 export const todoIcon = (props:any) => (
    <MaterialIcons
      name="task"
      size={24}
      color='gray'
      {...props}
    />
 )

 export const timeIcon = (props:any) => (
    <MaterialIcons
      name="event"
      size={24}
      color='gray'
      {...props}
    />
 )

  export const settingIcon = (props:any) => (
    <MaterialIcons
      name="settings"
      size={24}
      color='gray'
      {...props}
    />
 )

