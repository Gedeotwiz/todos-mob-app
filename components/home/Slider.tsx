import React, { useEffect, useRef, useState } from "react";
import { FlatList, Image, View } from "react-native";


const images = [
  require("../../assets/icon/profile-re.png"),
  require("../../assets/icon/WhatsApp.png"),
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const flatListRef = useRef<FlatList<any>>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);

      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <View>
      <FlatList
        ref={flatListRef} 
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={item} style={{ width: 100, height: 100 }} />
        )}
      />
    </View>
  );
}
