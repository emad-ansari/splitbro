import UserAvatar from "@/assets/images/avatar.png";
import { CardBackground } from "@/components/CardBackground";
import {
  ArrowRight01Icon,
  Copy01Icon,
  CreditCardIcon,
  Download01Icon,
  Logout01Icon,
  PencilEdit02Icon,
  QrCode01Icon,
  Share01Icon,
  SparklesIcon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const [copiedUPI, setCopiedUPI] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  // Preference switches
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [autoRemind, setAutoRemind] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [roundOff, setRoundOff] = useState(false);

  const handleCopyUPI = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setCopiedUPI(true);
    setTimeout(() => setCopiedUPI(false), 2000);
  };

  const handleCopyRef = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleToggleSwitch = (setter: (val: boolean) => void, val: boolean) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setter(val);
  };

  const handleLogout = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out of Splitbro?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          style: "destructive",
          onPress: () => {
            // handle signout logic
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: 130, // Clearance for floating island dock
        }}
      >
        {/* ── Screen Header ────────────────────────────────────────────────── */}
        <Animated.View
          entering={FadeInDown.duration(400)}
          className="flex-row items-center justify-between mb-5"
        >
          <View>
            <Text className="text-3xl font-bold text-primary tracking-tight">
              Profile
            </Text>
            <Text className="text-muted font-normal text-xs tracking-wide mt-0.5">
              Account, payment rails & preferences
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setShowQRModal(true);
            }}
            className="bg-surface h-11 w-11 rounded-full items-center justify-center border border-white shadow-xs"
            activeOpacity={0.8}
          >
            <HugeiconsIcon
              icon={QrCode01Icon}
              size={20}
              color="#294355"
              strokeWidth={1.8}
            />
          </TouchableOpacity>
        </Animated.View>

        {/* ── 1. Hero Identity & Financial Reputation Card ─────────────────── */}
        <Animated.View
          entering={FadeInDown.delay(80).duration(500)}
          className="relative rounded-[32px] overflow-hidden p-6 mb-5 shadow-md"
        >
          <CardBackground />

          {/* Top Row: Avatar & Basic Info */}
          <View className="flex-row items-center gap-4 mb-5">
            <View className="relative">
              <View className="w-18 h-18 rounded-full border-2 border-white/20 overflow-hidden bg-white/10 shadow-sm items-center justify-center">
                <Image
                  source={UserAvatar}
                  className="w-16 h-16"
                  resizeMode="contain"
                />
              </View>
              {/* Verified Badge */}
              <View className="absolute bottom-0 right-0 bg-emerald-500 rounded-full p-1 border-2 border-[#1A2E3B]">
                <HugeiconsIcon
                  icon={Tick01Icon}
                  size={10}
                  color="white"
                  strokeWidth={3}
                />
              </View>
            </View>

            <View className="flex-1">
              <View className="flex-row items-center gap-1.5">
                <Text className="text-xl font-bold text-white tracking-tight">
                  Mohammad Ansari
                </Text>
              </View>
              <Text className="text-xs text-secondary font-medium mt-0.5">
                @mohammad.split
              </Text>
              <View className="flex-row items-center gap-1.5 mt-2 bg-white/10 self-start px-2.5 py-1 rounded-full border border-white/10">
                <View className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <Text className="text-[10px] font-bold text-white tracking-wide uppercase">
                  Verified Splitter
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              className="w-9 h-9 rounded-full bg-white/10 items-center justify-center border border-white/10"
              activeOpacity={0.8}
            >
              <HugeiconsIcon
                icon={PencilEdit02Icon}
                size={16}
                color="#FFFFFF"
                strokeWidth={1.8}
              />
            </TouchableOpacity>
          </View>

          {/* Micro-Stats / Split Karma Bar */}
          <View className="flex-row items-center justify-between bg-black/20 p-3.5 rounded-2xl border border-white/10">
            <View className="items-center flex-1">
              <Text className="text-[10px] uppercase font-semibold text-secondary tracking-wider">
                Split Score
              </Text>
              <Text className="text-base font-bold text-emerald-400 mt-0.5">
                99%
              </Text>
            </View>
            <View className="w-px h-7 bg-white/15" />
            <View className="items-center flex-1">
              <Text className="text-[10px] uppercase font-semibold text-secondary tracking-wider">
                Total Settled
              </Text>
              <Text className="text-base font-bold text-white mt-0.5">
                ₹ 64.8k
              </Text>
            </View>
            <View className="w-px h-7 bg-white/15" />
            <View className="items-center flex-1">
              <Text className="text-[10px] uppercase font-semibold text-secondary tracking-wider">
                Avg Settle
              </Text>
              <Text className="text-base font-bold text-white mt-0.5">
                ~3.5h
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* ── 2. Primary Payment Rail / UPI Setup ──────────────────────────── */}
        <Animated.View
          entering={FadeInDown.delay(160).duration(500)}
          className="bg-white rounded-[28px] p-5 mb-5 border border-border shadow-xs"
        >
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center gap-2.5">
              <View className="w-8 h-8 rounded-xl bg-emerald-50 items-center justify-center">
                <HugeiconsIcon
                  icon={CreditCardIcon}
                  size={16}
                  color="#059669"
                  strokeWidth={2}
                />
              </View>
              <View>
                <Text className="text-xs font-bold text-primary">
                  Receiving UPI Handle
                </Text>
                <Text className="text-[11px] text-muted font-normal">
                  Friends pay settlements directly here
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-row items-center justify-between bg-surface p-3 rounded-2xl border border-border/80">
            <View className="flex-row items-center gap-2">
              <View className="w-2 h-2 rounded-full bg-emerald-500" />
              <Text className="text-xs font-semibold text-primary font-mono">
                mohammad@okhdfcbank
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleCopyUPI}
              className="bg-white px-3 py-1.5 rounded-xl border border-border flex-row items-center gap-1.5 shadow-xs"
              activeOpacity={0.8}
            >
              <HugeiconsIcon
                icon={copiedUPI ? Tick01Icon : Copy01Icon}
                size={13}
                color={copiedUPI ? "#059669" : "#294355"}
                strokeWidth={2}
              />
              <Text
                className={`text-xs font-semibold ${
                  copiedUPI ? "text-emerald-600" : "text-primary"
                }`}
              >
                {copiedUPI ? "Copied" : "Copy"}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* ── 3. Split & Financial Preferences ─────────────────────────────── */}
        <Animated.View
          entering={FadeInDown.delay(240).duration(500)}
          className="bg-white rounded-[28px] p-5 mb-5 border border-border shadow-xs"
        >
          <Text className="text-xs font-semibold text-muted uppercase tracking-wider mb-3 px-1">
            Split Settings
          </Text>

          {/* Auto Remind */}
          <View className="flex-row items-center justify-between py-2.5 border-b border-border/60">
            <View className="flex-1 pr-3">
              <Text className="text-sm font-semibold text-primary">
                Smart Payment Nudges
              </Text>
              <Text className="text-xs text-muted mt-0.5">
                Automatically remind friends after 48 hours
              </Text>
            </View>
            <Switch
              value={autoRemind}
              onValueChange={(val) => handleToggleSwitch(setAutoRemind, val)}
              trackColor={{ false: "#E2E8F0", true: "#294355" }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Round-off Splits */}
          <View className="flex-row items-center justify-between py-2.5 border-b border-border/60">
            <View className="flex-1 pr-3">
              <Text className="text-sm font-semibold text-primary">
                Round Off Splits
              </Text>
              <Text className="text-xs text-muted mt-0.5">
                Round decimals to the nearest ₹1
              </Text>
            </View>
            <Switch
              value={roundOff}
              onValueChange={(val) => handleToggleSwitch(setRoundOff, val)}
              trackColor={{ false: "#E2E8F0", true: "#294355" }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Currency Preference */}
          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            className="flex-row items-center justify-between pt-3"
            activeOpacity={0.7}
          >
            <View>
              <Text className="text-sm font-semibold text-primary">
                Default Currency
              </Text>
              <Text className="text-xs text-muted mt-0.5">
                Indian Rupee (INR ₹)
              </Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Text className="text-xs font-bold text-primary">₹ INR</Text>
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={16}
                color="#65747F"
                strokeWidth={2}
              />
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* ── 4. App Security & Privacy ────────────────────────────────────── */}
        <Animated.View
          entering={FadeInDown.delay(320).duration(500)}
          className="bg-white rounded-[28px] p-5 mb-5 border border-border shadow-xs"
        >
          <Text className="text-xs font-semibold text-muted uppercase tracking-wider mb-3 px-1">
            Security & Data
          </Text>

          {/* Biometrics */}
          <View className="flex-row items-center justify-between py-2.5 border-b border-border/60">
            <View className="flex-1 pr-3">
              <Text className="text-sm font-semibold text-primary">
                Biometric App Lock
              </Text>
              <Text className="text-xs text-muted mt-0.5">
                Require FaceID / Fingerprint on launch
              </Text>
            </View>
            <Switch
              value={biometricsEnabled}
              onValueChange={(val) =>
                handleToggleSwitch(setBiometricsEnabled, val)
              }
              trackColor={{ false: "#E2E8F0", true: "#294355" }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Push Notifications */}
          <View className="flex-row items-center justify-between py-2.5 border-b border-border/60">
            <View className="flex-1 pr-3">
              <Text className="text-sm font-semibold text-primary">
                Push Notifications
              </Text>
              <Text className="text-xs text-muted mt-0.5">
                Instant alerts for new expenses & settlements
              </Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={(val) => handleToggleSwitch(setNotifications, val)}
              trackColor={{ false: "#E2E8F0", true: "#294355" }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Export Statements */}
          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              Alert.alert(
                "Export Ledger",
                "Your consolidated Splitbro statement has been prepared and sent to your email."
              );
            }}
            className="flex-row items-center justify-between pt-3"
            activeOpacity={0.7}
          >
            <View className="flex-row items-center gap-2.5">
              <HugeiconsIcon
                icon={Download01Icon}
                size={18}
                color="#294355"
                strokeWidth={1.8}
              />
              <Text className="text-sm font-semibold text-primary">
                Export Ledger (CSV / PDF)
              </Text>
            </View>
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={16}
              color="#65747F"
              strokeWidth={2}
            />
          </TouchableOpacity>
        </Animated.View>

        {/* ── 5. Viral Referral Banner ─────────────────────────────────────── */}
        <Animated.View
          entering={FadeInDown.delay(400).duration(500)}
          className="bg-[#162530] p-5 rounded-[28px] mb-5 border border-white/10 shadow-sm"
        >
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center gap-2">
              <View className="w-8 h-8 rounded-xl bg-amber-400/20 items-center justify-center border border-amber-400/30">
                <HugeiconsIcon
                  icon={SparklesIcon}
                  size={16}
                  color="#FBBF24"
                  strokeWidth={2}
                />
              </View>
              <Text className="text-sm font-bold text-white">
                Invite Friends to Splitbro
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleCopyRef}
              className="bg-white/15 px-3 py-1.5 rounded-xl border border-white/20 flex-row items-center gap-1.5"
              activeOpacity={0.8}
            >
              <HugeiconsIcon
                icon={copiedRef ? Tick01Icon : Share01Icon}
                size={12}
                color="#FFFFFF"
                strokeWidth={2}
              />
              <Text className="text-xs font-semibold text-white">
                {copiedRef ? "Link Copied" : "Share"}
              </Text>
            </TouchableOpacity>
          </View>

          <Text className="text-xs text-secondary leading-4 font-normal mb-3">
            Share your invite link with roommates and trip mates to create
            synchronized groups in seconds.
          </Text>

          <View className="bg-black/30 p-2.5 rounded-xl border border-white/10 flex-row items-center justify-between">
            <Text className="text-xs text-white/80 font-mono">
              splitbro.app/join/mohammad99
            </Text>
            <Text className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">
              Referral Link
            </Text>
          </View>
        </Animated.View>

        {/* ── 6. Log Out & App Meta ────────────────────────────────────────── */}
        <Animated.View
          entering={FadeInDown.delay(480).duration(500)}
          className="items-center gap-4 pt-2"
        >
          <TouchableOpacity
            onPress={handleLogout}
            className="flex-row items-center justify-center gap-2 bg-red-50 py-3.5 px-6 rounded-2xl border border-red-200/80 w-full"
            activeOpacity={0.8}
          >
            <HugeiconsIcon
              icon={Logout01Icon}
              size={18}
              color="#DC2626"
              strokeWidth={2}
            />
            <Text className="text-sm font-bold text-red-600">
              Log Out of Account
            </Text>
          </TouchableOpacity>

          <Text className="text-xs text-muted/70 font-medium tracking-wide">
            Splitbro v1.0.4 • Crafted with precision
          </Text>
        </Animated.View>
      </ScrollView>

      {/* ── QR Code Quick Share Modal ────────────────────────────────────── */}
      <Modal
        visible={showQRModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowQRModal(false)}
      >
        <Pressable
          className="flex-1 bg-black/60 items-center justify-center p-6"
          onPress={() => setShowQRModal(false)}
        >
          <Animated.View
            entering={FadeInUp.duration(300)}
            className="bg-white rounded-[32px] p-6 w-full max-w-[340px] items-center border border-border shadow-lg"
          >
            <View className="w-12 h-12 rounded-2xl bg-surface items-center justify-center mb-3">
              <HugeiconsIcon
                icon={QrCode01Icon}
                size={26}
                color="#294355"
                strokeWidth={2}
              />
            </View>

            <Text className="text-lg font-bold text-primary mb-0.5">
              Splitbro Quick QR
            </Text>
            <Text className="text-xs text-muted text-center mb-5">
              Let friends scan to add you directly to groups and settle balances
            </Text>

            {/* Stylized QR Box */}
            <View className="w-48 h-48 bg-[#162530] rounded-2xl items-center justify-center p-4 border border-border mb-4">
              <HugeiconsIcon
                icon={QrCode01Icon}
                size={140}
                color="#FFFFFF"
                strokeWidth={1.5}
              />
            </View>

            <Text className="text-xs font-mono text-primary font-bold mb-4">
              @mohammad.split
            </Text>

            <TouchableOpacity
              onPress={() => setShowQRModal(false)}
              className="bg-primary py-3 rounded-xl w-full items-center"
              activeOpacity={0.85}
            >
              <Text className="text-xs font-bold text-white">Done</Text>
            </TouchableOpacity>
          </Animated.View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}