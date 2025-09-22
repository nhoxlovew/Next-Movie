"use client"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  // BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"


import { ReactNode } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Search, User } from "lucide-react"

import { SearchModal } from "@/components/sreach"
import { useState } from "react"
import Link from "next/link"

export default function Page({ children }: { children: ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {/* <BreadcrumbSeparator className="hidden md:block" /> */}
                <BreadcrumbItem>
                  <BreadcrumbPage>
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <ThemeToggle />
          </div>
          {/* Search and User */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="w-5 h-5" />
            </Button>
            <Link href={`/login`} className="hover:cursor-pointer">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white ">
                <User className="w-5 h-5" />
              </Button>
            </Link>
          </div>

        </header>
        <div className="flex flex-1 flex-col overflow-hidden">
          {children}
        </div>
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </SidebarInset>
    </SidebarProvider>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="ml-4"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}


