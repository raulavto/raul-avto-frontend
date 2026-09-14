export type FeedbackItem = {
  id: string | number;
  name: string;
  rating: number;
  time: string;
  text: string;
  profilePhotoUrl?: string | null;
};

export const FALLBACK_FEEDBACK: FeedbackItem[] = [
  {
    id: 1,
    name: 'Дмитрий Свистунов',
    rating: 5,
    time: '1 рік тому',
    text: 'Привозил через ребят Ford Fusion Всем доволен, на все мои вопросы ( их было немеряно) в процессе покупки/доставки отвечали оперативно C LA доплыла за 34 дня Работал с Раулем, работу выполнил на отлично Рекомендую !',
  },
  {
    id: 2,
    name: 'Олександр',
    rating: 5,
    time: '6 місяців тому',
    text: 'Дуже задоволений сервісом! Все пройшло швидко і без зайвих проблем. Автомобіль отримав у чудовому стані. Рекомендую!',
  },
  {
    id: 3,
    name: 'Марина',
    rating: 4,
    time: '3 місяці тому',
    text: 'Добра робота менеджерів. Трохи затримали доставку, але в іншому сервіс сподобався. Авто відповідає всім очікуванням.',
  },
  {
    id: 4,
    name: 'Ігор',
    rating: 5,
    time: '2 роки тому',
    text: 'Відмінний сервіс! Завжди на зв’язку, всі етапи прозорі. Задоволений роботою команди і своїм новим авто!',
  },
  {
    id: 5,
    name: 'Mr. Daniel',
    rating: 5,
    time: '6 місяців тому',
    text: 'Огромная благодарность менеджеру - Раулю, он помог подобрать и выбрать тот Автомобиль, однозначно порекомендую!! Брал этим летом: Ford Escape 2.5. С пробегом 32 тыс. миль. Считаю что это достойная покупка на свои деньги. По моим подсчётам, я сэкономил = от 4тыс. до 4.5 тыс$. Чему очень рад!',
  },
  {
    id: 6,
    name: 'Serhii Aplatov',
    rating: 5,
    time: '8 років тому',
    text: 'Брал у ребят BMW 530d е60, ещё в 2016. Пригнали за 6 дней. Выбирали долго и очень скрупульозно. Выбором был доволен. Машина-ракета. Привёл к ним брата, взял 320і и друзей. Взяли audi a3 и golf, мы с братом давно продали, а друзья растаможели и до сих пор катают. Ребята молодцы, работают, стараются. Думаю взять через ребят challenger или vw atlas. И отдельное спасибо Раулю, всегда можно подъехать, попить кофе, поговорить, посмотреть что есть.',
  },
];

type RelativeTimeLabels = {
  justNow: string;
  minute: string;
  minutes: string;
  hour: string;
  hours: string;
  day: string;
  days: string;
  month: string;
  months: string;
  year: string;
  years: string;
};

export function formatRelativeReviewTime(
  isoDate: string | null | undefined,
  labels: RelativeTimeLabels
): string {
  if (!isoDate) return '';

  const createdAt = new Date(isoDate).getTime();
  if (Number.isNaN(createdAt)) return '';

  const diffMs = Math.max(0, Date.now() - createdAt);
  const minutes = Math.floor(diffMs / 60_000);
  const hours = Math.floor(diffMs / 3_600_000);
  const days = Math.floor(diffMs / 86_400_000);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (minutes < 1) return labels.justNow;
  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? labels.minute : labels.minutes}`;
  }
  if (hours < 24) {
    return `${hours} ${hours === 1 ? labels.hour : labels.hours}`;
  }
  if (days < 30) {
    return `${days} ${days === 1 ? labels.day : labels.days}`;
  }
  if (months < 12) {
    return `${months} ${months === 1 ? labels.month : labels.months}`;
  }
  return `${years} ${years === 1 ? labels.year : labels.years}`;
}
