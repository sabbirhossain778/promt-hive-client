import HeroSection from "@/components/HeroSection";
import FeaturedPrompts from "@/components/home/FeaturedPrompts";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import EngineCompatibility from "@/components/home/EngineCompatibility";
import PromptEssentials from "@/components/home/PromptEssentials";
import TopCreators from "@/components/home/TopCreators";
import CustomerReviews from "@/components/home/CustomerReviews";
import { getAllPrompts, getFeaturedPrompts } from "@/lib/api/prompts"; // 


export default async function Home() {

const featuredPrompts = await getFeaturedPrompts();

  return (
    <div className="bg-[#050B14] font-sans min-h-screen text-zinc-200">
      
      {/* 1. HeroSection */}
      <HeroSection />

      {/* 2. Featured Prompts Section */}
      <FeaturedPrompts prompts={featuredPrompts} />

      {/* 3. Why Choose Us Section */}
      <WhyChooseUs />

      {/* 4. Extra Section 1: Engine Compatibility */}
      <EngineCompatibility />

      {/* 5. Extra Section 2: Prompt Engineering Essentials */}
      <PromptEssentials />

      {/* 6. Top Creators Section */}
      <TopCreators />

      {/* 7. Customer Reviews Section */}
      <CustomerReviews />

    </div>
  );
}