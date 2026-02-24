"use client";

import { Box, AspectRatio } from "@chakra-ui/react";
import { useRef, useEffect } from "react";

interface BucketVideoPlayerProps {
  /** Vollständige URL zum MP4 (z. B. Hetzner Object Storage) */
  src: string;
  /** Optional: Callback mit aktueller Abspielposition in Sekunden (für Notizen-Zeitstempel) */
  onTimeUpdate?: (currentTime: number) => void;
  /** Maximale Breite (z. B. "4xl", "6xl", "full") – "full" für großen Player */
  maxWidth?: string;
}

const videoBoxStyles = {
  borderRadius: "l3",
  boxShadow:
    "0 1px 12px -2px rgba(0, 0, 0, 0.06), 0 2px 24px -4px rgba(0, 0, 0, 0.04), 0 0 0 0.5px rgba(255, 255, 255, 0.04) inset, 0 0 24px -4px rgba(34, 197, 94, 0.12)",
  border: "1px solid",
  borderColor: "border.emphasized/50",
  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  _hover: {
    boxShadow:
      "0 2px 16px -2px rgba(0, 0, 0, 0.08), 0 4px 32px -4px rgba(0, 0, 0, 0.06), 0 0 0 0.5px rgba(255, 255, 255, 0.05) inset, 0 0 28px -4px rgba(34, 197, 94, 0.15)",
  },
  overflow: "hidden",
  bg: "black",
};

export const BucketVideoPlayer = ({ src, onTimeUpdate, maxWidth = "4xl" }: BucketVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !onTimeUpdate) return;
    const handleTimeUpdate = () => onTimeUpdate(Math.floor(video.currentTime));
    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [onTimeUpdate]);

  const ratioBoxProps = { ratio: 16 / 9 as const, w: "full" as const, mx: "auto" as const, ...(maxWidth !== "full" ? { maxW: maxWidth } : {}) };

  if (!src) {
    return (
      <AspectRatio {...ratioBoxProps}>
        <Box {...videoBoxStyles} display="flex" alignItems="center" justifyContent="center" color="white">
          Kein Video
        </Box>
      </AspectRatio>
    );
  }

  return (
    <AspectRatio {...ratioBoxProps}>
      <Box {...videoBoxStyles} w="full" h="full" position="relative">
        <video
          ref={videoRef}
          src={src}
          controls
          controlsList="nodownload"
          style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          playsInline
        />
      </Box>
    </AspectRatio>
  );
};
