"use client"

import { useEffect, useState } from "react"
import { ChevronRight, type LucideIcon, SmilePlus } from "lucide-react"
import type { Category } from "@/type/movie-list.types"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavMain(
 ) {
  const [genres, setGenres] = useState<Category[]>([])

  useEffect(() => {
    let ignore = false
    fetch("/api/the-loai")
      .then((r) => r.json() as Promise<Category[]>)
      .then((data) => { if (!ignore) setGenres(data) })
      .catch(() => { if (!ignore) setGenres([]) })
    return () => { ignore = true }
  }, [])

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Danh mục</SidebarGroupLabel>
      <SidebarMenu>
        {/* Existing static groups */}
        {/* {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
             
            </SidebarMenuItem>
          </Collapsible>
        ))} */}

        {/* Dynamic genre group */}
        <Collapsible asChild className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton>
                <SmilePlus className="mr-2" /> 
                <span>Thể loại</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {genres.map((g) => (
                  <SidebarMenuSubItem key={g.slug}>
                    <SidebarMenuSubButton asChild>
                      <a href={`/the-loai/${g.slug}`}>
                        <span>{g.name}</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  )
}
