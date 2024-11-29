import useStore from '@/app/zustand/useStore';
import translationsFaq from '../../app/lang/faq.json';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { itemClasses } from './itemClassesForAccordion';

const AccordionFaq = () => {
  const language = useStore((state) => state.language); // Получаем текущий язык из Zustand
  const { faq_title, faq_items } = translationsFaq[language]; // Извлекаем данные для текущего языка

  return (
    <section>
      <h2 className="text-center text-xl font-bold mb-6 text-gray-500">
        {faq_title}
      </h2>
      <Accordion
        variant="shadow"
        className="bg-transparent"
        itemClasses={itemClasses}
      >
        {faq_items.map((item, index) => (
          <AccordionItem
            key={index}
            aria-label={`Accordion ${index + 1}`}
            title={item.question}
            classNames={{ content: 'text-secondary pl-2 pr-2' }}
          >
            <ul>
              {item.answer.map((text, idx) => (
                <li key={idx} className="mb-2">
                  {text}
                </li>
              ))}
            </ul>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default AccordionFaq;
