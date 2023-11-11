import QRCodeCamera from "../../components/QRCodeCamera";
import { Text, View } from "react-native";

function QRCodeScreen(props) {
  const { navigation } = props;
  const onCodeScanned = (code) => {
    navigation.replace("QRCodeResult", { deviceId: "219658"/*JSON.parse(code).deviceId*/ });
  };
  return (
    <View>
      <QRCodeCamera onCodeScanned={onCodeScanned} />
      <View style={{
        position: "absolute", height: "100%", width: "100%",
        display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center",
      }}>
        <Text style={{ color: "#d3cfcf", fontSize: 16, textAlign: "center", marginBottom: 40 }}>请扫描设备上的二维码</Text>
      </View>
    </View>
  );
}

export default QRCodeScreen;
