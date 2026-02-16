"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  Spinner,
  List,
  ListItem,
} from "@chakra-ui/react";
import { MagnifyingGlass } from "@phosphor-icons/react";

// Simple debounce hook if not exists
function useDebounceValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

interface FoodSearchFormProps {
  onSearch: (query: string) => void;
  isPremier?: boolean;
}

export const FoodSearchForm = ({ onSearch, isPremier = false }: FoodSearchFormProps) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  
  const debouncedQuery = useDebounceValue(query, 500);

  useEffect(() => {
    if (isPremier && debouncedQuery.length > 2) {
      fetchSuggestions(debouncedQuery);
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery, isPremier]);

  const fetchSuggestions = async (q: string) => {
    setIsLoadingSuggestions(true);
    try {
      const res = await fetch(`/app/free/fatsecret/api/foods/autocomplete?query=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json();
        // Adjust based on actual response structure from FatSecret
        const suggs = data.suggestions?.suggestion || [];
        setSuggestions(Array.isArray(suggs) ? suggs : [suggs]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setSuggestions([]);
  };

  return (
    <Box w="full" position="relative">
      <form onSubmit={handleSubmit}>
        <VStack gap={4}>
          <Box display="flex" w="full" gap={2}>
            <Input
              placeholder="Lebensmittel suchen (z.B. Apfel)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              bg="white"
            />
            <Button type="submit" colorPalette="green" loading={false}>
              <MagnifyingGlass size={20} />
            </Button>
          </Box>
        </VStack>
      </form>

      {isPremier && suggestions.length > 0 && (
        <List.Root
          position="absolute"
          top="100%"
          left={0}
          right={0}
          bg="white"
          zIndex={10}
          boxShadow="md"
          borderRadius="md"
          mt={1}
          maxH="200px"
          overflowY="auto"
        >
          {suggestions.map((s, i) => (
            <List.Item
              key={i}
              p={2}
              _hover={{ bg: "gray.100", cursor: "pointer" }}
              onClick={() => {
                setQuery(s);
                onSearch(s);
                setSuggestions([]);
              }}
            >
              {s}
            </List.Item>
          ))}
        </List.Root>
      )}
    </Box>
  );
};
