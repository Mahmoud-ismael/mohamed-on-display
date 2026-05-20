import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Hisako — Founder & Builder" },
      { name: "description", content: "Mohamed Ismail — 21-year-old founder building software and systems from Nairobi under Hisako Technologies." },
      { property: "og:title", content: "Hisako — Founder & Builder" },
      { property: "og:description", content: "Mohamed Ismail — founder building software and systems from Nairobi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap",
      },
    ],
  }),
});

type Venture = {
  name: string;
  type: string;
  desc: string;
  accent: "amber" | "teal" | "silver";
  href?: string;
};

const ventures: Venture[] = [
  {
    name: "VendoFlow",
    type: "B2B SaaS",
    desc: "POS and inventory management built for Kenyan fashion boutiques.",
    accent: "amber",
    href: "https://vendoflow.com",
  },
  {
    name: "Passr",
    type: "Compliance SaaS",
    desc: "Digital Product Passport platform helping outdoor and activewear brands meet EU regulations.",
    accent: "teal",
    href: "https://passr.eu",
  },
  {
    name: "Hisako Studio",
    type: "Creative Production",
    desc: "A full-service creative production studio based in Nairobi — brand, photography, and content.",
    accent: "silver",
  },
];

const accentMap: Record<Venture["accent"], { bar: string; chip: string; text: string }> = {
  amber: { bar: "bg-amber", chip: "bg-amber/15 text-amber", text: "text-amber" },
  teal: { bar: "bg-teal", chip: "bg-teal/15 text-teal", text: "text-teal" },
  silver: { bar: "bg-silver", chip: "bg-silver/15 text-silver", text: "text-silver" },
};

const contacts = [
  { label: "Email", href: "mailto:ismail@hisako.eu", value: "ismail@hisako.eu", copy: "ismail@hisako.eu" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mohamedhisako", value: "in/mohamedhisako" },
  { label: "WhatsApp", href: "https://wa.me/254746110785", value: "+254 746 110 785" },
  { label: "Website", href: "https://ismail.hisako.eu", value: "ismail.hisako.eu", copy: "ismail.hisako.eu" },
];

async function copyText(text: string, label: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(`${label} copied`, { description: text });
  } catch {
    toast.error("Couldn't copy to clipboard");
  }
}

function Index() {
  return (
    <main className="min-h-screen w-full flex justify-center bg-background">
      <article className="w-full max-w-[430px] px-6 pt-10 pb-8 flex flex-col gap-8">
        {/* Header */}
        <header className="rise" style={{ animationDelay: "0ms" }}>
          <div className="flex items-center gap-2 text-xs tracking-[0.2em] text-muted-foreground uppercase">
            <span className="inline-block w-2 h-2 rounded-full bg-amber animate-pulse" />
            Available · Nairobi, KE
          </div>
          <h1 className="font-display text-[68px] leading-[0.92] mt-4 tracking-wide">
            Mohamed<br />
            <span className="text-amber">Ismail.</span>
          </h1>
          <p className="mt-3 text-base text-foreground/90">
            Founder & Builder <span className="text-muted-foreground">— Hisako Technologies</span>
          </p>
        </header>

        {/* Bio */}
        <section className="rise" style={{ animationDelay: "120ms" }}>
          <p className="text-[15px] leading-relaxed text-foreground/85">
            21-year-old founder building software and systems from Nairobi. I create tools that solve real problems — for African businesses and global markets. Currently shipping multiple products under Hisako Technologies.
          </p>
        </section>

        {/* Ventures */}
        <section className="rise flex flex-col gap-3" style={{ animationDelay: "240ms" }}>
          <h2 className="font-display text-2xl tracking-widest text-muted-foreground">VENTURES</h2>
          <div className="flex flex-col gap-3">
            {ventures.map((v) => {
              const a = accentMap[v.accent];
              const Tag = v.href ? "a" : "div";
              return (
                <Tag
                  key={v.name}
                  {...(v.href ? { href: v.href, target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`group relative flex overflow-hidden rounded-xl bg-card border border-border transition-all duration-300 hover:border-foreground/20 hover:-translate-y-0.5 ${v.href ? "cursor-pointer" : ""}`}
                >
                  <span className={`w-1.5 shrink-0 ${a.bar}`} />
                  <div className="flex-1 p-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-display text-2xl tracking-wider">{v.name}</h3>
                      {v.href && (
                        <span className={`text-xl ${a.text} transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1`}>↗</span>
                      )}
                    </div>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-medium tracking-wider uppercase ${a.chip}`}>
                      {v.type}
                    </span>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                  </div>
                </Tag>
              );
            })}
          </div>
        </section>

        {/* Contact */}
        <section className="rise flex flex-col gap-3" style={{ animationDelay: "360ms" }}>
          <h2 className="font-display text-2xl tracking-widest text-muted-foreground">CONNECT</h2>
          <div className="grid grid-cols-2 gap-2.5">
            {contacts.map((c) => {
              const baseClass = "group flex flex-col rounded-xl bg-card border border-border px-3.5 py-3 transition-all duration-200 hover:bg-amber hover:border-amber hover:text-background active:scale-[0.97] text-left";
              const inner = (
                <>
                  <span className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-muted-foreground group-hover:text-background/70">
                    {c.label}
                    {c.copy && <span className="normal-case tracking-normal text-[10px] opacity-60 group-hover:opacity-100">copy</span>}
                  </span>
                  <span className="text-sm font-medium mt-0.5 truncate">{c.value}</span>
                </>
              );
              if (c.copy) {
                return (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => copyText(c.copy!, c.label)}
                    className={baseClass}
                  >
                    {inner}
                  </button>
                );
              }
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={baseClass}
                >
                  {inner}
                </a>
              );
            })}
          </div>
        </section>


        {/* Footer */}
        <footer className="rise mt-auto pt-6 text-center text-xs text-muted-foreground" style={{ animationDelay: "480ms" }}>
          © Hisako Technologies · Nairobi
        </footer>
      </article>
    </main>
  );
}
