type ContactMapProps = {
  title: string;
  className?: string;
};

/** Google Maps embed — Hải Hương, KCN An Hiệp, Vĩnh Long */
const MAP_EMBED_SRC =
  "https://maps.google.com/maps?q=Hai+Huong+Seafood+Joint+Stock+Company,+Phu+Tuc,+Vinh+Long,+Vietnam&hl=vi&z=15&output=embed";

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
