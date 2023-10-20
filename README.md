## unidocuExtendOptions

유니다큐 F8 영역 추가 옵션

---

### 사용 방법

[unidocuExtendOptions.1.0.0.zip](https://github.com/nermer1/unidocuExtendOptions/files/12657107/unidocuExtendOptions.1.0.0.zip)

1. 다운받은 소스 압축 해제 후 vendorCustom 경로에 복사 또는 이동

2. $uPlugins.js 추가
```javascript
//$uPlugins.js "vendorCustom/plugins/$uPlugins" 경로에 생성 후 소스 작성
define(['vendorCustom/plugins/extendCustomWebData/main'], function () {
    const basePath = '/webjars/vendorCustom/plugins/';
    const plugins = {};
    $u.plugins = {};

    $u.plugins.init = function() {
        $u.plugins.getPlugin('extendCustomWebData').setBasePath(basePath);

        Object.keys(plugins).forEach(function(pluginName) {
            if(typeof plugins[pluginName]['init'] !== 'function') throw '플러그인 [' + pluginName + '] 초기화할 수 없습니다.';
            plugins[pluginName]['init'].call(this);
        });
    }

    $u.plugins.hasPlugin = function(pluginName) {
        return plugins.hasOwnProperty(pluginName);
    }

    $u.plugins.getPlugin = function(pluginName) {
        if(!pluginName) return plugins;
        if($u.plugins.hasPlugin(pluginName)) return plugins[pluginName];
        else throw '등록되지 않은 플러그인';
    }

    $u.plugins.addPlugin = function(pluginName, pluginFn) {
        if($u.plugins.hasPlugin(pluginName)) throw '이미 등록된 플러그인';
        if(!pluginFn) throw '존재하지 않는 플러그인';
        plugins[pluginName] = pluginFn;
    }

    $u.plugins.addPlugin("extendCustomWebData", $customWebData);
});
```

3. customize.js 파일 수정
```javascript
//customize.js 모듈 호출
define(['vendorCustom/plugins/$uPlugins'], function () {
    // ...원래 로직 가장 아래 함수 실행
    $u.plugins.init();
});
```

4. buttonRole 기능을 사용한다면 다음 절차를 진행(사용하지 않으면 생략가능)

core 소스

unidocu-button.css
```css
#unipost-unidocu .unidocu-button.hidden {display: none;} -> 제거
```

unidocuButton.js
```javascript
// isShowRoleButton 제거
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

$u.buttons.getSingleButtonsEl = function(os_data){
    ... 생략
    // 2라인 제거
    if (!os_data['BUTTON_ROLE']) os_data['BUTTON_ROLE'] = '';
    if (!isShowRoleButton(os_data)) os_data['VISIBLE'] = 'hidden';
}

```

Uni_ButtonTemplate.mustache
```javascript
//아래 라인에서 {{VISIBLE}} 제거
<button id="{{BUTTON_ID}}" class="unidocu-button {{align}} {{COLOR}} {{VISIBLE}}">{{TEXT}}</button>
```

getCustomWebData.js
//아래 항목 찾아서 제거
```javascript
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
// 추가
#unipost-unidocu .unidocu-button.hidden {display: none;}
```

---

### 기능 설명
![image](https://github.com/nermer1/unidocuExtendOptions/assets/51549944/15c463f3-ef7b-4ceb-a781-56f2ac8c4847)


##정렬(모듈명: gridSorting)
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

##합계(모듈명: gridSummary)

옵션 적용 예시

![image](https://github.com/nermer1/unidocuExtendOptions/assets/51549944/f8733225-af61-442d-9532-ce0f87898cfd)

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

##툴팁(모듈명: gridTooltip)

옵션 적용 예시

![image](https://github.com/nermer1/unidocuExtendOptions/assets/51549944/e4d2f170-b35f-4413-89e1-f02bfb432180)

```javascript
{
    name: {
        text: 툴팁 적용 컬럼명 콤마(,)로 여러 컬럼명 적용(ALL을 입력한 경우 전체 적용)
    },
    category: gridSetting
}
```

##그룹핑(모듈명: gridHeaderGroup)
```javascript
{
    name: {
        json: 컬럼 그룹핑 적용(옵션 적용 예시 = {groupText: '그룹명', childColumns: [컬럼명...]})
    },
    category: gridSetting
}
```

##컬럼색상(모듈명: gridHeaderColor)

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

##행색상(모듈명: gridRowColor)

옵션 적용 예시

![image](https://github.com/nermer1/unidocuExtendOptions/assets/51549944/c54e30d0-d412-4bd9-ba61-6427c9697efa)

```javascript
{
    name: {
        used: 활성화된 라인 색상 적용(수정 가능 필드가 하나라도 있는 경우엔 옵션 적용은 무시)
    },
    options: {
        배경: 기본 배경 색상
    },
    category: gridSetting
}
```

##체크바(모듈명: gridSelectedOptions)

옵션 적용 예시

![image](https://github.com/nermer1/unidocuExtendOptions/assets/51549944/e853080d-ff58-414b-bc2b-6cd4ea7bf1c9)

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

##버튼권한(모듈명: buttonRole)

옵션 적용 예시

![image](https://github.com/nermer1/unidocuExtendOptions/assets/51549944/e853080d-ff58-414b-bc2b-6cd4ea7bf1c9)

```javascript
{
    name: {
        VISIBLE: hidden 선택 시 버튼 hide 상태로 렌더링, BUTTON_ROLE 권한이 존재하면 권한에 반대되도록 동작 예를 들어 ALL 권한이고 hidden 선택인 경우엔 ALL권한만 버튼 숨김,
        BUTTON_ROLE: 권한 지정 콤마(,)로 여러 권한 적용
    },
    category: buttonSetting
}
```

---

### 버전 정의
