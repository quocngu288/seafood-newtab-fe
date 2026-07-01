type ContactMapProps = {
  title: string;
  className?: string;
};

/** Google Maps embed — Hải Hương, KCN An Hiệp, Vĩnh Long */
const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3629.3840837483676!2d106.2843316!3d10.2721391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310aa691ae26d211%3A0x1dd8dfe891a682de!2sHAI%20HUONG%20SEAFOOD%20JOINT%20STOCK%20COMPANY!5e1!3m2!1sen!2s!4v1782467554987!5m2!1sen!2s";

export function ContactMap({ title, className = "" }: ContactMapProps) {
  return (
    <div
      className={`overflow-hidden rounded-[28px] shadow-[0_10px_30px_rgba(0,0,0,0.12)] ${className}`}
    >
      <iframe
        title={title}
        src={MAP_EMBED_SRC}
        className="aspect-[16/10] w-full border-0 sm:aspect-[2/1]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
