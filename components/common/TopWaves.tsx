import React, { FC } from 'react';
import { Box, ChakraProps } from '@chakra-ui/react';
import { usePrefersReducedMotion } from '@chakra-ui/react';

const TopWaves: FC<ChakraProps> = (props: ChakraProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  return (
    <Box
      overflow="hidden"
      height={['30px', '30px', '45px']}
      position="absolute"
      width="100%"
      left="0"
      bottom="0"
      mb="-1px"
      {...props}
    >
      <svg
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        height="100%"
        width="calc(100% + 1.3px)"
        color="inherit"
      >
        <path
          d="M 985.66 172.83 C 906.67 152 823.78 111 743.84 94.19 c -82.26 -17.34 -168.06 -16.33 -250.45 0.39 c -57.84 11.73 -114 31.07 -172 41.86 A 600.21 600.21 0 0 1 0 107.35 V 200 H 1200 V 175.8 C 1132.19 198.92 1055.71 191.31 985.66 172.83 Z"
          fill="currentColor"
        >
          {!prefersReducedMotion && (
            <animate
              repeatCount="indefinite"
              fill="currentColor"
              attributeName="d"
              dur="12s"
              values="
            M-150 100 
            C 473,283
              822,-40
              1350,100 

            V 359 
            H 0 
            V 67 
            Z; 

            M-150 100
            C 473,-40
              1222,283
              1350,100 

            V 359 
            H 0 
            V 67 
            Z; 

            M-150 100
            C 973,260
              1722,-53
              1350,100 

            V 359 
            H 0 
            V 67 
            Z; 

            M-150 100
            C 473,283
              822,-40
              1350,100 

            V 359 
            H 0 
            V 67 
            Z
            "
            />
          )}
        </path>
      </svg>
    </Box>
  );
};

export default TopWaves;
