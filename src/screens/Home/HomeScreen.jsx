import {
  Text,
  ScrollView,
  View,
  Dimensions,
  Linking, Pressable,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Box, Button, Center, IconButton, Menu, useColorModeValue, Icon, Image, Heading, Spinner } from "native-base";
import { useNavigation } from "@react-navigation/native";
import Area from "../../components/Area";
import QRCodeScreen from "./QRCodeScreen";
import Carousel from "react-native-snap-carousel";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Sound from "react-native-sound";
import { useEffect, useRef, useState } from "react";
import QRCodeCamera from "../../components/QRCodeCamera";

const Stack = createStackNavigator();

function HomeScreen(props) {
  return (
    <Stack.Navigator initialRouteName={"HomeMain"}>
      <Stack.Screen name={"QRCodeCamera"} component={QRCodeScreen} options={{ headerTitle: "" }} />
      <Stack.Screen name={"QRCodeResult"} component={QRCodeResult} options={{ headerTitle: "" }} />
      <Stack.Screen name={"宣讲"} component={Preaching} options={{ headerTitle: "" }} />
      <Stack.Screen name={"培训"} component={Training} options={{ headerTitle: "" }} />
      <Stack.Screen name={"奖项"} component={Rewards} options={{ headerTitle: "" }} />
      <Stack.Screen name={"团队"} component={Team} options={{ headerTitle: "" }} />
      <Stack.Screen name={"背景"} component={Background} options={{ headerTitle: "" }} />
      <Stack.Screen name={"HomeMain"} component={Main}
                    options={{
                      headerTitle: "首页",
                      headerRight: mainHeaderRight,
                    }} />
    </Stack.Navigator>
  );
}

function mainHeaderRight(props) {
  const navigation = useNavigation();
  return (
    <View style={{
      display: "flex", flexDirection: "row",
      alignContent: "center", justifyContent: "flex-end",
      height: "100%", width: "100%",
    }}>
      <IconButton icon={<Icon as={<FontAwesome name={"search"} />}
                              size={6}
                              color={"gray.400"} />} />
      <Menu trigger={(triggerProps) => (
        <IconButton {...triggerProps}
                    icon={<Icon as={<MaterialCommunityIcons name={"dots-vertical"} />}
                                size={6}
                                color={"gray.400"} />} />
      )}>
        <Menu.Item onPress={() => navigation.navigate("QRCodeCamera")}>
          扫一扫
        </Menu.Item>
        <Menu.Item onPress={() => navigation.navigate("QRCodeCamera")}>
          添加设备
        </Menu.Item>
      </Menu>
    </View>
  );
}

