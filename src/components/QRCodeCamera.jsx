import { Dimensions, Linking, View, Text } from "react-native";
import { useEffect } from "react";
import QRCodeScanner from "react-native-qrcode-scanner";

function QRCodeCamera(props) {
  const { onCodeScanned, ...rest } = props;
  const screenWidth = Dimensions.get("screen").width;

  return (
    <View {...rest}>
      <View style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <QRCodeScanner cameraStyle={{ height: "100%" }} onRead={onCodeScanned} />
      </View>
    </View>
  );
}

export default QRCodeCamera;
