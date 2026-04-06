import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import "./contact-section.css";
import contactRightAnimation from "../../../assets/contact-right.json";
import { submitContactForm } from "../../../utils/bitformApi";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface SubmissionState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLSection>(null);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const [submission, setSubmission] = useState<SubmissionState>({
    loading: false,
    success: false,
    error: null,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmission({
        loading: false,
        success: false,
        error: 'Please fill in all required fields (Name, Email, Message)',
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmission({
        loading: false,
        success: false,
        error: 'Please enter a valid email address',
      });
      return;
    }

    setSubmission({ loading: true, success: false, error: null });

    try {
      const response = await submitContactForm(formData);

      if (response.success) {
        setSubmission({
          loading: false,
          success: true,
          error: null,
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });

        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmission({ loading: false, success: false, error: null });
        }, 5000);
      } else {
        setSubmission({
          loading: false,
          success: false,
          error: response.message || 'Failed to submit form. Please try again.',
        });
      }
    } catch (error) {
      setSubmission({
        loading: false,
        success: false,
        error: 'An unexpected error occurred. Please try again.',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`contact-section ${isVisible ? "visible" : ""}`}
      id="contact"
    >
      {/* Video Background */}
      <div className="contact-video-bg">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="contact-video"
        >
          <source src="/videos/bg-main.mp4" type="video/mp4" />
        </video>
        <div className="contact-video-overlay" />
      </div>

      <div className="contact-container">
        <div className="contact-left contact-animate">
          <h2 className="contact-title">Lets Connect!</h2>

          {submission.error && (
            <div className="form-message form-message--error" role="alert">
              {submission.error}
            </div>
          )}

          {submission.success && (
            <div className="form-message form-message--success" role="alert">
              Thank you for reaching out! We'll get back to you soon.
            </div>
          )}

          <form className="contact-form" onSubmit={onSubmit}>
            <label className="sr-only" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              placeholder="Name"
              required
              value={formData.name}
              onChange={handleInputChange}
              disabled={submission.loading}
            />

            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleInputChange}
              disabled={submission.loading}
            />

            <label className="sr-only" htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={submission.loading}
            />

            <label className="sr-only" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Message"
              rows={5}
              required
              value={formData.message}
              onChange={handleInputChange}
              disabled={submission.loading}
            />

            <div className="form-actions">
              <button
                className="contact-btn"
                type="submit"
                disabled={submission.loading}
              >
                {submission.loading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>

        <div className="contact-right contact-animate">
          <div className="contact-visual">
            <Lottie
              animationData={contactRightAnimation}
              loop={true}
              className="contact-lottie"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
