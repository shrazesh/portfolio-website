import SectionTitle from "@/components/SectionTitle";

export default function Contact() {
  return (
    <div className="contact">
      <SectionTitle
        title="Contact Me"
        subtitle="Let’s work together or discuss opportunities"
      />

      <form className="contact-form">
        <input type="text" placeholder="Your Name" />
        <input type="email" placeholder="Your Email" />
        <textarea placeholder="Your Message"></textarea>
        <button className="btn">Send Message</button>
      </form>
    </div>
  );
}