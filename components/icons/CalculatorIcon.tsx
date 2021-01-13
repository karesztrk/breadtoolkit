import { chakra, useColorMode } from '@chakra-ui/react';
import { HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';

const MotionIcon = chakra(motion.svg);

const CalculatorIcon = (props: any | HTMLMotionProps<any>) => {
  const { colorMode } = useColorMode();
  return (
    <MotionIcon viewBox="0 0 64 64" {...props}>
      <path
        fill={colorMode === 'light' ? '#ffa88a' : '#fbd38d'}
        d="M57,5V59a2,2,0,0,1-4,0V5a2,2,0,0,1,2-2,2,2,0,0,1,2,2Z"
      />
      <path
        fill={colorMode === 'light' ? '#ffa88a' : '#fbd38d'}
        d="M57,5V41.9a27.37,27.37,0,0,1-4,2.93V5a2,2,0,0,1,2-2,2,2,0,0,1,2,2Z"
      />
      <path
        fill={colorMode === 'light' ? '#ffa88a' : '#fbd38d'}
        d="M11,5V59a2,2,0,0,1-4,0V5A2,2,0,0,1,9,3a2,2,0,0,1,2,2Z"
      />
      <path
        fill={colorMode === 'light' ? '#ffa88a' : '#fbd38d'}
        d="M11,5V41.9a27.37,27.37,0,0,1-4,2.93V5A2,2,0,0,1,9,3a2,2,0,0,1,2,2Z"
      />
      <circle cx="18" cy="14" r="3" fill="#61c3b6" />
      <circle cx="46" cy="32" r="3" fill="#61c3b6" />
      <circle cx="18" cy="50" r="3" fill="#61c3b6" />
      <path
        fill="#4e5b5f"
        d="M55,2a3,3,0,0,0-3,3v8H41.86a4,4,0,0,0-7.72,0H31.86a4,4,0,0,0-7.72,0H21.86a4,4,0,0,0-7.72,0H12V5A3,3,0,0,0,6,5V59a3,3,0,0,0,6,0V51h2.14a4,4,0,0,0,7.72,0h2.28a4,4,0,0,0,7.72,0H42.14a4,4,0,0,0,7.72,0H52v8a3,3,0,0,0,6,0V5A3,3,0,0,0,55,2ZM38,12a2,2,0,1,1-2,2A2,2,0,0,1,38,12ZM28,12a2,2,0,1,1-2,2A2,2,0,0,1,28,12ZM18,12a2,2,0,1,1-2,2A2,2,0,0,1,18,12Zm-3.86,3a4,4,0,0,0,7.72,0h2.28a4,4,0,0,0,7.72,0h2.28a4,4,0,0,0,7.72,0H52V31H49.86a4,4,0,0,0-7.72,0H39.86a4,4,0,0,0-7.72,0H21.86a4,4,0,0,0-7.72,0H12V15ZM48,32a2,2,0,1,1-2-2A2,2,0,0,1,48,32ZM38,32a2,2,0,1,1-2-2A2,2,0,0,1,38,32ZM20,32a2,2,0,1,1-2-2A2,2,0,0,1,20,32ZM10,59a1,1,0,0,1-2,0V5a1,1,0,0,1,2,0Zm8-7a2,2,0,1,1,2-2A2,2,0,0,1,18,52Zm10,0a2,2,0,1,1,2-2A2,2,0,0,1,28,52Zm18,0a2,2,0,1,1,2-2A2,2,0,0,1,46,52Zm3.86-3a4,4,0,0,0-7.72,0H31.86a4,4,0,0,0-7.72,0H21.86a4,4,0,0,0-7.72,0H12V33h2.14a4,4,0,0,0,7.72,0H32.14a4,4,0,0,0,7.72,0h2.28a4,4,0,0,0,7.72,0H52V49ZM56,59a1,1,0,0,1-2,0V5a1,1,0,0,1,2,0Z"
      />
    </MotionIcon>
  );
};

export default CalculatorIcon;
