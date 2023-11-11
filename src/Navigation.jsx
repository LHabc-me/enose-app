import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/Home/HomeScreen";
import HistoryScreen from "./screens/History/HistoryScreen";
import DeviceScreen from "./screens/Device/DeviceScreen";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Text } from "react-native";

const Tab = createBottomTabNavigator();

function Navigation() {
  return (
    <Tab.Navigator initialRouteName={"home"} screenOptions={{ headerShown: false }}>
      <Tab.Screen name={"Home"} component={HomeScreen}
                  options={{
                    tabBarLabel: "首页",
                    tabBarIcon: ({ color, size }) => (
                      <Icon name={"home"} color={color} size={size} />
                    ),
                  }} />
      <Tab.Screen name={"Device"} component={DeviceScreen}
                  options={{
                    tabBarLabel: "设备",
                    tabBarIcon: ({ color, size }) => (
                      <Icon name={"devices"} color={color} size={size} />
                    ),
                  }} />
      <Tab.Screen name={"History"} component={HistoryScreen}
                  options={{
                    tabBarLabel: "历史",
                    tabBarIcon: ({ color, size }) => (
                      <Icon name={"history"} color={color} size={size} />
                    ),
                  }} />
      <Tab.Screen name={"Profile"} component={ProfileScreen}
                  options={{
                    tabBarLabel: "我的",
                    tabBarIcon: ({ color, size }) => (
                      <Icon name="account" color={color} size={size} />
                    ),
                  }} />
    </Tab.Navigator>
  );
}

export default Navigation;
