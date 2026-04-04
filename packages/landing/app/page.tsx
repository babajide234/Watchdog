import Link from "next/link";

const features = [
  {
    icon: "⚡",
    title: "Zero-dependency SDK",
    description: "Tiny bundle. No runtime bloat. Just drop it in and go.",
  },
  {
    icon: "🐛",
    title: "Automatic Error Capture",
    description: "Catches global errors and unhandled promise rejections out of the box.",
  },
  {
    icon: "📊",
    title: "Live Dashboard",
    description: "View errors grouped by message, with stack traces and user agent details.",
  },
  {
    icon: "🔒",
    title: "Self-Hosted",
    description: "Your data stays on your infrastructure. No third-party telemetry.",
  },
  {
    icon: "🛠️",
    title: "Built to Extend",
    description: "Clean architecture ready for sessions, breadcrumbs, and performance metrics.",
  },
  {
    icon: "🌑",
    title: "Dark Mode First",
    description: "Developer-friendly dashboard with full dark mode support.",
  },
];

const steps = [
  { step: "01", title: "Install the SDK", desc: "Add react-watchdog to your project with a single npm command." },
  { step: "02", title: "Call initMonitor", desc: "Point it at your API server and set a project ID. Takes 2 lines." },
  { step: "03", title: "Watch Errors Appear", desc: "Open the dashboard and see errors stream in as they happen." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#050508]/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-xl">🐕</span>
            <span className="font-semibold tracking-tight">React Watchdog</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm text-white/60">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <a href="#install" className="hover:text-white transition-colors">Install</a>
            <Link href="http://localhost:3002" className="hover:text-white transition-colors">Docs</Link>
          </div>
          <Link
            href="http://localhost:3001"
            className="text-sm bg-white text-black px-4 py-1.5 rounded-full font-medium hover:bg-white/90 transition-colors"
          >
            Open Dashboard →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden py-24 sm:py-36">
        {/* Gradient blob */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[30%] w-[600px] h-[400px] bg-orange-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-red-600/8 rounded-full blur-[100px]" />
        </div>

        <div className="mx-auto max-w-4xl px-6 text-center relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
            Open source · Self-hosted · Free forever
          </div>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-tight">
            Know when your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              React app
            </span>{" "}
            breaks.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            React Watchdog is a lightweight, self-hosted error monitoring tool that captures
            runtime exceptions and surfaces them in a clean developer dashboard.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#install"
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 font-semibold text-white shadow-lg hover:opacity-90 transition-opacity"
            >
              Get Started Free
            </Link>
            <Link
              href="http://localhost:3001"
              className="px-8 py-3 rounded-lg border border-white/15 bg-white/5 font-medium text-white hover:bg-white/10 transition-colors"
            >
              Live Dashboard ↗
            </Link>
          </div>

          {/* Hero code snip */}
          <div className="mt-16 text-left max-w-lg mx-auto">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden shadow-2xl">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5">
                <span className="h-3 w-3 rounded-full bg-red-500/60" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
                <span className="h-3 w-3 rounded-full bg-green-500/60" />
                <span className="ml-3 text-xs text-white/30">main.tsx</span>
              </div>
              <pre className="p-5 text-sm font-mono text-white/80 leading-relaxed">
                <span className="text-orange-400">import</span>{" "}
                {"{ initMonitor }"}{" "}
                <span className="text-orange-400">from</span>{" "}
                <span className="text-green-400">&quot;react-watchdog&quot;</span>
                {"\n\n"}
                <span className="text-purple-400">initMonitor</span>
                {"({"}
                {"\n  "}
                <span className="text-blue-300">endpoint</span>
                {": "}
                <span className="text-green-400">&quot;http://localhost:4000/errors&quot;</span>
                {",\n  "}
                <span className="text-blue-300">projectId</span>
                {": "}
                <span className="text-green-400">&quot;my-app&quot;</span>
                {",\n"})
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">Everything you need. Nothing you don&apos;t.</h2>
            <p className="mt-4 text-white/50 max-w-xl mx-auto">
              A focused set of features built for developers who want observability without complexity.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon, title, description }) => (
              <div
                key={title}
                className="rounded-xl border border-white/8 bg-white/[0.03] p-6 hover:bg-white/5 transition-colors"
              >
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 border-t border-white/5">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">Up and running in minutes</h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-8">
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="flex-1 text-center">
                <div className="inline-block rounded-2xl border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-2xl font-mono font-bold text-orange-400 mb-4">
                  {step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-sm text-white/50">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation */}
      <section id="install" className="py-24 border-t border-white/5">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">Install in seconds</h2>
            <p className="mt-4 text-white/50">One package. No configuration required to get started.</p>
          </div>
          <div className="space-y-4">
            {[
              { label: "Install the package", code: "npm install react-watchdog" },
              {
                label: "Initialize in your entry point (e.g. main.tsx)",
                code: `import { initMonitor } from "react-watchdog";\n\ninitMonitor({\n  endpoint: "http://localhost:4000/errors",\n  projectId: "my-project",\n});`,
              },
              { label: "Start the API server", code: "cd packages/api && npm run dev" },
            ].map(({ label, code }) => (
              <div key={label} className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
                <div className="px-4 py-2 border-b border-white/5 text-xs text-white/40">{label}</div>
                <pre className="p-5 text-sm font-mono text-white/80 overflow-x-auto">{code}</pre>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="http://localhost:3002"
              className="text-sm text-orange-400 hover:underline"
            >
              View full documentation →
            </Link>
          </div>
        </div>
      </section>

      {/* Open Source */}
      <section className="py-24 border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="text-5xl mb-6">🔓</div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">100% Open Source</h2>
          <p className="text-white/50 text-lg mb-8">
            React Watchdog is open source and free to use forever. No vendor lock-in,
            no surprise billing, no data leaving your servers.
          </p>
          <div className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-mono text-sm">
            <span className="text-white/40">$</span>
            <span>git clone react-watchdog</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-white/40">
            <span>🐕</span>
            <span>React Watchdog</span>
            <span>·</span>
            <span>MIT License</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-white/40">
            <Link href="http://localhost:3001" className="hover:text-white transition-colors">Dashboard</Link>
            <Link href="http://localhost:3002" className="hover:text-white transition-colors">Docs</Link>
            <span>Built with Next.js + Express</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
