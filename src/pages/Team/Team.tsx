import { useTeam } from "../../hooks/useTeam";
import "./team.css";
import type { TeamMember } from "../../types/team";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, type LucideIcon } from "lucide-react";

type SocialKey = "instagram" | "facebook" | "linkedin" | "twitter" | "youtube" | "pinterest";

type SocialLink = {
  key: SocialKey;
  url: string;
};

function normalizeSocialUrl(value: unknown) {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function buildSocialLinks(acf?: TeamMember["acf"]): SocialLink[] {
  if (!acf || typeof acf !== "object") return [];

  const keys: SocialKey[] = ["instagram", "facebook", "linkedin", "twitter", "youtube", "pinterest"];
  return keys
    .map((key) => ({ key, url: normalizeSocialUrl(acf[key]) }))
    .filter((item) => item.url);
}

function excerptWords(text: string, maxWords: number) {
  const normalized = text.trim().replace(/\s+/g, " ");
  if (!normalized) return "";
  const words = normalized.split(" ");
  if (words.length <= maxWords) return normalized;
  return `${words.slice(0, maxWords).join(" ")}…`;
}

function mapTeamMember(member: TeamMember) {
  const name = typeof member.title === "object" && member.title?.rendered ? member.title.rendered : "";
  const post = member.acf && typeof member.acf === 'object' && 'post' in member.acf ? String((member.acf as any).post) : "";
  const description = member.acf && typeof member.acf === 'object' && 'description' in member.acf ? String((member.acf as any).description) : "";
  const featuredImage = member._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "";
  const acfPhoto = (member.acf?.photo as string | undefined) ?? "";
  const photo = featuredImage || acfPhoto;
  const socialLinks = buildSocialLinks(member.acf);
  const mobileDescription = excerptWords(description, 70);
  return { name, post, description, mobileDescription, photo, socialLinks };
}

function TeamSocialIcon({ platform }: { platform: SocialKey }) {
  const iconMap: Record<Exclude<SocialKey, "pinterest">, LucideIcon> = {
    instagram: Instagram,
    facebook: Facebook,
    linkedin: Linkedin,
    twitter: Twitter,
    youtube: Youtube,
  };

  if (platform === "pinterest") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.52 2 4 5.94 4 9.23c0 2.23.84 4.22 2.64 4.96.3.12.57 0 .66-.32.06-.22.2-.77.26-1 .09-.32.05-.43-.19-.72-.52-.62-.85-1.42-.85-2.56 0-3.3 2.47-6.25 6.42-6.25 3.5 0 5.43 2.14 5.43 5 0 3.76-1.66 6.93-4.13 6.93-1.37 0-2.4-1.14-2.07-2.53.39-1.66 1.14-3.45 1.14-4.65 0-1.08-.58-1.98-1.77-1.98-1.4 0-2.53 1.45-2.53 3.39 0 1.24.42 2.08.42 2.08l-1.69 7.15c-.5 2.13-.08 4.74-.04 5 .02.15.21.18.3.07.13-.16 1.77-2.2 2.33-4.24.16-.58.93-3.57.93-3.57.46.88 1.8 1.66 3.23 1.66 4.25 0 7.13-3.88 7.13-9.08C20 5.66 16.66 2 12.04 2Z" />
      </svg>
    );
  }

  const Icon = iconMap[platform];
  return <Icon size={16} strokeWidth={1.9} />;
}

export default function Team() {
  const { data: teamData, loading: teamLoading, error: teamError } = useTeam();

  return (
    <main className="site-main team-page">
      <section className="default-hero">
        <div className="hero-boundary">
          <div className="hero-badge">Our Team</div>
          <h1 className="team-headline">
            Meet the People Behind the Work
          </h1>
          <p className="team-lede">
            Our diverse team brings together expertise in engineering, project management,
            and customer service to deliver exceptional building solutions.
          </p>
        </div>
      </section>

      <section className="team-grid-section site-section">
        <div className="team-container">
          {teamLoading && <p className="muted">Loading team...</p>}
          {teamError && <p className="muted" style={{ color: "#f87171" }}>Failed to load team</p>}
          {!teamLoading && !teamError && (
            <div className="team-grid">
              {teamData.map(mapTeamMember).map((member) => (
                <div key={member.name} className="team-card">
                  <div className="team-media">
                    {member.photo ? (
                      <div className="team-photo">
                        <img src={member.photo} alt={member.name} />
                      </div>
                    ) : (
                      <div className="team-avatar" aria-hidden="true">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="team-text-wrap">
                    <div className="team-text">
                      <p className="team-name">{member.name}</p>
                      <p className="team-title">{member.post}</p>
                      {member.description && (
                        <>
                          <p className="team-bio team-bio-desktop">{member.description}</p>
                          <p className="team-bio team-bio-mobile">{member.mobileDescription}</p>
                        </>
                      )}
                      {member.socialLinks.length > 0 && (
                        <div className="team-social" aria-label={`${member.name} social links`}>
                          {member.socialLinks.map((social) => (
                            <a
                              key={social.key}
                              href={social.url}
                              className="team-social-link"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${member.name} ${social.key}`}
                            >
                              <TeamSocialIcon platform={social.key} />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
