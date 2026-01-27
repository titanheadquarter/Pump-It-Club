'use client'
import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Badge,
  useBreakpointValue
} from '@chakra-ui/react'
import { VimeoPlayer } from '@/components/ui/mainpage/vimeo-player'
import { HeroCard } from '@/components/ui/mainpage/hero-card'

export const HeroSection = ({
  videoId,
  heading = "Deine Transformation startet JETZT!",
  subheading = "Schluss mit Ausreden. Zeit für echte Veränderung.",
}: {
  videoId?: string
  heading?: string
  subheading?: string
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedCard, setSelectedCard] = useState<'free' | 'consultation'>('consultation')
  const isMobile = useBreakpointValue({ base: true, md: false })

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 25%, #2d3e2d 50%, #4a6741 70%, #e8f5e8 90%, #ffffff 100%)"
      position="relative"
      overflow="hidden"
      pb="0"
      mb={{ base: "-1px", sm: "-2px", md: "-3px", lg: "-4px" }}
      css={{
        '@keyframes pulseGlow': {
          '0%, 100%': {
            transform: 'scale(1)'
          },
          '50%': {
            transform: 'scale(1.02)'
          }
        },
        '@keyframes scaleX': {
          'to': { transform: 'scaleX(1)' }
        }
      }}
    >
      {/* COMPACT RESPONSIVE BREAKPOINTS:
          base: 0px+     (mobile)
          sm: 480px+     (large mobile)  
          md: 768px+     (tablet)
          lg: 992px+     (desktop)
          xl: 1200px+    (large desktop)
      */}
      <Container
        maxW="6xl"
        py={{ base: 16, sm: 20, md: 24, lg: 28 }}
        pb={{ base: 8, sm: 16, md: 20, lg: 20 }}
        px={{ base: 4, sm: 6, md: 8 }}
        position="relative"
        zIndex={1}
      >
        <VStack gap={{ base: 2, sm: 3, md: 4, lg: 5 }} align="stretch">
          {/* Hero Header - Much Smaller */}
          <VStack
            gap={{ base: 2, md: 3 }}
            textAlign="center"
            opacity={isLoaded ? 1 : 0}
            transform={isLoaded ? 'translateY(0)' : 'translateY(30px)'}
            transition="all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
          >
            <VStack gap={{ base: 1, md: 2 }}>


              {/* Even smaller H1 heading with glow effect */}
              <Heading
                as="h1"
                fontSize={{ base: '1.6rem', sm: '2rem', md: '2.4rem', lg: '3rem', xl: '3.5rem' }}
                fontWeight="900"
                color="white"
                lineHeight="1.1"
                textAlign="center"
                letterSpacing="tighter"
                maxW="4xl"
                position="relative"
                css={{
                  animation: 'pulseGlow 4s ease-in-out infinite'
                }}
              >
                DEINE{' '}
                <Text
                  as="span"
                  color="white"
                  position="relative"
                  display="inline-block"
                  css={{
                    background: 'linear-gradient(135deg,rgb(21, 227, 35) 50%, #16a34a 100%, #15803d 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',


                  }}
                >
                  TRANSFORMATION
                </Text>
                <br />
                STARTET{' '}
                <Text
                  as="span"
                 
                  display="inline-block"
                  color="white"
                >
                  JETZT!
                </Text>
              </Heading>

              {/* Even smaller H2 subheading */}
              <Heading
                as="h2"
                fontSize={{ base: 'xs', sm: 'sm', md: 'md' }}
                color="gray.300"
                fontWeight="medium"
                maxW="2xl"
                lineHeight="tall"
              >
                Schluss mit Ausreden. Schluss mit "morgen fange ich an".
                <Text as="span" fontWeight="bold"> Heute</Text> beginnt dein neues Leben.
              </Heading>
            </VStack>
          </VStack>

          {/* Much Smaller Video Section */}
          <Box
            maxW={{ base: "full", sm: "xl", md: "2xl", lg: "3xl" }}
            mx="auto"
            w="full"
            opacity={isLoaded ? 1 : 0}
            transform={isLoaded ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)'}
            transition="all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s"
          >
            <VimeoPlayer videoId={videoId} />
          </Box>

          {/* Much Smaller Pricing Cards */}
          <Box maxW="4xl" mx="auto" w="full">
            <Heading
              as="h3"
              fontSize={{ base: "md", md: "lg" }}
              color="white"
              fontWeight="bold"
              textAlign="center"
              mb={{ base: 3, md: 4 }}
              opacity={isLoaded ? 1 : 0}
              transform={isLoaded ? 'translateY(0)' : 'translateY(30px)'}
              transition="all 1.1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s"
            >
              Wähle deinen Transformationsweg
            </Heading>

            <SimpleGrid
              columns={{ base: 1, md: 1, lg: 2 }}
              gap={{ base: 2.5, md: 3 }}
              w="full"
              opacity={isLoaded ? 1 : 0}
              transform={isLoaded ? 'translateY(0)' : 'translateY(50px)'}
              transition="all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.6s"
              alignItems="start"
            >
              <Box h={{ base: "auto", lg: "420px" }}>
                <HeroCard
                  title="FREE KURS"
                  description="Deine ersten Schritte zur Transformation - komplett kostenlos"
                  features={[
                    "5 Video-Lektionen mit Grundlagen",
                    "Einsteigerfreundlicher Trainingsplan",
                    "Ernährungstipps für den Start",
                    "Community-Zugang mit 1000+ Mitgliedern",
                    "Sofortiger Zugang nach Anmeldung"
                  ]}
                  buttonText="JETZT KOSTENLOS STARTEN"
                  selected={selectedCard === 'free'}
                  onSelect={() => setSelectedCard('free')}
                  h="full"
                />
              </Box>

              <Box
                h={{ base: "auto", lg: "420px" }}
                position="relative"
                css={{
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '20px',
                    bottom: '20px',
                    left: '-8px',
                    width: '4px',
                    background: 'linear-gradient(180deg, transparent 0%, #22c55e 20%, #16a34a 50%, #15803d 80%, transparent 100%)',
                    borderRadius: '2px',
                    animation: 'pulseGlow 3s ease-in-out infinite',
                    zIndex: 1
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '20px',
                    bottom: '20px',
                    right: '-8px',
                    width: '4px',
                    background: 'linear-gradient(180deg, transparent 0%, #22c55e 20%, #16a34a 50%, #15803d 80%, transparent 100%)',
                    borderRadius: '2px',
                    animation: 'pulseGlow 3s ease-in-out infinite 0.5s',
                    zIndex: 1
                  }
                }}
              >
                <HeroCard
                  title="1:1 BERATUNG"
                  description="Dein persönlicher Transformationsplan in nur 30 Minuten"
                  features={[
                    "Persönliche 30min Video-Beratung",
                    "Individueller Trainingsplan",
                    "Maßgeschneiderter Ernährungsplan",
                    "WhatsApp-Support für 7 Tage",
                    "Erfolgsgarantie oder Geld zurück"
                  ]}
                  buttonText="BERATUNG JETZT BUCHEN"
                  selected={selectedCard === 'consultation'}
                  recommended={false}
                  highlightGreen={true}
                  onSelect={() => setSelectedCard('consultation')}
                  h="full"
                />
              </Box>
            </SimpleGrid>
          </Box>

          {/* Much Smaller Bottom CTA */}
          <VStack
            gap={{ base: 2, md: 3 }}
            textAlign="center"
            opacity={isLoaded ? 1 : 0}
            transform={isLoaded ? 'translateY(0)' : 'translateY(30px)'}
            transition="all 1.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.8s"
          >
           

            

            
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}