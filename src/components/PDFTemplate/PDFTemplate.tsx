import translations from '../../app/lang/pdfTemplate.json';
import contacts from '../../app/lang/contacts.json';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { renderToString } from 'react-dom/server';

interface PDFTemplateProps {
  data: {
    carName?: string;
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
  const adminContacts = c.phone;
  const totalAmount =
    data.auctionCost +
    data.auctionFee +
    data.ourFee +
    data.totalSeaDelivery +
    data.port_complex +
    data.port_parking +
    data.broker +
    data.groundDelivery +
    data.customFees +
    data.certification +
    data.pension;

  return (
    <div
      style={{
        fontFamily: 'Pangram, Arial, sans-serif',
        width: '210mm',
        padding: '20px 30px',
        boxSizing: 'border-box',
        backgroundColor: 'white',
        margin: '0',
        lineHeight: '1.4',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <img src="/modern-logo.png" alt="logo" width={120} height={60} />
      </div>

      <h1
        style={{
          marginTop: '40px',
          marginBottom: '10px',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        {t?.title || 'Invoice'}
      </h1>
      {data?.carName && (
        <p style={{ fontSize: '14px', marginBottom: '20px' }}>{data.carName}</p>
      )}

      <table
        style={{ width: '100%', borderCollapse: 'collapse', marginTop: '30px' }}
      >
        <thead>
          <tr style={{ backgroundColor: '#ef4444', color: 'white' }}>
            <th
              style={{
                padding: '10px',
                textAlign: 'left',
                border: '1px solid #ddd',
              }}
            >
              <p style={{ margin: 0 }}>{t?.operation || 'Operation'}</p>
            </th>
            <th
              style={{
                padding: '10px',
                textAlign: 'right',
                border: '1px solid #ddd',
                width: '100px',
              }}
            >
              <p style={{ margin: 0, textAlign: 'center' }}>
                {t?.price || 'Price'}
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ backgroundColor: 'white' }}>
            <td
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                fontSize: '14px',
              }}
            >
              {t?.auctionCost?.title || 'Auction Cost'}
              <div style={{ fontSize: '10px', color: '#666' }}>
                {t?.auctionCost?.description}
              </div>
            </td>
            <td
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                textAlign: 'right',
                fontSize: '14px',
              }}
            >
              ${data?.auctionCost || '0'}
            </td>
          </tr>
          <tr style={{ backgroundColor: 'white' }}>
            <td
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                fontSize: '14px',
              }}
            >
              {t?.auctionFee?.title || 'Auction Fee'}
              <div style={{ fontSize: '10px', color: '#666' }}>
                {t?.auctionFee?.description}
              </div>
            </td>
            <td
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                textAlign: 'right',
                fontSize: '14px',
              }}
            >
              ${data?.auctionFee || '0'}
            </td>
          </tr>
          <tr style={{ backgroundColor: 'white' }}>
            <td
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                fontSize: '14px',
              }}
            >
              {t?.ourFee?.title || 'Our Fee'}
              <div style={{ fontSize: '10px', color: '#666' }}>
                {t?.ourFee?.description}
              </div>
            </td>
            <td
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                textAlign: 'right',
                fontSize: '14px',
              }}
            >
              ${data?.ourFee || '0'}
            </td>
          </tr>
          <tr style={{ backgroundColor: 'white' }}>
            <td
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                fontSize: '14px',
              }}
            >
              {t?.totalSeaDelivery?.title || 'Sea Delivery'}{' '}
              {t?.portName?.[data?.deliveryPort] || ''}
              <div style={{ fontSize: '10px', color: '#666' }}>
                {t?.totalSeaDelivery?.description || ''}{' '}
                {t?.portName?.[data?.deliveryPort] || ''}
              </div>
            </td>
            <td
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                textAlign: 'right',
                fontSize: '14px',
              }}
            >
              ${data?.totalSeaDelivery || '0'}
            </td>
          </tr>
          <tr style={{ backgroundColor: 'white' }}>
            <td
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                fontSize: '14px',
              }}
            >
              {t?.port_complex?.title || 'Port Complex'}
              <div style={{ fontSize: '10px', color: '#666' }}>
                {t?.port_complex?.description}
              </div>
            </td>
            <td
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                textAlign: 'right',
                fontSize: '14px',
              }}
            >
              ${data?.port_complex || '0'}
            </td>
          </tr>
          <tr style={{ backgroundColor: 'white' }}>
            <td
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                fontSize: '14px',
              }}
            >
              {t?.port_parking?.title || 'Port Parking'}
              <div style={{ fontSize: '10px', color: '#666' }}>
                {t?.port_parking?.description}
              </div>
            </td>
            <td
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                textAlign: 'right',
                fontSize: '14px',
              }}
            >
              ${data?.port_parking || '0'}
            </td>
          </tr>
          <tr style={{ backgroundColor: 'white' }}>
            <td
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                fontSize: '14px',
              }}
            >
              {t?.broker?.title || 'Broker'}
              <div style={{ fontSize: '10px', color: '#666' }}>
                {t?.broker?.description}
              </div>
            </td>
            <td
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                textAlign: 'right',
                fontSize: '14px',
              }}
            >
              ${data?.broker || '0'}
            </td>
          </tr>
          <tr style={{ backgroundColor: 'white' }}>
            <td
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                fontSize: '14px',
              }}
            >
              {t?.customFees?.title || 'Custom Fees'}
              <div style={{ fontSize: '10px', color: '#666' }}>
                {t?.customFees?.description}
              </div>
            </td>
            <td
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                textAlign: 'right',
                fontSize: '14px',
              }}
            >
              ${data?.customFees || '0'}
            </td>
          </tr>
          <tr style={{ backgroundColor: 'white' }}>
            <td
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                fontSize: '14px',
              }}
            >
              {t?.groundDelivery?.title || 'Ground Delivery'}
              <div style={{ fontSize: '10px', color: '#666' }}>
                {t?.groundDelivery?.description}
              </div>
            </td>
            <td
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                textAlign: 'right',
                fontSize: '14px',
              }}
            >
              ${data?.groundDelivery || '0'}
            </td>
          </tr>
          <tr style={{ backgroundColor: 'white' }}>
            <td
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                fontSize: '14px',
              }}
            >
              {t?.certification?.title || 'Certification'}
              <div style={{ fontSize: '10px', color: '#666' }}>
                {t?.certification?.description}
              </div>
            </td>
            <td
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                textAlign: 'right',
                fontSize: '14px',
              }}
            >
              ${data?.certification || '0'}
            </td>
          </tr>
          <tr style={{ backgroundColor: 'white' }}>
            <td
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                fontSize: '14px',
              }}
            >
              {t?.pension?.title || 'Pension'}
              <div style={{ fontSize: '10px', color: '#666' }}>
                {t?.pension?.description}
              </div>
            </td>
            <td
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                textAlign: 'right',
                fontSize: '14px',
              }}
            >
              ${data?.pension || '0'}
            </td>
          </tr>
          <tr style={{ backgroundColor: '#ef4444', color: 'white' }}>
            <td
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              {t?.totalAmount || 'Total Amount'}
            </td>
            <td
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                textAlign: 'right',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              ${totalAmount || '0'}
            </td>
          </tr>
        </tbody>
      </table>
      <p style={{ marginTop: '20px', fontSize: '14px', color: '#ef4444' }}>
        {t?.flavorText || ''}
      </p>
    </div>
  );
};

export const createPDFDocument = async ({
  data,
  language,
}: PDFTemplateProps) => {
  const element = renderToString(
    <PDFTemplate data={data} language={language} />
  );
  // Create a temporary container
  const container = document.createElement('div');
  container.innerHTML = element;
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '-9999px';
  container.style.width = '210mm'; // A4 width
  document.body.appendChild(container);

  // Convert to canvas
  const canvas = await html2canvas(container, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    allowTaint: true,
    windowHeight: container.scrollHeight,
  });
  // Remove temporary container
  document.body.removeChild(container);

  // Get canvas dimensions
  const imgData = canvas.toDataURL('image/png');
  const imgWidth = 210; // A4 width in mm
  const pageHeight = 295; // A4 height in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  // Create PDF
  const pdf = new jsPDF('p', 'mm', 'a4');

  // Add single page or multiple pages only if needed
  pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

  if (imgHeight > pageHeight) {
    let position = pageHeight;
    while (position < imgHeight) {
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, -position, imgWidth, imgHeight);
      position += pageHeight;
    }
  }

  // Download the PDF
  pdf.save();
};
