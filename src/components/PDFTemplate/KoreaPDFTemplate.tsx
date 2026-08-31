import translations from '../../app/lang/pdfTemplate.json';
import contacts from '../../app/lang/contacts.json';
import { FiPhone } from 'react-icons/fi';
import { Inter } from 'next/font/google';

const inter = Inter({
  weight: ['500', '700', '900'],
  subsets: ['latin', 'cyrillic'],
});

export type KoreaPDFData = {
  carCostUsd: number;
  ourFee: number;
  inspection: number;
  deliveryEurope: number;
  loadingExport: number;
  customFees: number;
  portComplex: number;
  broker: number;
  deliveryPickup: number;
  certification: number;
  pension: number;
  totalAmount?: number;
  yearOfManufacture?: number;
  carMake?: string;
  carModel?: string;
};

type KoreaPDFTemplateProps = {
  data: KoreaPDFData;
  language: string;
  carName?: string;
};

const accentRed = '#FF1919';

/** Пастельні фони етапів — як у референсному PDF */
const STAGE_COLORS = {
  1: '#FFFFFF',
  2: '#D6EAF8',
  3: '#F5D0E8',
  4: '#D5F5E3',
  5: '#F2F3F4',
} as const;

const Row = ({
  title,
  description,
  price,
  bg,
  stage,
  stageRowSpan,
  showStage,
  isLast,
}: {
  title: string;
  description?: string;
  price: number | string;
  bg: string;
  stage?: string;
  stageRowSpan?: number;
  showStage?: boolean;
  isLast?: boolean;
}) => (
  <tr style={{ backgroundColor: bg }} className={isLast ? '' : 'border-b border-[#c8c8c8]'}>
    <td className="px-[10px] pt-[8px] pb-[8px] text-[17px] leading-[21px] font-semibold tracking-[0.01em] align-top text-black">
      {title}
      {description ? (
        <span className="text-[11px] leading-[14px] font-medium normal-case">
          {' '}
          {description}
        </span>
      ) : null}
    </td>
    <td className="px-[10px] pt-[8px] pb-[8px] text-[20px] leading-[22px] font-semibold text-right -tracking-[0.03em] align-middle whitespace-nowrap w-[100px] text-black">
      {price}
    </td>
    {showStage ? (
      <td
        rowSpan={stageRowSpan}
        className="px-[4px] text-center align-middle border-l border-[#c8c8c8] w-[72px]"
        style={{ backgroundColor: bg }}
      >
        <div className="text-[15px] leading-[18px] font-bold text-black tracking-[0.01em] whitespace-pre-line">
          {stage}
        </div>
      </td>
    ) : null}
  </tr>
);

