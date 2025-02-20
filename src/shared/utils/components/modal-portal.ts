import { JSX, ReactElement } from 'react';

import { createPortal } from 'react-dom';

const ModalPortal = ({
  children,
}: {
  children: ReactElement;
}): JSX.Element | null => {
  if (typeof window === 'undefined') return null;

  const portalRoot = document.getElementById('modal-root');
  if (!portalRoot) return null;

  return createPortal(children, portalRoot);
};

export default ModalPortal;
