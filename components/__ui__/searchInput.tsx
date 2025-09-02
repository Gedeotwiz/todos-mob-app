import { MaterialIcons } from "@expo/vector-icons";
import { Input } from "@ui-kitten/components";


export const SearchInput = () => {
  const renderIcon = (props: any) => (
    <MaterialIcons
      name="search"
      size={24}
      color="gray"
      {...props}
    />
  );

  return (
    <Input
      placeholder="Search todos"
      accessoryRight={renderIcon}
    />
  );
};