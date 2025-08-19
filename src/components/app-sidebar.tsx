"use client"

import * as React from "react"


import { NavMain } from "@/components/nav-main"
// import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { data } from "@/constants/constants"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} >
      <SidebarHeader className="ml-2">
        <TeamSwitcher teams={data.logo}  />
      </SidebarHeader>

      <SidebarContent className="ml-2">
        <NavMain/>
      </SidebarContent>

      <SidebarFooter className="ml-2">
        <NavUser user={data.user} />
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  )
}
