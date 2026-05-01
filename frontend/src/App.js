import "@/App.css";
import SmoothScroll from "@/components/wedding/SmoothScroll";
import Nav from "@/components/wedding/Nav";
import Hero from "@/components/wedding/Hero";
import OurStory from "@/components/wedding/OurStory";
import OurJourney from "@/components/wedding/OurJourney";
import EventDetails from "@/components/wedding/EventDetails";
import Schedule from "@/components/wedding/Schedule";
import GalleryCurated from "@/components/wedding/GalleryCurated";
import GalleryRaw from "@/components/wedding/GalleryRaw";
import Registry from "@/components/wedding/Registry";
import LocationMap from "@/components/wedding/LocationMap";
import Footer from "@/components/wedding/Footer";

function App() {
  return (
    <SmoothScroll>
      <div className="App grain" data-testid="app-root">
        <Nav />
        <main>
          <Hero />
          <OurStory />
          <OurJourney />
          <EventDetails />
          <Schedule />
          <GalleryCurated />
          <GalleryRaw />
          <Registry />
          <LocationMap />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}

export default App;
