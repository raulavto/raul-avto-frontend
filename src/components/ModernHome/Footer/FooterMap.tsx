import Image from 'next/image';

const FooterMap = () => {
  return (
    <>
      <a
        href="https://maps.app.goo.gl/X1oGUQs9QWNe4h2q9"
        target="_blank"
        className="transform transition duration-300 ease-in-out hover:scale-105 group"
      >
        <Image
          className="rounded-sub-block-16 transform transition duration-300 ease-in-out group-hover:scale-105"
          src="/footer-maps.jpg"
          alt="footer map"
          width={310}
          height={148}
        />
      </a>
    </>
  );
};

export default FooterMap;
