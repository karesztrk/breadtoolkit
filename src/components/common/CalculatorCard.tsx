import { Heading, Text } from '@chakra-ui/core';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import CalculatorIcon from '../icons/CalculatorIcon';

const CalculatorCard: FC = () => {
  const [t] = useTranslation();
  return (
    <>
      <CalculatorIcon
        fontSize="5rem"
        width="100%"
        transition="inherit"
        _groupHover={{
          transform: 'translateY(-200%)',
        }}
      />
      <Heading
        as="h3"
        size="2xl"
        color="brand.300"
        opacity={0.3}
        position="absolute"
        bottom="1rem"
        transition="inherit"
        left={0}
        right={0}
        textAlign="center"
        _groupHover={{
          transform: 'translateY(-150%)',
        }}
      >
        {t('home.calculator.title')}
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
        {t('home.calculator.description')}
      </Text>
    </>
  );
};

export default CalculatorCard;
