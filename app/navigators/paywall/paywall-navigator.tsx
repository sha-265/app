import React from "react"
import {
  createStackNavigator,
  StackHeaderInterpolatedStyle,
  StackHeaderInterpolationProps,
  StackScreenProps,
} from "@react-navigation/stack"
import { PaywallScreen } from "../../screens/paywall"
import { PaywallSupportUsScreen } from "../../screens/paywall/feature-screens/paywall-support-us"
import { translate } from "../../i18n"

export type PaywallParamList = {
  paywall: {
    /**
     * The presentation style of the screen.
     * This will impact the type of close button that will appear on the header - either a back button or a circular close button.
     */
    presentation: "modal" | "push"
  }
  supportUs: undefined
}

const PaywallStack = createStackNavigator<PaywallParamList>()

export type PaywallScreenProps = StackScreenProps<PaywallParamList, "paywall">

export const PaywallNavigator = () => (
  <PaywallStack.Navigator>
    <PaywallStack.Screen
      name="paywall"
      component={PaywallScreen}
      options={() => ({
        headerTransparent: true,
        headerBackTitleVisible: false,
      })}
    />
    <PaywallStack.Screen
      name="supportUs"
      component={PaywallSupportUsScreen}
      options={{
        title: translate("paywall.supportProject"),
        headerBackTitleVisible: false,
      }}
    />
  </PaywallStack.Navigator>
)
