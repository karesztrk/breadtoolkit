import { Icon } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { FC } from 'react';

const KofiIcon: FC<{ color: string; hoverColor: string }> = ({
  color,
  hoverColor,
}) => {
  return (
    <Icon
      viewBox="0 0 33 33"
      color={color}
      _hover={{ color: hoverColor }}
      transition="color 150ms ease"
    >
      <motion.g fill="none">
        <circle cx="16.28" cy="16.28" fill="currentColor" r="16.28" />
        <path
          d="M22.258 8.8h1.608c3.1 0 5.614 2.514 5.614 5.614v.33c0 3.101-2.514 5.615-5.614 5.615h-1.608v1.69a2.591 2.591 0 01-2.591 2.591H7.43a2.591 2.591 0 01-2.591-2.591V10.096c0-.716.58-1.296 1.296-1.296zm0 2.997v5.565h1.466a2.783 2.783 0 000-5.565z"
          fill="#fff"
        />
        <path
          d="M13.2 14.077c.4-1.171 1.349-1.757 2.846-1.757 2.245 0 3.078 2.794 1.9 4.62-.784 1.218-2.366 2.758-4.746 4.62-2.38-1.862-3.962-3.402-4.747-4.62-1.177-1.826-.344-4.62 1.901-4.62 1.497 0 2.446.586 2.846 1.757z"
          fill="#ff5e5b"
        />
      </motion.g>
    </Icon>
  );
};

export default KofiIcon;