export const KoreaPDFTemplate = ({
  data,
  language,
  carName,
}: KoreaPDFTemplateProps) => {
  const t = translations[language]?.korea || translations.ru.korea;
  const c = contacts[language];
  const adminContacts = c.phone;
  const year = String(data.yearOfManufacture || '').trim();
  const name = (carName || `${data.carMake || ''} ${data.carModel || ''}`).trim();
  let nameOnly = name;
  if (year && nameOnly) {
    nameOnly = nameOnly
      .replace(new RegExp(`^${year}\\b\\s*`), '')
      .replace(new RegExp(`\\s*\\b${year}$`), '')
      .trim();
  }
  const carTitle = [year, nameOnly].filter(Boolean).join(' ');

  const totalAmount =
    data.totalAmount ??
    data.inspection * 1 +
      data.carCostUsd * 1 +
      data.ourFee * 1 +
      data.deliveryEurope * 1 +
      data.loadingExport * 1 +
      data.customFees * 1 +
      data.portComplex * 1 +
      data.broker * 1 +
      data.deliveryPickup * 1 +
      data.certification * 1 +
      data.pension * 1;

  return (
    <div
      data-pdf-root
      className={`${inter.className} w-[792px] pl-[25px] pr-[40px] pt-[175px] box-sizing-border-box relative bg-white overflow-hidden z-100`}
    >
      <img
        src="/pdf/top-left-flag.png"
        alt="logo"
        width={792}
        height={289}
        className="absolute drop-shadow-[0_8px_16px_rgba(255,45,45,0.45)] top-0 left-0 z-20"
      />
      <img
        src="/pdf/top-right-flag.png"
        alt="logo"
        width={241}
        height={163}
        className="absolute top-[27px] -right-[1px] z-10 drop-shadow-[0_8px_16px_rgba(255,45,45,0.45)]"
      />
      <img
        src="/pdf/bot-flag.png"
        alt="logo"
        width={792}
        height={144}
        className="flex justify-center items-center absolute bottom-0 left-0 drop-shadow-[0_-8px_12px_rgba(255,45,45,0.4)] z-10"
      />
      <img
        src="/pdf/bot-left-flag.png"
        alt="logo"
        width={792}
        height={80}
        className="flex justify-center items-center absolute bottom-0 left-0 z-30"
      />
      <div className="absolute bottom-0 left-0 z-40 pl-[38px] flex items-center gap-[6px]">
        <FiPhone className="stroke-black w-[34px] h-[34px] rounded-full bg-white p-[6px]" />
        <p className="text-white text-[34px] font-semibold tracking-[-0.02em]">
          {adminContacts}
        </p>
      </div>

      <div className="relative z-20">
        <div className="ml-[300px] mb-[22px] flex items-center">
          <div className="inline-block pr-[4px] border-r-[7px] border-black p-[6px] mr-[15px]">
            <img
              src="/pdf/korea-flag.png"
              alt="Korea"
              width={63}
              height={53}
              className="block rounded-[12px]"
            />
          </div>
          <h1
            className={`${inter.className} text-[20px] leading-[26px] font-black inline-block uppercase whitespace-pre-line`}
          >
            {t?.title || 'Preliminary calculation of a car from South Korea'}
          </h1>
        </div>

        <h2
          className={`${inter.className} text-[24px] mb-[18px] leading-[24px] font-semibold text-center uppercase`}
        >
          {carTitle}
        </h2>

        <div className="pr-[4px] w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ backgroundColor: accentRed }} className="text-white">
                <th className="px-[12px] pt-[6px] pb-[4px] text-left">
                  <p className="text-[18px] leading-[26px] font-bold tracking-[0.03em]">
                    {t?.operation || 'Operation'}
                  </p>
                </th>
                <th className="px-[10px] pt-[2px] text-center w-[100px]">
                  <p className="text-[18px] leading-[26px] font-bold tracking-[0.03em]">
                    {t?.price || 'Price'}
                  </p>
                </th>
                <th className="px-[4px] pt-[2px] text-center w-[72px]">
                  <p className="text-[13px] leading-[26px] font-bold tracking-[0.03em]">
                    {t?.stageCol || ''}
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              <Row
                title={t.inspection.title}
                description={t.inspection.description}
                price={data.inspection}
                bg={STAGE_COLORS[1]}
                stage={t.stage1}
                stageRowSpan={1}
                showStage
              />
              <Row
                title={t.carCost.title}
                description={t.carCost.description}
                price={data.carCostUsd}
                bg={STAGE_COLORS[2]}
                stage={t.stage2}
                stageRowSpan={4}
                showStage
              />
              <Row
                title={t.ourFee.title}
                description={t.ourFee.description}
                price={data.ourFee}
                bg={STAGE_COLORS[2]}
              />
              <Row
                title={t.deliveryEurope.title}
                description={t.deliveryEurope.description}
                price={data.deliveryEurope}
                bg={STAGE_COLORS[2]}
              />
              <Row
                title={t.loadingExport.title}
                description={t.loadingExport.description}
                price={data.loadingExport}
                bg={STAGE_COLORS[2]}
              />
              <Row
                title={t.customFees.title}
                description={t.customFees.description}
                price={data.customFees}
                bg={STAGE_COLORS[3]}
                stage={t.stage3}
                stageRowSpan={1}
                showStage
              />
              <Row
                title={t.portComplex.title}
                description={t.portComplex.description}
                price={data.portComplex}
                bg={STAGE_COLORS[4]}
                stage={t.stage4}
                stageRowSpan={4}
                showStage
              />
              <Row
                title={t.broker.title}
                description={t.broker.description}
                price={data.broker}
                bg={STAGE_COLORS[4]}
              />
              <Row
                title={t.deliveryPickup.title}
                description={t.deliveryPickup.description}
                price={data.deliveryPickup}
                bg={STAGE_COLORS[4]}
              />
              <Row
                title={t.certification.title}
                description={t.certification.description}
                price={data.certification}
                bg={STAGE_COLORS[4]}
              />
              <Row
                title={t.pension.title}
                description={t.pension.description}
                price={data.pension}
                bg={STAGE_COLORS[5]}
                stage={t.stage5}
                stageRowSpan={1}
                showStage
                isLast
              />
              <tr style={{ backgroundColor: accentRed }} className="text-white">
                <td
                  colSpan={2}
                  className="px-[12px] pt-[10px] pb-[8px] text-[18px] leading-[22px] font-semibold tracking-[0.02em]"
                >
                  {t?.totalAmount || 'Total'}
                </td>
                <td className="px-[8px] text-[20px] leading-[22px] font-semibold text-right -tracking-[0.05em] whitespace-nowrap">
                  {Math.round(totalAmount)}$
                </td>
              </tr>
            </tbody>
          </table>
          <p
            className="px-[20px] pt-[12px] pb-[82px] text-center text-[14px] leading-[20px] font-extrabold tracking-[0.02em] bg-white"
            style={{ color: accentRed }}
          >
            {t?.flavorText || ''}
          </p>
        </div>
      </div>
    </div>
  );
};
