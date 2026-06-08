import React from 'react';
import './Skills.css';

const SKILLS = {
  'Java & Spring Boot': [
    'Spring Boot',
    'Spring MVC',
    'Spring Security',
    'Spring Cloud',
    'Spring Data JPA',
    'RESTful APIs',
    'Microservices',
    'Java OOP',
    'Multithreading'
  ],
  'Frontend': [
    'ReactJS',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Tailwind CSS',
    'Bootstrap',
    'PrimeReact',
    'HTML5',
    'CSS3'
  ],
  'Database': [
    'MySQL',
    'Oracle',
    'MySQL Workbench',
    'Oracle SQL Developer',
    'Stored Procedures',
    'Query Optimization',
    'ORM/JPA'
  ],
  'DevOps & Tools': [
    'Docker',
    'Git',
    'GitHub',
    'GitLab',
    'JIRA',
    'Trello',
    'Postman',
    'Apache JMeter'
  ],
  'Testing': [
    'TDD',
    'Automated API Testing',
    'Test Case Design',
    'JUnit'
  ]
};

const Skills = () => {
  return (
    <section className="section skills-sec" id="skills">
      <div className="si">
        <div className="slbl">Tech Stack</div>
        <h2 className="stitle">Skills &amp; <span>Expertise</span></h2>

        <div className="skills-grid">
          {Object.entries(SKILLS).map(([category, items]) => (
            <div key={category} className="scat interactive">
              <div className="scatttl">{category}</div>
              <div className="stags">
                {items.map((skill) => (
                  <span key={skill} className="stag interactive">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
