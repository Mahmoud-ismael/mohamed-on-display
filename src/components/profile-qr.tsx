import { useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { profiles, type Profile } from "@/lib/profiles";

function ProfileQr({ profile }: { profile: Profile }) {
  const qrRef = useRef<SVGSVGElement>(null);
  const [downloading, setDownloading] = useState(false);

  async function download() {
    const svg = qrRef.current;
    if (!svg) return;
    setDownloading(true);
    let imageUrl: string | undefined;
    try {
      const colors = getComputedStyle(svg);
      const paper = colors.getPropertyValue("--qr-paper").trim();
      const ink = colors.getPropertyValue("--qr-ink").trim();
      const source = new XMLSerializer().serializeToString(svg)
        .replaceAll("var(--qr-paper)", paper)
        .replaceAll("var(--qr-ink)", ink);
      imageUrl = URL.createObjectURL(new Blob([source], { type: "image/svg+xml" }));
      const image = new Image();
      image.src = imageUrl;
      await image.decode();
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 1380;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Image export unavailable");
      context.fillStyle = paper;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.imageSmoothingEnabled = false;
      context.drawImage(image, 0, 0, 1200, 1200);
      context.fillStyle = ink;
      context.textAlign = "center";
      context.font = "bold 44px sans-serif";
      context.fillText(profile.fullName, 600, 1240);
      context.font = "32px sans-serif";
      context.fillText(profile.websiteDomain, 600, 1300);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${profile.websiteDomain}-QR.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("QR code downloaded", { description: profile.fullName });
    } catch {
      toast.error("Couldn't download QR code", { description: "Please try again." });
    } finally {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
      setDownloading(false);
    }
  }

  return (
    <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-3">
      <div className="shrink-0 rounded bg-qr-paper">
        <QRCodeSVG ref={qrRef} value={profile.websiteUrl} size={104} level="M" marginSize={4}
          bgColor="var(--qr-paper)" fgColor="var(--qr-ink)" title={`${profile.fullName} digital card`} />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-xl text-foreground">{profile.fullName}</h3>
        <p className="break-all text-xs text-muted-foreground">{profile.websiteDomain}</p>
        <Button variant="ghost" onClick={download} disabled={downloading}
          aria-label={`Download ${profile.fullName} QR code`}
          className="mt-2 h-9 px-0 text-amber hover:text-amber hover:bg-transparent">
          <Download aria-hidden="true" /> {downloading ? "Downloading…" : "Download PNG"}
        </Button>
      </div>
    </div>
  );
}

export function ProfileQrCodes({ currentProfile }: { currentProfile: Profile }) {
  const otherProfile = profiles[currentProfile.key === "maxamad" ? "harith" : "maxamad"];
  return (
    <section className="rise flex flex-col gap-3" style={{ animationDelay: "420ms" }}>
      <h2 className="font-display text-2xl tracking-widest text-muted-foreground">SHARE OUR CARDS</h2>
      <ProfileQr profile={currentProfile} />
      <ProfileQr profile={otherProfile} />
    </section>
  );
}