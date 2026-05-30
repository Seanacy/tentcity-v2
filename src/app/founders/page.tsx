"use client";

import Navbar from "@/components/Navbar";
import { ArrowRight, MapPin, Code, Heart, Lightbulb } from "lucide-react";

export default function FoundersPage() {
  return (
    <div className="min-h-screen bg-[#000000]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-14">
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#050505] to-[#000000] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#4169E1] mb-4">
            THE PEOPLE BEHIND THE PLATFORM
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Our Founders
          </h1>
          <p className="text-[#888888] max-w-xl mx-auto leading-relaxed">
            TentCity was built by people who believe technology should serve
            those who need it most. Meet the team working to connect
            Minneapolis&apos;s most vulnerable residents with critical resources.
          </p>
        </div>
      </section>

      {/* Founder Card */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="bg-[#111111] rounded-xl border border-[#1a1a2e] overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 p-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-28 h-28 rounded-full bg-[#4169E1] flex items-center justify-center">
                <span className="text-3xl font-bold text-[#000000] select-none">
                  JP
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-2xl font-bold text-white mb-1">
                Jermaine Patterson
              </h2>
              <p className="text-[#4169E1] font-medium mb-4">
                Founder &amp; Developer
              </p>
              <p className="text-[#888888] leading-relaxed mb-4">
                Jermaine founded TentCity out of a deep commitment to the
                Minneapolis community and a belief that the right technology
                can make life-saving resources easier to find. Drawing on
                his experience in software development and civic engagement,
                he set out to build a platform that puts real-time shelter,
                food, and social-service information directly into the hands
                of those who need it.
              </p>
              <p className="text-[#888888] leading-relaxed">
                As both the product visionary and the lead engineer, Jermaine
                oversees every layer of TentCity — from the AI-powered
                resource discovery pipeline to the map interface used by
                outreach workers and individuals across the Twin Cities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Our Vision
          </h2>
          <p className="text-[#888888] max-w-xl mx-auto leading-relaxed">
            TentCity started in Minneapolis, but the mission doesn&apos;t
            stop here. We&apos;re building toward a future where no one
            has to wonder where their next meal or safe bed is coming from.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              icon: MapPin,
              title: "Expand Nationally",
              desc: "Scale verified resource mapping from Minneapolis to cities across the country, starting with the Upper Midwest.",
            },
            {
              icon: Code,
              title: "Open & Transparent",
              desc: "Build in public with open data models so other communities can adapt and deploy their own resource networks.",
            },
            {
              icon: Heart,
              title: "Dignity First",
              desc: "Design every feature around the real needs of people experiencing homelessness — no tracking, no profiling, just connection to care.",
            },
            {
              icon: Lightbulb,
              title: "AI-Powered Discovery",
              desc: "Use intelligent automation to surface community events, social services, and time-sensitive resources before people have to search for them.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-[#111111] rounded-xl p-6 border border-[#1a1a2e]"
            >
              <item.icon className="w-6 h-6 text-[#4169E1] mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[#888888] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white italic mb-6">
          Every person deserves to know where help is
        </h2>
        <p className="text-[#888888] max-w-lg mx-auto mb-8 leading-relaxed">
          Explore the TentCity map to find shelters, food programs, and
          social services near you — or help us grow by spreading the word.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#000000] font-semibold rounded-lg hover:bg-gray-200 transition-colors"
        >
          Back to the map
          <ArrowRight className="w-4 h-4" />
        </a>
      </section>
    </div>
  );
}
