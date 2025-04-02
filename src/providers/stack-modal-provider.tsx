import { ModalProvider } from '@/shared/components/modal/custom-modal';

export default function StackModalProvider() {
  return (
    <div id="modal-root">
      <ModalProvider />
    </div>
  );
}
