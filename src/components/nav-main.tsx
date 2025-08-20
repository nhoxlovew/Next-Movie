"use client"


import { useEffect, useState } from "react"
import { CalendarSearch, ChevronRight, Globe, SmilePlus } from "lucide-react"
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
import { Country } from "@/type/movie-list.types"

export function NavMain(
) {
  const [countries, setCountries] = useState<Country[]>([])
  const [genres, setGenres] = useState<Category[]>([])
  const [years, setYears] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false
    setLoading(true)
    fetch("/api/nam")
      .then((r) => r.json() as Promise<number[]>)
      .then((data) => { if (!ignore) setYears(Array.isArray(data) ? data : []) })
      .catch(() => { if (!ignore) setYears([]) })
      .finally(() => { if (!ignore) setLoading(false) })

    fetch("/api/quoc-gia")
      .then((r) => r.json() as Promise<Country[]>)
      .then((data) => { if (!ignore) setCountries(Array.isArray(data) ? data : []) })
      .catch(() => { if (!ignore) setCountries([]) })
      .finally(() => { if (!ignore) setLoading(false) })

    fetch("/api/the-loai")
      .then((r) => r.json() as Promise<Category[]>)
      .then((data) => { if (!ignore) setGenres(Array.isArray(data) ? data : []) })
      .catch(() => { if (!ignore) setGenres([]) })
      .finally(() => { if (!ignore) setLoading(false) })
    return () => { ignore = true }

  }, [])

  return (
    <SidebarGroup className="group/sidebar">
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



        <Collapsible asChild className="group/collapsible">
          <SidebarMenuItem >
            <CollapsibleTrigger asChild>
              <SidebarMenuButton>
                <Globe className="mr-2" />
                <span>Quốc gia</span>
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
                  countries.map((g) => (
                    <SidebarMenuSubItem key={g.slug}>
                      <SidebarMenuSubButton asChild>
                        <a href={`/quoc-gia/${g.slug}`}>
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



        <Collapsible asChild className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton>
                <CalendarSearch className="mr-2" />
                <span>Năm sản xuất</span>
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
                  years.map((year) => (
                    <SidebarMenuSubItem key={year}>
                      <SidebarMenuSubButton asChild>
                        <a href={`/nam/${year}`}>
                          <span>{year}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))
                )}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>

      </SidebarMenu>
    </SidebarGroup>
  )
}



