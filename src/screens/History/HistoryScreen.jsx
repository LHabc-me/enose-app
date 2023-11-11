import { Pressable, ScrollView, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Input, Icon, IconButton, Divider, Link, Radio, Button, Checkbox, Modal, FormControl, VStack } from "native-base";
import Area from "../../components/Area";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

const Stack = createStackNavigator();

function HistoryScreen() {
  return (
    <Stack.Navigator initialRouteName={"HistoryMain"}>
      <Stack.Screen name={"HistoryMain"}
                    component={Main}
                    options={{
                      headerTitle: "历史",
                    }} />
    </Stack.Navigator>
  );
}

const FilterModal = forwardRef((props, ref) => {
  const { ...rest } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [showBeginDateTimePicker, setShowBeginDateTimePicker] = useState(false);
  const [showEndDateTimePicker, setShowEndDateTimePicker] = useState(false);
  const open = () => setModalVisible(true);
  const close = () => setModalVisible(false);
  useImperativeHandle(ref, () => ({ open, close }));
  const [beginDate, setBeginDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <View {...rest}>
      {
        showBeginDateTimePicker &&
        <DateTimePicker value={beginDate} mode={"date"} onChange={(_, date) => {
          setShowBeginDateTimePicker(false);
          setBeginDate(date);
        }} />
      }
      {
        showEndDateTimePicker &&
        <DateTimePicker value={endDate} mode={"date"} onChange={(_, date) => {
          setShowEndDateTimePicker(false);
          setEndDate(date);
        }} />
      }
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}
             avoidKeyboard size={"lg"}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>设置过滤选项</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>检测时间</FormControl.Label>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  <Text>{beginDate.toLocaleDateString()}</Text>
                  <IconButton icon={<Icon as={<FontAwesome name={"calendar"} />} size={4} />}
                              onPress={() => {
                                setShowBeginDateTimePicker(true);
                              }} />
                </View>
                <Text style={{ marginRight: 10 }}>到</Text>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  <Text>{endDate.toLocaleDateString()}</Text>
                  <IconButton icon={<Icon as={<FontAwesome name={"calendar"} />} size={4} />} />
                </View>
              </View>
              <FormControl.Label>检测地点</FormControl.Label>
              <Input />
              <FormControl.Label>检测结果</FormControl.Label>
              <View style={{ display: "flex", flexDirection: "row", gap: 20 }}>
                <Checkbox value={"低血糖"} my={1} defaultIsChecked>低血糖</Checkbox>
                <Checkbox value={"正常"} my={1} defaultIsChecked>正常</Checkbox>
                <Checkbox value={"高血糖"} my={1} defaultIsChecked>高血糖</Checkbox>
              </View>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
              <Button onPress={close} style={{ width: 80 }}>
                确定
              </Button>
              <Button onPress={close} style={{ width: 80 }}
                      variant={"subtle"} colorScheme={"error"}>
                取消
              </Button>
            </View>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
});

function HistoryItem(props) {
  const { time, location, deviceId, result } = props;
  return (
    <Area style={{ height: 50, borderRadius: 0, backgroundColor: "" }}>
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        {/*<View style={{ flex: 1 }}>*/}
        {/*  <Checkbox style={{ margin: "auto" }}> </Checkbox>*/}
        {/*</View>*/}
        <Text style={{ flex: 3, textAlign: "center" }}>{time}</Text>
        <Text style={{ flex: 3, textAlign: "center" }}>{location}</Text>
        {/*<Text style={{ flex: 2, textAlign: "center" }}>{deviceId}</Text>*/}
        <Text style={{ flex: 2, textAlign: "center", color: result === "正常" ? "green" : "red" }}>
          {result}
        </Text>
        <View style={{ flex: 2 }}>
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
  const modalRef = useRef(null);
  return (
    <View>
      <FilterModal ref={modalRef} />
      <Input placeholder={"搜索历史"}
             variant={"unstyled"}
             fontSize={"14"}
             InputLeftElement={<Icon style={{ margin: 6 }} size={5}
                                     color={"gray.400"}
                                     as={<FontAwesome name={"search"} />} />}
             InputRightElement={
               <IconButton onPress={() => modalRef.current.open()}
                           icon={<Icon size={6}
                                       color={"gray.400"}
                                       as={<FontAwesome name={"filter"} />} />} />
             } />
      <ScrollView style={{ padding: 3 }}>
        <View style={{
          display: "flex", flexDirection: "row",
          justifyContent: "space-between", alignItems: "center",
          height: 30,
        }}>
          {/*<View style={{ flex: 1 }}></View>*/}
          <Text style={{ flex: 3, textAlign: "center" }}>检测时间</Text>
          <Text style={{ flex: 3, textAlign: "center" }}>地点</Text>
          {/*<Text style={{ flex: 2, textAlign: "center" }}>设备ID</Text>*/}
          <Text style={{ flex: 2, textAlign: "center" }}>检测结果</Text>
          <Text style={{ flex: 2, textAlign: "center" }}>查看详情</Text>
        </View>
        <Divider />
        <View style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {
            <HistoryItem time={"2023-10-13"}
                         location={"吉林大学 南岭校区"} deviceId={"#123456"}
                         result={"正常"} />
          }
        </View>
      </ScrollView>
    </View>
  );
}

export default HistoryScreen;
