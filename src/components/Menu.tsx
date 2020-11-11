import { changeLanguage } from '@app/util/languageUtil';
import { Box, Icon, Link, Stack, Text, Select } from '@chakra-ui/core';
import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

const Menu = () => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const onChangeLanguage = (e: ChangeEvent<HTMLSelectElement>) =>
    changeLanguage(e.target.value);
  return (
    <Stack alignItems="center" direction="row">
      <Text mr={6} display="block">
        <Link to="/calculator">{t('header.calculator.title')}</Link>
      </Text>
      <Box fill="white">
        <Icon boxSize={5} color="white">
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path
            fill="currentColor"
            d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"
          />
        </Icon>
      </Box>
      <Select variant="unstyled" value={language} onChange={onChangeLanguage}>
        <option value="en">{t('language.en')}</option>
        <option value="hu">{t('language.hu')}</option>
      </Select>
    </Stack>
  );
};

export default Menu;
