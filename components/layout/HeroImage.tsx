import { useColorMode } from '@chakra-ui/react';

const HeroImage = () => {
  const { colorMode } = useColorMode();
  return (
    <picture>
      <source
        srcSet={`/images/bg/${colorMode}/fhd.avif`}
        sizes="100vw"
        type="image/avif"
      />
      <source
        srcSet={`/images/bg/${colorMode}/fhd.webp`}
        sizes="100vw"
        type="image/webp"
      />
      <img
        alt="Bread Toolkit"
        width="100%"
        height="50vh"
        style={{
          width: '100%',
          height: '50vh',
          objectFit: 'cover',
        }}
        sizes="100vw"
        src={`/images/bg/${colorMode}/fhd.jpg`}
        srcSet={`/images/bg/${colorMode}/fhd.jpg?nf_resize=fit&w=640 640w,
            /images/bg/${colorMode}/fhd.jpg?nf_resize=fit&w=750 750w,
            /images/bg/${colorMode}/fhd.jpg?nf_resize=fit&w=828 828w,
            /images/bg/${colorMode}/fhd.jpg?nf_resize=fit&w=1080 1080w,
            /images/bg/${colorMode}/fhd.jpg?nf_resize=fit&w=1200 1200w,
            /images/bg/${colorMode}/fhd.jpg?nf_resize=fit&w=1920 1920w`}
      />
    </picture>
  );
};

export default HeroImage;
