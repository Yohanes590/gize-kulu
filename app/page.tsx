"use client"
import LandingPage from "@/components/home/landing-page";
import Navigation from "@/components/home/navigation/navigation";
import AboutPage from "@/components/home/about-component";
export default function Home() {
  return (<>
    <Navigation/>
    <LandingPage />
    <AboutPage/>
  </>);
}
