import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useMemo, useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { RenderBackdrop } from "../BottomSheetRenderBackdrop";

interface DatePickerBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetMethods | null>;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

export const DatePickerBottomSheet = ({
  bottomSheetRef,
  selectedDate,
  onSelectDate,
}: DatePickerBottomSheetProps) => {
  const snapPoints = useMemo(() => ["50%"], []);

  const [tempDate, setTempDate] = useState<Date>(selectedDate || new Date());
  const [showNativePicker, setShowNativePicker] = useState<boolean>(false);

  const handleClose = () => {
    bottomSheetRef.current?.close();
  };

  const handleDone = () => {
    onSelectDate(tempDate);
    handleClose();
  };

  const setPresetDate = (daysOffset: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysOffset);
    setTempDate(d);
  };

  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const isToday = isSameDay(tempDate, today);
  const isYesterday = isSameDay(tempDate, yesterday);
  const isTomorrow = isSameDay(tempDate, tomorrow);
  const isCustom = !isToday && !isYesterday && !isTomorrow;

  const handleNativePickerChange = (
    event: DateTimePickerEvent,
    date?: Date
  ) => {
    if (Platform.OS === "android") {
      setShowNativePicker(false);
    }
    if (date) {
      setTempDate(date);
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      enablePanDownToClose
      snapPoints={snapPoints}
      backdropComponent={RenderBackdrop}
      backgroundStyle={{
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
      }}
      handleIndicatorStyle={{
        backgroundColor: "#CBD5E1",
        width: 50,
      }}
    >
      <BottomSheetView className="flex-1 px-6 pt-4 justify-between pb-6">
        <View>
          <Text className="text-lg text-primary font-semibold tracking-wide mb-4">
            Select Date
          </Text>

          {/* Preset Chips */}
          <View className="flex-row flex-wrap gap-2 mb-4">
            <TouchableOpacity
              onPress={() => setPresetDate(0)}
              className={`px-4 py-2.5 rounded-full border ${
                isToday
                  ? "bg-primary border-primary"
                  : "bg-surface border-border"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  isToday ? "text-white" : "text-primary"
                }`}
              >
                Today
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setPresetDate(-1)}
              className={`px-4 py-2.5 rounded-full border ${
                isYesterday
                  ? "bg-primary border-primary"
                  : "bg-surface border-border"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  isYesterday ? "text-white" : "text-primary"
                }`}
              >
                Yesterday
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setPresetDate(1)}
              className={`px-4 py-2.5 rounded-full border ${
                isTomorrow
                  ? "bg-primary border-primary"
                  : "bg-surface border-border"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  isTomorrow ? "text-white" : "text-primary"
                }`}
              >
                Tomorrow
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowNativePicker(true)}
              className={`px-4 py-2.5 rounded-full border ${
                isCustom || showNativePicker
                  ? "bg-primary border-primary"
                  : "bg-surface border-border"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  isCustom || showNativePicker ? "text-white" : "text-primary"
                }`}
              >
                {isCustom
                  ? tempDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Custom Date..."}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Display DateTimePicker component */}
          {(Platform.OS === "ios" || showNativePicker) && (
            <View className="items-center justify-center my-2">
              <DateTimePicker
                value={tempDate}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={handleNativePickerChange}
                textColor="#294355"
              />
            </View>
          )}
        </View>

        <TouchableOpacity
          className="flex-row items-center justify-center px-4 py-3 h-14 rounded-3xl bg-primary"
          activeOpacity={0.9}
          onPress={handleDone}
        >
          <Text className="text-white font-medium text-base">Confirm Date</Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheet>
  );
};