function QRCodeResult(props) {
  const { navigation, route } = props;
  const { deviceId } = route.params ?? 0;
  const step1 = new Sound("step1.mp3");
  const step2 = new Sound("step2.mp3");
  const [points, setPoints] = useState(0);
  const MAX_POINTS = 60;
  const fill = points / MAX_POINTS * 100;
  const interval = useRef(null);

  // 未开始，开始，检测中，检测完成
  const [detectStatus, setDetectStatus] = useState("未开始");
  const time = useRef(new Date().toLocaleString());
  return (
    <View style={{ padding: 10, gap: 10 }}>
      <Area style={{
        padding: 10, display: "flex", flexDirection: "row",
        alignItems: "center", justifyContent: "space-around",
      }}>
        <Text style={{
          fontSize: 16,
        }}>
          设备ID{" "} {deviceId}{"\n"}
          设备状态{" "}
          <Heading color={"emerald.500"} fontSize="md">
            启用
          </Heading>
        </Text>
        <AnimatedCircularProgress
          size={140}
          width={15}
          fill={fill}
          tintColor={"rgba(52,199,96,0.78)"}
          backgroundColor={"#34a8c7"}>
          {
            () => (
              <Text style={{ textAlign: "center" }}>
                收集剩余时间{"\n"}
                {MAX_POINTS - points >= 0 ? MAX_POINTS - points : 0}秒
              </Text>
            )
          }
        </AnimatedCircularProgress>
      </Area>
      <Area style={{ paddingHorizontal: 10 }}>
        <View style={{ gap: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}>注意事项</Text>
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 16 }}>
              1. 请在空腹状态下进行检测{"\n"}
              2. 请在检测前不要吸烟{"\n"}
              3. 请在检测前不要进行剧烈运动{"\n"}
            </Text>
          </View>
        </View>
      </Area>
      <Area style={{ padding: 10, gap: 5 }}>
        <View style={{
          display: "flex", flexDirection: "row",
          alignItems: "center", justifyContent: "space-around",
        }}>
          <View style={{ flex: 3 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}>检测时间</Text>
          </View>
          <View style={{
            flex: 4,
          }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}>
              {time.current}
            </Text>
          </View>
        </View>
        <View style={{
          display: "flex", flexDirection: "row",
          alignItems: "center", justifyContent: "space-around",
        }}>
          <View style={{ flex: 3 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}>检测结果</Text>
          </View>
          <View style={{
            flex: 4, display: "flex", flexDirection: "row",
            alignItems: "center", justifyContent: "space-around",
          }}>
            {
              (detectStatus === "未开始") &&
              <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                <Heading color={"red.500"} fontSize="md">
                  尚未开始检测
                </Heading>
              </View>
            }
            {
              (detectStatus === "开始") &&
              <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                <Spinner color={"emerald.500"} />
                <Heading color={"emerald.500"} fontSize="md">
                  正在收集中
                </Heading>
              </View>
            }
            {
              (detectStatus === "检测中") &&
              <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                <Spinner color={"emerald.500"} />
                <Heading color={"emerald.500"} fontSize="md">
                  正在计算血糖...
                </Heading>
              </View>
            }
            {
              (detectStatus === "检测完成") &&
              <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                <Heading color={"emerald.500"} fontSize="md">
                  血糖正常
                </Heading>
              </View>
            }
          </View>
        </View>
      </Area>

      <Button disabled={!(detectStatus === "未开始" || detectStatus === "检测完成")}
              onPress={() => {
                setPoints(0);
                if (interval.current) {
                  clearInterval(interval.current);
                }
                setDetectStatus("开始");
                interval.current = setInterval(() => {
                  setPoints((fill) => {
                    if (fill >= MAX_POINTS) {
                      clearInterval(interval.current);
                      setDetectStatus("检测中");
                      setTimeout(() => {
                        setDetectStatus("检测完成");
                      }, 3000);
                    }
                    return fill + 1;
                  });
                }, 1000);
              }}>
        开始检测
      </Button>
      <Button onPress={() => step1.play()}>第一步</Button>
      <Button onPress={() => step2.play()}>第二步</Button>
    </View>
  );
}

function Preaching(props) {
  return (
    <></>
  );
}

function Training(props) {
  return (
    <></>
  );
}

function Rewards(props) {
  return (
    <></>
  );
}

function Team(props) {
  return (
    <></>
  );
}

function Background(props) {
  return (
    <></>
  );
}

function Main(props) {
  const { navigation } = props;
  const _renderItem = ({ item }) => {
    return (
      <View>
        <Image source={item.source}
               alt={"Carousel Image"}
               resizeMode={"cover"}
               style={{
                 width: "100%",
                 height: "100%",
                 borderRadius: 20,
               }}
        />
      </View>
    );
  };
  const screenWidth = Dimensions.get("screen").width;
  const briefItemStyle = {
    width: 70,
    height: 70,
    borderRadius: 70,
    // backgroundColor: "lightblue",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
  const briefTextStyle = {
    fontSize: 16,
    textAlign: "center",
  };

  const handlePress = (type) => {
    navigation.navigate(type);
  };
  return (
    <ScrollView>
      <View style={{
        padding: 10,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}>
        <View style={{
          height: 300,
        }}>
          <Carousel
            data={
              [
                {
                  source: require("../../assets/1.png"),
                },
                {
                  source: require("../../assets/2.png"),
                },
                {
                  source: require("../../assets/3.png"),
                }]}
            renderItem={_renderItem}
            sliderWidth={screenWidth - 20}
            itemWidth={screenWidth - 20}
            autoplay
            loop
            slideStyle={{
              borderRadius: 20,
            }}
          />
        </View>
        <Area style={{
          height: 80,
        }}>
          <View horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}>
            <Pressable onPress={() => handlePress("宣讲")}>
              <View style={briefItemStyle}>
                <Icon as={
                  <FontAwesome5 name={"user-graduate"} size={20} />}
                      size={5} color={"blue.500"} />
                <Text style={briefTextStyle}>宣讲</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress("培训")}>
              <View style={briefItemStyle}>
                <Icon as={
                  <FontAwesome5 name={"chalkboard-teacher"} />}
                      size={5} color={"blue.500"} />
                <Text style={briefTextStyle}>培训</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress("奖项")}>
              <View style={briefItemStyle}>
                <Icon as={
                  <FontAwesome5 name={"award"} />}
                      size={5} color={"blue.500"} />
                <Text style={briefTextStyle}>奖项</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress("团队")}>
              <View style={briefItemStyle}>
                <Icon as={
                  <FontAwesome5 name={"user-friends"} size={20} />}
                      size={5} color={"blue.500"} />
                <Text style={briefTextStyle}>团队</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress("背景")}>
              <View style={briefItemStyle}>
                <Icon as={
                  <FontAwesome5 name={"archive"} size={20} color={"#5087cd"} />}
                      size={5} color={"blue.500"} />
                <Text style={briefTextStyle}>背景</Text>
              </View>
            </Pressable>
          </View>
        </Area>
        <View>
          <Text style={{ marginBottom: 2 }}>今日推荐</Text>
          <View style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}>
            <Pressable onPress={() => Linking.openURL("http://m.xinhuanet.com/health/2018-05/03/c_1122777626.htm")}>
              <Area style={{ padding: 10 }}>
                <Heading size={"sm"}>&emsp;&emsp;三件事帮您预防糖尿病</Heading>
                <Text>
                  &emsp;&emsp;糖尿病可不是甜的吃多了得上的。知道自己是糖尿病高危人群就要“管住嘴”。{"\n"}
                  &emsp;&emsp;可不单指少吃甜食，高热量食物也要少吃。控制每日饮食总摄入量，使超重或肥胖者的体质指数(BMI)达到或接近24 kg/m2，或体重至少下降7%。
                </Text>
              </Area>
            </Pressable>
            <Pressable onPress={() => Linking.openURL("https://www.sixian.gov.cn/public/25242/156270351.html")}>
              <Area style={{ padding: 10 }}>
                <Heading size={"sm"}>&emsp;&emsp;九成的糖尿病是可以预防的！牢记五个预防“法宝”+十大“误区”！</Heading>
                <Text>
                  &emsp;&emsp;我们如果控制不好“血糖”
                  除了会引起视网膜病变、糖尿病足、
                  糖尿病肾病及心脑血管并发症等
                  严重可能还面临截肢、失明、失聪......{"\n"}
                  &emsp;&emsp;世界卫生组织有说过
                  90%的糖尿病是可以预防的
                  今天，就来跟大家聊聊
                  如何不被糖尿病“缠上”
                </Text>
              </Area>
            </Pressable>
            <Pressable onPress={() => Linking.openURL("https://zhuanlan.zhihu.com/p/339060475")}>
              <Area style={{ padding: 10 }}>
                <Heading size={"sm"}>&emsp;&emsp;一文为您讲解：糖尿病的危害有多大</Heading>
                <Text>
                  &emsp;&emsp;其实糖尿病不可怕，可怕的是糖尿病属于一种慢性病，它的发生导致了很多的患者身心健康都受到了影响，会导致很多患者胰岛功能缺失，必须要每天注射胰岛素来控制自己的血糖水平。不仅如此，糖尿病还会给患者带来其它疾病的并发症，特别是对身体的器官都有很大的影响。
                  而且很多糖尿病患者都是死于并发症，所以真正的危险不一定是糖尿病，而是糖尿病的并发症。
                </Text>
              </Area>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
