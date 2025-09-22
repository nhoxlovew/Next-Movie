"use client"

import * as React from "react"


// import {
//   DropdownMenu,
// } from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { CatIcon } from "lucide-react"

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ElementType | string
    plan: string
  }[]
}) {
  const { /* isMobile */ } = useSidebar()
  const [activeTeam] = React.useState(teams[0])

  if (!activeTeam) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
          <Link href={`/`} className="flex justify-center items-center">
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground "
            >
              <div className=" text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg overflow-hidden">
                <CatIcon className="text-green-400"/>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeTeam.name}</span>
                <span className="truncate text-xs">{activeTeam.plan}</span>
              </div>
            </SidebarMenuButton>
            </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
