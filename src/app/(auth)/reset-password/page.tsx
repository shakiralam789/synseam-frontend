"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import { Loader2, ShieldCheck, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      toast.error("Invalid reset link");
      router.push("/login");
    }
  }, [token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to reset password");
      }

      setIsSuccess(true);
      toast.success("Password reset successfully");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center space-y-6 py-4">
        <div className="mx-auto h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-green-500" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold">Password Updated</h3>
          <p className="text-sm text-muted-foreground">
            Your password has been reset successfully. You can now log in with your new credentials.
          </p>
        </div>
        <Button asChild className="w-full">
          <Link href="/login">Go to Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-background/50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="bg-background/50"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          type="submit" 
          className="w-full h-11 bg-primary hover:bg-primary/90 shadow-glow-sm" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Resetting...
            </>
          ) : (
            <>
              Update Password <ShieldCheck className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 grid-bg radial-fade opacity-30 pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

      <Card className="w-full max-w-md border-border/40 bg-card/50 backdrop-blur-xl shadow-2xl relative z-10 animate-fade-up">
        <CardHeader className="space-y-4 text-center">
          <Link href="/" className="mx-auto inline-block transition-transform hover:scale-105 active:scale-95">
            <Logo className="h-10" />
          </Link>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold tracking-tight">Create New Password</CardTitle>
            <CardDescription>
              Enter a new secure password for your account.
            </CardDescription>
          </div>
        </CardHeader>
        
        <Suspense fallback={
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }>
          <ResetPasswordForm />
        </Suspense>
      </Card>
    </div>
  );
}
