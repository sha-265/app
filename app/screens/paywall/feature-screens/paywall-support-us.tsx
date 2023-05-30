import { Image, ImageStyle, ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { Screen, Text } from "../../../components"
import { color, spacing } from "../../../theme"
import { SubscribeButtonSheet } from "../subscribe-button-sheet"

const matanProfile = require("../../../../assets/paywall/support-us/matan.jpg")
const guyProfile = require("../../../../assets/paywall/support-us/guy.jpg")

const ROOT: ViewStyle = { paddingTop: spacing[6], alignItems: "center", gap: 16, paddingHorizontal: 24 }
const PROFILE_PICS_WRAPPER: ViewStyle = { flexDirection: "row", marginBottom: spacing[3] }
const PROFILE_PIC_WRAPPER: ViewStyle = {
  shadowColor: color.palette.black,
  shadowOffset: { height: 1, width: 1 },
  shadowOpacity: 0.3,
  shadowRadius: 3,
}
const PROFILE_PIC: ImageStyle = {
  width: 150,
  height: 150,
  borderRadius: 100,
}
const TITLE: TextStyle = { fontSize: 22, fontWeight: "600" }
const CONTENT: TextStyle = { textAlign: "center", fontSize: 18 }

export function PaywallSupportUsScreen() {
  return (
    <Screen unsafe={true}>
      <ScrollView contentContainerStyle={ROOT}>
        <View style={PROFILE_PICS_WRAPPER}>
          <View style={PROFILE_PIC_WRAPPER}>
            <Image source={guyProfile} style={PROFILE_PIC} />
          </View>
          <View style={PROFILE_PIC_WRAPPER}>
            <Image source={matanProfile} style={[PROFILE_PIC, { marginStart: -24 }]} />
          </View>
        </View>
        <Text tx="paywall.features.supportUs.supportUsTitle" style={TITLE} />
        <Text tx="paywall.features.supportUs.supportUsP1" style={CONTENT} />
        <Text tx="paywall.features.supportUs.supportUsP2" style={CONTENT} />
        <Text tx="paywall.features.supportUs.supportUsP3" style={CONTENT} />
      </ScrollView>

      <SubscribeButtonSheet subscriptionType={"annual"} onPress={() => {}} isLoading={false} />
    </Screen>
  )
}
