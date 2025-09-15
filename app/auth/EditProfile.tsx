import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useUserLogedInQuery, useUpdateUserProfileMutation, useUploadImageMutation } from "@/components/Redux/auth/api.slice";
import GLinearGradient from "@/components/ui/GGradient";
import EditProfileForm from "@/components/forms/EditProForm";
import back from "../../assets/icon/back.png"
import { useRouter } from "expo-router";

export default function UpdateProfile() {
  const { data: user, isLoading: isUserLoading } = useUserLogedInQuery();
  const router = useRouter()
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const [upload] = useUploadImageMutation()
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

const submitWithFormData = async (payload: { names: string; email: string; phone: string}) => {
  try {
    let imageUrl: string | undefined;

    if (image) {
      const formData = new FormData();
      formData.append("file", {
        uri: image,
        name: "profile.jpg",
        type: "image/jpeg",
      } as any);

      const res = await upload(formData).unwrap();
      imageUrl = res.url;
      console.log(imageUrl)
    }

    const updateBody: any = {
      names: payload.names,
      email: payload.email,
      phone: payload.phone,
    };
    updateBody.image = imageUrl;

    await updateUserProfile(updateBody).unwrap();
    Alert.alert("success", "User successfully updated");
 } catch (err: any) {
  let msg = err?.data?.message ?? "Fail to update user";

  if (Array.isArray(msg)) {
    msg = msg.join(", "); 
  } else if (typeof msg !== "string") {
    msg = JSON.stringify(msg); 
  }
  console.log(msg)
  Alert.alert("error", msg);
}
};


const submitWithJson = async (payload: { names: string; email: string; phone: string }) => {
  try {
    await updateUserProfile(payload).unwrap();
    Alert.alert("success", "User successfully updated");
  } catch (err: any) {
    const msg = err?.data?.message ?? "Fail to update user";
    Alert.alert("error", msg);
  }
};

  const onSubmitFromForm = (values: { names: string; email: string; phone: string,}) => {
    if (image) {
      submitWithFormData(values);
    } else {
      submitWithJson(values);
    }
  };

  if (isUserLoading) return <ActivityIndicator size="large" color="blue" />;

  return (
    <GLinearGradient>
      <View className="flex flex-col justify-center items-center py-10 px-4 gap-10">
        <View className="w-full">
          <View className="flex flex-row justify-between items-center w-2/3 pr-2">
         <TouchableOpacity className="py-1" onPress={()=>router.back()}>
            <Image source={back} className="w-10 h-10" />
          </TouchableOpacity>
          <Text className="font-poppins-bold text-xl text-white">Edit Profile</Text>
          </View>
          </View>
          <View className="flex flex-col justify-center items-center gap-1">
               <TouchableOpacity onPress={pickImage}>
          <Image
            source={{ uri: image || user?.payload?.image }}
            className="w-32 h-32 rounded-full border-4 border-white"
          />
        </TouchableOpacity>
           <Text className="text-white font-poppins">{user.payload?.names}</Text>
           <Text className="text-white font-poppins">{user.payload?.email}</Text>
          </View>
        
        <View className="w-full">
          <EditProfileForm onSubmit={onSubmitFromForm} />
        </View>
      </View>
    </GLinearGradient>
  );
}