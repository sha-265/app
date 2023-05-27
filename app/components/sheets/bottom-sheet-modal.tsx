import { useCallback, useMemo, useRef } from "react"
import { ViewStyle } from "react-native"
import { color, spacing } from "../../theme"
import BottomSheet from "@gorhom/bottom-sheet"

const SHEET_MODAL: ViewStyle = {
  width: "100%",
  height: 500,
  padding: spacing[5],
  backgroundColor: color.secondaryBackground,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  zIndex: 200,
  flex: 1,
}

export function BottomSheetModal({ children }) {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null)

  // variables
  const snapPoints = useMemo(() => ["50%"], [])

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      enablePanDownToClose
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      style={SHEET_MODAL}
    >
      {children}
    </BottomSheet>
  )
}
