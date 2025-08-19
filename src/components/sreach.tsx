"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import type { MovieItem } from "@/type/movie-list.types"

interface SearchResult {
  slug: string
  title: string
  subtitle: string
  year: number | string
  language?: string
  quality?: string
  poster: string
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Debounced fetch to your search API
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    const controller = new AbortController()
    const t = setTimeout(async () => {
      try {
        const params = new URLSearchParams({
          keyword: query.trim(),
          page: "1",
          limit: "10",
        })
        const res = await fetch(`/api/tim-kiem?${params.toString()}`, { signal: controller.signal })
        if (!res.ok) throw new Error("Search failed")
        const data = await res.json()
        const items: MovieItem[] = data?.data?.items || []
        const cdnBase = (data?.data?.APP_DOMAIN_CDN_IMAGE || "").replace(/\/$/, "")

        const mapped: SearchResult[] = items.map((m: MovieItem) => ({
          slug: m.slug,
          title: m.name,
          subtitle: m.origin_name,
          year: m.year,
          language: m.lang,
          quality: m.quality,
          poster: (m.poster_url || m.thumb_url || "").startsWith("http")
            ? (m.poster_url || m.thumb_url)
            : (m.poster_url || m.thumb_url)
              ? `${cdnBase}/${(m.poster_url || m.thumb_url).replace(/^\//, "")}`
              : "/placeholder.svg?height=120&width=80",
        }))
        setResults(mapped)
      } catch (e) {
        if (!(e instanceof DOMException && e.name === "AbortError")) {
          console.error(e)
        }
      } finally {
        setIsLoading(false)
      }
    }, 350)

    return () => {
      clearTimeout(t)
      controller.abort()
    }
  }, [query])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm">
      <div className="w-250 h-screen max-h-screen mx-auto p-4">
        {/* Search Input */}
        <div className="relative mb-6">
          <div className="flex items-center bg-gray-900/80 backdrop-blur-md rounded-lg border border-gray-700">
            <Search className="w-5 h-5 text-gray-400 ml-4" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm kiếm phim, diễn viên..."
              className="flex-1 bg-transparent border-none text-white placeholder-gray-400 focus:ring-0 focus:outline-none text-lg py-4"
              
            />
            <Button onClick={onClose} variant="ghost" size="sm" className="text-gray-400 hover:text-white mr-2">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Search Results */}
        {query && (
          <div className="bg-gray-900/90 backdrop-blur-md rounded-lg border border-gray-700 max-h-[70vh] overflow-y-auto">
            {/* Results Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="text-white font-medium">
                Kết quả tìm kiếm: &quot;{query}&quot; ({results.length} kết quả)
              </h3>
              <Button onClick={onClose} variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Results List */}
            <div className="p-2">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-2">
                  {results.map((result) => (
                    <Link
                      key={result.slug}
                      href={`/phim/${result.slug}`}
                      onClick={onClose}
                      className="flex items-center p-3 rounded-lg hover:bg-gray-800/50 transition-colors group"
                    >
                      {/* Movie Poster */}
                      <div className="relative flex-shrink-0 w-16 h-24 rounded-md overflow-hidden bg-gray-800">
                        <Image
                          src={result.poster || "/placeholder.svg"}
                          alt={result.title}
                          fill
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Movie Info */}
                      <div className="ml-4 flex-1 min-w-0">
                        <h4 className="text-white font-medium text-lg group-hover:text-yellow-400 transition-colors">
                          {result.title}
                        </h4>
                        <p className="text-gray-400 text-sm mb-1">{result.subtitle}</p>
                        <div className="flex items-center space-x-3 text-sm">
                          <span className="text-gray-400">{result.year}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-400">{result.language}</span>
                          <span className="px-2 py-1 bg-yellow-400/20 text-yellow-400 rounded text-xs font-medium">
                            {result.quality}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">Không tìm thấy kết quả nào</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
