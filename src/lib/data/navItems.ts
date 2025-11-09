import type { Component } from 'vue';

import {
  Home,
  Heart,
  Search,
  FileText,
  User,
  Settings as SettingsIcon,
  Wallet,
  Tag,
  GraduationCap,
  HandCoins,
  BarChart2,
} from "lucide-vue-next";

interface NavItemChild {
  name: string;
  href: string;
}

export interface NavigationItem {
  name: string;
  icon: Component; //Component itwm
  href?: string;
  children?: NavItemChild[];
}

export const studentNavigationItems: NavigationItem[] = [
  {
    name: "Dashboard",
    href: "/student/dashboard",
    icon: Home,
  },
  {
    name: "Appeals",
    icon: Heart,
    children: [
      { name: "My Appeals", href: "/student/appeals" },
      { name: "Create Appeal", href: "/student/appeals/create" },
    ],
  },
  {
    name: "Opportunities",
    icon: Search,
    children: [
      { name: "Browse Offers", href: "/student/offers" },
      { name: "Scholarships", href: "/student/scholarships" },
    ],
  },
  {
    name: "Applications",
    href: "/student/applications",
    icon: FileText,
  },
  {
    name: "Profile",
    href: "/student/profile",
    icon: User,
  },
  {
    name: "Settings",
    href: "/student/settings",
    icon: SettingsIcon,
  },
];

export const sponsorNavigationItems: NavigationItem[] = [
  {
    name: "Dashboard",
    href: "/sponsor/dashboard",
    icon: Home,
  },
  {
    name: "Wallet",
    icon: Wallet,
    children: [
      { name: "Overview", href: "/sponsor/wallet" },
      { name: "Transactions", href: "/sponsor/wallet/transactions" },
    ],
  },
  {
    name: "Offers",
    icon: Tag,
    children: [
      { name: "My Offers", href: "/sponsor/offers" },
      { name: "Create Offer", href: "/sponsor/offers/create" },
    ],
  },
  {
    name: "Scholarships",
    icon: GraduationCap,
    children: [
      { name: "My Scholarships", href: "/sponsor/scholarships" },
      { name: "Create Scholarship", href: "/sponsor/scholarships/create" },
    ],
  },
  {
    name: "Applications",
    href: "/sponsor/manage-applications",
    icon: FileText,
  },
  {
    name: "Disbursements",
    icon: HandCoins,
    children: [
      { name: "All Disbursements", href: "/sponsor/disbursements" },
      { name: "Record Disbursement", href: "/sponsor/disbursements/create" },
    ],
  },

  {
    name: "Analytics",
    href: "/sponsor/analytics",
    icon: BarChart2,
  }
];