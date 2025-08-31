"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Rss, MailPlus } from "lucide-react";

type SubmissionState = "idle" | "validating" | "success" | "error";

interface NewsletterFormData {
  email: string;
}

export default function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setErrorMessage("Email address is required");
      setSubmissionState("error");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address");
      setSubmissionState("error");
      return;
    }

    setSubmissionState("validating");
    setErrorMessage("");

    // Simulate API call - replace with actual implementation
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate success/failure randomly for demo
      if (Math.random() > 0.2) {
        setSubmissionState("success");
        setEmail("");
        toast.success("Successfully subscribed to our newsletter!");
      } else {
        throw new Error("Subscription failed");
      }
    } catch (error) {
      setSubmissionState("error");
      setErrorMessage("Failed to subscribe. Please try again.");
    }
  };

  const footerLinks = {
    Explore: [
      { label: "Articles", href: "/articles" },
      { label: "Reviews", href: "/reviews" },
      { label: "Guides", href: "/guides" },
      { label: "Trends", href: "/trends" }
    ],
    Shop: [
      { label: "Featured", href: "/shop/featured" },
      { label: "New Arrivals", href: "/shop/new" },
      { label: "Categories", href: "/shop/categories" },
      { label: "Gift Cards", href: "/shop/gift-cards" }
    ],
    Support: [
      { label: "Help Center", href: "/help" },
      { label: "Contact Us", href: "/contact" },
      { label: "Shipping", href: "/shipping" },
      { label: "Returns", href: "/returns" }
    ],
    Legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Accessibility", href: "/accessibility" }
    ]
  };

  return (
    <footer className="bg-muted/30 border-t border-border/50 mt-24 pt-16 pb-8">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Newsletter and Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-12">
          {/* Newsletter Section */}
          <div className="lg:col-span-5">
            <div className="bg-card rounded-lg p-8 shadow-sm border border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <MailPlus className="h-5 w-5 text-primary" />
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  Stay Updated
                </h3>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Get the latest articles, insights, and curated recommendations delivered to your inbox.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email address
                    </label>
                    <Input
                      id="newsletter-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (submissionState === "error") {
                          setSubmissionState("idle");
                          setErrorMessage("");
                        }
                      }}
                      className={`transition-all duration-120 ${
                        submissionState === "error" 
                          ? "border-destructive focus:ring-destructive" 
                          : "focus:ring-ring"
                      }`}
                      disabled={submissionState === "validating"}
                      aria-describedby={errorMessage ? "email-error" : undefined}
                      aria-invalid={submissionState === "error"}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={submissionState === "validating"}
                    className="transition-all duration-120 hover:translate-y-[-1px] hover:shadow-md disabled:translate-y-0 disabled:shadow-none sm:px-8"
                  >
                    {submissionState === "validating" ? "Subscribing..." : "Subscribe"}
                  </Button>
                </div>
                
                {errorMessage && (
                  <div
                    id="email-error"
                    role="alert"
                    aria-live="polite"
                    className="text-sm text-destructive font-medium"
                  >
                    {errorMessage}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <h4 className="font-heading font-semibold text-foreground mb-4">
                    {category}
                  </h4>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-muted-foreground hover:text-foreground transition-colors duration-120 text-sm"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Icons and Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-border/50 gap-4">
          <div className="flex items-center gap-4">
            <a
              href="/rss"
              className="text-muted-foreground hover:text-foreground transition-colors duration-120"
              aria-label="RSS Feed"
            >
              <Rss className="h-5 w-5" />
            </a>
          </div>
          
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} Editorial. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}