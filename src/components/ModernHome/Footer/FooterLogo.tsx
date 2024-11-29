import Image from 'next/image';
import Link from 'next/link';

const FooterLogo = () => {
  return (
    <Link href="/">
      <Image
        src="/footer-logo.png"
        alt="footer logo"
        width={170}
        height={113}
      />
    </Link>
  );
};

export default FooterLogo;
