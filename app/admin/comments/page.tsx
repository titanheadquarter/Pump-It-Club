"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Heading,
  Text,
  Card,
  VStack,
  HStack,
  Button,
  Textarea,
  Input,
  NativeSelect,
  IconButton,
  Spinner,
  Alert,
} from "@chakra-ui/react";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Trash,
  ChatCircle,
  ArrowBendUpLeft,
  PlayCircle,
} from "@phosphor-icons/react";

interface VideoComment {
  id: string;
  video_id: string;
  content: string;
  created_at: string;
  author_name?: string;
  video_title?: string;
}

export default function AdminComments() {
  const [comments, setComments] = useState<VideoComment[]>([]);
  const [filteredComments, setFilteredComments] = useState<VideoComment[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [selectedComment, setSelectedComment] = useState<VideoComment | null>(null);

  // Unique video IDs for filter
  const [videos, setVideos] = useState<string[]>([]);

  useEffect(() => {
    loadComments();
  }, []);

  useEffect(() => {
    // Filter comments by selected video
    if (selectedVideo === "all") {
      setFilteredComments(comments);
    } else {
      setFilteredComments(comments.filter(c => c.video_id === selectedVideo));
    }
  }, [comments, selectedVideo]);

  const loadComments = async () => {
    try {
      setLoading(true);
      setError(null);

      // Für Demo-Zwecke laden wir alle Kommentare zu allen Videos
      // In der Realität würde man eine Admin-API-Route erstellen
      const allComments: VideoComment[] = [];

      // Mock-Daten für verschiedene Videos
      const mockVideos = [
        { id: "video-1", title: "Ernährung Basics" },
        { id: "video-2", title: "Training für Anfänger" },
        { id: "video-3", title: "Muskelaufbau Tipps" },
        { id: "video-4", title: "Fortschritt messen" },
      ];

      // Simuliere das Laden von Kommentaren für jedes Video
      for (const video of mockVideos) {
        try {
          const response = await fetch(`/api/course/questions?videoId=${video.id}`);
          if (response.ok) {
            const data = await response.json();
            const videoComments = (data.questions || []).map((q: any) => ({
              ...q,
              video_id: video.id,
              video_title: video.title,
            }));
            allComments.push(...videoComments);
          }
        } catch (err) {
          console.log(`No comments for video ${video.id}`);
        }
      }

      setComments(allComments);

      // Extract unique video IDs
      const uniqueVideos = [...new Set(allComments.map(c => c.video_id))];
      setVideos(uniqueVideos);

    } catch (err) {
      console.error("Error loading comments:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleReply = (comment: VideoComment) => {
    setSelectedComment(comment);
    setReplyContent("");
    setReplyModalOpen(true);
  };

  const handleSendReply = async () => {
    if (!selectedComment || !replyContent.trim()) return;

    try {
      // Hier würde man eine Admin-Antwort-Funktionalität implementieren
      console.log("Sending reply to comment:", selectedComment.id, replyContent);

      // Simuliere erfolgreiches Senden
      await new Promise(resolve => setTimeout(resolve, 1000));

      setReplyModalOpen(false);
      setReplyContent("");
      setSelectedComment(null);

      // Optional: Reload comments
      // await loadComments();

    } catch (err) {
      console.error("Reply error:", err);
      setError("Fehler beim Senden der Antwort");
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm("Kommentar wirklich löschen?")) return;

    try {
      // Hier würde man eine Admin-Lösch-Funktionalität implementieren
      console.log("Deleting comment:", commentId);

      // Simuliere erfolgreiches Löschen
      await new Promise(resolve => setTimeout(resolve, 500));

      // Entferne aus lokaler Liste
      setComments(prev => prev.filter(c => c.id !== commentId));

    } catch (err) {
      console.error("Delete error:", err);
      setError("Fehler beim Löschen");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Heute";
    if (diffDays === 1) return "Gestern";
    if (diffDays < 7) return `vor ${diffDays} Tagen`;
    if (diffDays < 30) return `vor ${Math.floor(diffDays / 7)} Wochen`;

    return date.toLocaleDateString('de-DE');
  };

  if (loading) {
    return (
      <VStack gap={4} py={8}>
        <Spinner size="lg" color="green.500" />
        <Text>Lade Kommentare...</Text>
      </VStack>
    );
  }

  if (error) {
    return (
      <Alert.Root status="error">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Fehler</Alert.Title>
          <Alert.Description>Fehler: {error}</Alert.Description>
        </Alert.Content>
      </Alert.Root>
    );
  }

  return (
    <Stack gap={6}>
      <VStack gap={2} align="start">
        <Heading size="lg">Video-Kommentar Moderation</Heading>
        <Text color="gray.600">
          Verwalte und antworte auf Kommentare zu deinen Videos
        </Text>
      </VStack>

      {/* Filter */}
      <HStack gap={4}>
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={2}>
            Video filtern
          </Text>
          <NativeSelect.Root size="sm" maxW="300px">
            <NativeSelect.Field
              value={selectedVideo}
              onChange={(e) => setSelectedVideo(e.target.value)}
            >
              <option value="all">Alle Videos</option>
              {videos.map((videoId) => (
                <option key={videoId} value={videoId}>
                  {videoId}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Box>

        <Text fontSize="sm" color="gray.600" alignSelf="end">
          {filteredComments.length} Kommentare
        </Text>
      </HStack>

      {/* Comments List */}
      <VStack gap={4} align="stretch">
        {filteredComments.length === 0 ? (
          <Card.Root>
            <Card.Body>
              <VStack gap={3} textAlign="center" py={8}>
                <ChatCircle size={48} color="var(--chakra-colors-gray-400)" />
                <Text color="gray.600">
                  {selectedVideo === "all"
                    ? "Keine Kommentare vorhanden"
                    : "Keine Kommentare für dieses Video"
                  }
                </Text>
              </VStack>
            </Card.Body>
          </Card.Root>
        ) : (
          filteredComments.map((comment) => (
            <Card.Root key={comment.id}>
              <Card.Body>
                <VStack gap={4} align="stretch">
                  {/* Comment Header */}
                  <HStack justify="space-between" align="start">
                    <VStack align="start" gap={1}>
                      <HStack gap={2}>
                        <PlayCircle size={16} color="var(--chakra-colors-green-500)" />
                        <Text fontSize="sm" fontWeight="medium">
                          {comment.video_title || comment.video_id}
                        </Text>
                      </HStack>
                      <Text fontSize="xs" color="gray.600">
                        {formatDate(comment.created_at)}
                      </Text>
                    </VStack>

                    <HStack gap={2}>
                      <Button
                        size="sm"
                        variant="outline"
                        colorPalette="blue"
                        onClick={() => handleReply(comment)}
                      >
                        <HStack gap={1}>
                          <ArrowBendUpLeft size={14} />
                          <Text>Antworten</Text>
                        </HStack>
                      </Button>

                      <IconButton
                        size="sm"
                        variant="outline"
                        colorPalette="red"
                        onClick={() => handleDelete(comment.id)}
                        aria-label="Löschen"
                      >
                        <Trash size={16} />
                      </IconButton>
                    </HStack>
                  </HStack>

                  {/* Comment Content */}
                  <Box>
                    <Text fontSize="sm" lineHeight="tall">
                      {comment.content}
                    </Text>
                  </Box>
                </VStack>
              </Card.Body>
            </Card.Root>
          ))
        )}
      </VStack>

      {/* Reply Dialog */}
      <DialogRoot open={replyModalOpen} onOpenChange={(e) => !e.open && setReplyModalOpen(false)}>
        <DialogContent maxW="lg">
          <DialogHeader>
            <DialogTitle>Auf Kommentar antworten</DialogTitle>
          </DialogHeader>
          <DialogBody>
            {selectedComment && (
              <VStack gap={4} align="stretch">
                {/* Original Comment */}
                <Box p={4} bg="gray.50" borderRadius="md">
                  <Text fontSize="sm" fontWeight="medium" mb={2}>
                    Original-Kommentar:
                  </Text>
                  <Text fontSize="sm">{selectedComment.content}</Text>
                </Box>

                {/* Reply Input */}
                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={2}>
                    Deine Antwort
                  </Text>
                  <Textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Schreibe eine hilfreiche Antwort..."
                    rows={4}
                  />
                </Box>
              </VStack>
            )}
          </DialogBody>
          <DialogFooter>
            <HStack gap={3}>
              <Button variant="outline" onClick={() => setReplyModalOpen(false)}>
                Abbrechen
              </Button>
              <Button
                colorPalette="green"
                onClick={handleSendReply}
                disabled={!replyContent.trim()}
              >
                Antwort senden
              </Button>
            </HStack>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </Stack>
  );
}