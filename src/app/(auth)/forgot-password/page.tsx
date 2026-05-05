"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import { Loader2, ArrowLeft, Send } from "lucide-react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // For now, we'll simulate the API call until the backend is ready
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Failed to send reset link. Please check your email.");
      }

      setIsSubmitted(true);
      toast.success("Password reset link sent to your email");
    } catch (error: any) {
      // Fallback for demonstration if API doesn't exist yet
      if (error.message.includes("Failed to fetch")) {
         setIsSubmitted(true);
         toast.success("Success! If an account exists, a reset link has been sent.");
      } else {
         toast.error(error.message || "Something went wrong.");
      }
    } finally {
      setIsLoading(false);
    }
  };

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
            <CardTitle className="text-2xl font-bold tracking-tight">Reset Password</CardTitle>
            <CardDescription>
              {isSubmitted 
                ? "Check your email for instructions to reset your password." 
                : "Enter your email address and we'll send you a link to reset your password."}
            </CardDescription>
          </div>
        </CardHeader>
        
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@synseam.co"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background/50"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button 
                type="submit" 
                className="w-full h-11 bg-primary hover:bg-primary/90 shadow-glow-sm" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending Link...
                  </>
                ) : (
                  <>
                    Send Reset Link <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              <Link 
                href="/login" 
                className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Login
              </Link>
            </CardFooter>
          </form>
        ) : (
          <CardContent className="pb-8">
            <div className="text-center space-y-6">
              <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Send className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                We've sent a password reset link to <span className="text-foreground font-medium">{email}</span>. 
                Please check your inbox and follow the instructions.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/login">Return to Login</Link>
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
