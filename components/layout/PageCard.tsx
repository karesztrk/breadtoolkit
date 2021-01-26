import { Box, useColorModeValue, ChakraProps } from '@chakra-ui/react';
import React, { FC } from 'react';

interface PageCardProps extends ChakraProps {
  as?: any;
}

const PageCard: FC<PageCardProps> = ({
  as = 'div',
  children,
  p = 6,
  ...rest
}) => {
  const bgColor = useColorModeValue('bg.light', 'bg.dark');
  const color = useColorModeValue('brand.400', 'brand.100');
  const border = useColorModeValue('', '1px');
  const borderColor = useColorModeValue('', 'rgba(255, 255, 255, 0.15)');
  const boxShadow = useColorModeValue('0 50px 100px rgba(59, 52, 55, 0.4)', '');
  return (
    <Box
      as={as}
      p={p}
      rounded="xl"
      bgColor={bgColor}
      color={color}
      maxWidth="md"
      margin="0 auto"
      border={border}
      borderColor={borderColor}
      boxShadow={boxShadow}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default PageCard;
