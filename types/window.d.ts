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
}

declare global {
  interface Window {
    Outseta?: Outseta;
  }
}

export {};
