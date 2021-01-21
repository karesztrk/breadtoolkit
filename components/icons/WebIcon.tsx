import { Icon } from '@chakra-ui/react';
import React, { FC } from 'react';

const WebIcon: FC<{ color: string; hoverColor: string }> = ({
  color,
  hoverColor,
}) => {
  return (
    <Icon
      viewBox="0 0 20 20"
      color={color}
      _hover={{ color: hoverColor }}
      transition="color 150ms ease"
    >
      <path
        className="st0"
        id="XMLID_1167_"
        d="M17.5 17.5h-15c-.6 0-1-.4-1-1v-13c0-.6.4-1 1-1h15c.6 0 1 .4 1 1v13c0 .6-.4 1-1 1z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        fill="currentColor"
        d="M6.5 10c-.3 0-.5.2-.5.5v1.8l-.7-.7c-.2-.2-.5-.2-.7 0l-.6.7v-1.8c0-.3-.2-.5-.5-.5s-.5.2-.5.5v3.2l.3.3h.4c.1 0 .1-.1.2-.1L5 12.7l1.2 1.2h.1s.1 0 .1.1h.4s.1 0 .1-.1c0 0 .1 0 .1-.1v-3.3c0-.3-.2-.5-.5-.5zm5 0c-.3 0-.5.2-.5.5v1.8l-.7-.7c-.2-.2-.5-.2-.7 0l-.6.7v-1.8c0-.3-.2-.5-.5-.5s-.5.2-.5.5v3.2l.3.3h.4c.1 0 .1-.1.2-.1l1.1-1.2 1.2 1.2h.1s.1 0 .1.1h.4s.1 0 .1-.1c0 0 .1 0 .1-.1v-3.3c0-.3-.2-.5-.5-.5zm5 0c-.3 0-.5.2-.5.5v1.8l-.7-.7c-.2-.2-.5-.2-.7 0l-.6.7v-1.8c0-.3-.2-.5-.5-.5s-.5.2-.5.5v3.2l.3.3h.4c.1 0 .1-.1.2-.1l1.1-1.2 1.2 1.2h.1s.1 0 .1.1h.4s.1 0 .1-.1c0 0 .1 0 .1-.1v-3.3c0-.3-.2-.5-.5-.5z"
      />
      <path
        className="st0"
        d="M2 6.5h16"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <circle cx="15.5" cy="4.5" r=".5" fill="currentColor" />
      <circle cx="13.5" cy="4.5" r=".5" fill="currentColor" />
      <circle cx="11.5" cy="4.5" r=".5" fill="currentColor" />
    </Icon>
  );
};

export default WebIcon;
