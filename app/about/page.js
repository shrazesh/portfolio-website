export default function About() {
  return (
    <section className="about">
      <div className="about-container">
        <h1>About Me</h1>
        <p>
          Hello! I'm Shrajesh, a passionate MERN stack learner and aspiring software engineer.
          I enjoy building web applications and sharing knowledge through blogs.
        </p>

        <div className="about-cards">
          <div className="card">
            <h3>🎯 Goal</h3>
            <p>To become a professional full-stack developer.</p>
          </div>

          <div className="card">
            <h3>💻 Skills</h3>
            <p>HTML, CSS, JavaScript, React, Next.js, Node.js</p>
          </div>

          <div className="card">
            <h3>📚 Learning</h3>
            <p>System Design, MERN Stack, DevOps basics</p>
          </div>
        </div>
      </div>
    </section>
  );
}