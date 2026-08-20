import Avatar from "@/components/contacts/Avatar";
import { RenderBackdrop } from "@/components/BottomSheetRenderBackdrop";
import { Member, PendingSettlement } from "@/utils/constants";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import {
  ArrowRight01Icon,
  Cash01Icon,
  CheckmarkCircle02Icon,
  Exchange01Icon,
  QrCode01Icon,
  SmartPhone01Icon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import * as Haptics from "expo-haptics";
import React, { useMemo, useState, useEffect } from "react";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export interface SettleUpTarget {
  id: string;
  name: string;
  avatarUri?: string;
  amount: number;
  balanceType: "receivable" | "payable" | "settled";
  groupName?: string;
}

interface SettleUpBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetMethods | null>;
  target?: SettleUpTarget | null;
  currentUser?: { name: string; avatarUri?: string };
  onSettleSuccess?: (settlement: {
    target: SettleUpTarget;
    amount: number;
    paymentMethod: string;
    note: string;
  }) => void;
}

const PAYMENT_METHODS = [
  { id: "upi", label: "UPI App", icon: SmartPhone01Icon, desc: "GPay, PhonePe, Paytm" },
  { id: "cash", label: "Cash", icon: Cash01Icon, desc: "Settled in person" },
  { id: "qr", label: "Scan QR", icon: QrCode01Icon, desc: "Show / Scan QR" },
];

