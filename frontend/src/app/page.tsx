'use client';

import { motion, useInView } from 'framer-motion';
import { CustomConnectButton } from '@/components/ui/connect-button';
import { useCurrentAccount } from '@mysten/dapp-kit';
import Link from 'next/link';
import { Brain, Shield, Zap, ChevronRight, Activity, Database, Globe, Layers, Lock, Cpu, Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import Lenis from 'lenis';

export default function LandingPage() {
  const account = useCurrentAccount();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative bg-background text-foreground selection:bg-cyan-500/30">
      <Navbar isScrolled={isScrolled} />

      <main>
        <HeroSection account={account} />
        <StatsStrip />
        <FeaturesSection />
        <HowItWorksSection />
        <TiersSection />
        <FinalCTASection account={account} />
      </main>

      <Footer />
    </div>
  );
}

// --- Sub-components ---

function Navbar({ isScrolled }: { isScrolled: boolean }) {
  return (
    <nav className={cn(
      "fixed top-0 inset-x-0 z-[100] transition-all duration-300 px-6 py-4 flex items-center justify-between",
      isScrolled ? "glass-header py-3" : "bg-transparent"
    )}>
      <div className="flex items-center gap-3">
        <img
          src="/logo.png"
          alt="OneMind Logo"
          className="w-7 h-7 object-contain"
        />
        <span className="text-xl font-bold tracking-tighter text-white">ONE<span className="text-cyan-400 font-bold">MIND</span></span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
        <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
        <a href="#workflow" className="hover:text-cyan-400 transition-colors">Workflow</a>
        <a href="#ecosystem" className="hover:text-cyan-400 transition-colors">Ecosystem</a>
        <a href="https://docs.onemind.ai" className="hover:text-cyan-400 transition-colors">Docs</a>
      </div>

      <div className="flex items-center gap-4">
        <CustomConnectButton />
      </div>
    </nav>
  );
}

function HeroSection({ account }: { account: any }) {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 bg-grid-white radial-mask opacity-20" />
      <div className="absolute inset-0 bg-gradient-neural" />

      {/* Animated Orbs */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full"
      />
      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -30, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full"
      />

      <div className="relative z-10 max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-8"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
          <span className="text-[10px] font-mono tracking-[0.2em] text-cyan-400 uppercase">OneChain Testnet Live v1.1.1</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-7xl md:text-9xl font-bold tracking-tighter mb-8 leading-[0.9]"
        >
          ONEMIND <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-white to-purple-500">INTELLIGENCE</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto mb-12 font-light leading-relaxed"
        >
          Deploy fully autonomous AI agents on OneChain.
          Owned by you, driven by LLMs, secured by smart vaults.
          The next evolution of DeFi and On-chain Automation is here.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          {account ? (
            <Link
              href="/dashboard"
              className="group relative px-10 py-5 bg-white text-black font-black text-sm rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
            >
              LAUNCH COMMAND CENTER
              <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform -z-10" />
            </Link>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <CustomConnectButton />
            </div>
          )}
          <button className="px-10 py-5 border border-white/10 rounded-full text-sm font-bold hover:bg-white/5 transition-all">
            READ TECHNICAL WHITEPAPER
          </button>
        </motion.div>
      </div>

      {/* Floating Asset 4 - Neural Hub Background */}
      <motion.div
        initial={{ opacity: 0, x: 150, scale: 0.8 }}
        animate={{ opacity: 0.4, x: 0, scale: 1 }}
        transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
        className="absolute -right-20 top-20 w-[600px] h-[600px] pointer-events-none hidden lg:block select-none grayscale-[0.5] opacity-20 blur-[1px] transition-all"
      >
        <img src="/elrmets/4.png" alt="Infrastructure Hub" className="w-full h-full object-contain" />
      </motion.div>

      {/* Hero Bottom Video Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-24 w-full max-w-6xl glass-card aspect-video border-b-0 rounded-b-none p-4 pb-0 bg-gradient-to-t from-transparent to-white/5 mask-fade-out"
      >
        <div className="w-full h-full rounded-t-xl bg-black/40 border-x border-t border-white/10 overflow-hidden relative">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/lv_0_20260301200602.mp4" type="video/mp4" />
          </video>
          {/* Optional overlay gradient for better blending */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </div>
      </motion.div>
    </section>
  );
}

function StatsStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="w-full border-y border-white/5 bg-white/[0.02] py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        <StatItem label="Total Hybrid Agents" value="1,280+" delay={0} isInView={isInView} />
        <StatItem label="Daily Neural Cycles" value="142k" delay={0.1} isInView={isInView} />
        <StatItem label="Sovereign Assets Managed" value="$2.4M+" delay={0.2} isInView={isInView} />
        <StatItem label="avg. Latency" value="1.2s" color="text-cyan-400" delay={0.3} isInView={isInView} />
      </div>
    </div>
  );
}

