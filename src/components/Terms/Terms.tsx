'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Container from '@/components/Container/Container';
import Button from '@/components/UI/Button/Button';
import useStore from '@/app/zustand/useStore';
import translations from '@/app/lang/terms.json';

type PricingItem = {
  amount: string;
  condition: string;
};

type TermsSection = {
  id: string;
  number: string;
  title: string;
  summary: string;
  details: string[];
  pricing?: PricingItem[];
  linkKey?: string;
  linkLabel?: string;
};

type TermsLinks = {
  guaranteeLetter: string;
  officeRoute: string;
  contract: string;
  leaveRequest: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const TermsSectionCard = ({
  section,
  moreDetails,
  hideDetails,
  links,
}: {
  section: TermsSection;
  moreDetails: string;
  hideDetails: string;
  links: TermsLinks;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const linkHref =
    section.linkKey && links[section.linkKey as keyof TermsLinks]
      ? links[section.linkKey as keyof TermsLinks]
      : undefined;
  const isPlaceholderLink = !linkHref || linkHref === '#';

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeUp}
      transition={{ duration: 0.45 }}
      className="relative"
    >
      <div className="absolute left-3 top-6 hidden h-[30px] w-[30px] items-center justify-center rounded-full border border-[#ea001c]/40 bg-black tablet:flex">
        <div className="h-2.5 w-2.5 rounded-full bg-gradient-red" />
      </div>

      <div className="rounded-sub-block-16 border border-primary/20 bg-gradient-sub-block p-5 tablet:p-6 tablet:pl-16">
        <div className="mb-4 flex flex-wrap items-center gap-3 tablet:gap-5">
          <span className="text-[42px] tablet:text-[56px] font-bold leading-none tracking-tight text-[#ea001c]">
            {section.number}
          </span>
          <h2 className="text-[18px] tablet:text-[22px] font-bold text-primary">
            {section.title}
          </h2>
        </div>

        <p className="text-[14px] tablet:text-[16px] leading-[28px] text-secondary">
          {section.summary}
        </p>

        {section.pricing && section.pricing.length > 0 && (
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {section.pricing.map((item) => (
              <div
                key={item.amount}
                className="rounded-sub-block-12 border border-primary/20 bg-input/60 px-4 py-4 text-center"
              >
                <p className="text-[24px] tablet:text-[28px] font-bold leading-none text-primary">
                  {item.amount}
                </p>
                <p className="mt-2 text-[12px] leading-snug text-secondary">
                  {item.condition}
                </p>
              </div>
            ))}
          </div>
        )}

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-3 space-y-3">
                {section.details.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[14px] tablet:text-[16px] leading-[28px] text-secondary"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="h-[40px] rounded-sub-block-12 border border-primary/30 bg-input px-5 text-[13px] font-semibold text-primary transition duration-300 ease-in-out hover:scale-[1.02] outline-none focus:outline-none"
          >
            {isOpen ? hideDetails : moreDetails}
          </button>

          {section.linkLabel && (
            <a
              href={isPlaceholderLink ? undefined : linkHref}
              onClick={(event) => {
                if (isPlaceholderLink) event.preventDefault();
              }}
              target={isPlaceholderLink ? undefined : '_blank'}
              rel={isPlaceholderLink ? undefined : 'noopener noreferrer'}
              aria-disabled={isPlaceholderLink}
              className={`inline-flex min-h-[40px] h-auto items-center justify-center rounded-sub-block-12 bg-gradient-red px-5 py-2 text-center text-[13px] font-semibold text-primary transition duration-300 ease-in-out outline-none focus:outline-none ${
                isPlaceholderLink
                  ? 'cursor-not-allowed opacity-60'
                  : 'hover:scale-[1.02]'
              }`}
            >
              {section.linkLabel}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const Terms = () => {
  const language = useStore((state) => state.language);
  const t = translations[language] || translations.ua;
  const [isContractOpen, setIsContractOpen] = useState(false);
  const contractHref = t.links.contract;
  const isContractPlaceholder = !contractHref || contractHref === '#';

  return (
    <section className="pb-16 tablet:pb-24">
      <div className="relative mobile:py-[10px] tablet:py-[54px] bg-[url('/terms-hero.jpg')] mobile:bg-no-repeat mobile:bg-center mobile:bg-cover">
        <div className="absolute inset-0 bg-black/45 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[40px] bg-gradient-to-b from-transparent to-black pointer-events-none"></div>
        <div className="relative z-[1]">
          <Container>
          <div className="relative border-[1px] border-white rounded-sub-block-14 px-[15px] tablet:px-0 py-[80px] tablet:py-[157px]">
            <svg
              width="593"
              height="549"
              viewBox="0 0 593 549"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 right-0 w-[300px] h-[300px] tablet:w-[593px] tablet:h-[549px]"
            >
              <g filter="url(#filter0_f_terms_hero_top)">
                <circle cx="524" cy="86" r="124" fill="#E2011A" />
              </g>
              <defs>
                <filter
                  id="filter0_f_terms_hero_top"
                  x="0"
                  y="-438"
                  width="1048"
                  height="1048"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="200"
                    result="effect1_foregroundBlur_terms_hero_top"
                  />
                </filter>
              </defs>
            </svg>
            <svg
              width="593"
              height="549"
              viewBox="0 0 593 549"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute bottom-0 left-0 w-[300px] h-[300px] tablet:w-[593px] tablet:h-[549px]"
            >
              <g filter="url(#filter0_f_terms_hero_bottom)">
                <circle cx="69" cy="487" r="124" fill="#E2011A" />
              </g>
              <defs>
                <filter
                  id="filter0_f_terms_hero_bottom"
                  x="-455"
                  y="-37"
                  width="1048"
                  height="1048"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="200"
                    result="effect1_foregroundBlur_terms_hero_bottom"
                  />
                </filter>
              </defs>
            </svg>
            <h1 className="text-[40px] tablet:text-[88px] text-center uppercase text-white font-bold mb-[32px]">
              {t.pageTitle}
            </h1>
            <p className="text-center text-white text-[16px] tablet:text-[20px] max-w-[636px] mx-auto">
              {t.intro}
            </p>
          </div>
          </Container>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          aria-hidden
          className="terms-page-glow terms-page-glow-left-inward top-[4%]"
        />
        <div
          aria-hidden
          className="terms-page-glow terms-page-glow-center top-[38%]"
        />
        <div
          aria-hidden
          className="terms-page-glow terms-page-glow-right top-[62%]"
        />
        <div
          aria-hidden
          className="terms-page-glow terms-page-glow-left top-[82%]"
        />

        <div className="relative z-[1]">
          <Container>
            <div className="relative mt-10 tablet:mt-14">
              <div className="absolute bottom-4 left-[27px] top-4 hidden w-px bg-gradient-to-b from-[#ea001c]/80 via-primary/20 to-transparent tablet:block" />

              <div className="space-y-6">
                {t.sections.map((section) => (
                  <TermsSectionCard
                    key={section.id}
                    section={section}
                    moreDetails={t.moreDetails}
                    hideDetails={t.hideDetails}
                    links={t.links}
                  />
                ))}
              </div>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ duration: 0.45 }}
              className="mt-10 mb-10 rounded-sub-block-16 border border-primary/20 bg-gradient-sub-block p-5 tablet:mt-12 tablet:mb-14 tablet:p-8"
            >
              <h2 className="mb-3 text-[20px] tablet:text-[24px] font-bold text-primary">
                {t.contract.title}
              </h2>
              <p className="text-[14px] tablet:text-[16px] leading-[28px] text-secondary">
                {t.contract.summary}
              </p>

              <AnimatePresence initial={false}>
                {isContractOpen && (
                  <motion.div
                    key="contract-details"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 space-y-3">
                      {t.contract.details.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="text-[14px] tablet:text-[16px] leading-[28px] text-secondary"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setIsContractOpen((prev) => !prev)}
                  className="h-[40px] rounded-sub-block-12 border border-primary/30 bg-input px-5 text-[13px] font-semibold text-primary transition duration-300 ease-in-out hover:scale-[1.02] outline-none focus:outline-none"
                >
                  {isContractOpen ? t.hideDetails : t.moreDetails}
                </button>
                <a
                  href={isContractPlaceholder ? undefined : contractHref}
                  onClick={(event) => {
                    if (isContractPlaceholder) event.preventDefault();
                  }}
                  target={isContractPlaceholder ? undefined : '_blank'}
                  rel={
                    isContractPlaceholder ? undefined : 'noopener noreferrer'
                  }
                  aria-disabled={isContractPlaceholder}
                  className={`inline-flex min-h-[40px] h-auto items-center justify-center rounded-sub-block-12 bg-gradient-red px-5 py-2 text-center text-[13px] font-semibold text-primary transition duration-300 ease-in-out outline-none focus:outline-none ${
                    isContractPlaceholder
                      ? 'cursor-not-allowed opacity-60'
                      : 'hover:scale-[1.02]'
                  }`}
                >
                  {t.contract.linkLabel}
                </a>
              </div>
            </motion.div>
          </Container>
        </div>
      </div>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true, amount: 0.25 }}
        className="relative mt-10 py-[64px] px-[40px] lg:mt-14 lg:py-[52px] mobile:bg-[url('/contacs-mobile.jpg')] sm:bg-[url('/contacs-desktop.jpg')] mobile:bg-no-repeat mobile:bg-center mobile:bg-cover"
      >
        <div className="absolute inset-x-0 top-0 h-[40px] bg-gradient-to-b from-black to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-[40px] bg-gradient-to-t from-black to-transparent pointer-events-none" />

        <h2 className="mx-auto mb-[46px] lg:mb-[48px] max-w-[270px] lg:max-w-[650px] text-center text-[28px] lg:text-[48px] font-bold uppercase text-white">
          {t.cta.title}
        </h2>
        <div className="mx-auto w-full max-w-[360px]">
          <Link href={t.links.leaveRequest}>
            <Button className="terms-cta-btn bg-none w-full h-auto min-h-[60px] px-[36px] py-[18px] rounded-sub-block-12 text-[18px] text-white font-semibold hover:scale-105 hover:text-hoverprimary">
              {t.cta.button}
            </Button>
          </Link>
        </div>
      </motion.section>
    </section>
  );
};

export default Terms;
