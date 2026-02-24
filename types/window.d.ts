interface OutsetaChat {
  show: () => void;
  hide: () => void;
}

interface OutsetaAuth {
  open: (options: {
    planUid?: string;
    state?: string;
    registrationDefaults?: {
      Person?: Record<string, string>;
      Account?: Record<string, string>;
    };
    widgetMode?: string;
    authenticationCallbackUrl?: string;
  }) => void;
}

interface Outseta {
  chat: OutsetaChat;
  auth: OutsetaAuth;
  getAccessToken?: () => string | null;
  setAccessToken?: (token: string) => void;
  getUser?: () => Promise<unknown>;
  on?: (event: string, handler: () => void) => void;
}

declare global {
  interface Window {
    Outseta?: Outseta;
  }
}

export {};
