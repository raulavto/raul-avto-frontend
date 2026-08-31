'use client';
import Image from 'next/image';
import useStore from '../../app/zustand/useStore';
import translations from '../../app/lang/aboutme.json';
import FooterSocial from '../ModernHome/Footer/FooterSocial';
import Container from '../Container/Container';
import AboutStory from './AboutStory';

const About = () => {
  const language = useStore((state) => state.language);

  if (!translations[language]) {
    throw new Error(`Translations for language "${language}" not found.`);
  }

  const {
    pageTitle,
    adminName,
    adminTitle,
    bio,
    highlights,
    storyTitle,
    storyBlocks,
    contactPhone,
    telegramLink,
    contactLinks,
  } = translations[language];

  const leadParagraphs = bio.slice(0, 2);

  return (
    <section className="pt-8 tablet:pt-12 pb-16 tablet:pb-24">
      <Container>
        <div className="overflow-hidden rounded-sub-block-22 tablet:rounded-sub-block-42 border border-primary/20 bg-gradient-sub-block">
          <div className="grid grid-cols-1 pointuserbar:grid-cols-[minmax(280px,400px)_1fr]">
            <div className="relative h-[300px] sm:h-[380px] pointuserbar:h-auto pointuserbar:min-h-[560px]">
              <Image
                src="/raul-photo-for-faq.jpg"
                alt={adminName}
                fill
                priority
                sizes="(max-width: 960px) 100vw, 400px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121213] via-[#121213]/20 to-transparent pointuserbar:bg-gradient-to-r pointuserbar:from-transparent pointuserbar:via-[#121213]/10 pointuserbar:to-[#121213]" />
            </div>

            <div className="flex flex-col justify-center p-6 tablet:p-10 pointuserbar:p-12">
              <p className="mb-2 text-12 font-semibold uppercase tracking-[0.18em] text-secondary">
                {pageTitle}
              </p>
              <h1 className="mb-2 text-28 tablet:text-40 font-bold leading-tight text-primary">
                {adminName}
              </h1>
              <p className="mb-6 text-16 font-medium text-[#ea001c]">
                {adminTitle}
              </p>

              <div className="mb-8 space-y-3">
                {leadParagraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[16px] tablet:text-[18px] leading-[28px] text-primary/90"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mb-8 grid grid-cols-3 gap-3">
                {highlights.map((item) => (
                  <div
                    key={item.value}
                    className="rounded-sub-block-12 border border-primary/20 bg-input/60 px-3 py-4 text-center"
                  >
                    <p className="text-24 tablet:text-28 font-bold leading-none text-primary">
                      {item.value}
                    </p>
                    <p className="mt-2 text-12 leading-snug text-secondary">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mb-6 flex flex-col gap-3 sm:flex-row">
                <a
                  className="flex h-[44px] flex-1 items-center justify-center rounded-sub-block-12 bg-gradient-red px-6 text-14 font-bold text-primary transition duration-300 ease-in-out hover:scale-[1.02] focus:outline-focus outline-none"
                  href={`tel:${contactPhone.replace(/\s/g, '')}`}
                >
                  {contactPhone}
                </a>
                <a
                  className="flex h-[44px] flex-1 items-center justify-center rounded-sub-block-12 border border-primary/30 bg-input px-6 text-14 font-bold text-primary transition duration-300 ease-in-out hover:scale-[1.02] focus:outline-focus outline-none"
                  href={contactLinks[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {telegramLink}
                </a>
              </div>

              <FooterSocial />
            </div>
          </div>
        </div>

        <AboutStory title={storyTitle} blocks={storyBlocks} />
      </Container>
    </section>
  );
};

export default About;
