import { settingIcon, timeIcon, todoIcon, userIcon } from '@/components/ui/IconTabs';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import { Href, Slot, usePathname, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';

export default function TabLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const routes: Href[] = ["/", "/Todos", "/Time", "/Setting"];

  useEffect(() => {
    const index = routes.findIndex((r) => pathname === r);
    if (index !== -1) {
      setSelectedIndex(index);
    }
  }, [pathname]);

  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-1'>
        <Slot />
      </View>

      <BottomNavigation
        style={{ backgroundColor: '#05243E',paddingBottom:46 }} 
        appearance="noIndicator"
        selectedIndex={selectedIndex}
        onSelect={(index) => {
          setSelectedIndex(index);
          router.push(routes[index]);
        }}
      >
        <BottomNavigationTab icon={userIcon} title="User" />
        <BottomNavigationTab icon={todoIcon} title="Todos" />
        <BottomNavigationTab icon={timeIcon} title="Time" />
        <BottomNavigationTab icon={settingIcon} title="Setting" />
      </BottomNavigation>
    </SafeAreaView>
  );
}
