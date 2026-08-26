/**
 * B2 조립용 런타임(배관) 조각.
 * - 전역 우편함($u.plugins._oeModules)에 쌓인 모듈들을 모아 addPlugin 한다.
 * - 각 모듈 조각(pieces/*.js)이 이 우편함에 push 해둔다. (concat 시 이 파일이 맨 앞)
 * - main.js(통짜 빌드)와 로직 동일, "모듈 목록을 어디서 얻느냐"만 다름.
 */
const $customWebData = {};

// 우편함 준비 (조각이 먼저 실행돼도 안전하도록 방어적 초기화)
$u.plugins._oeModules = $u.plugins._oeModules || [];

$u.plugins.addPlugin('unidocuOptionExpansion', {
    config: {
        version: '1.0.0',
        name: 'unidocuOptionExpansion',
        description: 'unidocu5 plugin, f8 option extension (assembled)'
    },
    init: (pluginHandlers) => {
        $customWebData.module = new $customWebData.moduleManager();
        // concat된 조각들이 push 해둔 모듈만 등록 = 물리적으로 고른 것만 활성
        $u.plugins._oeModules.forEach((name) => $customWebData.module.add(name));
        $customWebData.addCustomHook(pluginHandlers);
    }
});

$customWebData.addCustomHook = (pluginHandlers) => {
    Object.values($customWebData.module.modules).forEach((moduleData) => {
        const hooks = moduleData.hooks || {};
        Object.keys(hooks).forEach((hookName) => {
            const existingHandler = pluginHandlers[hookName];

            if (existingHandler) {
                // 이미 해당 훅을 선언한 모듈이 있다면 체이닝 처리 (릴레이 실행)
                pluginHandlers[hookName] = function (...args) {
                    const res1 = existingHandler.apply(this, args);
                    // Filter 훅(이름에 Arg가 들어감)인 경우, 이전 모듈의 결과값을 다음 모듈에 넘겨줌
                    const isFilterHook = hookName.indexOf('Arg') !== -1;
                    const nextArgs = isFilterHook ? [res1 !== undefined ? res1 : args[0]] : args;
                    const res2 = hooks[hookName].apply(this, nextArgs);
                    return res2 !== undefined ? res2 : res1;
                };
            } else {
                // 최초 등록
                pluginHandlers[hookName] = hooks[hookName];
            }
        });
    });
};

$customWebData.extendWebData = (webData) => {
    Object.keys(webData).forEach((key) => {
        if (!$u.webData.customWebDataMap[key]) throw '존재하지 않는 웹데이터 아이디';
        const os_data = $u.webData.customWebDataMap[key]['OS_DATA'];
        if (Object.prototype.hasOwnProperty.call(webData[key], 'OS_DATA')) {
            $u.plugins.tools.extend(os_data, webData[key]['OS_DATA']);
        }
        if (Object.prototype.hasOwnProperty.call(webData[key], 'OT_DATA')) {
            const ot_data = $u.webData.customWebDataMap[key]['OT_DATA'];
            const colLen = Number(os_data['COL_LEN']);
            const isLenOdd = $u.plugins.tools.checkOdd(ot_data.length);
            // grid 확장 옵션은 짝수 기반으로 설계됨 기존 COL_LEN 값이 홀수 인 경우엔 의도하지 않게 위치가 변경
            // 기존 COL_LEN 이 홀수, ot_data 길이가 COL_LEN 만큼 채워지지 않는 경우 기존의 ot_data 마지막 요소 COL_SPAN 최대로
            if (isLenOdd && ot_data.length > 0 && ot_data.length < colLen) {
                ot_data[ot_data.length - 1]['COL_SPAN'] = colLen - ot_data.length + 1;
            }
            webData[key]['OT_DATA'].forEach((data, index) => {
                const len = webData[key]['OT_DATA'].length;
                if (len === 1) data['COL_SPAN'] = colLen.toString();
                if (isLenOdd) {
                    if (len > 1) {
                        data['COL_SPAN'] = index === 0 ? Math.floor(colLen / 2) : Math.ceil(colLen / 2);
                    }
                }
                ot_data.push(data);
            });
        }
    });
};

$customWebData.moduleManager = function () {
    this.modules = {};
};
$customWebData.moduleManager.prototype = {
    add: function (data) {
        let name = data['moduleName'];
        if (this.modules[name]) throw `모듈 ${name}(이/가) 중복 등록 불가`;

        this.modules[name] = data;
        $customWebData.extendWebData(data['webData']);
        if (typeof data['init'] === 'function') data['init'].call(this);
    },
    hasModule: function (moduleName) {
        return !!this.modules[moduleName];
    }
};
