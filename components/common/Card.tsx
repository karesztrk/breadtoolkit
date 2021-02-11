import { chakra, useColorMode, useColorModeValue } from '@chakra-ui/react';
import React, { FC, ReactNode, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const MotionText = chakra(motion.p);
const MotionBox = chakra(motion.div);

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
  image?: string;
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
  const [hovered, setHovered] = useState(false);
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue('bg.light', 'bg.dark');
  const border = useColorModeValue('', '1px');
  const borderColor = useColorModeValue('', 'rgba(255, 255, 255, 0.15)');
  const boxShadow = useColorModeValue('0 5px 10px rgba(59, 52, 55, 0.4)', '');
  const href = typeof to === 'string' ? to : to.path;
  const prefetch = typeof to === 'string' ? undefined : !to.lazy;
  return (
    <Link href={href} prefetch={prefetch}>
      <MotionBox
        cursor="pointer"
        minHeight={height}
        bgColor={bgColor}
        rounded="xl"
        p={[5, 8, 10]}
        position="relative"
        zIndex={1}
        overflow="hidden"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileTap={{ scale: 0.95 }}
        border={border}
        borderColor={borderColor}
        boxShadow={boxShadow}
      >
        {image && (
          <Image
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            src={image}
            loader={({ src }) => `${src}?nf_resize=fit&w=480`}
          />
        )}
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
    </Link>
  );
};

export default Card;
