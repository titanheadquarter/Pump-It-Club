"use client";

import { useState } from "react";
import { Box, Button, VStack, Text, Input } from "@chakra-ui/react";
import { Barcode } from "@phosphor-icons/react";

interface BarcodeScannerProps {
  onScan: (barcode: string) => Promise<void>;
}

export const BarcodeScanner = ({ onScan }: BarcodeScannerProps) => {
  const [barcodeInput, setBarcodeInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleScan = async () => {
    if (!barcodeInput) return;
    setIsLoading(true);
    try {
      await onScan(barcodeInput);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack gap={4} w="full" p={6} borderWidth="1px" borderRadius="md" bg="white">
      <Box textAlign="center">
        <Barcode size={32} />
        <Text mt={2}>Barcode eingeben oder scannen</Text>
      </Box>

      <Input
        placeholder="EAN / Barcode eingeben..."
        value={barcodeInput}
        onChange={(e) => setBarcodeInput(e.target.value)}
      />

      <Button
        onClick={handleScan}
        disabled={!barcodeInput || isLoading}
        loading={isLoading}
        colorPalette="purple"
        w="full"
      >
        Suchen (Add-On)
      </Button>
    </VStack>
  );
};
