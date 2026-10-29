import Bannar from "@/components/Bannar";
import WhyChooseUs from "@/components/WhyChooseUs";
import TravelerTestimonials from "@/components/TravelerTestimonials";
import JourneyCTA from "@/components/JourneyCTA";
import Featured from "@/components/Featured";


export default function HomePage() {
  return (
    <main className="w-full">

      {/* Hero Section */}
      <div className="relative">
        
        <Bannar />
      </div>
        <Featured/>
      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Traveler Testimonials */}
      <TravelerTestimonials />

      {/* Journey CTA */}
      <JourneyCTA />

      {/* Footer */}
      

    </main>
  );
}
