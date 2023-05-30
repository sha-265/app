import { create } from "zustand"

export type SubscriptionTypes = "annual" | "monthly"

interface PaywallData {
  subscriptionType: SubscriptionTypes
  purchaseInProgres: boolean
}

interface PaywallDataActions {
  setPurchaseInProgress: (purchaseInProgres: boolean) => void
  setSubscriptionType: (subscriptionType: SubscriptionTypes) => void
}

type PaywallStore = PaywallData & PaywallDataActions

const initialData = {
  subscriptionType: "annual" as SubscriptionTypes,
  purchaseInProgres: false,
}

export const usePaywallStore = create<PaywallStore>((set) => ({
  ...initialData,
  setSubscriptionType: (subscriptionType) => set({ subscriptionType }),
  setPurchaseInProgress: (purchaseInProgres) => set({ purchaseInProgres }),
}))
