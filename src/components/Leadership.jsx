import React from 'react';
import InfiniteCarousel from './InfiniteCarousel';
import './Leadership.css';

const LEADS = [
  {
    role: 'Past President',
    org: 'Rotaract Club of Reliance College',
    period: '2024 – Present',
    desc: 'Providing ongoing mentorship and strategic guidance to current leadership teams, supporting project planning and club development.'
  },
  {
    role: 'Rotary Foundation Chair',
    org: 'Rotaract Club of Reliance College',
    period: '2023 – 2024',
    desc: 'Conducted mentoring programs for board and club members. Supported fundraising, leadership development, and community initiatives.'
  },
  {
    role: 'President',
    org: 'Rotaract Club of Reliance College',
    period: '2021 – 2022',
    desc: 'Led 110+ members, supervised a 16-member Board. Organized 26+ projects including library construction, blood donation drives, nationwide clothing programs, and fundraising events.'
  },
  {
    role: 'Member & Promotional Development Chair',
    org: 'Rotaract Club of Reliance College',
    period: '2020 – 2021',
    desc: 'Served as IT Officer, managed club technology, social media platforms, and digital presence.'
  }
];

const LEADERSHIP_IMAGES = [
  {
    src: 'files/president.jpg',
    caption: 'Club President · 2021-22'
  },
  {
    src: 'files/bloodDonation.jpg',
    caption: 'Blood Donation Program'
  },
  {
    src: 'files/districtEvent.jpg',
    caption: 'Board of Directors Meeting'
  }
];

const Leadership = () => {
  return (
    <section className="section lead-sec" id="leadership">
      <div className="si">
        <div className="slbl">Community</div>
        <h2 className="stitle">Leadership &amp; <span>Volunteering</span></h2>

        {/* Leadership Cards Grid */}
        <div className="lead-grid">
          {LEADS.map((l, index) => (
            <div key={index} className="lcard interactive">
              <div className="lperiod">{l.period}</div>
              <div className="lrole">{l.role}</div>
              <div className="lorg">{l.org}</div>
              <p className="ldesc">{l.desc}</p>
            </div>
          ))}
        </div>

        {/* Photo Slider */}
        <div className="lead-slider-wrap">
          <div className="lead-slider-label">Rotaract Events &amp; Community Projects</div>
          <InfiniteCarousel items={LEADERSHIP_IMAGES} />
        </div>
      </div>
    </section>
  );
};

export default Leadership;