export const SettleUpBottomSheet = ({
  bottomSheetRef,
  target,
  currentUser = { name: "You (Mohammad)", avatarUri: "" },
  onSettleSuccess,
}: SettleUpBottomSheetProps) => {
  const snapPoints = useMemo(() => ["68%"], []);

  const [settleAmount, setSettleAmount] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<string>("upi");
  const [note, setNote] = useState<string>("");
  const [isReverse, setIsReverse] = useState<boolean>(false);

  // When target changes, initialize settle amount to full balance
  useEffect(() => {
    if (target && target.amount > 0) {
      setSettleAmount(target.amount.toString());
      setIsReverse(target.balanceType === "receivable");
    } else {
      setSettleAmount("0");
    }
  }, [target]);

  const payer = isReverse ? (target?.name || "Member") : currentUser.name;
  const recipient = isReverse ? currentUser.name : (target?.name || "Member");

  const handleSwapDirection = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsReverse((prev) => !prev);
  };

  const handleConfirmSettlement = () => {
    const numAmount = parseFloat(settleAmount);
    if (isNaN(numAmount) || numAmount <= 0) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert("Invalid Amount", "Please enter a valid settlement amount.");
      return;
    }

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    if (onSettleSuccess && target) {
      onSettleSuccess({
        target,
        amount: numAmount,
        paymentMethod: selectedMethod,
        note,
      });
    }

    Alert.alert(
      "Settlement Recorded 🎉",
      `Recorded payment of ₹${numAmount.toLocaleString()} from ${payer} to ${recipient}.`,
      [
        {
          text: "Done",
          onPress: () => {
            bottomSheetRef.current?.close();
          },
        },
      ]
    );
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
        backgroundColor: "#FFFFFF",
      }}
      handleIndicatorStyle={{
        backgroundColor: "#CBD5E1",
        width: 50,
      }}
    >
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 8,
          paddingBottom: 36,
        }}
      >
        {/* Title */}
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-xl font-bold text-primary">Settle Up</Text>
            <Text className="text-xs text-muted mt-0.5">
              Record payment or transfer balance
            </Text>
          </View>
          <View className="w-10 h-10 rounded-2xl bg-surface items-center justify-center border border-border/50">
            <HugeiconsIcon icon={Wallet01Icon} size={20} color="#294355" />
          </View>
        </View>

        {/* Payer ➔ Recipient Flow Banner */}
        <View className="bg-surface/70 rounded-3xl p-4 border border-border mb-5 flex-row items-center justify-between">
          {/* Payer */}
          <View className="items-center flex-1">
            <Avatar name={payer} avatarUri={!isReverse ? currentUser.avatarUri : target?.avatarUri} size={44} />
            <Text className="text-xs font-semibold text-primary mt-1.5 text-center" numberOfLines={1}>
              {payer}
            </Text>
            <Text className="text-[10px] text-muted font-medium">Payer</Text>
          </View>

          {/* Transfer Swap Direction Button */}
          <TouchableOpacity
            onPress={handleSwapDirection}
            className="w-10 h-10 rounded-full bg-white items-center justify-center border border-border shadow-xs"
            activeOpacity={0.7}
          >
            <HugeiconsIcon icon={Exchange01Icon} size={18} color="#294355" strokeWidth={2} />
          </TouchableOpacity>

          {/* Recipient */}
          <View className="items-center flex-1">
            <Avatar name={recipient} avatarUri={isReverse ? currentUser.avatarUri : target?.avatarUri} size={44} />
            <Text className="text-xs font-semibold text-primary mt-1.5 text-center" numberOfLines={1}>
              {recipient}
            </Text>
            <Text className="text-[10px] text-muted font-medium">Recipient</Text>
          </View>
        </View>

        {/* Amount Input */}
        <View className="items-center mb-5">
          <Text className="text-xs font-bold text-muted uppercase tracking-wider mb-2">
            Settlement Amount
          </Text>
          <View className="flex-row items-center justify-center">
            <Text className="text-3xl font-bold text-primary mr-1">₹</Text>
            <TextInput
              value={settleAmount}
              onChangeText={setSettleAmount}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#94A3B8"
              className="text-4xl font-extrabold text-primary min-w-[120px] text-center p-0"
              selectTextOnFocus
            />
          </View>

          {/* Quick chip for full settlement */}
          {target && target.amount > 0 && (
            <TouchableOpacity
              onPress={() => {
                Haptics.selectionAsync();
                setSettleAmount(target.amount.toString());
              }}
              className="mt-2 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-500/20"
              activeOpacity={0.8}
            >
              <Text className="text-[11px] font-semibold text-emerald-700">
                Full balance: ₹{target.amount.toLocaleString()}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Payment Method Selector */}
        <Text className="text-xs font-bold text-muted uppercase tracking-wider mb-2.5">
          Payment Method
        </Text>
        <View className="gap-2 mb-4">
          {PAYMENT_METHODS.map((method) => {
            const isSelected = selectedMethod === method.id;
            return (
              <TouchableOpacity
                key={method.id}
                onPress={() => {
                  Haptics.selectionAsync();
                  setSelectedMethod(method.id);
                }}
                className={`flex-row items-center justify-between p-3.5 rounded-2xl border transition-all ${
                  isSelected
                    ? "bg-primary/5 border-primary"
                    : "bg-white border-border"
                }`}
                activeOpacity={0.8}
              >
                <View className="flex-row items-center gap-3">
                  <View
                    className={`w-9 h-9 rounded-xl items-center justify-center ${
                      isSelected ? "bg-primary" : "bg-surface"
                    }`}
                  >
                    <HugeiconsIcon
                      icon={method.icon}
                      size={18}
                      color={isSelected ? "#FFFFFF" : "#65747F"}
                      strokeWidth={2}
                    />
                  </View>
                  <View>
                    <Text className="text-xs font-bold text-primary">
                      {method.label}
                    </Text>
                    <Text className="text-[11px] text-muted">
                      {method.desc}
                    </Text>
                  </View>
                </View>

                {isSelected && (
                  <HugeiconsIcon
                    icon={CheckmarkCircle02Icon}
                    size={20}
                    color="#10B981"
                    strokeWidth={2}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Optional Note */}
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="Add an optional note (e.g. Paid on GPay)"
          placeholderTextColor="#94A3B8"
          className="bg-surface/50 px-4 py-3 rounded-2xl border border-border text-xs text-primary font-medium mb-6"
        />

        {/* Confirm Settlement Button */}
        <TouchableOpacity
          onPress={handleConfirmSettlement}
          className="bg-primary py-4 rounded-2xl flex-row items-center justify-center gap-2 shadow-sm"
          activeOpacity={0.85}
        >
          <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20} color="white" strokeWidth={2} />
          <Text className="text-sm font-bold text-white">
            Record Settlement
          </Text>
        </TouchableOpacity>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};
