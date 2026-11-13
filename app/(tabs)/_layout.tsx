import { settingIcon, timeIcon, todoIcon, userIcon } from '@/components/ui/IconTabs';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import { Href, Slot, usePathname, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const routes: Href[] = ["/", "/Todos", "/Time", "/Setting"];

  useEffect(() => {
    const index = routes.findIndex((r) => pathname === r);
    if (index !== -1) {
      setSelectedIndex(index);
    }
  }, [pathname]);

  return (
    <SafeAreaView className='flex-1' edges={['top']}>
      <SafeAreaView className='flex-1' edges={['left', 'right']}>
        <Slot />
      </SafeAreaView>

      <SafeAreaView
        edges={['bottom']}
        style={{ backgroundColor: '#ffffff', borderTopWidth: 1, borderTopColor: '#e8e9f0' }}
      >
        <BottomNavigation
          style={{ backgroundColor: '#ffffff', paddingTop: 4 }}
          appearance="noIndicator"
          selectedIndex={selectedIndex}
          onSelect={(index) => {
            setSelectedIndex(index);
            router.push(routes[index]);
          }}
        >
          <BottomNavigationTab icon={userIcon} title="Board" />
          <BottomNavigationTab icon={todoIcon} title="Todos" />
          <BottomNavigationTab icon={timeIcon} title="Time" />
          <BottomNavigationTab icon={settingIcon} title="Setting" />
        </BottomNavigation>
      </SafeAreaView>
    </SafeAreaView>
  );
}
