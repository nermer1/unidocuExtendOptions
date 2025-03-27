## unidocuExtendOptions

유니다큐 F8 영역 추가 옵션

---

### 사용 방법

1. 프로젝트 일반 pom.xml에 종속성 추가

```xml
<dependency>
    <groupId>com.unipost.unidocu-plugins</groupId>
    <artifactId>unidocuOptionExpansion</artifactId>
    <version>1.0.3-SNAPSHOT</version>
</dependency>
```

2. customize.js 파일 수정

```javascript
/*customize.js 모듈 호출*/
define([module1, module2..., 'vendorCustom/plugins/$uPlugins'], function () {
    // ...원래 로직 가장 아래 함수 실행
    $u.plugins.init();
});
```
3. cusomize.js 압축이 적용된 패키지인 경우

maven-package war 생성 시 오류 발생
pack-customize.json 파일 내 paths에서 $uPlugins은 포함되지 않도록 설정
```text
"paths": {
        /*...생략*/
        "vendorCustom/plugins/$uPlugins" : "empty:"
    },
```


5. buttonRole 기능을 사용한다면 다음 절차를 진행(사용하지 않으면 생략가능)

core 소스

unidocu-button.css


```css
/*아래 라인 제거*/
#unipost-unidocu .unidocu-button.hidden {display: none;}
```

unidocuButton.js

```javascript
/*isShowRoleButton 메서드 제거*/
function isShowRoleButton(os_data) {
    var bool = false, trimSplit = function(a, b) {
        var p = {};
        b = '\\' + ((!b)? ',':b);
        p['p1'] = new RegExp(b + '[' + b + '\\s]*?$', 'i');
        p['p2'] = new RegExp('\\s*' + b + '\\s*');
        return a.replace(p['p1'], '').split(p['p2']);
    }
    $.each(trimSplit(os_data['BUTTON_ROLE']), function(_, role) {
        if(new RegExp(role, 'gi').test(staticProperties.user['ROLE'])) {
            bool = true;
            return false;
        }
    });
    return bool;
}

/*라인 제거*/
$u.buttons.getSingleButtonsEl = function(os_data) {
    //... 생략
    // 2라인 제거
    if (!os_data['BUTTON_ROLE']) os_data['BUTTON_ROLE'] = '';
    if (!isShowRoleButton(os_data)) os_data['VISIBLE'] = 'hidden';
}

```

Uni_ButtonTemplate.mustache

```html
/*아래 라인에서 {{VISIBLE}} 제거*/
<button id="{{BUTTON_ID}}" class="unidocu-button {{align}} {{COLOR}} {{VISIBLE}}">
    {{TEXT}}
</button>
```

getCustomWebData.js

```text
/*아래 항목 찾아서 제거*/
{
    "FNAME": "VISIBLE",
    "WIDTH": "100",
    "TYPE": "customCombo",
    "EDIT": "X",
    "ADD_EMPTY": "X",
    "OPTIONS": [
        "hidden"
    ]
},
{
    "FNAME": "BUTTON_ROLE",
    "WIDTH": "100",
    "TYPE": "text",
    "EDIT": "X"
}
```

일반 소스

customize.css

```css
/*추가*/
#unipost-unidocu .unidocu-button.hidden {
    display: none;
}
```

---

### 빌드
node 프로젝트, maven 프로젝트 같이 사용
실제 maven은 jar로 빌드 하기위한 목적

실제 소스 빌드는 package.json script compile 명령어를 참고할 것
- babel, prettier 실행

jar에 생성되는 데이터는 src 경로를 포함하여 해당 폴더는 삭제 하지말 것

maven plugin 사용으로 빌드 및 배포

---

