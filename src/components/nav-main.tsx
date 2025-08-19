"use client"

import { useEffect, useState } from "react"
import { ChevronRight, SmilePlus } from "lucide-react"
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false
    setLoading(true)
    fetch("/api/the-loai")
      .then((r) => r.json() as Promise<Category[]>)
      .then((data) => { if (!ignore) setGenres(Array.isArray(data) ? data : []) })
      .catch(() => { if (!ignore) setGenres([]) })
      .finally(() => { if (!ignore) setLoading(false) })
    return () => { ignore = true }
  }, [])

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Mục Lục</SidebarGroupLabel>
      <SidebarMenu>
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
                {loading ? (
                  Array.from({ length: 12 }).map((_, i) => (
                    <SidebarMenuSubItem key={`s-${i}`}>
                    </SidebarMenuSubItem>
                  ))
                ) : (
                  genres.map((g) => (
                    <SidebarMenuSubItem key={g.slug}>
                      <SidebarMenuSubButton asChild>
                        <a href={`/the-loai/${g.slug}`}>
                          <span>{g.name}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))
                )}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>


  <Collapsible asChild>
  <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton>
                <SmilePlus className="mr-2" /> 
                <span>Danh mục</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
          </SidebarMenuItem>
  </Collapsible>

      </SidebarMenu>
    </SidebarGroup>
  )
}
