import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import LocationMap from './LocationMap';
import './Contact.css';

// Load config from Vite environment variables with original placeholders as fallbacks
const EJS_SVC = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
const EJS_TMPL = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
const EJS_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';
const SHEETS = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || 'YOUR_GOOGLE_APPS_SCRIPT_URL';

const Contact = () => {
  const [formData, setFormData] = useState({
    from_name: '',
    reply_to: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const validateField = (name, value) => {
    let error = '';
    const trimmed = value.trim();

    if (name === 'from_name' && !trimmed) {
      error = 'Name is required';
    } else if (name === 'reply_to') {
      if (!trimmed) {
        error = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        error = 'Enter a valid email address';
      }
    } else if (name === 'subject' && !trimmed) {
      error = 'Subject is required';
    } else if (name === 'message' && !trimmed) {
      error = 'Message is required';
    }

    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error dynamically as user types
    if (errors[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const validateAll = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      if (key !== 'phone') {
        const error = validateField(key, formData[key]);
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    // Mark all as touched
    setTouched({
      from_name: true,
      reply_to: true,
      subject: true,
      message: true
    });

    return isValid;
  };

  const saveToSheets = async (data) => {
    if (!SHEETS || SHEETS === 'YOUR_GOOGLE_APPS_SCRIPT_URL' || SHEETS.includes('YOUR')) return;
    try {
      await fetch(SHEETS, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch (e) {
      console.warn('Google Sheets sync skipped or failed:', e.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (!validateAll()) {
      setStatus({ type: 'error', message: '⚠ Please fix the highlighted fields before sending.' });
      return;
    }

    if (!EJS_SVC || EJS_SVC === 'YOUR_SERVICE_ID' || EJS_SVC.includes('YOUR')) {
      setStatus({ type: 'error', message: '⚙ EmailJS is not configured. Setup instructions are in README.md' });
      return;
    }

    setLoading(true);
    setStatus({ type: 'sending', message: '⏳ Sending your message...' });

    const now = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kathmandu',
      dateStyle: 'long',
      timeStyle: 'short'
    });

    const templateParams = {
      from_name: formData.from_name.trim(),
      reply_to: formData.reply_to.trim(),
      phone: formData.phone.trim() || 'Not provided',
      subject: formData.subject.trim(),
      message: formData.message.trim(),
      sent_at: now,
      to_email: 'developer.amanregmi@gmail.com'
    };

    try {
      // Send via EmailJS
      await emailjs.send(EJS_SVC, EJS_TMPL, templateParams, EJS_KEY);
      
      // Save record to Google Sheets in background
      await saveToSheets({
        timestamp: now,
        name: templateParams.from_name,
        email: templateParams.reply_to,
        phone: templateParams.phone,
        subject: templateParams.subject,
        message: templateParams.message
      });

      setStatus({ 
        type: 'success', 
        message: `✅ Message sent successfully! I will reply to ${formData.reply_to} within 24 hours.` 
      });
      
      // Reset form
      setFormData({
        from_name: '',
        reply_to: '',
        phone: '',
        subject: '',
        message: ''
      });
      setErrors({});
      setTouched({});
    } catch (err) {
      console.error(err);
      setStatus({ 
        type: 'error', 
        message: `❌ Failed to send: ${err?.text || err?.message || 'Please check configuration and try again.'}` 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section contact-sec" id="contact">
      <div className="si">
        <div className="slbl">Say Hello</div>
        <h2 className="stitle">Get In <span>Touch</span></h2>

        <div className="contact-grid">
          {/* LEFT: Info list */}
          <div className="contact-info">
            <p className="ctag">
              Have a project, a teaching opportunity, or just want to connect? Drop a message — I'll reply within 24 hours!
            </p>
            <div className="citems">
              <a href="mailto:developer.amanregmi@gmail.com" className="citem interactive">
                <div className="cico"><Mail size={20} /></div>
                <div>
                  <div className="clbl">Email</div>
                  <div className="cval">developer.amanregmi@gmail.com</div>
                </div>
              </a>
              <a href="tel:+9779843804997" className="citem interactive">
                <div className="cico"><Phone size={20} /></div>
                <div>
                  <div className="clbl">Phone</div>
                  <div className="cval">+977 9843804997</div>
                </div>
              </a>
              <div className="citem interactive">
                <div className="cico"><MapPin size={20} /></div>
                <div>
                  <div className="clbl">Location</div>
                  <div className="cval">Kathmandu, Nepal</div>
                </div>
              </div>
              <LocationMap />
            </div>
          </div>

          {/* RIGHT: Validation Form */}
          <form className="cform" onSubmit={handleSubmit} noValidate>
            <div className="frow">
              <div className="fg">
                <label htmlFor="fn">Name <span className="req">*</span></label>
                <input
                  id="fn"
                  name="from_name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.from_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`interactive ${touched.from_name && errors.from_name ? 'invalid' : touched.from_name && !errors.from_name ? 'valid' : ''}`}
                />
                <span className="ferr">{touched.from_name && errors.from_name}</span>
              </div>
              <div className="fg">
                <label htmlFor="fe">Email <span className="req">*</span></label>
                <input
                  id="fe"
                  name="reply_to"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.reply_to}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`interactive ${touched.reply_to && errors.reply_to ? 'invalid' : touched.reply_to && !errors.reply_to ? 'valid' : ''}`}
                />
                <span className="ferr">{touched.reply_to && errors.reply_to}</span>
              </div>
            </div>

            <div className="fg">
              <label htmlFor="fp">Phone <span className="opt">(optional)</span></label>
              <input
                id="fp"
                name="phone"
                type="tel"
                placeholder="+977 98XXXXXXXX"
                value={formData.phone}
                onChange={handleChange}
                className="interactive"
              />
            </div>

            <div className="fg">
              <label htmlFor="fs">Subject <span className="req">*</span></label>
              <input
                id="fs"
                name="subject"
                type="text"
                placeholder="Project inquiry, collaboration..."
                value={formData.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`interactive ${touched.subject && errors.subject ? 'invalid' : touched.subject && !errors.subject ? 'valid' : ''}`}
              />
              <span className="ferr">{touched.subject && errors.subject}</span>
            </div>

            <div className="fg">
              <label htmlFor="fm">Message <span className="req">*</span></label>
              <textarea
                id="fm"
                name="message"
                rows="5"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`interactive ${touched.message && errors.message ? 'invalid' : touched.message && !errors.message ? 'valid' : ''}`}
              />
              <span className="ferr">{touched.message && errors.message}</span>
            </div>

            {status.message && (
              <div className={`fstatus-banner ${status.type}`} role="alert">
                {status.message}
              </div>
            )}

            <button 
              type="submit" 
              className="btn-primary btn-submit interactive" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="spinner-loader" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send size={15} />
                </>
              )}
            </button>
            <p className="fnote">📬 Sends to <strong>developer.amanregmi@gmail.com</strong> &amp; logs to Sheets.</p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
