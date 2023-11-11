import { ScrollView, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Input, Icon, IconButton, Divider, Link, Button, Checkbox } from "native-base";
import Area from "../../components/Area";
import { useState } from "react";

const Stack = createStackNavigator();

function DeviceScreen() {
  return (
    <Stack.Navigator initialRouteName={"DeviceMain"}>
      <Stack.Screen name={"DeviceMain"}
                    component={Main}
                    options={{
                      headerTitle: "设备",
                    }} />
    </Stack.Navigator>
  );
}

function DeviceItem(props) {
  const { location, deviceId, status } = props;
  return (
    <Area style={{ height: 50, borderRadius: 0, backgroundColor: "" }}>
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ flex: 1, textAlign: "center" }}>{location}</Text>
        <Text style={{ flex: 1, textAlign: "center" }}>{deviceId}</Text>
        <View style={{
          flex: 1, display: "flex", flexDirection: "row",
          justifyContent: "center", alignItems: "center",
        }}>
          <View style={{
            width: 12, height: 12, borderRadius: 20,
            backgroundColor: status === "启用" ? "green" : "red",
            marginRight: 5,
          }} />
          <Text style={{ textAlign: "center" }}>{status}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Button variant={"link"}>
            详情
          </Button>
        </View>
      </View>
    </Area>
  );
}


function Main(props) {
  const [currentLocation, setCurrentLocation] = useState("吉林长春");
  return (
    <View>
      <Input placeholder={"查找设备"}
             variant={"unstyled"}
             fontSize={"14"}
             InputLeftElement={<Icon style={{ margin: 6 }} size={5}
                                     color={"gray.400"}
                                     as={<FontAwesome name={"search"} />} />}
             InputRightElement={
               <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                 <Text>{currentLocation}</Text>
                 <IconButton icon={<Icon style={{ margin: 6, marginBottom: 0, marginTop: 0 }} size={6} color={"gray.400"}
                                         as={<MaterialCommunityIcons name={"map-marker"} />} />} />
               </View>} />
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", padding: 10 }}>
        <Checkbox value={"aroundOnly"} size={"sm"}
                  _text={{ color: "gray.500" }} defaultIsChecked>
          只查看附近的设备
        </Checkbox>
        <Checkbox value={"usableOnly"} size={"sm"}
                  _text={{ color: "gray.500" }} defaultIsChecked>
          只查看启用的设备
        </Checkbox>
      </View>
      <ScrollView style={{ padding: 3 }}>
        <View style={{
          display: "flex", flexDirection: "row",
          justifyContent: "space-between", alignItems: "center",
          height: 30,
        }}>
          <Text style={{ flex: 1, textAlign: "center" }}>地点</Text>
          <Text style={{ flex: 1, textAlign: "center" }}>设备ID</Text>
          <Text style={{ flex: 1, textAlign: "center" }}>设备状态</Text>
          <Text style={{ flex: 1, textAlign: "center" }}>查看详情</Text>
        </View>
        <Divider />
        <View style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {
            <DeviceItem location={"吉林大学南岭校区"} deviceId={"219658"} status={"启用"} />
          }
        </View>
      </ScrollView>
    </View>
  );
}

export default DeviceScreen;
