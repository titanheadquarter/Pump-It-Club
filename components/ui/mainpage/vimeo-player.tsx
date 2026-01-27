import { Box, AspectRatio } from "@chakra-ui/react";

interface VimeoPlayerProps {
  videoId?: string;
}

export const VimeoPlayer = ({ videoId }: VimeoPlayerProps) => {
  if (videoId) {
    return (
      <AspectRatio ratio={16 / 9} w="full" maxW="4xl" mx="auto">
        <Box
          as="iframe"
          src={`https://player.vimeo.com/video/${videoId}`}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          borderRadius="l3"
          boxShadow="0 1px 12px -2px rgba(0, 0, 0, 0.06), 0 2px 24px -4px rgba(0, 0, 0, 0.04), 0 0 0 0.5px rgba(255, 255, 255, 0.04) inset, 0 0 24px -4px rgba(34, 197, 94, 0.12)"
          border="1px solid"
          borderColor="border.emphasized/50"
          transition="all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
          _hover={{
            boxShadow:
              "0 2px 16px -2px rgba(0, 0, 0, 0.08), 0 4px 32px -4px rgba(0, 0, 0, 0.06), 0 0 0 0.5px rgba(255, 255, 255, 0.05) inset, 0 0 28px -4px rgba(34, 197, 94, 0.15)",
          }}
        />
      </AspectRatio>
    );
  }

  return (
    <AspectRatio ratio={16 / 9} w="full" maxW="4xl" mx="auto">
      <Box
        bg="black"
        borderRadius="l3"
        boxShadow="0 1px 12px -2px rgba(0, 0, 0, 0.06), 0 2px 24px -4px rgba(0, 0, 0, 0.04), 0 0 0 0.5px rgba(255, 255, 255, 0.04) inset, 0 0 24px -4px rgba(34, 197, 94, 0.12)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="white"
        textStyle={{ base: "md", md: "lg" }}
        position="relative"
        overflow="hidden"
        border="1px solid"
        borderColor="border.emphasized/50"
        transition="all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
        _hover={{
          boxShadow:
            "0 2px 16px -2px rgba(0, 0, 0, 0.08), 0 4px 32px -4px rgba(0, 0, 0, 0.06), 0 0 0 0.5px rgba(255, 255, 255, 0.05) inset, 0 0 28px -4px rgba(34, 197, 94, 0.15)",
        }}
        _before={{
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "l3",
          bg: "linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0) 50%)",
          pointerEvents: "none",
        }}
        _after={{
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "l3",
          bg: "radial-gradient(circle at 30% 20%, rgba(34, 197, 94, 0.03) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      >
        Platzhalter
      </Box>
    </AspectRatio>
  );
};
