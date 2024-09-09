import Image from "next/image";
import Hero from "./Components/Hero";
import Slider from "./Components/Slider";
import Footer from "./Components/Footer/Footer";
import BestSeller from "./Components/Sections/BestSeller/BestSeller";
import AboutSection from "./Components/Sections/AboutSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Slider />
      <BestSeller />
      <AboutSection />
    </>
  );
}
