import { StyleProp, View, ViewStyle } from "react-native";
import { MD3DarkTheme, PaperProvider } from "react-native-paper";
import { Main } from "./main";

const style: StyleProp<ViewStyle> = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: MD3DarkTheme.colors.background,
};

export default function App() {
  return (
    <PaperProvider theme={MD3DarkTheme}>
      <View style={style}>
        <Main />
      </View>
      {/* <StatusBar style="light" /> */}
    </PaperProvider>
  );
}
