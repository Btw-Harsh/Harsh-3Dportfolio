import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My journey <span>&</span>
          <br /> experience
        </h2>

        <div className="career-info">

          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          {/* B.Tech */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in Information Technology</h4>
                <h5>Oriental College of Technology, Bhopal</h5>
              </div>
              <h3>2022 - 2026</h3>
            </div>
            <p>
              Pursuing B.Tech in Information Technology with focus on
              Data Structures, OOPs, and Database Management Systems.
              Actively building full-stack applications and improving
              problem solving skills.
            </p>
          </div>

          {/* MERN Project */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>MERN Stack Developer</h4>
                <h5>Quiz Platform Project</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Built a full-stack Online Quiz Platform using React.js,
              Node.js, Express, and MongoDB with secure JWT
              authentication and role-based access (Admin/User).
              Integrated Google Gemini API for AI-generated questions
              and explanations.
            </p>
          </div>

          {/* ChaloCar */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Frontend / MERN Developer</h4>
                <h5>ChaloCar – Car Rental Platform</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Developed a responsive car rental web application using
              React.js with dynamic pages for car listings, booking
              forms, and rental details. Focused on reusable components
              and consistent UI/UX across devices.
            </p>
          </div>

          {/* Coding */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Problem Solving & DSA</h4>
                <h5>LeetCode & HackerRank</h5>
              </div>
              <h3>Ongoing</h3>
            </div>
            <p>
              Solved 150+ coding problems on LeetCode and earned a
              4-Star rating in HackerRank Problem Solving, strengthening
              algorithmic thinking and coding efficiency.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Career;