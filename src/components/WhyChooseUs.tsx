
import { ShieldCheck, Map, Headset } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: Map,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-[#EDFBFE] py-20 md:py-[90px]">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-[53px]">

        {/* Section Heading */}
        <div className="mb-8 text-center md:mb-[31px]">
          <h2 className="text-[32px] leading-tight font-normal tracking-[-0.05em] text-[#111111] sm:text-[38px] md:text-[42px]">
            Why Choose Wanderlust
          </h2>

          <p className="mt-1 text-[12px] font-normal text-[#777777] sm:text-[13px]">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-[17px] sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <Card
                key={index}
                className="min-h-[180px] rounded-none border-0 bg-white py-0 shadow-none"
              >
                <CardContent className="flex h-full flex-col items-start px-[29px] py-[31px]">

                  {/* Icon */}
                  <Icon
                    className="mb-[17px] h-[31px] w-[31px] text-[#0F9FC1]"
                    strokeWidth={2.3}
                  />

                  {/* Title */}
                  <h3 className="mb-[8px] text-[21px] leading-tight font-normal tracking-[-0.04em] text-[#111111]">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="max-w-[270px] text-[11.5px] leading-[18px] font-normal text-[#777777]">
                    {feature.description}
                  </p>

                </CardContent>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}
