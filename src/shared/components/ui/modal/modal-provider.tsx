// shared/modal/ModalProvider.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';

import { usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';

import { useModalStore } from '@/shared/components/ui/modal/modal-store';
import type { ModalItem } from '@/shared/components/ui/modal/modal.type';

const MODAL_ROOT_ID = 'modal-root';

export default function ModalProvider() {
  const { modals, clear } = useModalStore();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);
  const createdRef = useRef(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    let el = document.getElementById(MODAL_ROOT_ID);
    if (!el) {
      el = document.createElement('div');
      el.id = MODAL_ROOT_ID;
      document.body.appendChild(el);
      createdRef.current = true;
    }
    setPortalEl(el);
    return () => {
      if (createdRef.current && el?.parentNode) {
        el.parentNode.removeChild(el);
        createdRef.current = false;
      }
    };
  }, [mounted]);

  useEffect(() => {
    clear();
  }, [pathname, clear]);

  if (!mounted || !portalEl) return null;

  return createPortal(
    <>
      {modals.map((m) => (
        <ModalRenderer key={m.key} item={m} />
      ))}
    </>,
    portalEl,
  );
}

function ModalRenderer<TProps, TResult>({
  item,
}: {
  item: ModalItem<TProps, TResult>;
}) {
  const { Component, props, resolve, reject } = item;
  return (
    <Component {...(props as TProps)} onResolve={resolve} onReject={reject} />
  );
}
