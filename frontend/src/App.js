import "@/App.css";
import SmoothScroll from "@/components/wedding/SmoothScroll";
import Nav from "@/components/wedding/Nav";
import Hero from "@/components/wedding/Hero";
import OurStory from "@/components/wedding/OurStory";
import OurJourney from "@/components/wedding/OurJourney";
import EventDetails from "@/components/wedding/EventDetails";
import Schedule from "@/components/wedding/Schedule";
// import GalleryCurated from "@/components/wedding/GalleryCurated";
import GalleryRaw from "@/components/wedding/GalleryRaw";
import Registry from "@/components/wedding/Registry";
import LocationMap from "@/components/wedding/LocationMap";
import Footer from "@/components/wedding/Footer";
import WeddingCountdown from "@/components/wedding/WeddingCountdown";
import InvitationSeal from "@/components/wedding/InvitationSeal";
import {
  WeddingAudioProvider,
  useWeddingAudio,
} from "@/components/wedding/WeddingAudioContext";

import songFile from "@/assets/audio/perfect.mp3";
import HerWords from "./components/wedding/HerWords";

function WeddingSite() {
  const { play } = useWeddingAudio();

  return (
    <InvitationSeal
      onOpen={() => {
        setTimeout(() => {
          play();
        }, 500);
      }}
    >
      <SmoothScroll>
        <div className="App grain" data-testid="app-root">
          <Nav />

          <main>
            <Hero />
            <WeddingCountdown />
            <OurStory />
            <OurJourney />
            <EventDetails />
            <Schedule />
            {/* <GalleryCurated /> */}
            <GalleryRaw />
            <HerWords />
            <Registry />
            <LocationMap />
          </main>

          <Footer />
        </div>
      </SmoothScroll>
    </InvitationSeal>
  );
}

export default function App() {
  return (
    <WeddingAudioProvider src={songFile} loop>
      <WeddingSite />
    </WeddingAudioProvider>
  );
}