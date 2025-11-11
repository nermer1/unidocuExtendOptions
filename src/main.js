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
    init: (test) => {
        $customWebData.module = new $customWebData.moduleManager();
        extraModules.forEach((name) => $customWebData.module.add(name));
        webDataCustomize();
    }
});

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

/**
 * form type이 Uni_Empty인 경우 웹데이타 아이디 "SUB_COLUMN_TYPE" 값에 따른 form 추가
 *
 * SUB_COLUMN_TYPE - colorPicker: html default color picker type
 * SUB_COLUMN_TYPE - jsonEditor: jsonEditor type
 * @see: $u.dialog.JSONInputDialog
 */
$customWebData.customInputManager = function () {
    this.getEl = function (column) {
        const $el = $u.get(column);
        if (!$el) throw '존재하지 않는 필드';
        return $el;
    };
    this.init = function () {
        $u.webData.formSetting.getData('gridSetting@form-data')['OT_DATA'].map((data) => {
            if (data['COLUMN_TYPE'] === 'Uni_Empty') this[data['SUB_COLUMN_TYPE']].call(this, data['COLUMN_ID']);
        });
    };
};

/**
 * SUB_COLUMN_TYPE에 대한 초기화
 *
 * $u.get(form) getValue, setValue를 가져올 수 있도록 함수 재정의
 */
$customWebData.customInputManager.prototype = {
    colorPicker: function (column) {
        let $self = this.getEl(column),
            defalutValue = {},
            $input;

        $self.init = function () {
            $input = [];
            $self.params.options.map(function (item, index) {
                $self.$el.append(item['element']);
                const colorPicker = $($self.$el.find(`input:eq(${index})`));
                const span = $($self.$el.find(`span:eq(${index})`));
                colorPicker.attr('name', item['key']);
                $input.push(colorPicker);
                defalutValue[item['key']] = item['defalutValue'];
                span.data('defalut', defalutValue[item['key']]);
                span.click(() => {
                    colorPicker.val(span.data('defalut'));
                });
            });
            $self.setValue(defalutValue);
        };

        $self.getValue = function () {
            return $input.reduce((data, input) => {
                data[input.attr('name')] = input.val();
                return data;
            }, {});
        };

        $self.setValue = function (value) {
            $input.map((input) => {
                input.val(value[input.attr('name')]);
            });
        };

        $self.init();
    },
    jsonEditor: function (column) {
        let $self = this.getEl(column),
            $input;

        const {defaultValue = {}} = $self.params;

        $self.init = function () {
            $self.$el.append('<div class="input-box"><input type="text" readonly/></div>');
            $input = $self.$el.find('input');
            if (!$u.plugins.tools.isEmptyObject(defaultValue)) $self.setValue(defaultValue);
            $input.click(function () {
                $u.dialog.JSONInputDialog.open(function (data) {
                    $self.setValue(data);
                }, $self.getValue());
            });
        };

        $self.getValue = function () {
            return $input.val() ? JSON.parse($input.val()) : '';
        };

        $self.setValue = function (value) {
            value = value ? JSON.stringify(value) : '';
            $input.val(value);
        };

        $self.init();
    }
};
$customWebData.customInput = new $customWebData.customInputManager();

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
    getModule: function (moduleName) {
        if (!this.hasModule(moduleName)) throw `모듈 ${moduleName}(이/가) 존재하지 않음`;
        return this.modules[moduleName]['method'];
    },
    hasModule: function (moduleName) {
        return !!this.modules[moduleName];
    },
    setOptions: function (gridObj, os_data) {
        customizeBindExtendAPI(gridObj);
        Object.keys(this.modules).map((key) => {
            const fn = this.modules[key]['method']['setOptions'];
            if (typeof fn === 'function') fn(gridObj, os_data);
        });
    }
};

/**
 * _onRowActivate, setGroupHeader 재정의
 *
 * @param gridObj 그리드 객체
 */
