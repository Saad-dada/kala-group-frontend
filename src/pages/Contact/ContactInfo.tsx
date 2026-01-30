import './contact.css';

export default function ContactInfo() {
  return (
    <section className="contact-info">
      <div className="reach-inner">
        <div className="reach-header">
          <span className="reach-badge">Presence</span>
          <h2 className="reach-title">Reach Us</h2>
        </div>

        <div className="reach-grid">
          <div className="reach-item">
            <div className="reach-icon" aria-hidden>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="none" stroke="var(--accent-1)" strokeWidth="1.2"/>
                <circle cx="12" cy="9" r="2.2" fill="var(--accent-1)" />
              </svg>
            </div>

            <div className="reach-body">
              <h3 className="reach-item-title">Corporate Office Address</h3>
              <p className="reach-item-text">Kala Group<br/>104, Hubtown Viva, Western Express Highway,<br/>Jogeshwari (East), Mumbai – 400060</p>
              <a className="reach-link" href="https://maps.app.goo.gl/5gR1KwDYYaQxDmm4A" target="_blank" rel="noreferrer">Get Direction</a>
            </div>
          </div>

          <div className="reach-item reach-item--contact">
            <div className="reach-icon" aria-hidden>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.6 10.8c1.6 3.2 4 5.6 7.2 7.2l2-2c.2-.2.5-.2.7-.1 1 .4 2 .6 3.1.6.4 0 .8.3.8.7v2.6c0 .4-.3.8-.7.8C10.4 20 4 13.6 3 4.3c0-.4.4-.8.8-.8h2.6c.4 0 .7.3.7.8 0 1.1.2 2.1.6 3.1.1.2 0 .5-.1.7l-2 2z" fill="var(--accent-1)"/>
              </svg>
            </div>

            <div className="reach-body">
              <h3 className="reach-item-title">Phone & Email</h3>

              <div className="reach-contact-row">
                <div>
                  <div className="small-label">Landline</div>
                  <div className="reach-item-text"><strong>+91 22 6238 9099</strong></div>
                </div>

                <div>
                  <div className="small-label">Mobile</div>
                  <div className="reach-item-text"><strong>+91 90760 75527</strong></div>
                </div>
              </div>

              <div className="reach-contact-row" style={{marginTop:12}}>
                <div>
                  <div className="small-label">Email</div>
                  <div className="reach-item-text"><a href="mailto:sales@kalagroup.in">sales@kalagroup.in</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
