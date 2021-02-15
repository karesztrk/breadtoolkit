import { Box, chakra, useColorMode, useColorModeValue } from '@chakra-ui/react';
import React, { FC, ReactNode, useEffect, useState, useCallback } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

const MotionText = chakra(motion.p);
const MotionBox = chakra(motion.div);

const imageMotion: Variants = {
  initial: {},
  blurred: {
    filter: 'blur(10px)',
  },
  reveal: {
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
    },
  },
};

const headingMotion: Variants = {
  rest: {
    opacity: 0.2,
    y: 0,
  },
  hover: {
    opacity: 1,
    y: '-65%',
  },
  hoverWithShadow: {
    opacity: 1,
    y: '-65%',
    textShadow: '0px 0px 5px black',
  },
};

const iconMotion: Variants = {
  rest: {
    y: 0,
  },
  hover: {
    y: '-200%',
  },
};

const textMotion: Variants = {
  rest: {
    opacity: 0,
    y: '100%',
  },
  hover: {
    opacity: 1,
    y: '-65%',
  },
};

interface CardProps {
  to: string | { path: string; lazy: boolean };
  title: string;
  description?: string;
  icon?: ReactNode;
  image?: string | { path: string; lazy: boolean };
  height?: number;
  lazy?: boolean;
}

const Card: FC<CardProps> = ({
  to,
  title,
  description,
  icon,
  image,
  height,
}) => {
  // whileHover helper did not executed after page transition
  const animation = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
  });
  const [hovered, setHovered] = useState(false);
  const [imageSource, setImageSource] = useState<string>();
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue('bg.light', 'bg.dark');
  const border = useColorModeValue('', '1px');
  const borderColor = useColorModeValue('', 'rgba(255, 255, 255, 0.15)');
  const boxShadow = useColorModeValue('0 5px 10px rgba(59, 52, 55, 0.4)', '');
  const href = typeof to === 'string' ? to : to.path;
  const prefetch = typeof to === 'string' ? undefined : !to.lazy;
  const imagePath = typeof image === 'string' ? image : image?.path;

  const onImageSourceLoad = useCallback((e: Event) => {
    const target = e.target as HTMLImageElement;
    setImageSource(target.src);
    animation.start('reveal');
  }, []);

  useEffect(() => {
    if (inView && imagePath) {
      setImageSource(`${imagePath}?nf_resize=fit&w=40`);
      const img = new Image();
      img.src = `${imagePath}?nf_resize=fit&w=576`;
      img.addEventListener('load', onImageSourceLoad, false);
      return () => {
        img.removeEventListener('load', onImageSourceLoad);
      };
    }
  }, [inView]);

  return (
    <Link href={href} prefetch={prefetch}>
      <Box
        data-testid="card"
        cursor="pointer"
        rounded="xl"
        zIndex={1}
        overflow="hidden"
        border={border}
        borderColor={borderColor}
        boxShadow={boxShadow}
      >
        <MotionBox
          data-testid="card-wrapper"
          ref={ref}
          minHeight={height}
          position="relative"
          p={[5, 8, 10]}
          initial={image ? 'blurred' : 'initial'}
          bg={imageSource ? `url(${imageSource})` : undefined}
          bgColor={bgColor}
          backgroundRepeat="no-repeat"
          backgroundPosition="center"
          backgroundSize="cover"
          animate={animation}
          variants={imageMotion}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          whileTap={{ scale: 0.95 }}
        >
          <MotionBox
            position="relative"
            zIndex={1}
            variants={iconMotion}
            animate={hovered ? 'hover' : 'rest'}
          >
            {icon}
          </MotionBox>

          <MotionText
            fontFamily="heading"
            fontSize="5xl"
            fontWeight="700"
            color={colorMode === 'light' && !image ? 'brand.300' : 'white'}
            position="absolute"
            bottom="1rem"
            left={0}
            right={0}
            textAlign="center"
            zIndex={0}
            initial="rest"
            animate={hovered ? (image ? 'hoverWithShadow' : 'hover') : 'rest'}
            variants={headingMotion}
            isTruncated
            px={1}
            mx={4}
            borderRadius={10}
            title={title}
          >
            {title}
          </MotionText>
          <MotionText
            textAlign="center"
            position="absolute"
            left={0}
            right={0}
            initial="rest"
            animate={hovered ? 'hover' : 'rest'}
            variants={textMotion}
          >
            {description}
          </MotionText>
        </MotionBox>
      </Box>
    </Link>
  );
};

export default Card;