function customizeBindExtendAPI(gridObj) {
    const originalMethod = {
        _onChangeCell: gridObj._onChangeCell,
        setCheckBarAsRadio: gridObj.setCheckBarAsRadio,
        setHeaderCheckBox: gridObj.setHeaderCheckBox,
        setColumnHide: gridObj.setColumnHide,
        setSortEnable: gridObj.setSortEnable,
        setGroupHeader: gridObj.setGroupHeader,
        setJSONData: gridObj.setJSONData
    };
    const gridRowColor = $customWebData.module.getModule('gridRowColor');
    const gridSelectedOptions = $customWebData.module.getModule('gridSelectedOptions');
    const gridSorting = $customWebData.module.getModule('gridSorting');
    const gridHeaderColor = $customWebData.module.getModule('gridHeaderColor');
    const gridTooltip = $customWebData.module.getModule('gridTooltip');
    const gridPaging = $customWebData.module.getModule('gridPaging');
    gridObj._onChangeCell = function (columnKey, rowIndex, oldValue, newValue) {
        originalMethod['_onChangeCell'].call(this, columnKey, rowIndex, oldValue, newValue);
        if (columnKey === 'SELECTED') gridRowColor.changeBgColorHandler(gridObj, rowIndex);
    };
    gridObj.setCheckBarAsRadio = function (columnKey, useAsRadio) {
        if (gridRowColor) {
            if (gridSelectedOptions.option.isForce) useAsRadio = gridSelectedOptions.option.isRadio;
        }
        originalMethod['setCheckBarAsRadio'].call(this, columnKey, useAsRadio);
    };
    gridObj.setHeaderCheckBox = function (columnKey, useHeaderCheckbox) {
        if (gridSelectedOptions) {
            if (gridSelectedOptions.option.isForce) useHeaderCheckbox = gridSelectedOptions.option.isCheckAll;
        }
        originalMethod['setHeaderCheckBox'].call(this, columnKey, useHeaderCheckbox);
    };
    gridObj.setColumnHide = function (columnKey, isHide) {
        if (gridSelectedOptions) {
            if (gridSelectedOptions.option.isForce) isHide = gridSelectedOptions.option.isHide;
        }
        originalMethod['setColumnHide'].call(this, columnKey, isHide);
    };
    gridObj.setSortEnable = function (enable) {
        if (gridSorting) {
            if (gridSorting.option.isForce) enable = gridSorting.option.isSort;
        }
        originalMethod['setSortEnable'].call(this, enable);
    };
    gridObj._onRowActivate = function (rowIndex) {
        gridObj['__onRowActivate'].apply(this, arguments);
        if (gridRowColor) gridRowColor.changeBgColorHandler(gridObj, rowIndex);
    };
    gridObj.setGroupHeader = function (groupInfo) {
        originalMethod['setGroupHeader'].call(this, groupInfo);
        const os_data = $u.webData.gridSetting.getData($u.webData.getWEB_DATA_ID([$u.page.getPROGRAM_ID(), $(gridObj).data('subId')]))['OS_DATA'];
        if (gridHeaderColor) gridHeaderColor.setOptions(gridObj, os_data);
        if (gridTooltip) gridTooltip.setOptions(gridObj, os_data);
    };
    gridObj.setJSONData = function (jsonArray) {
        originalMethod['setJSONData'].call(this, jsonArray);
        if (gridPaging) gridPaging.gridPagination(gridObj, jsonArray);
    };
}

function webDataCustomize() {
    // button
    // customize.css
    /**
     * $u.buttons.getFormButtonsEl 재정의
     *
     * @param ot_data 저장된 웹데이터
     * @return 처리된 버튼 객체
     */
    $u.buttons.getFormButtonsEl = function (ot_data) {
        let $buttons = [];
        $.each(ot_data, function (index, os_data) {
            if (os_data['NOT_IN_USE'] === '1') return true;
            if ($customWebData.module.hasModule('buttonRole')) {
                if (!$customWebData.module.getModule('buttonRole').isShowRoleButton(os_data)) return true;
            }
            $buttons.push($u.buttons.getSingleButtonsEl(os_data));
            $($buttons[index]).addClass(os_data['VISIBLE']);
        });
        return $buttons;
    };

    /**
     * $u.webData.ignoreCacheSelectOne 재정의
     *
     * @param scope F8 setting 영역
     * @param web_data_id F8 웹데이터 아이디
     * @param callback 콜백함수
     */
    $u.webData.ignoreCacheSelectOne = function (scope, web_data_id, callback) {
        if ($u.webData.hasCustomWebData(web_data_id)) {
            callback($u.webData.getCustomWebData(web_data_id));
            return;
        }

        const importParam = {
            MODE: 'selectOne',
            SCOPE: scope,
            WEB_DATA_ID: web_data_id
        };
        $nst.is_data_os_data('ZUNIECM_WEB_DATA', importParam, function (os_data) {
            const data = $u.webData.getSingleSafeData(os_data['DATA']);
            callback(data);
            if (scope === 'gridSetting') {
                extraModules.forEach((item) => {
                    const name = item['moduleName'];
                    if ($customWebData.module.hasModule(name)) {
                        const module = $customWebData.module.getModule(name);
                        if (module.hasOwnProperty('changeHandler')) module.changeHandler(data['OS_DATA']);
                    }
                });
            }
        });
    };

    // render custom
    const _renderUIComponents = $u.renderUIComponents;
    $u.renderUIComponents = function ($scope, subGroup, customParam) {
        _renderUIComponents($scope, subGroup, customParam);
        if (subGroup === 'gridSetting') {
            extraModules.forEach((item) => {
                const name = item['moduleName'];
                if ($customWebData.module.hasModule(name)) {
                    const module = $customWebData.module.getModule(name);
                    if (module.hasOwnProperty('addEvent')) module.addEvent();
                }
            });
            $customWebData.customInput.init();
        }
    };

    // grid custom
    const _renderGridSingle = $u.renderGridSingle;
    $u.renderGridSingle = function (gridObj, subGroup) {
        _renderGridSingle(gridObj, subGroup);
        var $gridObj = $(gridObj);
        $customWebData.module.setOptions(
            gridObj,
            $u.webData.gridSetting.getData($u.webData.getWEB_DATA_ID([$gridObj.data('subGroup'), $gridObj.data('subId')]))['OS_DATA']
        );
    };
}
