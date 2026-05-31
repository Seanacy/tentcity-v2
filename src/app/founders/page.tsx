"use client";

import Navbar from "@/components/Navbar";
import { ArrowDown, Check, Mail } from "lucide-react";

const metrics = [
  { value: "35+", label: "community organizations currently supported across the Upper Midwest" },
  { value: "90", label: "day regional pilot phase for Founding Season Partners" },
  { value: "100%", label: "of partner funds go directly into platform expansion and outreach" },
  { value: "24/7", label: "access to verified resources for community members in need" },
];

const packages = [
  {
    title: "Community Partner",
    price: "$150 / 90 Days",
    features: ["Logo on partner page", "Website link"],
    cta: "Join as Community Partner",
  },
  {
    title: "Featured Partner",
    price: "$300 / 90 Days",
    popular: true,
    features: [
      "Homepage logo rotation",
      "Featured badge",
      "Top suggestions in search queries",
      "Quarterly impact snapshot",
      "Everything in Community Partner",
    ],
    cta: "Become Featured Partner",
  },
  {
    title: "Anchor Partner",
    price: "$500 / 90 Days",
    features: [
      "Priority map results in search queries (see it in action)",
      "Static map results",
      "Top suggestions in search queries",
      "Co-branded outreach",
      "Roadmap input",
      "Launch recognition",
    ],
    cta: "Apply for Anchor Partner",
  },
];

const steps = [
  { num: "01", title: "Choose a tier", desc: "Select the partner package that best fits your organization's goals." },
  { num: "02", title: "Complete onboarding", desc: "We'll help you set up your verified listing and logo placement." },
  { num: "03", title: "Reach community", desc: "Start appearing in searches and coordinating with other local providers." },
];

export default function FoundersPage() {
  return (
    <div className="min-h-screen bg-[#000000]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-14">
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#050505] to-[#000000] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#5f9ea0] mb-4">
            FOUNDING SEASON PARTNERS
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Become a TentCity{" "}
            <em className="text-[#5f9ea0] not-italic font-bold italic">
              Founding Season
            </em>{" "}
            Partner
          </h1>
          <p className="text-[#888888] max-w-2xl mx-auto leading-relaxed mb-10">
            Join our 90-day regional pilot connecting unhoused individuals with
            verified community resources. Limited partner slots available during
            pilot rollout.
          </p>
          <a
            href="#packages"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#000000] font-semibold rounded-full hover:bg-gray-200 transition-colors text-base"
          >
            View Partner Packages
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* What Is TentCity / The Rollout */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1a1a2e] text-xs font-semibold tracking-wider uppercase text-white mb-6">
              <span className="w-2 h-2 rounded-full bg-[#5f9ea0]" />
              WHAT IS TENTCITY?
            </span>
            <p className="text-xl sm:text-2xl font-semibold text-white leading-relaxed">
              TentCity.app is a community access platform helping unhoused
              individuals and local residents find verified resources for
              housing, food, healthcare, employment, and support services.
            </p>
          </div>
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1a1a2e] text-xs font-semibold tracking-wider uppercase text-white mb-6">
              <span className="w-2 h-2 rounded-full bg-[#5f9ea0]" />
              THE ROLLOUT
            </span>
            <p className="text-xl sm:text-2xl font-semibold text-white leading-relaxed">
              Launching in the Upper Midwest with national expansion planned. We
              address the crisis through a user-centric application and
              long-term strategy.
            </p>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="border-y border-[#1a1a2e]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((m) => (
              <div key={m.label} className="border-l border-[#1a1a2e] pl-6 first:border-l-0 first:pl-0">
                <p className="text-4xl md:text-5xl font-bold text-[#5f9ea0] mb-3">
                  {m.value}
                </p>
                <p className="text-sm text-[#888888] leading-relaxed">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Packages */}
      <section id="packages" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Partner Packages
          </h2>
          <p className="text-[#888888] max-w-xl mx-auto">
            Choose a tier that matches your organization&apos;s commitment to
            community care and visibility.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.title}
              className="bg-[#111111] rounded-xl border border-[#1a1a2e] p-8 flex flex-col"
            >
              {pkg.popular && (
                <span className="self-start text-xs font-medium text-[#5f9ea0] border border-[#5f9ea0]/30 rounded px-2 py-0.5 mb-3">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-bold text-white mb-2">{pkg.title}</h3>
              <p className="text-2xl font-bold text-[#5f9ea0] italic mb-6">
                {pkg.price}
              </p>
              <ul className="flex-1 space-y-3 mb-8">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[#cccccc]">
                    <Check className="w-4 h-4 text-[#5f9ea0] mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="mailto:tentcityapp@gmail.com"
                className="block text-center px-6 py-3 bg-[#5f9ea0] text-white font-semibold rounded-lg hover:bg-[#4f8e90] transition-colors"
              >
                {pkg.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-[#888888] max-w-xl mx-auto">
            Three simple steps to start reaching community members and
            coordinating care.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-[#111111] rounded-xl border border-[#1a1a2e] p-6"
            >
              <h3 className="text-lg font-bold text-[#5f9ea0] mb-2">
                {step.num}. {step.title}
              </h3>
              <p className="text-sm text-[#cccccc] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#0a1a1a] to-[#0a1a1a] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Join the Founding Season
          </h2>
          <p className="text-[#888888] max-w-xl mx-auto mb-10 leading-relaxed">
            Support coordinated care while increasing your organization&apos;s
            visibility. Together we can build safety nets that feel human.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#packages"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#5f9ea0] text-white font-semibold rounded-lg hover:bg-[#4f8e90] transition-colors"
            >
              Become a Partner
            </a>
            <a
              href="mailto:tentcityapp@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#1a1a2e] text-white font-semibold rounded-lg hover:bg-[#111111] transition-colors"
            >
              <Mail className="w-4 h-4" />
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
