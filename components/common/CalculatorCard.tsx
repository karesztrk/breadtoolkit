import { chakra, useColorMode } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import CalculatorIcon from '@/components/icons/CalculatorIcon';
import { useI18n } from 'next-localization';
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
    y: '100%',
  },
  hover: {
    y: '-65%',
  },
};

const CalculatorCard: FC = () => {
  const { t } = useI18n();
  // whileHover helper did not executed after page transition
  const [hovered, setHovered] = useState(false);
  const { colorMode } = useColorMode();
  return (
    <Link href="/calculator">
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
        <CalculatorIcon
          height="5rem"
          width="100%"
          position="relative"
          zIndex={1}
          animate={hovered ? 'hover' : 'rest'}
          variants={iconMotion}
        />
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
          {t('home.calculator-title')}
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
          {t('home.calculator-description')}
        </MotionText>
      </MotionBox>
    </Link>
  );
};

export default CalculatorCard;
