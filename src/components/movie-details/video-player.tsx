"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Episode, Server } from "@/type/movie-details.types"
import Hls from "hls.js"

interface LocalEpisode {
  number: number
  title: string
  duration: string
  views: number
}

interface MoviePlayerProps {
  selectedEpisode: number
  setSelectedEpisode: (episode: number) => void
  episodes: LocalEpisode[]
  movieBackdrop: string
  movieTitle: string
  movieSlug: string
  selectedServer?: string
  setSelectedServer?: (server: string) => void
}

export function MoviePlayer({
  selectedEpisode,
  setSelectedEpisode,
  episodes,
  movieSlug,
  selectedServer: externalSelectedServer,
}: MoviePlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [canPlay, setCanPlay] = useState(false)
  const [episodeData, setEpisodeData] = useState<Episode[] | null>(null)
  const [internalSelectedServer, setInternalSelectedServer] = useState<Server | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [serverData, setServerData] = useState<Server[] | null>(null)
  // serverData is used to select internal server by name later

  // Use external server if provided, otherwise use internal
  const selectedServerName = externalSelectedServer || internalSelectedServer?.server_name || 'vietsub'

  const [currentEpisodeData, setCurrentEpisodeData] = useState<Episode | null>(null)
  const [useEmbedPlayer, setUseEmbedPlayer] = useState(false)
  const hlsRef = useRef<Hls | null>(null)

  // Fetch episode and server data when component mounts
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setError(null)
        const response = await fetch(`/api/phim/${movieSlug}`)
        const data = await response.json()
        // console.log(data)

        if (data.status && data.episodes && data.episodes.length > 0) {
          setServerData(data.episodes)

          // Find server by name or use first server
          const targetServer = data.episodes.find((s: Server) => s.server_name === selectedServerName) || data.episodes[0]
          setInternalSelectedServer(targetServer)

          // Get episodes from selected server
          const serverEpisodes = targetServer?.server_data || []
          setEpisodeData(serverEpisodes)

          // Set current episode based on selectedEpisode
          if (serverEpisodes.length > 0) {
            const episodeIndex = selectedEpisode - 1
            if (episodeIndex >= 0 && episodeIndex < serverEpisodes.length) {
              setCurrentEpisodeData(serverEpisodes[episodeIndex])
            } else {
              setCurrentEpisodeData(serverEpisodes[0])
            }
          }
        } 
      } catch (err) {
        console.error("Error fetching movie data:", err)
      }
    }
    if (movieSlug) {
      fetchMovieData()
    }
  }, [movieSlug, selectedEpisode, selectedServerName])

  // Update current episode when selectedEpisode changes
  useEffect(() => {
    if (episodeData && episodeData.length > 0) {
      const episodeIndex = selectedEpisode - 1
      if (episodeIndex >= 0 && episodeIndex < episodeData.length) {
        setCurrentEpisodeData(episodeData[episodeIndex])
        setCanPlay(false) // Reset play state when episode changes
        setUseEmbedPlayer(false) // Reset embed player state
      }
    }
  }, [selectedEpisode, episodeData])

  // Load video when episode data changes
  useEffect(() => {
    const video = videoRef.current
    if (!video || !currentEpisodeData) return
    // Clean up previous HLS instance
    if (hlsRef.current) {
      hlsRef.current.destroy()
      hlsRef.current = null
    }

    // Try M3U8 first, fallback to embed
    const videoUrl = currentEpisodeData.link_m3u8 || currentEpisodeData.link_embed

    if (!videoUrl) {
      setError("Không tìm thấy link video cho tập này.")
      return
    }

    // For HLS streams (.m3u8)
    if (videoUrl.includes('.m3u8')) {
      if (Hls.isSupported()) {
        // Use HLS.js for browsers that support it
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 90,
        })

        hlsRef.current = hls
        hls.loadSource(videoUrl)
        hls.attachMedia(video)
        hls.on(Hls.Events.MANIFEST_PARSED, () => { 
          setCanPlay(true)
        })

        hls.on(Hls.Events.ERROR, (_, data) => {
          console.error("HLS error:", data)
          if (data.fatal) {
            setError("Không thể tải video HLS. Đang chuyển sang trình phát nhúng...")
            // Switch to embed player after 2 seconds
          }
        })
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS support (Safari)
        video.src = videoUrl
      } else {
        // Browser doesn't support HLS, use embed player
        console.log("Browser doesn't support HLS, using embed player")
      }
    } else {
      // Regular video file
      video.src = videoUrl
    }
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy()
        hlsRef.current = null
      }
    }
  }, [currentEpisodeData])


  return (
    <div className="container mx-auto px-4 py-4">
      <div className="max-w-3xl mx-auto">
        {/* Video Player */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between ">
              <span>Đang xem: {currentEpisodeData?.name || `Tập ${selectedEpisode}`}</span>
              {internalSelectedServer && (
                <Badge variant="outline">{internalSelectedServer.server_name}</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <div className="aspect-video bg-black relative w-auto h-auto sm:h-auto md:h-[450px] lg:h-175 rounded-lg">
              {error ? (
                  <div className="absolute inset-0 flex items-center justify-center text-center text-white bg-black/50">
                  
                  </div>
              ) : (
                <>
                  {useEmbedPlayer && currentEpisodeData?.link_embed ? (
                    <iframe
                      src={currentEpisodeData.link_embed}
                      className="w-full h-full overflow-hidden rounded-lg"
                      allow="autoplay; encrypted-media"
                      title={`${currentEpisodeData.name} - ${currentEpisodeData.filename}`}
                    />
                  ) : (
                    <>
                      <video
                        ref={videoRef}
                        className="w-full h-full overflow-hidden rounded-lg"
                        controls={canPlay}
                        preload="metadata"
                        crossOrigin="anonymous"
                        playsInline
                      />
                    </>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Episode Navigation */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Chọn tập:</h3>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                disabled={selectedEpisode === 1}
                onClick={() => setSelectedEpisode(Math.max(1, selectedEpisode - 1))}
              >
                Tập trước
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                disabled={selectedEpisode === (episodeData ? episodeData.length : episodes.length)}
                onClick={() => setSelectedEpisode(Math.min(episodeData ? episodeData.length : episodes.length, selectedEpisode + 1))}
              >
                Tập sau
              </Button>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {episodeData ? (
              episodeData.slice(0, 20).map((episode, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant={selectedEpisode === index + 1 ? "default" : "outline"}
                  className={
                    selectedEpisode === index + 1
                      ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold flex-shrink-0"
                      : "border-white/20 text-white hover:bg-white/10 flex-shrink-0"
                  }
                  onClick={() => setSelectedEpisode(index + 1)}
                  title={episode.name}
                >
                  {index + 1}
                </Button>
              ))
            ) : (
              episodes.slice(0, 10).map((episode) => (
                <Button
                  key={episode.number}
                  size="sm"
                  variant={selectedEpisode === episode.number ? "default" : "outline"}
                  className={
                    selectedEpisode === episode.number
                      ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold flex-shrink-0"
                      : "border-white/20 text-white hover:bg-white/10 flex-shrink-0"
                  }
                  onClick={() => setSelectedEpisode(episode.number)}
                >
                  {episode.number}
                </Button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
