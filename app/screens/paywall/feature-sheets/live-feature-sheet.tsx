import { Image, ImageStyle, TextStyle, View } from "react-native"
import { Text } from "../../../components"
import { spacing } from "../../../theme"

const FEATURE_TITLE: TextStyle = {
  textAlign: "center",
  fontSize: 24,
  fontWeight: "600",
}

const FEATURE_IMAGE: ImageStyle = {
  marginBottom: spacing[4],
  shadowOpacity: 0.2,
  shadowRadius: 2,
  shadowColor: "#333",
}

const FEATURE_SUBTITLE: TextStyle = {
  textAlign: "center",
  fontSize: 18,
  fontWeight: "600",
}

const FEATURE_DESCRIPTION: TextStyle = {
  textAlign: "center",
  fontSize: 17,
}

export function LiveFeatureSheet() {
  return (
    <View>
      <Text style={[FEATURE_TITLE, { fontFamily: "System" }]}>Better Rail Live</Text>

      <Image
        source={require("../../../../assets/paywall/live-activity-hebrew.png")}
        style={[FEATURE_IMAGE, { width: "100%", height: 170, resizeMode: "contain" }]}
      />

      <Text style={FEATURE_SUBTITLE}>Real-Time updates for your train ride.</Text>

      <Text style={FEATURE_DESCRIPTION}>Turn on Better Rail Live and get real time updates on train delays.</Text>
      <Text style={FEATURE_DESCRIPTION}>Watch the train progress and get updates as you get close to your destination.</Text>
    </View>
  )
}
