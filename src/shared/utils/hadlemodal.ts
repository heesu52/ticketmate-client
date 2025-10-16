// import { toastify } from '../components/ui/toast/toastify';

// export const handleModal = async <T = unknown>(
//   modalType: string,
//   Component: React.ComponentType<any>,
//   props?: Record<string, any>,
//   successMessage?: string,
// ) => {
//   try {
//     const result = await open(modalType, Component, props);

//     if (result && successMessage) {
//       toastify({ variant: 'success', description: successMessage });
//     }

//     return result;
//   } catch (error) {
//     toastify({ variant: 'error', description: '요청 처리에 실패했습니다.' });
//     return null;
//   }
// };
