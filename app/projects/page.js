export default function Projects() {
  return (
    <section className="projects">
      <h1>My Projects</h1>

      <div className="project-container">
        <div className="project-card">
          <h3>Online Food Ordering System</h3>
          <p>A full-stack web app with multiple restaurants and online ordering.</p>
          <button>View Project</button>
        </div>

        <div className="project-card">
          <h3>Calorie Tracker System</h3>
          <p>A system to track daily calories with recommendations.</p>
          <button>View Project</button>
        </div>

        <div className="project-card">
          <h3>Portfolio Website</h3>
          <p>This personal portfolio built using Next.js.</p>
          <button>View Project</button>
        </div>
      </div>
    </section>
  );
}