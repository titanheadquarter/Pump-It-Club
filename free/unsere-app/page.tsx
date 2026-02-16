import { generateMetadata } from "@/utils/metadata";
import { AppHeroSection } from "@/sections/handyapp/app-hero-section";
import { AppFeaturesSection } from "@/sections/handyapp/app-features-section";
import { AppFeaturesVisualSection } from "@/sections/handyapp/app-features-visual-section";
import { AppFaqSection } from "@/sections/handyapp/app-faq-section";
import { AppDownloadSection } from "@/sections/handyapp/app-download-section";
import { MeetTheFounderAppSection } from "@/sections/handyapp/meetthefounderapp";

export const metadata = generateMetadata({
  title: "Pump It Club App",
  description: "Alles was du für deinen Traumkörper benötigst, übersichtlich in einer App!",
});

export default async function UnsereApp() {
  return (
    <>
      <AppHeroSection />
      <AppFeaturesSection />
      <AppFeaturesVisualSection />
      <MeetTheFounderAppSection />
      <AppFaqSection />

      <AppDownloadSection />
    </>
  );
}
