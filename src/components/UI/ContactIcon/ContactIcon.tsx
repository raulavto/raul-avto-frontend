import Image from 'next/image';
const ContactIcon = ({ href, src, alt }) => (
  <a
    className="focus:outline-focus outline-none"
    href={href}
    target="_blank"
    rel="noreferrer"
  >
    <Image
      className="hover:scale-110 duration-300"
      src={src}
      alt={alt}
      width={56}
      height={56}
    />
  </a>
);

export default ContactIcon;
