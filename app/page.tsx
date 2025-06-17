"use client"
import LandingPage from "@/components/home/landing-page";
import Navigation from "@/components/home/navigation/navigation";
import AboutPage from "@/components/home/about-component";
import PicAbout from "@/components/home/about-landing-page";
export default function Home() {
  return (<>
    <Navigation/>
    <LandingPage />
    <AboutPage />
    <PicAbout/>
  </>);
}
