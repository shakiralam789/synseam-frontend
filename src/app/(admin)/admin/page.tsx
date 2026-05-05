"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, TrendingUp, ArrowUpRight, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAuthToken } from "@/lib/auth-client";

interface Consultation {
  id: string;
  name: string;
  email: string;
  need: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch_data() {
      try {
        const token = getAuthToken();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/consultations?limit=100`, {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (res.ok) {
          const result = await res.json();
          setConsultations(result.data || []);
        }
      } catch {}
      setLoading(false);
    }
    fetch_data();
  }, []);

  const recentConsultations = consultations.slice(0, 5);

  const stats = [
    {
      title: "Total Leads",
      value: loading ? "—" : consultations.length.toString(),
      description: "All consultation requests",
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "This Week",
      value: loading
        ? "—"
        : consultations.filter((c) => {
            const d = new Date(c.createdAt);
            const now = new Date();
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return d >= weekAgo;
          }).length.toString(),
      description: "New leads this week",
      icon: Clock,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "Unique Services",
      value: loading ? "—" : new Set(consultations.map((c) => c.need)).size.toString(),
      description: "Service categories requested",
      icon: TrendingUp,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground">
          Welcome back to the SynSeam command center. Here&apos;s what&apos;s happening.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden group hover:border-primary/20 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`rounded-md p-2 ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <span className="text-emerald-500 inline-flex items-center">
                  <ArrowUpRight className="h-3 w-3" />
                </span>
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-border/40 bg-card/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Consultations</CardTitle>
                <CardDescription>
                  {loading ? "Loading..." : `You have ${consultations.length} total consultation requests.`}
                </CardDescription>
              </div>
              <Button asChild variant="outline" size="sm" className="h-8">
                <Link href="/admin/consultations">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading ? (
                <div className="h-[300px] flex items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
              ) : recentConsultations.length > 0 ? (
                recentConsultations.map((consultation) => (
                  <div
                    key={consultation.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border/40 bg-accent/20 hover:bg-accent/40 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-linear-to-br from-primary/10 to-accent/10 border border-primary/20 flex items-center justify-center text-white font-bold">
                        {consultation.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">{consultation.name}</span>
                        <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {consultation.need}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end text-right">
                      <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                        {new Date(consultation.createdAt).toLocaleDateString()}
                      </span>
                      <span className="text-xs font-medium text-emerald-500">NEW</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-[300px] flex flex-col items-center justify-center text-muted-foreground bg-accent/10 rounded-lg border border-dashed border-border/60">
                   <Users className="h-10 w-10 mb-2 opacity-20" />
                   <p>No consultation requests yet.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-border/40 bg-card/50">
          <CardHeader>
            <CardTitle>Activity Feed</CardTitle>
            <CardDescription>Latest system logs and events.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { text: "System migration completed", time: "2h ago", type: "system" },
                { text: "New lead: Sarah Johnson", time: "5h ago", type: "lead" },
                { text: "Mailpit transport verified", time: "1d ago", type: "system" },
                { text: "Database backup scheduled", time: "2d ago", type: "system" },
              ].map((log, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${log.type === 'lead' ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium leading-none">{log.text}</p>
                    <p className="text-xs text-muted-foreground">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