function StatItem({ label, value, color = "text-white", delay = 0, isInView }: { label: string, value: string, color?: string, delay?: number, isInView: boolean }) {
  return (
    <motion.div
      className="flex flex-col gap-2"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      <span className={cn("text-3xl md:text-4xl font-black tracking-tighter", color)}>{value}</span>
      <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">{label}</span>
    </motion.div>
  );
}

function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-glow">CORE CAPABILITIES</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Our architecture merges the reasoning power of LLMs with the deterministic security of Move Smart Contracts.</p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Lock className="w-6 h-6 text-cyan-400" />}
            title="Scoped Session Keys"
            description="Grant your AI temporary, rule-bounded permissions to trade on your behalf without ever risking your root security."
            delay={0}
            isInView={isInView}
          />
          <FeatureCard
            icon={<Database className="w-6 h-6 text-purple-400" />}
            title="Persistent Neural Memory"
            description="Agents store their experiences on-chain, allowing them to learn and evolve their strategies over time."
            delay={0.1}
            isInView={isInView}
          />
          <FeatureCard
            icon={<Layers className="w-6 h-6 text-pink-400" />}
            title="Modular Strategy Engine"
            description="Easily plug in multiple LLM providers or custom trading scripts to define how your agent perceives the market."
            delay={0.2}
            isInView={isInView}
          />
          <FeatureCard
            icon={<Globe className="w-6 h-6 text-blue-400" />}
            title="Omni-Chain Awareness"
            description="Real-time indexing of global events allows agents to react to market shifts within milliseconds."
            delay={0.3}
            isInView={isInView}
          />
          <FeatureCard
            icon={<Cpu className="w-6 h-6 text-emerald-400" />}
            title="Autonomous Gas Management"
            description="Agents monitor their own energy and refill their gas tanks through smart treasury management."
            delay={0.4}
            isInView={isInView}
          />
          <FeatureCard
            icon={<Shield className="w-6 h-6 text-amber-400" />}
            title="Sovereign Settlement"
            description="All transactions settled on OneChain's high-throughput ledger with absolute finality."
            delay={0.5}
            isInView={isInView}
          />
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="workflow" className="py-32 px-6 bg-white/[0.01]">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          ref={ref}
          className="text-4xl md:text-6xl font-bold tracking-tighter mb-20 text-center"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          THE NEURAL LOOP
        </motion.h2>

        <div className="space-y-24">
          <StepItem
            step="01"
            title="Spawn Your Agent"
            description="Mint a unique Vanguard Identity. Your Agent comes with its own Sovereign sub-wallet (Vault) pre-configured."
            icon={<Brain className="w-12 h-12" />}
            image="/elrmets/1.png"
          />
          <StepItem
            step="02"
            title="Authorize via Session Keys"
            description="Connect your off-chain AI brain (Gemini Pro) to the Agent's identity using crytographic session keys with custom expiry."
            icon={<Lock className="w-12 h-12 text-purple-400" />}
            image="/elrmets/2.png"
            reversed
          />
          <StepItem
            step="03"
            title="Achieve Autonomy"
            description="The Agent begins scanning the mempool, managing its treasury, and executing trades while you sleep."
            icon={<Activity className="w-12 h-12 text-cyan-400" />}
            image="/elrmets/3.png"
          />
        </div>
      </div>
    </section>
  );
}

function TiersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-6xl font-bold tracking-tighter mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          AGENT CLASSES
        </motion.h2>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TierCard name="Vanguard" type="Entry Level" price="FREE" features={["1 Concurrent Agent", "Standard Analytics", "Gemini 1.5 Flash"]} delay={0} isInView={isInView} />
          <TierCard name="Overseer" type="Professional" price="499 ONE" featured features={["5 Concurrent Agents", "Advanced Memory", "Gemini 1.5 Pro", "Priority Support"]} delay={0.15} isInView={isInView} />
          <TierCard name="Sovereign" type="Enterprise" price="Contact Us" features={["Unlimited Agents", "Custom LLM Integrations", "Sub-Millisecond Execution"]} delay={0.3} isInView={isInView} />
        </div>
      </div>
    </section>
  );
}

