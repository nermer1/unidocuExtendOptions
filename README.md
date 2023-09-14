## unidocuExtendOptions

유니다큐 F8 영역 추가 옵션

### 기능
![image](https://github.com/nermer1/unidocuExtendOptions/assets/51549944/15c463f3-ef7b-4ceb-a781-56f2ac8c4847)

##기본

PANEL_TITLE: 패널 제목(패널이 보일 경우)
ignore Grid Panel: 패널 show/hide

##확장

#그리드정렬
```javascript
{
    name: {
        unused:
        force:
    },
    options: {
        explicit:
    }
}
```

#합계사용
```javascript
{
    name: {
        check:
    },
    options: {
        footer:
    }
}
```

#툴팁적용컬럼
```javascript
{
    name: {
        text:
    }
}
```

#헤더그룹핑
```javascript
{
    name: {
        text:
    }
}
```

#색상적용헤더
```javascript
{
    name: {
        text:
    },
    options: {
        배경:
        글자:,
        오버:,
        선택배경:
    }
}
```

#행색상적용
```javascript
{
    name: {
        used:
    },
    options: {
        배경:
    }
}
```

#그리드선택옵션
```javascript
{
    name: {
        hide:
        radio:,
        checkAll:,
        force:
    }
}
```


### 사용

```javascript
//customize.js 모듈 호출
define(['vendorCustom/extendCustomWebData'], function (extendCustomWebData) {
    // ...원래 로직 가장 아래 함수 실행
    extendCustomWebData();
});
```

buttonRole 사용한다면 아래 내용을 customize.css 에 작성
```css
#unipost-unidocu .unidocu-button.hidden {display: none;}
```

### 버전 정의
