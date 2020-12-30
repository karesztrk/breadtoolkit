import { Box, chakra, useColorMode } from '@chakra-ui/react';
import React, { FC, ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const MotionBox = chakra(motion.div);

const GridItem: FC<{ to: string; children: ReactNode[] | ReactNode }> = ({
  to,
  children,
}) => {
  const { colorMode } = useColorMode();
  return (
    <Link href={to}>
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
      >
        {children}
      </MotionBox>
    </Link>
  );
};

export default GridItem;
