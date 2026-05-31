import EventIcon from "@/assets/icons/event.png";
import FamilyIcon from "@/assets/icons/family.png";
import FriendIcon from "@/assets/icons/friends.png";
import CoupleIcon from "@/assets/icons/heart.png";
import HomeIcon from "@/assets/icons/house.png";
import OfficeIcon from "@/assets/icons/office.png";
import SportsIcon from "@/assets/icons/sports.png";
import TripIcon from "@/assets/icons/trip.png";
import {
	Car03Icon,
	Coffee02Icon,
	Home03Icon,
	IdeaIcon,
	PartyIcon,
	Restaurant01Icon,
	ShoppingBag02Icon,
	Ticket01Icon,
	Add01Icon,
	ScanIcon,
	UserGroup03Icon,
	Wallet01Icon
} from "@hugeicons/core-free-icons";


type BalanceType = "receivable" | "payable" | "settled";
type ExpenseCateogry = "Food" | "Travel" | "Grocery" | "Utility" | "Entertainment" | "Home" | "Party" | "Snack"
type HugeIconType = typeof Home03Icon;



export const groups: Group[] = [
	{
		id: "1",
		name: "Roommates",
		category: "Home",
		amount: 1460,
		balanceType: "receivable",
		lastActivity: "4 days ago",
		membersList: [
			{
				id: "1",
				username: "Mohammad Emad",
				avatar: "",
			},
			{
				id: "2",
				username: "Ryan Yusuf",
				avatar: "",
			},
			{
				id: "3",
				username: "Fahad Khan",
				avatar: "",
			},
			{
				id: "4",
				username: "Aman Raj",
				avatar: "",
			},
		],
	},
	{
		id: "2",
		name: "Trip to Goa",
		category: "Trip",
		amount: 820,
		balanceType: "payable",
		lastActivity: "2 days ago",
		membersList: [
			{
				id: "1",
				username: "Mohammad Emad",
				avatar: "",
			},
			{
				id: "2",
				username: "Riya Sharma",
				avatar: "",
			},
			{
				id: "3",
				username: "Aditya Singh",
				avatar: "",
			},
			{
				id: "4",
				username: "Neha Patel",
				avatar: "",
			},
			{
				id: "5",
				username: "Aman Raj",
				avatar: "",
			},
		],
	},
	{
		id: "3",
		name: "Office Team",
		category: "Office",
		amount: 2300,
		balanceType: "receivable",
		lastActivity: "1 week ago",
		membersList: [
			{
				id: "1",
				username: "Mohammad Emad",
				avatar: "",
			},
			{
				id: "2",
				username: "Sarah Ali",
				avatar: "",
			},
			{
				id: "3",
				username: "David Roy",
				avatar: "",
			},
		],
	},
];

export const groupCategories = [
	"Home",
	"Trip",
	"Friends",
	"Office",
	"Family",
	"Couple",
	"Event",
	"Sports",
] as const;

export const groupCategoryColors = {
	Home: "#daeefe",
	Trip: "#ffe9cb",
	Friends: "#d9f7e5",
	Office: "#ffebe6",
	Family: "#f3e8ff",
	Couple: "#ffe4ec",
	Event: "#fff4cc",
	Sports: "#e0f2fe",
};

export const groupIcon = {
	Home: HomeIcon,
	Trip: TripIcon,
	Friends: FriendIcon,
	Office: OfficeIcon,
	Family: FamilyIcon,
	Event: EventIcon,
	Couple: CoupleIcon,
	Sports: SportsIcon,
};

export interface Group {
	id: string;
	name: string;
	category: GroupCategory;
	amount: number;
	balanceType: BalanceType;
	lastActivity: string;
	membersList: Member[];
}

export interface Member {
	id: string;
	username: string;
	avatar?: string;
}



export type GroupCategory = (typeof groupCategories)[number];


export const getBalanceType = {
	receivable: "To Recieve",
	payable: "To Pay",
	settled: "Settled",
};

export interface Activity {
	id: string;
	title: string;
	groupName: string;
	paidBy: string;
	amount: number,
	balanceType: BalanceType,
	timeAgo: string;
	category: ExpenseCateogry
}

export const getActivityIcon = {
	Food: Restaurant01Icon,
	Travel: Car03Icon,
	Grocery: ShoppingBag02Icon,
	Utility: IdeaIcon,
	Entertainment: Ticket01Icon,
	Home: Home03Icon,
	Party: PartyIcon,
	Snack: Coffee02Icon,
};

export const recentActivities : Activity[] = [
	{
		id: "1",
		title: "Dinner at Toit",
		groupName: "Goa Trip",
		paidBy: "you",
		amount: 540,
		balanceType: "receivable",
		timeAgo: "2h",
		category: "Food",
	},
	{
		id: "2",
		title: "Uber to airport",
		groupName: "Goa Trip",
		paidBy: "Rahul",
		amount: 180,
		balanceType: "payable",
		timeAgo: "1d",
		category: "Travel",
	},
	{
		id: "3",
		title: "Weekly groceries",
		groupName: "Flatmates",
		paidBy: "you",
		amount: 820,
		balanceType: "receivable",
		timeAgo: "2d",
		category: "Grocery",
	},
	{
		id: "4",
		title: "Electricity bill",
		groupName: "Flatmates",
		paidBy: "Sneha",
		amount: 420,
		balanceType: "payable",
		timeAgo: "3d",
		category: "Utility",
	},
	{
		id: "5",
		title: "Movie tickets",
		groupName: "Friends",
		paidBy: "Aman",
		amount: 250,
		balanceType: "payable",
		timeAgo: "5d",
		category: "Entertainment",
	},
	{
		id: "6",
		title: "Pizza Night",
		groupName: "Friends",
		paidBy: "you",
		amount: 360,
		balanceType: "receivable",
		timeAgo: "1w",
		category: "Food",
	},
];



export const expenseCategory: { label: string; icon: HugeIconType }[] = [
	{
		label: "Home",
		icon: Home03Icon,
	},
	{
		label: "Travel",
		icon: Car03Icon,
	},
	{
		label: "Grocery",
		icon: ShoppingBag02Icon,
	},
	{
		label: "Food",
		icon: Restaurant01Icon,
	},
	{
		label: "Snack",
		icon: Coffee02Icon,
	},
	{
		label: "Utility",
		icon: IdeaIcon,
	},
	{
		label: "Party",
		icon: PartyIcon,
	},
	{
		label: "Entertainment",
		icon: Ticket01Icon,
	},
];


export interface PendingSettlement {
	id: string;
	username: string;
	amount: number;
	balanceType: BalanceType
}

export const pendingSettlements: PendingSettlement[] = [
	{
		id: "1",
		username: "Rahul Verma",
		balanceType: "receivable",
		amount: 420
	},
	{
		id: "2",
		username: "Sneha Lyer",
		balanceType: "payable",
		amount: 180
	},
]