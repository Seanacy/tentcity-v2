"use client";

import Navbar from "@/components/Navbar";
import {
  ArrowRight,
  MapPin,
  Search,
  Filter,
  Navigation,
  Heart,
  ShieldCheck,
  Eye,
  Users,
  Mail,
} from "lucide-react";

const resourceTypes = [
  { label: "Shelters", desc: "Emergency and transitional housing options" },
  { label: "Food", desc: "Meals, food shelves, and community kitchens" },
  { label: "Medical", desc: "Clinics, mental health, and urgent care" },
  { label: "Hygiene", desc: "Showers, laundry, and personal care" },
  { label: "Clothing", desc: "Seasonal clothing and supply distribution" },
  { label: "Employment", desc: "Job training, placement, and workforce programs" },
];

const howItWorks = [
  {
    icon: Search,
    title: "Search",
    desc: "Enter an address or browse the map to find resources near any location in Minneapolis.",
  },
  {
    icon: Filter,
    title: "Filter by category",
    desc: "Narrow results by resource type -- shelters, food, medical, hygiene, clothing, or employment.",
  },
  {
    icon: Navigation,
    title: "Get directions",
    desc: "Select a resource and get step-by-step directions from your current location.",
  },
];

const values = [
  {
    icon: Heart,
    title: "Community First",
    desc: "We design with -- not just for -- the people we serve. Lived experience shapes every feature.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Data",
    desc: "Every resource on our map is verified through direct outreach, partner validation, or on-the-ground confirmation.",
  },
  {
    icon: Eye,
    title: "Dignity and Privacy",
    desc: "We never collect more data than we need. No tracking, no profiling -- just connection to care.",
  },
  {
    icon: Users,
    title: "Open Collaboration",
    desc: "Our code, data models, and roadmap are open to those who want to help build something meaningful.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#000000]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-14">
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#050505] to-[#000000] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#4169E1] mb-4">
            CIVIC TECH FOR COMMUNITY CARE
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            About TentCity
          </h1>
          <p className="text-[#888888] max-w-2xl mx-auto leading-relaxed mb-8">
            TentCity is a resource-mapping platform built to connect people
            experiencing homelessness in Minneapolis with the services they
            need -- shelters, food, medical care, and more -- all in one
            place, updated in real time.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#000000] font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Open the map
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="bg-[#111111] rounded-xl p-8 md:p-12 border border-[#1a1a2e]">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-[#000000] text-[#4169E1] rounded-full mb-6">
            OUR MISSION
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Real-time resource mapping for community care in Minneapolis
          </h2>
          <p className="text-[#888888] leading-relaxed max-w-3xl">
            Too many people in crisis spend hours searching for basic
            necessities -- a warm bed, a meal, a shower. TentCity exists to
            close that gap. We aggregate verified resources from shelters,
            nonprofits, outreach organizations, and public agencies into a
            single, searchable map so that anyone with a phone can find help
            within minutes, not hours.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            What we map
          </h2>
          <p className="text-[#888888] max-w-xl mx-auto">
            Six categories of resources, verified and location-aware, covering
            the essentials people need most.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resourceTypes.map((r) => (
            <div
              key={r.label}
              className="bg-[#111111] rounded-xl p-5 border border-[#1a1a2e] flex items-start gap-4"
            >
              <MapPin className="w-5 h-5 text-[#4169E1] mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-base font-semibold text-white mb-1">
                  {r.label}
                </h3>
                <p className="text-sm text-[#888888] leading-relaxed">
                  {r.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            How it works
          </h2>
          <p className="text-[#888888] max-w-xl mx-auto">
            Three steps between you and the nearest resource.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {howItWorks.map((step, i) => (
            <div
              key={step.title}
              className="bg-[#111111] rounded-xl p-6 border border-[#1a1a2e] text-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#000000] border border-[#1a1a2e] flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-5 h-5 text-[#4169E1]" />
              </div>
              <span className="text-xs font-bold text-[#4169E1] tracking-wider mb-2 block">
                STEP {i + 1}
              </span>
              <h3 className="text-lg font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-[#888888] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Community Impact */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Community impact
          </h2>
          <p className="text-[#888888] max-w-xl mx-auto">
            The numbers behind the work -- and the people those numbers
            represent.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-12">
          {[
            { number: "220+", label: "Verified resource locations" },
            { number: "6", label: "Resource categories mapped" },
            { number: "24/7", label: "Access to the map" },
            { number: "46", label: "Volunteers and outreach workers" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-bold text-[#4169E1]">
                {stat.number}
              </p>
              <p className="text-sm text-[#888888] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="bg-[#111111] rounded-xl p-8 border border-[#1a1a2e] text-center max-w-3xl mx-auto">
          <p className="text-[#cccccc] leading-relaxed">
            Minneapolis has one of the highest per-capita rates of unsheltered
            homelessness in the Upper Midwest. TentCity was built here because
            the need is immediate. Every resource we map, every connection we
            make, is one less barrier between a person and the help they are
            looking for.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            What guides our work
          </h2>
          <p className="text-[#888888] max-w-xl mx-auto">
            Every decision we make is rooted in these principles.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-[#111111] rounded-xl p-6 border border-[#1a1a2e]"
            >
              <v.icon className="w-6 h-6 text-[#4169E1] mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">{v.title}</h3>
              <p className="text-sm text-[#888888] leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact / Get Involved */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="bg-[#111111] rounded-xl p-8 md:p-12 border border-[#1a1a2e] text-center">
          <Mail className="w-8 h-8 text-[#4169E1] mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Get involved
          </h2>
          <p className="text-[#888888] max-w-lg mx-auto mb-6 leading-relaxed">
            Whether you are an outreach worker, a nonprofit partner, a
            volunteer, or someone who wants to help -- there is a place for
            you. We are always looking for people who share this mission.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:tentcityapp@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#4169E1] text-[#000000] font-semibold rounded-lg hover:bg-[#3457C9] transition-colors"
            >
              Reach out
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1a2e] text-white font-semibold rounded-lg hover:bg-[#252540] transition-colors"
            >
              Back to the map
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
