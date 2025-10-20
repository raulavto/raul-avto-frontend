import translations from '../../app/lang/pdfTemplate.json';
import contacts from '../../app/lang/contacts.json';
import { FiPhone } from 'react-icons/fi';
import { Inter } from 'next/font/google';
import calculator from '../../app/lang/calculator.json';

const inter = Inter({
  weight: ['500', '700', '900'],
  subsets: ['latin', 'cyrillic'],
});

interface PDFTemplateProps {
  data: {
    carType: string;
    yearOfManufacture: number;
    fuelType: string;
    engineCapacity: number;
    auctionCost: number;
    auctionFee: number;
    ourFee: number;
    deliveryPort: string;
    totalSeaDelivery: number;
    port_complex: number;
    port_parking: number;
    broker: number;
    groundDelivery: number;
    customFees: number;
    certification: number;
    pension: number;
  };
  language: string;
}

export const PDFTemplate = ({ data, language }: PDFTemplateProps) => {
  const t = translations[language];
  const c = contacts[language];
  const carData = calculator[language];
  const adminContacts = c.phone;
  const carType = carData.options[data.carType];
  const carFuel = carData.options.fuelOptions[data.fuelType];
  const totalAmount =
    data.auctionCost * 1 +
    data.auctionFee * 1 +
    data.ourFee * 1 +
    data.totalSeaDelivery * 1 +
    data.port_complex * 1 +
    data.port_parking * 1 +
    data.broker * 1 +
    data.groundDelivery * 1 +
    data.customFees * 1 +
    data.certification * 1 +
    data.pension * 1;

  return (
    <div
      className={`${inter.className} w-[792px] pl-[25px] pr-[54px] pt-[175px] box-sizing-border-box relative bg-white overflow-hidden z-100`}
    >
      <img
        src="/pdf/top-left-flag.png"
        alt="logo"
        width={792}
        height={289}
        className="absolute drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] top-0 left-0 z-20"
      />
      <img
        src="/pdf/top-right-flag.png"
        alt="logo"
        width={241}
        height={163}
        className="absolute top-[27px] -right-[1px] z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
      />
      <img
        src="/pdf/bot-flag.png"
        alt="logo"
        width={792}
        height={144}
        className="flex justify-center items-center absolute bottom-0 left-0 drop-shadow-[0_-10px_10px_rgba(0,0,0,0.6)] z-10"
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
        <div className="ml-[352px] mb-[27px] flex items-center">
          <div className="inline-block pr-[4px] border-r-[7px] border-black p-[6px] mr-[15px]">
            <img
              src="/pdf/us-flag.png"
              alt="US"
              width={63}
              height={53}
              className="block rounded-[12px]"
            />
          </div>
          <h1
            className={`${inter.className} text-[24px] leading-[30px] font-black inline-block uppercase whitespace-pre-line`}
          >
            {t?.title || 'Invoice'}
          </h1>
        </div>

        <h2
          className={`${inter.className} text-[24px] mb-[22px] leading-[24px] font-semibold text-center uppercase`}
        >
          {data.yearOfManufacture} {carType} {carFuel} {data.engineCapacity}
        </h2>

        <div className="pr-[12px] w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#ef4444] text-white">
                <th className="px-[12px] pt-[6px] pb-[4px] text-left">
                  <p className="text-[20px] leading-[28px] font-bold tracking-[0.03em]">
                    {t?.operation || 'Operation'}
                  </p>
                </th>
                <th className="px-[28px] pt-[2px] text-right w-[100px]">
                  <p className="text-[20px] leading-[28px] font-bold tracking-[0.03em] text-center">
                    {t?.price || 'Price'}
                  </p>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr className="border-b border-[#d1d5db]">
                <td className="px-[7px] pt-[4px] pb-[4px] text-[23px] leading-[28px] font-semibold tracking-[0.02em]">
                  {t?.auctionCost?.title || 'Auction Cost'}
                  <span className="text-[10px] ">
                    {t?.auctionCost?.description}
                  </span>
                </td>
                <td className="px-[10px] pt-[4px] pb-[4px] text-[24px] leading-[28px] font-semibold text-right -tracking-[0.05em]">
                  {data?.auctionCost || '0'}
                </td>
              </tr>
              <tr className="border-b border-[#d1d5db]">
                <td className="pb-[14px] px-[7px] pt-[7px] text-[23px] leading-[20px] font-semibold tracking-[0.02em]">
                  {t?.auctionFee?.title || 'Auction Fee'}
                  <span className="text-[14px] lowercase leading-[12px]">
                    {' '}
                    {t?.auctionFee?.description}
                  </span>
                </td>
                <td className="px-[10px] text-[24px] leading-[28px] font-semibold text-right -tracking-[0.05em]">
                  {data?.auctionFee || '0'}
                </td>
              </tr>
              <tr className="border-b border-[#d1d5db]">
                <td className="px-[7px] pt-[7px] pb-[14px] text-[23px] leading-[20px] font-semibold tracking-[0.02em]">
                  {t?.ourFee?.title || 'Our Fee'}
                  <span className="text-[14px] lowercase leading-[12px]">
                    {' '}
                    {t?.ourFee?.description}
                  </span>
                </td>
                <td className="px-[10px] pt-[4px] pb-[4px] text-[24px] leading-[28px] font-semibold text-right -tracking-[0.05em]">
                  {data?.ourFee || '0'}
                </td>
              </tr>
              <tr className="border-b border-[#d1d5db]">
                <td className="px-[7px] pt-[7px] pb-[4px] text-[23px] leading-[20px] font-semibold tracking-[0.02em]">
                  {t?.totalSeaDelivery?.title || 'Sea Delivery'}{' '}
                  {t?.portName?.[data?.deliveryPort] || ''}
                  <div className="text-[10px] ">
                    {t?.totalSeaDelivery?.description || ''}{' '}
                    {t?.portName?.[data?.deliveryPort] || ''}
                    {')'}
                  </div>
                </td>
                <td className="px-[10px] pt-[4px] pb-[4px] text-[24px] leading-[28px] font-semibold text-right -tracking-[0.05em]">
                  {data?.totalSeaDelivery || '0'}
                </td>
              </tr>
              <tr className="border-b border-[#d1d5db]">
                <td className="px-[7px] pt-[7px] pb-[14px] text-[23px] leading-[20px] font-semibold tracking-[0.02em]">
                  {t?.port_complex?.title || 'Port Complex'}
                  <span className="text-[14px] lowercase leading-[12px]">
                    {' '}
                    {t?.port_complex?.description}
                  </span>
                </td>
                <td className="px-[10px] text-[24px] leading-[28px] font-semibold text-right -tracking-[0.05em]">
                  {data?.port_complex || '0'}
                  <span className="text-white bg-black font-medium">€</span>
                </td>
              </tr>
              <tr className="border-b border-[#d1d5db]">
                <td className="px-[7px] pt-[7px] pb-[14px] text-[23px] leading-[20px] font-semibold tracking-[0.02em]">
                  {t?.port_parking?.title || 'Port Parking'}
                  <span className="text-[14px] lowercase leading-[12px]">
                    {' '}
                    {t?.port_parking?.description}
                  </span>
                </td>
                <td className="px-[10px] text-[24px] leading-[28px] font-semibold text-right -tracking-[0.05em]">
                  {data?.port_parking || '0'}
                  <span className="text-white bg-black font-medium">€</span>
                </td>
              </tr>
              <tr className="border-b border-[#d1d5db]">
                <td className="px-[7px] pt-[7px] pb-[14px] text-[23px] leading-[20px] font-semibold tracking-[0.02em]">
                  {t?.broker?.title || 'Broker'}
                  <span className="text-[14px] lowercase leading-[12px]">
                    {' '}
                    {t?.broker?.description}
                  </span>
                </td>
                <td className="px-[10px] text-[24px] leading-[28px] font-semibold text-right -tracking-[0.05em]">
                  {data?.broker || '0'}
                </td>
              </tr>
              <tr className="border-b border-[#d1d5db]">
                <td className="px-[7px] pt-[7px] pb-[14px] text-[23px] leading-[20px] font-semibold tracking-[0.02em]">
                  {t?.customFees?.title || 'Custom Fees'}
                  <span className="text-[14px] lowercase leading-[12px]">
                    {' '}
                    {t?.customFees?.description}
                  </span>
                </td>
                <td className="px-[10px] text-[24px] leading-[28px] font-semibold text-right -tracking-[0.05em]">
                  {data?.customFees || '0'}
                </td>
              </tr>
              <tr className="border-b border-[#d1d5db]">
                <td className="px-[7px] pt-[7px] pb-[14px] text-[23px] leading-[20px] font-semibold tracking-[0.02em]">
                  {t?.groundDelivery?.title || 'Ground Delivery'}
                  <span className="text-[14px] leading-[12px]">
                    {' '}
                    {t?.groundDelivery?.description}
                  </span>
                </td>
                <td className="px-[10px] text-[24px] leading-[28px] font-semibold text-right -tracking-[0.05em]">
                  {data?.groundDelivery || '0'}
                </td>
              </tr>
              <tr className="border-b border-[#d1d5db]">
                <td className="px-[7px] pt-[7px] pb-[14px] text-[23px] leading-[20px] font-semibold tracking-[0.02em]">
                  {t?.certification?.title || 'Certification'}
                  <span className="text-[14px] lowercase leading-[12px]">
                    {' '}
                    {t?.certification?.description}
                  </span>
                </td>
                <td className="px-[10px] text-[24px] leading-[28px] font-semibold text-right -tracking-[0.05em]">
                  {data?.certification || '0'}
                </td>
              </tr>
              <tr>
                <td className="px-[7px] pt-[7px] pb-[14px] text-[23px] leading-[20px] font-semibold tracking-[0.02em]">
                  {t?.pension?.title || 'Pension'}
                  <span className="text-[14px] lowercase leading-[12px]">
                    {' '}
                    {t?.pension?.description}
                  </span>
                </td>
                <td className="px-[10px] text-[24px] leading-[28px] font-semibold text-right -tracking-[0.05em]">
                  {data?.pension || '0'}
                </td>
              </tr>
              <tr className="bg-[#ef4444] text-white">
                <td className="px-[12px] pt-[10px] pb-[8px] text-[20px] leading-[20px] font-semibold tracking-[0.02em]">
                  {t?.totalAmount || 'Total Amount'}
                </td>
                <td className="px-[10px] text-[24px] leading-[24px] font-semibold text-right -tracking-[0.05em]">
                  {totalAmount || '0'}$
                </td>
              </tr>
            </tbody>
          </table>
          <p className="px-[20px] pt-[12px] pb-[82px] text-center text-[14px] leading-[20px] font-extrabold tracking-[0.02em] text-[#ef4444] bg-white">
            {t?.flavorText || ''}
          </p>
        </div>
      </div>
    </div>
  );
};

// Server-side function to render PDFTemplate to HTML string using actual component
export const renderPDFTemplateToString = async ({
  data,
  language,
}: PDFTemplateProps) => {
  // Import React and renderToString dynamically to avoid SSR issues
  const React = await import('react');
  const { renderToString } = await import('react-dom/server');

  // Create the component element
  const element = React.createElement(PDFTemplate, { data, language });

  // Render to string
  return renderToString(element);
};

export const generatePDF = async ({ data, language }: PDFTemplateProps) => {
  try {
    const response = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data, language }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate PDF');
    }

    // Get the PDF blob
    const pdfBlob = await response.blob();

    // Create download link
    const url = window.URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `calculation-puppeteer-${Date.now()}.pdf`;

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
