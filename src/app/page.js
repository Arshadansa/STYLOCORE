import Image from "next/image";
import Hero from "./Components/Hero";
import Slider from "./Components/Slider";
import BestSeller from "./Components/Sections/BestSeller/BestSeller";

export default function Home() {
  return (
    <>
      <Hero />
      <Slider />
      <BestSeller />
    </>
  );
}
