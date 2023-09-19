## 2023-09-19, version 1.0.0

-   파일명 변경 extendCustomWebData.js -> main.js
-   폴더 구조 변경 -> vendorCustom/ -> vendorCustom/plugins/extendCustomWebData
-   폴더 구조 변경에 따라 package.json script run complie 명령어 변경
-   requirejs 호출 방식 제거

## 2023-09-13, version 1.0.0

-   extendCustomWebData.js return function으로 모듈 변경
-   변경에 따른 customize.js에서 모듈 로드 변경, 함수 실행으로 동작하도록 변경 ex) extendCustomWebData();
