'use client';

import { motion } from 'framer-motion';

type StoryBlock = {
  year?: string;
  title: string;
  text: string | string[];
  brands?: string[];
  variant?: 'timeline' | 'card' | 'quote';
};

const renderParagraphs = (text: string | string[]) => {
  const paragraphs = Array.isArray(text) ? text : [text];

  return (
    <div className="space-y-3">
      {paragraphs.map((paragraph) => (
        <p
          key={paragraph}
          className="text-[14px] tablet:text-[16px] leading-[28px] text-secondary"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
};

type AboutStoryProps = {
  title: string;
  blocks: StoryBlock[];
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const AboutStory = ({ title, blocks }: AboutStoryProps) => {
  const timelineBlocks = blocks.filter((block) => block.variant !== 'card' && block.variant !== 'quote');
  const cardBlocks = blocks.filter((block) => block.variant === 'card');
  const quoteBlock = blocks.find((block) => block.variant === 'quote');

  return (
    <div className="mt-12 tablet:mt-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center tablet:mb-12"
      >
        <p className="mb-3 text-12 font-semibold uppercase tracking-[0.18em] text-secondary">
          RAUL AVTO
        </p>
        <h2 className="text-24 tablet:text-34 font-bold uppercase text-primary">
          {title}
        </h2>
      </motion.div>

      <div className="relative mx-auto max-w-4xl">
        <div className="absolute bottom-4 left-[15px] top-4 w-px bg-gradient-to-b from-[#ea001c]/80 via-primary/20 to-transparent tablet:left-[27px]" />

        <div className="space-y-6">
          {timelineBlocks.map((block, index) => (
            <motion.article
              key={`${block.title}-${index}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="relative pl-12 tablet:pl-16"
            >
              <div className="absolute left-0 top-6 flex h-[30px] w-[30px] items-center justify-center rounded-full border border-[#ea001c]/40 bg-black tablet:left-3">
                <div className="h-2.5 w-2.5 rounded-full bg-gradient-red" />
              </div>

              <div className="rounded-sub-block-16 border border-primary/20 bg-gradient-sub-block p-5 tablet:p-6">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  {block.year && (
                    <span className="rounded-sub-block-8 bg-[#ea001c]/15 px-3 py-1 text-12 font-bold uppercase tracking-wide text-[#ea001c]">
                      {block.year}
                    </span>
                  )}
                  <h3 className="text-18 tablet:text-20 font-bold text-primary">
                    {block.title}
                  </h3>
                </div>

                {renderParagraphs(block.text)}

                {block.brands && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {block.brands.map((brand) => (
                      <span
                        key={brand}
                        className="rounded-sub-block-8 border border-primary/20 bg-input/70 px-3 py-1.5 text-12 font-medium text-primary"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {cardBlocks.length > 0 && (
        <div className="mx-auto mt-8 grid max-w-5xl gap-4 tablet:mt-10 tablet:grid-cols-2">
          {cardBlocks.map((block, index) => (
            <motion.article
              key={`${block.title}-${index}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="rounded-sub-block-16 border border-primary/20 bg-input/40 p-5 tablet:p-6"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-sub-block-10 bg-gradient-red text-18 font-bold text-primary">
                {index + 1}
              </div>
              <h3 className="mb-3 text-18 font-bold text-primary">{block.title}</h3>
              {renderParagraphs(block.text)}
            </motion.article>
          ))}
        </div>
      )}

      {quoteBlock && (
        <motion.blockquote
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="relative mx-auto mt-8 max-w-4xl overflow-hidden rounded-sub-block-22 border border-[#ea001c]/30 bg-gradient-to-br from-[#1a1a1c] to-[#121213] p-6 tablet:mt-10 tablet:p-8"
        >
          <div className="absolute right-6 top-4 text-56 font-bold leading-none text-white/5">
            “
          </div>
          <p className="relative text-[16px] tablet:text-[20px] font-medium leading-[28px] text-primary">
            {quoteBlock.text}
          </p>
        </motion.blockquote>
      )}
    </div>
  );
};

export default AboutStory;
