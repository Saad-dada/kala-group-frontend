import { useTeam } from "../../hooks/useTeam";
import "./team.css";
import type { TeamMember } from "../../types/team";

function mapTeamMember(member: TeamMember) {
  const name = typeof member.title === "object" && member.title?.rendered ? member.title.rendered : "";
  // Get post and description from acf
  const post = member.acf && typeof member.acf === 'object' && 'post' in member.acf ? String((member.acf as any).post) : "";
  const description = member.acf && typeof member.acf === 'object' && 'description' in member.acf ? String((member.acf as any).description) : "";
  const photo = (member.acf?.photo as string | undefined) ?? "";
  return { name, post, description, photo };
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
                  {member.photo ? (
                    <div className="team-photo">
                      <img src={member.photo} alt={member.name} />
                    </div>
                  ) : (
                    <div className="team-avatar" aria-hidden="true">
                      {member.name.charAt(0)}
                    </div>
                  )}
                  <div className="team-text">
                    <p className="team-name">{member.name}</p>
                    <p className="team-title">{member.post}</p>
                    {member.description && (
                      <p className="team-bio">{member.description}</p>
                    )}
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
