type PageHeroProps = {
  title: string;
  subtitle: string;
};

export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="border-b border-white/20 py-10 sm:py-14">
      <div className="site-container text-center">
        <h1 className="hh-page-title--light">{title}</h1>
        <p className="hh-page-subtitle--light mt-3">{subtitle}</p>
      </div>
    </section>
  );
}
