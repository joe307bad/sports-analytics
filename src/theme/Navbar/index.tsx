import React from 'react';
import OriginalNavbar from '@theme-original/Navbar';
import type NavbarType from '@theme/Navbar';
import type {WrapperProps} from '@docusaurus/types';
import InfoModal from '@site/src/components/InfoModal';

type Props = WrapperProps<typeof NavbarType>;

export default function NavbarWrapper(props: Props): React.ReactElement {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    const handleInfoClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.header-info-link')) {
        e.preventDefault();
        setIsModalOpen(true);
      }
    };

    document.addEventListener('click', handleInfoClick);
    return () => document.removeEventListener('click', handleInfoClick);
  }, []);

  return (
    <>
      <OriginalNavbar {...props} />
      <InfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
