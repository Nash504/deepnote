import * as React from "react";
import {
  FileUp,
  LayoutDashboard,
  LibrarySquare,
  MessageSquare,
  Settings,
  HelpCircle,
  BookOpen,
  FileText,
  Search,
  LogOut,
  Home,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import Link from "next/link";
// Assuming these components are correctly imported from your UI library
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AppSidebar() {
  const [activeItem, setActiveItem] = React.useState("dashboard");
  const { user } = useUser();

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/work",
    },
    {
      id: "library",
      label: "My Library",
      icon: LibrarySquare,
      href: "/work/library",
    },
    {
      id: "chat",
      label: "AI Chat",
      icon: MessageSquare,
      href: "/work/chat",
      badge: "New",
    },
    { id: "notes", label: "Notes", icon: FileText, href: "/work/notes" },
    {
      id: "papers",
      label: "Question Papers",
      icon: BookOpen,
      href: "/work/papers",
    },
  ];

  const bottomNavItems = [
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      href: "/work/settings",
    },
    {
      id: "help",
      label: "Help & Support",
      icon: HelpCircle,
      href: "/work/help",
    },
  ];

  return (
    // The main Sidebar container
    <Sidebar className="w-64 bg-white h-screen shadow-md border-r border-gray-200 flex flex-col">
      <SidebarHeader className="flex flex-col p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-gradient-to-r from-primary to-blue-600 p-2 rounded-md">
            <FileUp className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-primary bg-clip-text text-transparent">
            DeepNote
          </h1>
        </div>

        <div className="relative w-full mb-2">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search files..."
            className="pl-10 h-9 bg-gray-50 border-gray-200 focus:ring-primary/20 focus:border-primary/30 w-full text-sm rounded-lg"
          />
        </div>

        <SignedIn>
          <div className="flex items-center gap-3 mt-4 p-3 rounded-lg bg-gray-50 border border-gray-100">
            <div className="w-9 h-9 rounded-full overflow-hidden">
              <UserButton afterSignOutUrl="/" />
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-sm font-medium truncate">
                {user?.fullName || user?.firstName}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.emailAddresses?.[0]?.emailAddress}
              </p>
            </div>
          </div>
        </SignedIn>

        <SignedOut>
          <div className="flex flex-col gap-2 mt-4">
            <SignInButton mode="redirect" redirectUrl={"/work"}>
              <button className="w-full py-2 px-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 rounded-md text-sm font-medium transition-all">
                Login
              </button>
            </SignInButton>
            <SignUpButton mode="redirect" redirectUrl={"/work"}>
              <button className="w-full py-2 px-3 bg-primary hover:bg-primary/90 text-white rounded-md text-sm font-medium transition-all">
                Get Started
              </button>
            </SignUpButton>
          </div>
        </SignedOut>
      </SidebarHeader>

      <SidebarContent className="flex flex-col justify-between flex-grow py-4 overflow-y-auto">
        <div>
          <div className="px-4 mb-2">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Main
            </p>
          </div>
          <nav className="space-y-1 px-2">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group
                  ${
                    activeItem === item.id
                      ? "bg-primary/10 text-primary"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                onClick={() => setActiveItem(item.id)}
              >
                <item.icon
                  className={`h-5 w-5 transition-colors
                    ${
                      activeItem === item.id
                        ? "text-primary"
                        : "text-gray-500 group-hover:text-gray-700"
                    }`}
                />
                <span className="text-sm font-medium">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-primary/10 text-primary text-xs font-medium px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <div className="px-4 mb-2">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Other
            </p>
          </div>
          <nav className="space-y-1 px-2">
            {bottomNavItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group
                  ${
                    activeItem === item.id
                      ? "bg-primary/10 text-primary"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                onClick={() => setActiveItem(item.id)}
              >
                <item.icon
                  className={`h-5 w-5 transition-colors
                    ${
                      activeItem === item.id
                        ? "text-primary"
                        : "text-gray-500 group-hover:text-gray-700"
                    }`}
                />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}

            <div className="px-1 pt-2 pb-4">
              <Link href="/">
                <Button
                  variant="outline"
                  className="w-full justify-start text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                >
                  <Home className="h-4 w-4 mr-2" />
                  <span>Back to Home</span>
                </Button>
              </Link>
            </div>

            <div className="px-4 pt-2">
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-100 space-y-2">
                <p className="text-xs font-medium text-gray-800">
                  Pro subscription
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Upgrade to DeepNote Pro for unlimited documents and advanced
                  AI features
                </p>
                <Button className="w-full text-xs h-8 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-sm">
                  Upgrade to Pro
                </Button>
              </div>
            </div>
          </nav>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
