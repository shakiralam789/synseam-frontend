"use client";

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Search, Bell, Users, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { toast } from "sonner";
import { getAuthToken } from "@/lib/auth-client";

interface Notification {
  id: string;
  name: string;
  need: string;
  createdAt: string;
  isRead?: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalNotifications, setTotalNotifications] = useState(0);

  const fetchNotifications = async (pageNum: number) => {
    try {
      setLoadingMore(true);
      const token = getAuthToken();
      const res = await fetch(`${API_URL}/api/consultations?page=${pageNum}&limit=10`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        if (pageNum === 1) {
          setNotifications(data.data);
        } else {
          setNotifications((prev) => [...prev, ...data.data]);
        }
        setTotalNotifications(data.total);
        setHasMore(pageNum < data.totalPages);
      }
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchNotifications(1);
  }, []);

  useEffect(() => {
    const sse = new EventSource(`${API_URL}/api/consultations/notifications`);

    sse.onmessage = (event) => {
      try {
        const newLead: Notification = JSON.parse(event.data);
        setNotifications((prev) => {
          // Check if it already exists to prevent duplicate on initial load
          if (prev.some(n => n.id === newLead.id)) return prev;
          return [newLead, ...prev];
        }); 
        setTotalNotifications((prev) => prev + 1);
        toast.info(`New Lead: ${newLead.name}`, {
          description: `Requested: ${newLead.need}`,
          icon: <Users className="h-4 w-4 text-primary" />,
        });
      } catch (err) {
        console.error("Failed to parse SSE event", err);
      }
    };

    return () => {
      sse.close();
    };
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 10 && hasMore && !loadingMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchNotifications(nextPage);
    }
  };

  const markAsRead = async (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );

    try {
      const token = getAuthToken();
      await fetch(`${API_URL}/api/consultations/${id}/read`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
    } catch (err) {
      console.error("Failed to mark notification as read", err);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <SidebarProvider defaultOpen={true}>
      <AdminSidebar />
      <SidebarInset className="flex flex-col min-h-screen">
        {/* Admin Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/40 px-4 justify-between sticky top-0 z-30 bg-background/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1" />
          </div>
          
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative text-muted-foreground hover:text-foreground p-2 rounded-md hover:bg-accent/50 transition-colors">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground border-2 border-background">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex justify-between items-center">
                  Notifications
                  <Badge variant="secondary" className="text-[10px]">
                    {totalNotifications} Total
                  </Badge>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length === 0 ? (
                  <div className="py-6 text-center text-sm text-muted-foreground">
                    <Bell className="h-8 w-8 mx-auto mb-2 opacity-20" />
                    No new notifications
                  </div>
                ) : (
                  <div className="max-h-[300px] overflow-y-auto" onScroll={handleScroll}>
                    {notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        className="flex cursor-pointer p-3 gap-3 focus:bg-accent/10 hover:bg-accent/10"
                        onClick={() => !notif.isRead && markAsRead(notif.id)}
                      >
                        <Link href="/admin/consultations" className="flex-1 flex items-center justify-between">
                          <div className="flex flex-col gap-1">
                            <span className="text-sm font-medium leading-none">New Lead: {notif.name}</span>
                            <span className="text-xs text-muted-foreground">{notif.need}</span>
                            <span className="text-[10px] text-muted-foreground/80 flex items-center gap-1 mt-1">
                              <Clock className="h-3 w-3" />
                              {new Date(notif.createdAt).toLocaleTimeString()}
                            </span>
                          </div>
                          {!notif.isRead && (
                            <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
                          )}
                        </Link>
                      </div>
                    ))}
                    {loadingMore && (
                      <div className="py-3 text-center text-xs text-muted-foreground">
                        Loading more...
                      </div>
                    )}
                  </div>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="w-full text-center text-xs justify-center cursor-pointer text-muted-foreground" asChild>
                  <Link href="/admin/consultations">View All Consultations</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="h-8 w-px bg-border/40 mx-1" />
            <div className="flex items-center gap-3 pl-1">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-semibold">Admin User</span>
                <span className="text-[10px] text-muted-foreground font-mono">SUPERADMIN</span>
              </div>
              <div className="h-9 w-9 rounded-full bg-linear-to-br from-primary/20 to-accent/20 border border-primary/20 flex items-center justify-center text-primary font-bold shadow-glow-sm">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Admin Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
