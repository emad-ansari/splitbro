import Avatar from "@/components/contacts/Avatar";
import { DatePickerBottomSheet } from "@/components/expenses/DatePickerBottomSheet";
import { MemberItem } from "@/components/expenses/MemberItem";
import { MemberListBottomSheet } from "@/components/expenses/MemberListBottomSheet";
import {
  Contact,
  expenseCategories,
  ExpenseCategory,
  getActivityIcon,
} from "@/utils/constants";
import { contacts } from "@/utils/data";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  ArrowDown01Icon,
  ArrowLeft01Icon,
  Calendar02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ExpenseCategoryChipProps {
  selectedCategory: ExpenseCategory;
  onSelect: (category: ExpenseCategory) => void;
}

export default function AddExpenseScreen() {
  const router = useRouter();

  const { id } = useLocalSearchParams(); // use this group id to fetch the members of this group

  const memberListBottomSheetRef = useRef<BottomSheet>(null);
  const datePickerBottomSheetRef = useRef<BottomSheet>(null);
  const [isAmountFocused, setIsAmountFocused] = useState(false);

  const [members, setMembers] = useState<Contact[]>(contacts);

  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedCategory, setSelectedCategory] =
    useState<ExpenseCategory>("Food");
  const [paidBy, setPaidBy] = useState<Contact | null>(contacts[0] ?? null); // store the member who paid the amount.
  const [date, setDate] = useState<Date | null>(new Date());
  const [selectedMembers, setSelectedMembers] = useState<Contact[]>(contacts);

  const handleSelectCategory = (category: ExpenseCategory) => {
    setSelectedCategory(category);
  };

  const handleCancelExpense = () => {
    setAmount("");
    setDescription("");
    setSelectedCategory("Food");
    setPaidBy(contacts[0] ?? null);
    setDate(new Date());

    router.back();
  };

  const handleOpenMemberListBottoSheet = () => {
    memberListBottomSheetRef.current?.expand();
  };

  const handleOpenDatePickerBottomSheet = () => {
    datePickerBottomSheetRef.current?.expand();
  };

  const handleSelectPaidBy = (member: Contact) => {
    setPaidBy(member);
  };

  const handleSelectMember = (member: Contact) => {
    setSelectedMembers((prev) =>
      prev.some((m) => m.id === member.id)
        ? prev.filter((m) => m.id !== member.id)
        : [...prev, member]
    );
  };

  const formatExpenseDate = (selectedDate: Date | null) => {
    if (!selectedDate) return "Today";
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const isSameDay = (d1: Date, d2: Date) =>
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();

    if (isSameDay(selectedDate, today)) return "Today";
    if (isSameDay(selectedDate, yesterday)) return "Yesterday";
    if (isSameDay(selectedDate, tomorrow)) return "Tomorrow";

    const isSameYear = selectedDate.getFullYear() === today.getFullYear();
    return selectedDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      ...(isSameYear ? {} : { year: "numeric" }),
    });
  };

  const handleExpenseSave = () => {
    Alert.alert("handle save clicked");
  };

  const canSave = amount !== "" && description !== "";

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* header */}
      <View className="flex-row items-center justify-between px-6 mt-3">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            className="bg-surface p-2.5 rounded-full flex items-center justify-center"
            activeOpacity={0.8}
            onPress={() => router.back()}
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={20} color="#294355" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-primary">
            New Expense
          </Text>
        </View>
      </View>

      {/* Add amount section */}
      <View className="mt-4 px-6 mb-4">
        <Text className="text-muted uppercase font-medium text-center text-xs tracking-wider">
          Amount
        </Text>

        <View className="flex-row justify-center mt-1 items-baseline gap-2">
          <Text className="text-2xl text-muted font-medium">₹</Text>
          <TextInput
            className="text-primary font-bold text-[48px] w-[180px] mr-4"
            placeholder={isAmountFocused ? "" : "0"}
            placeholderTextColor={"#65747F"}
            keyboardType="number-pad"
            value={amount}
            onChangeText={setAmount}
            returnKeyType="next"
            textAlign="center"
            onFocus={() => setIsAmountFocused(true)}
            onBlur={() => setIsAmountFocused(false)}
          />
        </View>
        <TextInput
          className="border border-border h-[46px] rounded-2xl mt-1 px-4 text-primary text-center bg-white"
          placeholder="eg. Dinner at Britto"
          placeholderTextColor={"#65747F"}
          keyboardType="default"
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <ExpenseCategoryChips
        selectedCategory={selectedCategory}
        onSelect={handleSelectCategory}
      />

      {/* Paid by & Date section */}
      <View className="flex-row items-center justify-between mt-4 px-6 gap-3">
        <View className="flex-1">
          <Text className="text-muted text-xs font-medium mb-1">Paid by</Text>
          <TouchableOpacity
            className="flex-1 flex-row items-center justify-between px-3 py-2 rounded-2xl border border-border h-12 bg-white"
            activeOpacity={0.9}
            onPress={handleOpenMemberListBottoSheet}
          >
            <View className="flex-1 flex-row items-center gap-2">
              <Avatar
                name={paidBy ? paidBy.name : "You"}
                avatarUri={paidBy?.avatarUri}
                size={28}
              />

              <Text
                className="flex-1 text-sm text-primary font-normal"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {paidBy ? paidBy.name : "You"}
              </Text>
            </View>

            <HugeiconsIcon icon={ArrowDown01Icon} size={18} color="#65747F" />
          </TouchableOpacity>
        </View>

        <View className="flex-1">
          <Text className="text-muted text-xs font-medium mb-1">Date</Text>
          <TouchableOpacity
            className="flex-row items-center justify-between px-3 py-2 rounded-2xl border border-border h-12 bg-white"
            activeOpacity={0.9}
            onPress={handleOpenDatePickerBottomSheet}
          >
            <View className="flex-row gap-2 items-center">
              <HugeiconsIcon
                icon={Calendar02Icon}
                size={18}
                color="#65747F"
                strokeWidth={2}
              />

              <Text className="text-sm text-primary font-normal">
                {formatExpenseDate(date)}
              </Text>
            </View>

            <HugeiconsIcon icon={ArrowDown01Icon} size={18} color="#65747F" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Split between section */}
      <View className="flex-1 px-6 mt-4 mb-2">
        <View className="flex-row items-center justify-between mb-2">
          <Text className="uppercase tracking-wider text-xs font-semibold text-muted">
            Split Between
          </Text>
          <Text className="tracking-wider text-xs font-normal text-muted">
            {selectedMembers.length} • selected
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={{ paddingVertical: 4, gap: 2 }}
          showsVerticalScrollIndicator={false}
        >
          {members.map((member) => (
            <MemberItem
              key={member.id}
              name={member.name}
              avatar={member.avatarUri}
              avatarSize={36}
              selected={selectedMembers.some((m) => m.id === member.id)}
              onSelect={() => handleSelectMember(member)}
            />
          ))}
        </ScrollView>
      </View>

      <View className="px-6 pb-6 pt-2">
        <TouchableOpacity
          className={`flex-row items-center justify-center h-[50px] px-4 py-3 rounded-2xl ${canSave ? "bg-primary" : "bg-gray-300"}`}
          activeOpacity={0.9}
          onPress={handleExpenseSave}
          disabled={!canSave}
        >
          <Text className={`text-base font-semibold text-white`}>Save Expense</Text>
        </TouchableOpacity>
      </View>

      <MemberListBottomSheet
        members={members}
        bottomSheetRef={memberListBottomSheetRef}
        paidBy={paidBy}
        onSelect={handleSelectPaidBy}
      />

      <DatePickerBottomSheet
        bottomSheetRef={datePickerBottomSheetRef}
        selectedDate={date}
        onSelectDate={(newDate) => setDate(newDate)}
      />
    </SafeAreaView>
  );
}

function ExpenseCategoryChips({
  selectedCategory,
  onSelect,
}: ExpenseCategoryChipProps) {
  return (
    <View className=" px-6">
      <Text className="mb-3 uppercase tracking-wider text-sm font-medium text-muted">
        Category
      </Text>
      <ScrollView
        horizontal
        contentContainerStyle={{ gap: 10 }}
        showsHorizontalScrollIndicator={false}
      >
        {expenseCategories.map((category) => (
          <TouchableOpacity
            key={category}
            className={`px-4 py-2 flex-row gap-2 items-center justify-center  rounded-full transition-all duration-300 ${category === selectedCategory ? "bg-primary" : "bg-surface"}`}
            activeOpacity={0.8}
            onPress={() => onSelect(category)}
          >
            <HugeiconsIcon
              icon={getActivityIcon[category]}
              size={16}
              color={category === selectedCategory ? "#ffffff" : "#314B5E"}
            />

            <Text
              className={` text-sm font-normal ${category === selectedCategory ? "text-white" : "text-primary"}`}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
