"use client";

import { useState, useEffect } from "react";
import { Menu, SearchX, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export default function HeaderNav() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/" && !isSearchOpen && event.target === document.body) {
        event.preventDefault();
        setIsSearchOpen(true);
      }
      if (event.key === "Escape") {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Technology", href: "/technology" },
    { label: "Lifestyle", href: "/lifestyle" },
    { label: "Reviews", href: "/reviews" },
    { label: "About", href: "/about" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 md:h-16 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="flex items-center justify-between h-full px-4 md:px-6 max-w-7xl mx-auto">
        {/* Brand Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-accent-foreground font-bold text-sm">T</span>
          </div>
          <span className="font-heading font-semibold text-lg text-foreground hidden sm:block">
            TechLife
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-foreground hover:text-accent transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-200" />
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-2">
          {/* Desktop Search */}
          <div className="hidden md:flex items-center">
            {isSearchOpen ? (
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 h-9 text-sm"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="h-9 px-2"
                >
                  <SearchX className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className="h-9 px-2 text-muted-foreground hover:text-foreground"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </Button>
            )}
          </div>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="h-9 px-2 text-muted-foreground hover:text-foreground hidden md:flex"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </Button>

          {/* Profile Avatar */}
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 rounded-full p-0 bg-secondary hover:bg-secondary/80 hidden md:flex"
          >
            <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
              <span className="text-accent-foreground text-xs font-medium">U</span>
            </div>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 px-2 md:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0">
              <SheetHeader className="p-6 pb-4 border-b">
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              
              <div className="p-6 space-y-6">
                {/* Mobile Search */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Search
                  </label>
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Navigation Links */}
                <nav className="space-y-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="block py-3 px-2 text-foreground hover:text-accent hover:bg-secondary/50 rounded-md transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>

                {/* Mobile Actions */}
                <div className="space-y-3 pt-4 border-t">
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-auto py-3"
                  >
                    <svg
                      className="w-4 h-4 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                    Notifications
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-auto py-3"
                  >
                    <div className="w-4 h-4 bg-accent rounded-full flex items-center justify-center mr-3">
                      <span className="text-accent-foreground text-xs">U</span>
                    </div>
                    Profile
                  </Button>
                </div>

                {/* Social Links */}
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium text-muted-foreground mb-3">
                    Follow Us
                  </p>
                  <div className="flex space-x-4">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <span className="text-xs">Twitter</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <span className="text-xs">LinkedIn</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <span className="text-xs">GitHub</span>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}