## 2024-03-07, version 1.0.1
- document.append => appendChild로 변경
- 개발 소스 폴더명 변경 dev -> src
- node 빌드 babel 대상 폴더 변경 dev -> src
- babel output 폴더 변경 src -> out
- maven resource 대상 폴더 변경 src -> out
- 위 상황에 따라 gitignore 수정

## 2023-12-22, version 1.0.0
- jar 종속성 추가하여 사용하도록 변경
- pom.xml 추가, 유니포스트 nexus에 등록
- maven 프로젝트 등록
- prettierignore 제외 추가
- eslint 설정 추가
- npm run compile 명령어 변경

## 2023-09-19, version 1.0.0

-   파일명 변경 extendCustomWebData.js -> main.js
-   폴더 구조 변경 -> vendorCustom/ -> vendorCustom/plugins/extendCustomWebData
-   폴더 구조 변경에 따라 package.json script run complie 명령어 변경
-   requirejs 호출 방식 제거

## 2023-09-13, version 1.0.0

-   extendCustomWebData.js return function으로 모듈 변경
-   변경에 따른 customize.js에서 모듈 로드 변경, 함수 실행으로 동작하도록 변경 ex) extendCustomWebData();
