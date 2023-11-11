import { View } from "react-native";

function Area(props) {
  let { children, style, ...rest } = props;
  const s = { ...style };
  s.backgroundColor = s.backgroundColor ?? "white";
  s.borderRadius = s.borderRadius ?? 20;
  return (
    <View {...rest} style={s}>
      {children}
    </View>
  );
}

export default Area;
