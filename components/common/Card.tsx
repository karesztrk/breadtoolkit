import { chakra, useColorMode } from '@chakra-ui/react';
import React, { FC, ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const MotionText = chakra(motion.p);
const MotionBox = chakra(motion.div);

const headingMotion = {
  rest: {
    opacity: 0.5,
    y: 0,
  },
  hover: {
    opacity: 1,
    y: '-65%',
  },
};

const iconMotion = {
  rest: {
    y: 0,
  },
  hover: {
    y: '-200%',
  },
};

const textMotion = {
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
  description: string;
  icon?: ReactNode;
}

const Card: FC<CardProps> = ({ path, title, description, icon }) => {
  // whileHover helper did not executed after page transition
  const [hovered, setHovered] = useState(false);
  const { colorMode } = useColorMode();
  return (
    <Link href={path}>
      <MotionBox
        cursor="pointer"
        bg={colorMode === 'light' ? 'white' : '#393432'}
        borderWidth="1px"
        rounded="xl"
        p={[5, 8, 10]}
        boxShadow="md"
        position="relative"
        zIndex={1}
        overflow="hidden"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        <MotionBox
          position="relative"
          zIndex={1}
          animate={hovered ? 'hover' : 'rest'}
          variants={iconMotion}
        >
          {icon}
        </MotionBox>

        <MotionText
          fontFamily="heading"
          fontSize="5xl"
          fontWeight="700"
          color={colorMode === 'light' ? 'brand.300' : 'white'}
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
