"use client"
import LandingPage from "@/components/home/landing-page";
import Navigation from "@/components/home/navigation/navigation";
import AboutPage from "@/components/home/about-component";
import PicAbout from "@/components/home/about-landing-page";
import FooterFunction from "@/components/home/footer";
export default function Home() {
  return (<>
    <Navigation/>
    <LandingPage />
    <AboutPage />
    <PicAbout />
    <FooterFunction/>
  </>);
}
