## unidocuExtendOptions

유니다큐 F8 영역 추가 옵션

### 기능
![image](https://github.com/nermer1/unidocuExtendOptions/assets/51549944/15c463f3-ef7b-4ceb-a781-56f2ac8c4847)

##기본

PANEL_TITLE: 패널 제목(패널이 보일 경우)
ignore Grid Panel: 패널 show/hide

##확장

#정렬
```javascript
{
    name: {
        unused: 정렬 사용 여부
        force: 강제 적용 옵션(기존에 설정된 정렬 로직 무시하고 현재 설정 강제 적용)
    },
    options: {
        explicit: 정렬 사용일 때, 칸이 입력될 때마다 자동 정렬 여부
    },
    category: gridSetting
}
```

#합계
```javascript
{
    name: {
        check: 금액 필드 합계 표시 여부
    },
    options: {
        footer: 합계 필드 하단 표시 여부(미체크시 기본값에 따름)
    },
    category: gridSetting
}
```

#툴팁
```javascript
{
    name: {
        text: 툴팁 적용 컬럼명 콤마(,)로 여러 컬럼명 적용(ALL을 입력한 경우 전체 적용)
    },
    category: gridSetting
}
```

#그룹핑
```javascript
{
    name: {
        json: 컬럼 그룹핑 적용(옵션 적용 예시 = {groupText: '그룹명', childColumns: [컬럼명...]})
    },
    category: gridSetting
}
```

#컬럼색상

옵션 적용 예시

![image](https://github.com/nermer1/unidocuExtendOptions/assets/51549944/bacbcf39-9284-485a-9ae0-cacf24b77eea)
```javascript
{
    name: {
        text: 헤더 색상 변경 컬럼명 콤마(,)로 여러 컬럼명 적용(ALL을 입력한 경우 전체 적용)
    },
    options: {
        배경: 기본 배경 색상
        글자: 글자 색상,
        오버: 마우스 오버 색상,
        선택배경 활성화 색상:
    },
    category: gridSetting
}
```

#행색상
```javascript
{
    name: {
        used: 라인 색상 적용(수정 가능 필드가 하나라도 있는 경우엔 옵션 적용은 무시)
    },
    options: {
        배경: 기본 배경 색상
    },
    category: gridSetting
}
```

#체크바
```javascript
{
    name: {
        hide: 체크바 숨김 여부
        radio: 라디오 버튼 적용,
        checkAll: 전체 체크 활성화,
        force: 강제 적용 옵션(기존에 설정된 정렬 로직 무시하고 현재 설정 강제 적용)
    },
    category: gridSetting
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
