import ConditionItem from './ConditionItem';

export default function ConditionsList() {
  const conditionsList = [
    {
      number: '01',
      title: 'Ознайомся з правилами',
      description:
        'Дізнайся всі деталі конкурсу та переходь на наш сайт за посиланням!',
      button: 'Завантажити умови ',
    },
    {
      number: '02',
      title: 'Долучайся до спільноти',
      description:
        'Підпишись на соціальні мережі наших партнерів, щоб бути в курсі новин.',
      button: 'Підпишись на партнерів',
    },
    {
      number: '03',
      title: 'Стань учасником',
      description:
        'Придбай квиток для участі, відсканувавши QR-код на банку Monobank.',
      button: 'Зареєструйся в конкурсі',
    },
  ];
  return (
    <ul className="flex flex-col pointuserbar:flex-row pointuserbar:justify-between gap-y-16 max-w-[430px] pointuserbar:max-w-[1075px] mx-auto text-white">
      {conditionsList.map((condition, idx) => (
        <ConditionItem
          key={idx}
          condition={condition}
          className={`${
            idx === 0
              ? 'top-[61px] pointuserbar:top-[201px] left-[calc(50%-190px)] pointuserbar:left-[-29px]'
              : idx === 1
              ? 'top-[61px] pointuserbar:top-[42px] right-[calc(50%-190px)] pointuserbar:right-[44px]'
              : 'top-[61px] pointuserbar:top-[230px] left-[calc(50%-190px)] pointuserbar:left-auto pointuserbar:right-[37px]'
          }`}
        />
      ))}
    </ul>
  );
}