function FinalCTASection({ account }: { account: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-40 px-6 overflow-hidden relative">
      <motion.div
        className="absolute inset-0 bg-cyan-500/5 rotate-3 -translate-y-20 blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 1.2 }}
      />
      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center border border-white/10 glass-card p-20 rounded-3xl"
        initial={{ opacity: 0, y: 80, scale: 0.9 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 80, scale: 0.9 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2
          className="text-5xl md:text-7xl font-black tracking-tighter mb-8 italic"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          READY TO GO <br /><span className="text-cyan-400">AUTONOMOUS?</span>
        </motion.h2>
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {account ? (
            <Link href="/dashboard" className="px-12 py-6 bg-cyan-500 text-black font-black text-lg rounded-full shadow-[0_0_30px_rgba(0,242,255,0.4)] hover:bg-white transition-all">
              LAUNCH APP NOW
            </Link>
          ) : (
            <CustomConnectButton />
          )}
          <p className="text-xs text-gray-500 font-mono tracking-widest uppercase">Limited Agent Slots Available for Alpha V1</p>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="pt-20 pb-10 px-6 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="OneMind Logo"
              className="w-6 h-6 object-contain"
            />
            <span className="text-white font-bold tracking-tighter italic">ONEMIND</span>
          </div>
          <p className="text-gray-500 text-xs max-w-[200px] leading-relaxed">
            The sovereign intelligence layer for the decentralized future.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
          <FooterCol title="Platform" links={["Dashboard", "Registry", "Governance", "Staking"]} />
          <FooterCol title="Developers" links={["Documentation", "GitHub", "Audits", "Bounty"]} />
          <FooterCol title="Community" links={["X / Twitter", "Discord", "Medium", "LinkedIn"]} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5 pt-10 text-[10px] text-gray-600 font-mono tracking-widest uppercase">
        <span>© 2026 OneMind Protocols. All Rights Reserved.</span>
        <div className="flex gap-8">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

// --- Utils ---

function FeatureCard({ icon, title, description, delay = 0, isInView }: { icon: any, title: string, description: string, delay?: number, isInView: boolean }) {
  return (
    <motion.div
      className="glass-card p-10 hover:-translate-y-2 transition-all duration-500 group"
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-cyan-500/10 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4 tracking-tight">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">{description}</p>
    </motion.div>
  );
}

function StepItem({ step, title, description, icon, image, reversed = false }: { step: string, title: string, description: string, icon: any, image?: string, reversed?: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className={cn("flex flex-col md:flex-row items-center gap-12 lg:gap-24", reversed && "md:flex-row-reverse")}
    >
      <motion.div
        className="flex-1 flex flex-col gap-4"
        initial={{ opacity: 0, x: reversed ? 50 : -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: reversed ? 50 : -50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="text-6xl font-black text-white/5">{step}</span>
        <h3 className="text-3xl font-bold tracking-tight">{title}</h3>
        <p className="text-gray-400 text-lg leading-relaxed">{description}</p>
      </motion.div>
      <motion.div
        className="w-full md:w-[400px] h-[300px] glass-card flex items-center justify-center relative group overflow-hidden"
        initial={{ opacity: 0, x: reversed ? -50 : 50, scale: 0.9 }}
        animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: reversed ? -50 : 50, scale: 0.9 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity rounded-[inherit] pointer-events-none z-10" />
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-xl"
          />
        ) : (
          icon
        )}
      </motion.div>
    </div>
  );
}

function TierCard({ name, type, price, featured = false, features, delay = 0, isInView }: { name: string, type: string, price: string, featured?: boolean, features: string[], delay?: number, isInView: boolean }) {
  return (
    <motion.div
      className={cn(
        "p-10 rounded-3xl flex flex-col gap-8 transition-all duration-500",
        featured ? "bg-white text-black scale-110 shadow-[0_0_60px_rgba(255,255,255,0.1)] z-10" : "bg-white/5 text-white border border-white/5"
      )}
      initial={{ opacity: 0, y: 60, rotateX: 15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 60, rotateX: 15 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      <div className="text-left">
        <span className={cn("text-[10px] uppercase font-mono tracking-widest", featured ? "text-gray-500" : "text-cyan-400")}>{type}</span>
        <h3 className="text-3xl font-bold mt-2">{name}</h3>
      </div>

      <div className="text-left py-6 border-y border-current/10">
        <span className="text-2xl font-black tracking-tight">{price}</span>
      </div>

      <ul className="flex flex-col gap-4 text-left flex-1">
        {features.map(f => (
          <li key={f} className="flex items-center gap-2 text-sm opacity-80">
            <Zap className="w-4 h-4" /> {f}
          </li>
        ))}
      </ul>

      <button className={cn(
        "w-full py-4 rounded-full font-bold transition-all",
        featured ? "bg-black text-white hover:bg-gray-900" : "bg-white/10 text-white hover:bg-white/20"
      )}>
        CHOOSE {name.toUpperCase()}
      </button>
    </motion.div>
  );
}

function FooterCol({ title, links }: { title: string, links: string[] }) {
  return (
    <div className="flex flex-col gap-6">
      <h4 className="text-[10px] font-mono tracking-[0.3em] uppercase text-gray-400">{title}</h4>
      <ul className="flex flex-col gap-3">
        {links.map(l => (
          <li key={l}><a href="#" className="text-gray-600 hover:text-white transition-colors text-sm">{l}</a></li>
        ))}
      </ul>
    </div>
  );
}
