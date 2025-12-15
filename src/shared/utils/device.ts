import { DeviceType } from '@/shared/types/common';

export const getDeviceType = () => {
  // 브라우저 환경이 아니거나 navigator 객체가 없는 경우 'OTHER' 반환
  if (typeof window === 'undefined' || !window.navigator) {
    return DeviceType.OTHER;
  }

  const userAgent = navigator.userAgent || navigator.vendor;

  // 1. Android 확인
  // userAgent에 'Android' 문자열이 포함되어 있는지 확인
  if (/android/i.test(userAgent)) {
    return DeviceType.ANDROID;
  }

  // 2. iOS 확인 (iPhone, iPad, iPod)
  // userAgent에 'iPhone', 'iPad', 'iPod' 문자열이 포함되어 있는지 확인
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return DeviceType.IOS;
  }

  // 3. Web (데스크톱 브라우저 또는 기타 모바일 외 환경)
  // 일반적으로 위의 두 조건에 해당하지 않으면 웹 환경으로 간주
  // (물론 Windows, macOS, Linux 등 다양한 데스크톱 OS가 포함됨)
  if (/mozilla|chrome|safari|firefox/i.test(userAgent)) {
    return DeviceType.WEB;
  }

  // 4. 기타
  return DeviceType.OTHER;
};
