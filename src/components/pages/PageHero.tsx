type PageHeroProps = {
  title: string;
  subtitle: string;
};

export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="border-b border-white/20 py-10 sm:py-14">
      <div className="site-container text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">{title}</h1>
        <p className="mt-3 text-lg text-white/85">{subtitle}</p>
      </div>
    </section>
  );
}
