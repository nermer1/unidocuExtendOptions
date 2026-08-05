/**
 * @namespace unidocuOptionExpansion
 * @version 1.0.0
 *
 * F8 gridSetting, formSetting, buttonSetting에 대한 옵션 확장
 *
 * 지원: 유니다큐5
 *
 * 사용법:
 *
 * customize.js vendorCustom/plugins/$uPlugins 모듈 로드
 * config-extraModules: module 등록된 모듈을 로드한다.
 * module의 기본 경로는 /webjars/vendorCustom/plugins/ 폴더를 참조한다.
 *
 * customize 경고
 * 아래 5영역은 원래 내용 재정의 하므로 코어나, customize에 수정이 된 경우는 확인 필요함
 * 필요에 따라 현재 파일의 5영역으로 수정된 로직 적용 필요
 *
 * $u.webData.ignoreCacheSelectOne
 * customizeBindExtendAPI - grid API
 * $u.buttons.getFormButtonsEl
 * $u.renderUIComponents
 * $u.renderGridSingle
 *
 * 옵션 설명:
 * gridSorting = {
 *     scope: gridSetting
 *     description: 그리드 정렬 설정
 *     params: {
 *         SORTING_NOT_USED: {
 *             unused: 체크 시 정렬 사용하지 않음, 해제 시 정렬 사용
 *             force: 강제 적용, 렌더 이후 화면별 view, base js에 별도로 적용된 경우를 무시하고 옵션 적용
 *         }
 *         SORTING_MODE: cell에 값 입력 시 자동 정렬 사용 여부, 체크시 미사용
 *     }
 * }
 * gridSummary = {
 *     scope: gridSetting
 *     description: 그리드 합계 표시
 *     params: {
 *         USE_SUMMARY: 체크 시 합계 표시
 *         USE_SUMMARY_A: 합계 상단, 하단 표시 여부
 *     }
 * }
 * gridTooltip = {
 *     scope: gridSetting
 *     description: 그리드 cell 툴팁 표시
 *     params: {
 *         TOOLTIP_COLUMNS: 적용 컬럼 지정(콤마로 여러개 등록 가능), ALL 입력 시 전체 컬럼 적용
 *     }
 * }
 * gridHeaderGrouping = {
 *     scope: gridSetting
 *     description: 그리드 컬럼 그룹핑
 *     params: {
 *         GROUPING: [{groupText: '그룹이름1', childColumns: [묶일컬렴명1...]}, {groupText: '그룹이름2', childColumns: [묶일컬렴명2...]}, ...]
 *     }
 * }
 * gridHeaderColor = {
 *     scope: gridSetting
 *     description: 그리드 컬럼 색상
 *     params: {
 *         COLOR_HEADERS: 적용 컬럼 지정(콤마로 여러개 등록 가능), ALL 입력 시 전체 컬럼 적용
 *         HEADER_COLOR: {배경: 컬럼 배경, 글자: 컬럼 글자, 오버: 컬럼 마우스 오버, 선택배경: 활성화된 컬럼 색상}
 *     }
 * }
 * gridRowColor = {
 *     scope: gridSetting
 *     description: 그리드 라인 색상
 *     params: {
 *         SET_ROW_COLOR: 선택 시 라인 색상 적용
 *         SET_ROW_COLOR_SELECT: {배경: 라인 색상}
 *     }
 * }
 * gridSelectedOptions = {
 *     scope: gridSetting
 *     description: 그리드 SELECTED 관련 옵션
 *     params: {
 *         SELECTED_OPTIONS: {
 *             hide: 체크 시 선택 영역 숨김 처리
 *             radio: 체크 시 선택 영역 라디오 버튼으로 변경
 *             checkAll: 체크 시 전체 선택 활성화
 *             force: 강제 적용, 렌더 이후 화면별 view, base js에 별도로 적용된 경우를 무시하고 옵션 적용
 *         }
 *     }
 * }
 * buttonRole = {
 *     scope: buttonSetting
 *     description: 버튼 hide/show, 권한에 따라 hide/show 기능
 *     params: {
 *         VISIBLE: 버튼 show/hide 권한 공란이면 전체 적용, 권한 등록되어있으면 권한 가진 유저만
 *         BUTTON_ROLE: 권한 입력(콤마로 여러개 등록 가능)
 *     }
 * }
 *
 */
import {info as buttonRole} from './modules/buttonRole/module.js';
import {info as gridHeaderColor} from './modules/gridHeaderColor/module.js';
import {info as gridHeaderGroup} from './modules/gridHeaderGroup/module.js';
import {info as gridPaging} from './modules/gridPaging/module.js';
import {info as gridRowColor} from './modules/gridRowColor/module.js';
import {info as gridSelectedOptions} from './modules/gridSelectedOptions/module.js';
import {info as gridSorting} from './modules/gridSorting/module.js';
import {info as gridSummary} from './modules/gridSummary/module.js';
import {info as gridTooltip} from './modules/gridTooltip/module.js';

const config = {
    version: '1.0.0',
    name: 'unidocuOptionExpansion',
    description: 'unidocu5 plugin, f8 option extension',
    extraModules: [buttonRole, gridHeaderColor, gridHeaderGroup, gridPaging, gridRowColor, gridSelectedOptions, gridSorting, gridSummary, gridTooltip]
};
const $customWebData = {};
const {extraModules = []} = config;

$u.plugins.addPlugin('unidocuOptionExpansion', {
    config: config,
    init: (pluginHandlers) => {
        $customWebData.module = new $customWebData.moduleManager();
        extraModules.forEach((name) => $customWebData.module.add(name));
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

export default $customWebData;
