## unidocuExtendOptions

유니다큐 F8 영역 추가 옵션

### 기능

### 사용

```javascript
//customize.js 모듈 호출
define(['vendorCustom/extendCustomWebData'], function (extendCustomWebData) {
    // ...원래 로직 가장 아래 함수 실행
    extendCustomWebData();
});
```

buttonRole 사용한다면 아래 내용을 customize.css 에 작성
#unipost-unidocu .unidocu-button.hidden {display: none;}

### 버전 정의
