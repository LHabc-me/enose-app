import { Linking, Pressable, ScrollView, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Input, Icon, IconButton, Divider, Link, Button, Avatar, Progress, Center, useToast } from "native-base";
import Area from "../../components/Area";
import { useState, useRef } from "react";

const Stack = createStackNavigator();

function ProfileScreen() {
  return (
    <Stack.Navigator initialRouteName={"ProfileMain"}>
      <Stack.Screen name={"ProfileMain"}
                    component={Main}
                    options={{
                      headerTitle: "我的",
                    }} />
      <Stack.Screen name={"周月年报"}
                    component={Report}
                    options={{
                      headerTitle: "",
                    }} />
      <Stack.Screen name={"联系客服"}
                    component={Contact}
                    options={{
                      headerTitle: "",
                    }} />
      <Stack.Screen name={"我的收藏"}
                    component={Collection}
                    options={{
                      headerTitle: "",
                    }} />
      <Stack.Screen name={"设置"}
                    component={Settings}
                    options={{
                      headerTitle: "",
                    }} />
      <Stack.Screen name={"关于"}
                    component={About}
                    options={{
                      headerTitle: "",
                    }} />
      <Stack.Screen name={"开发者选项"}
                    component={DeveloperSettings}
                    options={{
                      headerTitle: "",
                    }} />
    </Stack.Navigator>
  );
}

function Report(props) {
  return (
    <></>
  );
}

function Contact(props) {
  return (
    <></>
  );
}

function Collection(props) {
  return (
    <></>
  );
}

function Settings(props) {
  return (
    <></>
  );
}

function About(props) {
  return (
    <></>
  );
}

function DeveloperSettings(props) {
  return (
    <></>
  );
}

function UserInfo(props) {
  return (
    <Area style={{ height: 120, padding: 5, display: "flex", flexDirection: "column", gap: 5 }}>
      <View style={{ display: "flex", flexDirection: "row", padding: 10, gap: 15 }}>
        <Avatar />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, color: "#404040", fontWeight: "bold" }}>登录Enose账号</Text>
          <Progress value={45} />
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <Text>活力新星</Text>
            <Text>成长值 700 / 1500</Text>
          </View>
        </View>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Center>
            <Text style={{ textAlign: "center" }}>
              Lv.1{"\n"}
              等级
            </Text>
          </Center>
        </View>
        <Divider orientation={"vertical"} />
        <View style={{ flex: 1 }}>
          <Center>
            <Text style={{ textAlign: "center" }}>
              3{"\n"}
              检测次数
            </Text>
          </Center>
        </View>
      </View>
    </Area>
  );
}

function Main(props) {
  const { navigation } = props;
  const smallCardStyle = {
    height: 50,
    padding: 5,
    paddingLeft: 15,
    // flex: 1,
  };
  const settingsItemStyle = {
    display: "flex",
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    gap: 5,
  };
  const smallCardHeaderStyle = {
    fontSize: 16,
    color: "#404040",
  };
  const [showDeveloperOptions, setShowDeveloperOptions] = useState(false);
  const clickCount = useRef(0);
  const toast = useToast();
  const handlePress = (type) => {
    if (type === "检查更新") {
      toast.show({
        title: "已是最新版本",
      });
      clickCount.current++;
      if (clickCount.current >= 5) {
        setShowDeveloperOptions(true);
      }
      return;
    } else if (type === "开发者选项" && !showDeveloperOptions) {
      return;
    } else if (type === "加入我们") {
      Linking.openURL("mailto:enose@outlook.com").catch(err =>
        console.error("An error occured", err),
      );
    } else {
      navigation.navigate(type);
    }
  };
  return (
    <View style={{ padding: 10, display: "flex", flexDirection: "column", gap: 5 }}>
      <UserInfo />
      <View style={{ display: "flex", flexDirection: "row", textAlign: "center", gap: 10, padding: 10 }}>
        <View style={{ display: "flex", flexDirection: "column", flex: 1, gap: 10 }}>
          <Pressable onPress={() => handlePress("周月年报")}>
            <Area style={smallCardStyle}>
              <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View>
                  <Text style={smallCardHeaderStyle}>周月年报</Text>
                  <Text>暂未生成</Text>
                </View>
                <Icon as={<FontAwesome name={"user"} />} size={8} color={"blue.500"} />
              </View>
            </Area>
          </Pressable>
          <Pressable onPress={() => handlePress("我的收藏")}>
            <Area style={smallCardStyle}>
              <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View>
                  <Text style={smallCardHeaderStyle}>我的收藏</Text>
                  <Text>点击查看收藏</Text>
                </View>
                <Icon as={<MaterialIcons name={"favorite"} />} size={8} style={{ marginRight: 3 }} color={"blue.500"} />
              </View>
            </Area>
          </Pressable>
        </View>
        <View style={{ display: "flex", flexDirection: "column", flex: 1, gap: 10 }}>
          <Pressable onPress={() => handlePress("联系客服")}>
            <Area style={smallCardStyle}>
              <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View>
                  <Text style={smallCardHeaderStyle}>联系客服</Text>
                  <Text>点击连接客服</Text>
                </View>
                <Icon as={<FontAwesome name={"comment"} />} size={8} style={{ marginRight: 3 }} color={"blue.500"} />
              </View>
            </Area>
          </Pressable>
          <Pressable onPress={() => handlePress("加入我们")}>
            <Area style={smallCardStyle}>
              <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View>
                  <Text style={smallCardHeaderStyle}>加入我们</Text>
                  <Text>加入电子鼻团队</Text>
                </View>
                <Icon as={<MaterialIcons name={"group-add"} />} size={8} style={{ marginRight: 3 }} color={"blue.500"} />
              </View>
            </Area>
          </Pressable>
        </View>
      </View>
      <Area style={{ padding: 10, display: "flex", flexDirection: "column", gap: 5 }}>
        <Pressable onPress={() => handlePress("设置")}>
          <View style={settingsItemStyle}>
            <MaterialCommunityIcons name={"cog-outline"} size={30} />
            <Text>设置</Text>
          </View>
        </Pressable>
        <Divider />
        <Pressable onPress={() => handlePress("关于")}>
          <View style={settingsItemStyle}>
            <MaterialIcons name={"info-outline"} size={30} />
            <Text>关于</Text>
          </View>
        </Pressable>
        <Divider />
        <Pressable onPress={() => handlePress("检查更新")}>
          <View style={settingsItemStyle}>
            <MaterialCommunityIcons name={"arrow-up-circle-outline"} size={30} />
            <Text>检查更新</Text>
          </View>
        </Pressable>
        {
          showDeveloperOptions && (
            <>
              <Divider />
              <Pressable onPress={() => handlePress("开发者选项")}>
                <View style={settingsItemStyle}>
                  <MaterialIcons name={"developer-board"} size={30} />
                  <Text>开发者选项</Text>
                </View>
              </Pressable>
            </>
          )
        }

      </Area>
    </View>
  );
}

export default ProfileScreen;
