import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { getProfileKey } from "@/lib/profile.functions";
import {
  profiles,
  ventures,
  workUrl,
  type Profile,
  type ProfileKey,
  type Venture,
} from "@/lib/profiles";

export const Route = createFileRoute("/")({
  loader: async () => ({ profileKey: await getProfileKey() }),
  component: Index,
  head: ({ match }) => {
    const p = profiles[(match.loaderData?.profileKey ?? "maxamad") as ProfileKey];
    return {
      meta: [
        { title: p.metaTitle },
        { name: "description", content: p.metaDescription },
        { property: "og:title", content: p.metaTitle },
        { property: "og:description", content: p.metaDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: p.websiteUrl },
      ],
      links: [
        { rel: "canonical", href: p.websiteUrl },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap",
        },
      ],
    };
  },
});

const accentMap: Record<Venture["accent"], { bar: string; chip: string; text: string }> = {
  amber: { bar: "bg-amber", chip: "bg-amber/15 text-amber", text: "text-amber" },
  teal: { bar: "bg-teal", chip: "bg-teal/15 text-teal", text: "text-teal" },
  silver: { bar: "bg-silver", chip: "bg-silver/15 text-silver", text: "text-silver" },
};

async function copyText(text: string, label: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(`${label} copied`, { description: text });
  } catch {
    toast.error("Couldn't copy to clipboard");
  }
}

function downloadVCard(p: Profile) {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${p.last};${p.first};;;`,
    `FN:${p.fullName}`,
    "ORG:Hisako Technologies",
    `TITLE:${p.role}`,
    `EMAIL;TYPE=INTERNET,PREF:${p.email}`,
    `TEL;TYPE=CELL:+${p.whatsappNumber}`,
    `URL:${p.websiteUrl}`,
    `URL;TYPE=LinkedIn:${p.linkedinUrl}`,
    "ADR;TYPE=WORK:;;;Nairobi;;;Kenya",
    "END:VCARD",
  ].join("\r\n");
  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = p.vcfFileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast.success("Contact saved", { description: `${p.vcfFileName} downloaded` });
}

function Index() {
  const { profileKey } = Route.useLoaderData();
  const me = profiles[profileKey as ProfileKey];

  const contacts = [
    { label: "Email", href: `mailto:${me.email}`, value: me.email, copy: me.email },
    { label: "LinkedIn", href: me.linkedinUrl, value: me.linkedinLabel },
    { label: "WhatsApp", href: `https://wa.me/${me.whatsappNumber}`, value: me.whatsappDisplay },
    { label: "Website", href: me.websiteUrl, value: me.websiteDomain, copy: me.websiteDomain },
  ];

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
            {me.first}<br />
            <span className="text-amber">{me.last}.</span>
          </h1>
          <p className="mt-3 text-base text-foreground/90">
            {me.role} <span className="text-muted-foreground">— Hisako Technologies</span>
          </p>
        </header>

        {/* Bio */}
        <section className="rise" style={{ animationDelay: "120ms" }}>
          <p className="text-[15px] leading-relaxed text-foreground/85">
            {me.bio}
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

            {/* More of our work */}
            <a
              href={workUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-xl border border-dashed border-border px-4 py-3.5 transition-all duration-300 hover:border-amber hover:-translate-y-0.5"
            >
              <span className="flex flex-col text-left">
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground group-hover:text-amber/70">hisako.eu/work</span>
                <span className="font-display text-xl tracking-wider group-hover:text-amber">More of our work</span>
              </span>
              <span className="text-xl text-muted-foreground transition-all duration-300 group-hover:text-amber group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </a>
          </div>
        </section>

        {/* Contact */}
        <section className="rise flex flex-col gap-3" style={{ animationDelay: "360ms" }}>
          <h2 className="font-display text-2xl tracking-widest text-muted-foreground">CONNECT</h2>
          <button
            type="button"
            onClick={() => downloadVCard(me)}
            className="group flex items-center justify-between rounded-xl bg-amber text-background px-4 py-3.5 transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
          >
            <span className="flex flex-col text-left">
              <span className="text-[10px] uppercase tracking-[0.18em] opacity-70">vCard · .vcf</span>
              <span className="font-display text-xl tracking-wider">Save my contact</span>
            </span>
            <span className="text-2xl transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
          </button>
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
