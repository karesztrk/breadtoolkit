import { chakra, useColorMode } from '@chakra-ui/react';
import React, { FC, ReactNode, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

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
  path: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  image?: string;
  height?: number;
}

const Card: FC<CardProps> = ({
  path,
  title,
  description,
  icon,
  image,
  height,
}) => {
  // whileHover helper did not executed after page transition
  const [hovered, setHovered] = useState(false);
  const { colorMode } = useColorMode();
  return (
    <Link href={path}>
      <MotionBox
        cursor="pointer"
        minHeight={height}
        bg={image ? `url(${image})` : undefined}
        bgColor={colorMode === 'light' ? 'white' : 'brand.400'}
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        backgroundSize="cover"
        rounded="xl"
        p={[5, 8, 10]}
        position="relative"
        zIndex={1}
        overflow="hidden"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileTap={{ scale: 0.95 }}
        border={colorMode === 'dark' ? '1px' : ''}
        borderColor={colorMode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : ''}
        boxShadow={colorMode === 'dark' ? '' : '0 0 10px rgba(59, 52, 55, 0.4)'}
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
          animate={hovered ? 'hover' : 'rest'}
          variants={headingMotion}
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
