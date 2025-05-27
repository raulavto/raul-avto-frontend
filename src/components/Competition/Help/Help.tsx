'use client';
import Image from 'next/image';
import { fadeInAnimation } from '@/app/utils/animation';
import AnimatedWrapper from '@/components/AnimatedWrappers/AnimatedWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Help() {
  const [isImageFullscreen, setIsImageFullscreen] = useState(false);

  useEffect(() => {
    if (isImageFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isImageFullscreen]);

  const toggleImageFullscreen = () => {
    setIsImageFullscreen(!isImageFullscreen);
  };

  return (
    <section className="relative z-10 pt-6 pb-10 pointuserbar:pt-[38px] pointuserbar:pb-[42px] mx-auto overflow-x-hidden">
      <div className=" max-w-[1280px] mx-auto px-4 md:px-0">
        <AnimatedWrapper
          as={motion.p}
          animation={fadeInAnimation({ x: 50, delay: 1.2 })}
          className=" mx-auto text-[18px] pointuserbar:text-[30px] font-semibold text-white text-center leading-[1.23]"
        >
          Візьми участь у конкурсі та виграй AUDI A8! Придбавши квиток лише за
          200 гривень, ти не просто отримуєш шанс стати власником преміум-авто —
          ти робиш добру справу. Частина коштів буде передана на підтримку
          дитячих будинків-інтернатів по всій Україні, де виховуються діти з
          фізичними та розумовими вадами. Разом творимо добро!
        </AnimatedWrapper>
        <div className="mt-6">
          <div className="flex flex-col pointuserbar:flex-row gap-6">
            <div className="w-full pointuserbar:w-1/2">
              <div className="relative w-full aspect-video">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-[12px]"
                  src="https://www.youtube.com/embed/q76M8hbofQk?si=BBreQpdPYksv6kL5"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="w-full pointuserbar:w-1/2">
              <div
                className="relative w-full cursor-pointer"
                onClick={toggleImageFullscreen}
              >
                <Image
                  src="/competition/map.webp"
                  alt="Карта"
                  width={640}
                  height={360}
                  className="w-full h-auto rounded-[12px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isImageFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-[1000] flex items-center justify-center cursor-pointer"
            onClick={toggleImageFullscreen}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 0.8, y: '10%' }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full flex items-center justify-center p-4"
            >
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src="/competition/map.webp"
                  alt="Карта"
                  width={1920}
                  height={1080}
                  className="w-auto h-auto max-w-full max-h-[80vh] object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
