---
##prefix
* [add] 파일 생성
* [delete] 파일 삭제
* [deprecated] 사용 가능하나 사용되지 않는 메서드 및 속성
* [rename] 파일, 메서드 및 속성의 이름 변경
* [modify] 메서드 및 속성 기능 변경 또는 파일 내용 변경
* [warning] 사용 중인 프로젝트에 영향을 끼침
* [system] 프로젝트 설정 변경 
---

## 2024-07-11, version 1.0.3
- [modify] gridRowColor 편집 가능한 헤더가 존재할 때도 기능 적용되는 현상 수정
- [modify] gridRowColor selected 클릭할 때도 적용할 수 있도록 추가
- [modify] colorpicker 텍스트 표기를 좌측에서 우측으로 변경
- [modify] customizeBindExtendAPI 그리드 메서드 재정의 방식 수정
  동일 unidocu 버전이라도 재정의 대상 메서드 기능이 다른 경우 존재
  실행되는 버전의 메서드를 저장하여 그 메서드를 사용하면서 재정의 하는 방식으로 변경

- [modify] 프로젝트 기본 웹데이터 값에 따라 설계한대로 표기되지 못하는 현상 수정
  그리드 플러그인 설계는 ot_data 1 또는 2개 형태로 설계(ot_data 1인 경우엔 COL_SPAN 2로 하드코딩)
  대상 프로젝트의 os_data COL_LEN 값이 홀수 및 ot_data 갯수보다 COL_LEN 값이 큰 경우엔 표기되는 옵션이 밀리는 경우 발생
  프로젝트 기본 os_data와 ot_data 값에 따라 ot_data 마지막 요소의 COL_SPAN 값을 맞춤, 플러그인이 짝수에서 시작할 수 있게하기 위함
  플러그인의 ot_data의 COL_SPAN의 값을 동적으로 계산해서 넣게 변경
  ex) 단건이면 COL_SPAN = COL_LEN
  2건이고 COL_LEN이 홀수 인 경우 0번째 COL_SPAN = 내림값(COL_LEN / 2), 1번째: COL_SPAN = 올림값(COL_LEN / 2), 항상 비율을 유지하게 변경
 
- [modify] 옵션적인 성격임에도 불구하고 옵션으로 포함되지 않는 항목 정리
  정리된 항목에 대한 참조된 로직 수정
  [warning] 기존 사용 중인 기능이면 버전 변경 시 force 옵션은 다시 저장 필요
  
- [modify] gridSelectedOptions 체크바 -> 라디오버튼으로 변경
  [warning] 기존 사용 중인 기능이면 버전 변경 시 force 옵션은 다시 저장 필요

## 2024-07-05, version 1.0.2
- [modify] 다이얼창 그리드 설정 적용되지 않는 현상 수정

## 2024-03-07, version 1.0.1
- [modify] document.append => appendChild로 변경
- [system] 개발 소스 폴더명 변경 dev -> src
- [system] node 빌드 babel 대상 폴더 변경 dev -> src
- [system] babel output 폴더 변경 src -> out
- [system] maven resource 대상 폴더 변경 src -> out
- [system] 위 상황에 따라 gitignore 수정

## 2023-12-22, version 1.0.0
- [system] jar 종속성 추가하여 사용하도록 변경
- [system] pom.xml 추가, 유니포스트 nexus에 등록
- [system] maven 프로젝트 등록
- [system] prettierignore 제외 추가
- [system] eslint 설정 추가
- [system] npm run compile 명령어 변경

## 2023-09-19, version 1.0.0
- [rename] 파일명 변경 extendCustomWebData.js -> main.js
- [rename] 폴더 구조 변경 -> vendorCustom/ -> vendorCustom/plugins/extendCustomWebData
- [system] 폴더 구조 변경에 따라 package.json script run complie 명령어 변경
- [system] requirejs 호출 방식 제거

## 2023-09-13, version 1.0.0
- [system] extendCustomWebData.js return function으로 모듈 변경
- [system] 변경에 따른 customize.js에서 모듈 로드 변경, 함수 실행으로 동작하도록 변경 ex) extendCustomWebData();
