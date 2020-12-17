import { FC, useEffect } from 'react';
import { Container, Fade, useDisclosure } from '@chakra-ui/react';

const PageContainer: FC = ({ children }) => {
  const { isOpen, onToggle } = useDisclosure();
  useEffect(() => {
    onToggle();
  }, []);
  return (
    <Fade in={isOpen}>
      <Container maxW="7xl" mb={16}>
        {children}
      </Container>
    </Fade>
  );
};

export default PageContainer;
