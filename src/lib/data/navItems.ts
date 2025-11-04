import type { Component } from 'vue';

import {
  Home,
  Heart,
  Search,
  FileText,
  User,
  Settings as SettingsIcon,
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

export const sponsorNnavigationItems: NavigationItem[] = [
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