"use client";

import { useState } from "react";
import { Box, Button, VStack, Image, Text, Input } from "@chakra-ui/react";
import { Camera } from "@phosphor-icons/react";

interface ImageUploaderProps {
  onAnalyze: (base64: string) => Promise<void>;
}

export const ImageUploader = ({ onAnalyze }: ImageUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!preview) return;
    setIsLoading(true);
    // Remove data:image/jpeg;base64, prefix for API if needed, 
    // but FatSecret usually handles clean base64. 
    // Usually need to strip the prefix.
    const base64Clean = preview.split(",")[1];
    
    try {
      await onAnalyze(base64Clean);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack gap={4} w="full" p={4} borderWidth="1px" borderRadius="md" borderStyle="dashed">
      <Box textAlign="center">
        <Camera size={32} />
        <Text mt={2}>Foto eines Gerichts hochladen</Text>
      </Box>
      
      <Input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        p={1} 
      />

      {preview && (
        <Box w="full" maxH="300px" overflow="hidden" borderRadius="md">
          <Image src={preview} alt="Preview" objectFit="cover" w="full" h="full" />
        </Box>
      )}

      <Button 
        onClick={handleUpload} 
        disabled={!preview || isLoading} 
        loading={isLoading}
        colorPalette="blue"
        w="full"
      >
        Analysieren (Add-On)
      </Button>
    </VStack>
  );
};
