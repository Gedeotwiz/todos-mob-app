import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useUserLogedInQuery,useUpdateUserProfileMutation } from "@/components/Redux/auth/api.slice";
import GLinearGradient from "@/components/ui/GGradient";
import EditProfileForm from "@/components/forms/EditProForm";

export default function UpdateProfile() {
  const { data: user, isLoading: isUserLoading, refetch } = useUserLogedInQuery();
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    if (!user) return;
    const payload: any = {
      names: user.names, 
      email: user.email,
      phone: user.phone,
    };

    if (image) {
  const formData = new FormData();
  formData.append("names", payload.names);
  formData.append("email", payload.email);
  formData.append("phone", payload.phone);
  formData.append("image", {
    uri: image,
    type: "image/jpeg",
    name: "profile.jpg",
  } as any);

  await updateUserProfile(formData).unwrap();
} else {
  await updateUserProfile(payload).unwrap();
}
  };

  if (isUserLoading) return <ActivityIndicator size="large" color="blue" />;

  return (
    <GLinearGradient>
      <View className="flex flex-col justify-center items-center py-10 px-4">
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{ uri: image || user?.payload?.image }}
            className="w-32 h-32 rounded-full border-4 border-white"
          />
        </TouchableOpacity>
        <View className="w-full">
        <EditProfileForm onSubmit={(values) => {
            {image && (handleUpload())}
            const formData = new FormData();
            formData.append("names", values.names);
            formData.append("email", values.email);
            formData.append("phone", values.phone);
            formData.append("image", {
            uri: image,
            type: "image/jpeg",
            name: "profile.jpg",
         } as any);
            updateUserProfile(formData).unwrap()
           .then(() => {Alert.alert("success","User successfuly updated")})
            .catch(() => {Alert.alert("error","Fail to update user")});
      }} />
      </View>
      </View>
    </GLinearGradient>
  );
}
