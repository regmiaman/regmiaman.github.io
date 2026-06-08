import React from 'react';
import { Award } from 'lucide-react';
import InfiniteCarousel from './InfiniteCarousel';
import './Education.css';

const EDUS = [
  {
    deg: 'Bachelor in Computer Application',
    school: 'Reliance College (TU), Saraswatinagar, Kathmandu',
    year: '2022'
  },
  {
    deg: 'Higher Secondary Education (+2)',
    school: 'Global College of Management, Baneshwor, Kathmandu',
    year: '2018'
  },
  {
    deg: 'School Leaving Certificate (S.L.C.)',
    school: 'Kathmandu International School, Gaurighat, Kathmandu',
    year: '2016'
  }
];

const CAROUSEL_IMAGES = [
  {
    src: 'files/relianceCollege.jpg',
    caption: 'Reliance College - 2022 (BCA)(TU)'
  },
  {
    src: 'files/globalCollege.jpg',
    caption: 'Global College of Management - 2018 (+2)'
  },
  {
    src: 'files/kins.jpg',
    caption: 'Kathmandu International School - 2016 (S.L.C.)'
  }
];

const Education = () => {
  return (
    <section className="section edu-sec" id="education">
      <div className="si">
        <div className="slbl">Academic</div>
        <h2 className="stitle">My <span>Education</span></h2>

        {/* Academic Cards Grid */}
        <div className="edu-cards-row">
          {EDUS.map((e, index) => (
            <div key={index} className="edu-card interactive">
              <div className="edu-yr-bg">{e.year}</div>
              <div className="edu-ico">
                <Award size={32} />
              </div>
              <div className="edu-badge">{e.year}</div>
              <div className="edu-deg">{e.deg}</div>
              <p className="edu-school">{e.school}</p>
            </div>
          ))}
        </div>

        {/* School & College Photo Slider */}
        <div className="edu-slider-wrap">
          <div className="edu-slider-label">School &amp; College Photos</div>
          <InfiniteCarousel items={CAROUSEL_IMAGES} />
        </div>
      </div>
    </section>
  );
};

export default Education;
