import { Heading, Text, useColorMode } from '@chakra-ui/react';
import React, { FC } from 'react';
import CalculatorIcon from '@/components/icons/CalculatorIcon';
import { useI18n } from 'next-localization';

const CalculatorCard: FC = () => {
  const { t } = useI18n();
  const { colorMode } = useColorMode();
  return (
    <>
      <CalculatorIcon
        fontSize="5rem"
        width="100%"
        transition="inherit"
        _groupHover={{
          transform: 'translateY(-200%)',
        }}
        position="relative"
        zIndex={1}
      />
      <Heading
        as="p"
        size="2xl"
        color={colorMode === 'light' ? 'brand.300' : 'white'}
        opacity={colorMode === 'light' ? 0.3 : 0.8}
        position="absolute"
        bottom="1rem"
        transition="inherit"
        left={0}
        right={0}
        textAlign="center"
        _groupHover={{
          transform: 'translateY(-150%)',
          opacity: 1,
        }}
        zIndex={0}
      >
        {t('home.calculator-title')}
      </Heading>
      <Text
        textAlign="center"
        transform="translateY(200%)"
        transition="inherit"
        position="absolute"
        left={0}
        right={0}
        _groupHover={{
          transform: 'translateY(-75%)',
        }}
      >
        {t('home.calculator-description')}
      </Text>
    </>
  );
};

export default CalculatorCard;
