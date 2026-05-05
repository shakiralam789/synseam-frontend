"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarRail,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { removeAuthToken } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import { Logo } from "@/components/Logo";

interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType;
  badge?: string | number;
}

const items: NavItem[] = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Consultations",
    url: "/admin/consultations",
    icon: Users,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    removeAuthToken();
    router.push("/login");
  };

  return (
    <Sidebar 
      variant="sidebar"
      collapsible="offcanvas" 
      className="border-r border-border/40"
    >
      <SidebarHeader className="h-16 flex items-center justify-center px-4 border-b border-border/40">
        <Link href="/" className="flex items-center gap-2 group">
          <Logo className="h-8" />
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70 mb-2">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      className={cn(
                        "h-10 px-4 transition-all duration-200",
                        isActive 
                          ? "bg-primary/10 text-primary hover:bg-primary/15" 
                          : "hover:bg-accent/50 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Link href={item.url}>
                        <item.icon className={cn("size-4", isActive && "text-primary")} />
                        <span className="ml-3 font-medium">{item.title}</span>
                        {item.badge && (
                          <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/40">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={handleLogout}
              className="h-10 px-4 w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="size-4" />
              <span className="ml-3 font-medium">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
