import React from 'react';
import './Experience.css';

const EXPS = [
  {
    co: 'Reliance College / Reliance International College',
    role: 'Lecturer',
    period: '2026 – Present',
    color: '#34d399',
    desc: 'Teaching core CS subjects to BCA and CSIT students. Preparing lecture notes, lab sessions, and mentoring students in real-world software development.',
    subjects: [
      'Computer Fundamentals & Applications (BCA 1st – TU)',
      'System Analysis & Design (CSIT 4th – RJU)',
      'Software Engineering (BCA 4th – TU)',
      'Software Project Management (BCA 7th – TU)'
    ]
  },
  {
    co: 'Professional Computer System',
    role: 'Software Engineer',
    period: '2023 – 2026',
    color: '#38bdf8',
    desc: 'Developed APIs and modules using Spring Boot. Implemented video calling and incremental/full backup systems. Built front-end components with ReactJS and Next.js in a microservices architecture.',
    stack: ['Java', 'ReactJS', 'Next.js', 'Spring Boot', 'TypeScript']
  },
  {
    co: 'Shreenagar',
    role: 'Java Learner & Trainer',
    period: '2022 (6 months)',
    color: '#fbbf24',
    desc: 'Worked as Trainer and Learner, developing LMS and OCR tools using Java and MySQL.',
    stack: ['Java', 'MySQL']
  },
  {
    co: 'Professional Computer System',
    role: 'Intern Developer',
    period: '2022 (3 months)',
    color: '#818cf8',
    desc: 'Assisted in backend development on real-world projects using Java, Spring Boot, and MySQL.',
    stack: ['Java', 'Spring Boot', 'MySQL']
  }
];

const Experience = () => {
  return (
    <section className="section exp-sec" id="experience">
      <div className="si">
        <div className="slbl">Career</div>
        <h2 className="stitle">Work <span>Experience</span></h2>

        <div className="timeline">
          {EXPS.map((exp, index) => (
            <div key={index} className="tli">
              {/* Dot & Pulse Indicator */}
              <div className="tl-dot-w">
                <div 
                  className="tl-dot" 
                  style={{ 
                    backgroundColor: exp.color,
                    boxShadow: `0 0 12px ${exp.color}`
                  }}
                />
                <div 
                  className="tl-pulse" 
                  style={{ borderColor: exp.color }}
                />
              </div>

              {/* Work Details Card */}
              <div className="tl-card interactive">
                <div className="exp-hdr">
                  <div className="exp-info">
                    <div className="exp-role">{exp.role}</div>
                    <div className="exp-co">{exp.co}</div>
                  </div>
                  <span className="exp-per">{exp.period}</span>
                </div>
                <p className="exp-desc">{exp.desc}</p>
                
                {exp.stack && (
                  <div className="tagrow">
                    {exp.stack.map((tech) => (
                      <span key={tech} className="stktag">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {exp.subjects && (
                  <div className="tagrow subjects-row">
                    {exp.subjects.map((sub) => (
                      <span key={sub} className="sjtag">
                        📚 {sub}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
