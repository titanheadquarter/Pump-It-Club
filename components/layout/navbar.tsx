"use client";

import {
  Center,
  CollapsibleContent,
  CollapsibleRoot,
  Container,
  HStack,
  VStack,
  StackProps,
  Box,
} from "@chakra-ui/react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { CollapsibleTrigger } from "@/components/ui/collapsible-trigger";
import { UserMenu } from "../ui/user-menu";
import { Link } from "@/components/ui/link";
import { SignedIn, SignedOut } from "../auth/protect-content";
import { Login, SignUp } from "../auth/embed";
import {
  MenuContent,
  MenuItem,
  MenuItemGroup,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from "../ui/menu";

export const MenuLink = (props) => {
  return (
    <Link href={props.href} w="full">
      <Button
        colorPalette="gray"
        variant={{ base: "ghost", md: "plain" }}
        width={{ base: "full", md: "auto" }}
        justifyContent={{ base: "flex-start", md: "center" }}
      >
        {props.children}
      </Button>
    </Link>
  );
};

// TODO: Improve nav links
export const NavbarLinkMenu = (props: StackProps) => {
  return (
    <>
      <MenuLink href="/docs">Docs</MenuLink>
      <MenuRoot>
        <MenuTrigger asChild>
          <Button
            colorPalette="gray"
            width={{ base: "full", md: "auto" }}
            variant={{ base: "ghost", md: "plain" }}
            justifyContent={{ base: "flex-start", md: "center" }}
          >
            Demo
          </Button>
        </MenuTrigger>
        <MenuContent>
          <MenuItemGroup title="Seiten">
            <Link href="/pricing">
              <MenuItem value="pricing">Preise</MenuItem>
            </Link>
            <Link href="/contact">
              <MenuItem value="contact">Kontakt</MenuItem>
            </Link>
            <Link href="/support">
              <MenuItem value="support">Support</MenuItem>
            </Link>
          </MenuItemGroup>
          <MenuSeparator />
          <MenuItemGroup title="Utility">
            <Link href="/thank-you">
              <MenuItem value="thank-you">Vielen Dank</MenuItem>
            </Link>
            <Link href="/not-found">
              <MenuItem value="not-found">Nicht gefunden</MenuItem>
            </Link>
            <Link href="/javascript">
              <MenuItem value="javascript">JavaScript</MenuItem>
            </Link>
            <Link href="/legal/terms-and-conditions">
              <MenuItem value="terms-and-conditions">
                AGB
              </MenuItem>
            </Link>
          </MenuItemGroup>
          <MenuSeparator />
          <MenuItemGroup title="Authentifizierung">
            <Link href="/app/free">
              <MenuItem value="free">Geschützte Seite (Free Plan)</MenuItem>
            </Link>
            <Link href="/app/basic">
              <MenuItem value="basic">Geschützte Seite (Basis Plan)</MenuItem>
            </Link>
            <Link href="/app/pro">
              <MenuItem value="pro">Geschützte Seite (Pro Plan)</MenuItem>
            </Link>
          </MenuItemGroup>
          <MenuSeparator />
          <MenuItemGroup title="Embeds">
            <Link href="/embed/login">
              <MenuItem value="login">Login</MenuItem>
            </Link>
            <Link href="/embed/sign-up">
              <MenuItem value="login">Sign up</MenuItem>
            </Link>
            <Link href="/embed/lead-capture">
              <MenuItem value="lead-capture">Lead Capture</MenuItem>
            </Link>
            <Link href="/embed/email-list">
              <MenuItem value="email-list">Email List</MenuItem>
            </Link>
          </MenuItemGroup>
        </MenuContent>
      </MenuRoot>
    </>
  );
};

export const NavbarActionMenu = ({ type }: { type: "website" | "app" }) => {
  return (
    <>
      <SignedOut>
        <Login popup>
          <Button size="sm" variant="outline" colorPalette="gray">
            Login
          </Button>
        </Login>
        <SignUp popup>
          <Button size="sm">Registrieren</Button>
        </SignUp>
      </SignedOut>
      <SignedIn>
        {type == "app" ? (
          <UserMenu />
        ) : (
          <>
            <Button size="sm">Zur Plattform</Button>
          </>
        )}
      </SignedIn>
    </>
  );
};

export const Navbar = ({ type }: { type: "website" | "app" }) => {
  console.log(type);
  return (
    <Center
      as="header"
      position="fixed"
      zIndex="docked"
      top={{ base: "4", md: "6" }}
      left="0"
      right="0"
      w="100vw"
      maxW="100vw"
      px={{ base: "4", md: "6" }}
      overflowX="hidden"
    >
      <Container maxW={{ base: "full", md: "3xl" }} w="full" px="0" mx="auto">
        <Box
          w="full"
          px="4"
          py="3"
          boxShadow="0 2px 12px -2px rgba(0, 0, 0, 0.08), 0 4px 24px -4px rgba(0, 0, 0, 0.06), 0 0 0 0.5px rgba(255, 255, 255, 0.05) inset"
          background="bg.panel/70"
          backdropFilter="blur(20px) saturate(200%)"
          border="1px solid"
          borderColor="border.emphasized/50"
          borderRadius="l3"
          overflow="hidden"
        >
          <CollapsibleRoot>
            <HStack gap={{ base: "3", md: "8" }} justify="space-between" w="full" overflowX="hidden" minW="0">
              <Box flexShrink={0}>
                <CollapsibleTrigger />
              </Box>
              <Box flexShrink={0}>
                <Link href="/">
                  <Logo />
                </Link>
              </Box>
              <HStack justify="flex-end" w="full" hideFrom="md" flexShrink={0} gap="2" minW="0">
                <NavbarActionMenu type="app" />
              </HStack>
              <HStack gap="2" hideBelow="md" flexShrink={0} minW="0">
                <NavbarLinkMenu />
                <NavbarActionMenu type="app" />
              </HStack>
            </HStack>
            <CollapsibleContent hideFrom="md" mt={4}>
              <NavbarLinkMenu />
            </CollapsibleContent>
          </CollapsibleRoot>
        </Box>
      </Container>
    </Center>
  );
};