## 기능 설명
![image](https://github.com/user-attachments/assets/39df2e47-c2f3-44a5-8541-6bb2692364b8)


### 정렬(모듈명: gridSorting)

```text
{
    "name": {
        "unused": "정렬 사용 여부"
    },
    "options": {
        "explicit": "정렬 사용일 때, 칸이 입력될 때마다 자동 정렬 여부",
        "force": "강제 적용 옵션(기존에 설정된 정렬 로직 무시하고 현재 설정 강제 적용)"
    },
    "category": "gridSetting"
}
```

### 합계(모듈명: gridSummary)

옵션 적용 예시

![image](https://github.com/user-attachments/assets/06ab5678-839d-4f85-87b5-16653ff358dd)


```text
{
    "name": {
        "check": "금액 필드 합계 표시 여부"
    },
    "options": {
        "footer": "합계 필드 하단 표시 여부(미체크시 기본값에 따름)"
    },
    "category": "gridSetting"
}
```

### 툴팁(모듈명: gridTooltip)

옵션 적용 예시

![image](https://github.com/nermer1/unidocuExtendOptions/assets/51549944/e4d2f170-b35f-4413-89e1-f02bfb432180)

```text
{
    "name": {
        "text": "툴팁 적용 컬럼명 콤마(,)로 여러 컬럼명 적용(ALL을 입력한 경우 전체 적용)",
    },
    "category": "gridSetting"
}
```

##그룹핑(모듈명: gridHeaderGroup)

```text
{
    "name": {
        "json": "컬럼 그룹핑 적용(옵션 적용 예시 = {groupText: '그룹명', childColumns: [컬럼명...]})"
    },
     "options": {
        "헤더높이": "전체 헤더 높이 변경, 그룹핑 시 글자 잘리는 경우에 사용(헤더 높이 일괄로 지정됨)"
     },
    "category": "gridSetting"
}
```

### 컬럼색상(모듈명: gridHeaderColor)

옵션 적용 예시

![image](https://github.com/user-attachments/assets/8f63610a-ca9f-4301-8418-4cb218b38862)


```text
{
    "name": {
        "text": "헤더 색상 변경 컬럼명 콤마(,)로 여러 컬럼명 적용(ALL을 입력한 경우 전체 적용)"
    },
    "options": {
        "배경": "기본 배경 색상",
        "글자": "글자 색상",
        "오버": "마우스 오버 색상",
        "선택배경": "활성화 색상"
    },
    "category": "gridSetting"
}
```

### 행색상(모듈명: gridRowColor)

옵션 적용 예시

![image](https://github.com/nermer1/unidocuExtendOptions/assets/51549944/c54e30d0-d412-4bd9-ba61-6427c9697efa)

```text
{
    "name": {
        "used": "활성화된 라인 색상 적용(수정 가능 필드가 하나라도 있는 경우엔 옵션 적용은 무시)"
    },
    "options": {
        "배경": "기본 배경 색상"
    },
    "category": "gridSetting"
}
```

### 체크바(모듈명: gridSelectedOptions)

옵션 적용 예시

![image](https://github.com/user-attachments/assets/ee8f0fc2-c8fe-48ef-86b4-6892c7c9f975)


```text
{
    "name": {
        "hide": "체크바 숨김 여부",
        "radio": "라디오 버튼 적용",
        "checkAll": "전체 체크 활성화",
        "none": "설정된 기본값"
    },
    "options": {
        "force": "강제 적용 옵션(기존에 설정된 정렬 로직 무시하고 현재 설정 강제 적용)"
    },
    "category": "gridSetting"
}
```

### 버튼권한(모듈명: buttonRole)

옵션 적용 예시

```text
{
    "name": {
        "VISIBLE": "hidden 선택 시 버튼 hide 상태로 렌더링, BUTTON_ROLE 권한이 존재하면 권한에 반대되도록 동작 예를 들어 ALL 권한이고 hidden 선택인 경우엔 ALL권한만 버튼 숨김",
        "BUTTON_ROLE": "권한 지정 콤마(,)로 여러 권한 적용"
    },
    "category": "buttonSetting"
}
```

---

### 버전 정의
