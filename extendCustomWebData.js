/**
 * @namespace extendCustomWebData
 * @version 1.0.0
 *
 * F8 gridSetting, formSetting, buttonSetting에 대한 옵션 확장
 *
 * 지원: 유니다큐5 이상
 *
 * 사용법:
 *
 * customize.js vendorCustom/extendCustomWebData 모듈 로드
 * config-extraModules: module 등록된 모듈을 로드한다.
 * module의 기본 경로는 extend 폴더를 참조한다.
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
 *         SUMMARY_LOCATION: 합계 상단, 하단 표시 여부
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
define(function () {
    window.$customWebData ||
        (window.$customWebData = (function () {
            const customInfo = {
                moduleLoad: function (path) {
                    const extraModules = $customWebData.getConfig().extraModules;
                    extraModules.map((name, index) => (extraModules[index] = path + name + '/module'));
                    require(extraModules, function () {
                        for (let index in arguments) {
                            arguments[index].call(this);
                        }
                    });
                },
                extendWebData: function (webData) {
                    Object.keys(webData).map(function (key) {
                        if (!$u.webData.customWebDataMap[key]) throw '존재하지 않는 웹데이터 아이디';
                        if (webData[key].hasOwnProperty('OT_DATA'))
                            webData[key]['OT_DATA'].map((data) => $u.webData.customWebDataMap[key]['OT_DATA'].push(data));
                        if (webData[key].hasOwnProperty('OS_DATA'))
                            $customWebData.module.extend($u.webData.customWebDataMap[key]['OS_DATA'], webData[key]['OS_DATA']);
                    });
                }
            };

            // 초기 데이터 필요시 설정
            /*(function init() {
                customInfo['extendWebData'].call(this, {
                    "gridSetting@form-data": {
                        "OS_DATA": {
                            "COL_LEN": "3"
                        }
                    }
                });
            }());*/

            return customInfo;
        })());

    /**
     *
     *
     */
    const config = {
        version: '1.0.0',
        name: 'extendCustomWebData',
        description: 'unidocu5 plugin, f8 option extension',
        extraModules: ['gridSorting', 'gridSummary', 'gridTooltip', 'gridHeaderGroup', 'gridHeaderColor', 'gridRowColor', 'gridSelectedOptions', 'buttonRole']
    };
    $customWebData.getConfig = () => config;
    $customWebData.setConfig = (option) => {
        if (Array.isArray(option) || typeof option !== 'object' || Object.keys(option).length > 1 || !option.hasOwnProperty('extraModules'))
            throw '{extraModules: [module1, module2...]} 형태만 입력 바람.';
        config['extraModules'] = option['extraModules'];
    };

    /**
     * 여러가지 util
     */
    $customWebData.tools = {
        extend: function () {
            var o = arguments[0];
            for (var i = 1; i < arguments.length; ++i) {
                for (var k in arguments[i]) {
                    if (arguments[i].hasOwnProperty(k)) o[k] = arguments[i][k];
                }
            }
            return o;
        },
        /**
         * 문자열 구분자로 분리 반환, 구분자 입력 시 앞뒤 공백 제거
         *
         * @param a {string} 자를 문자열
         * @param b {string?} 구분자 없으면 ","
         * @return {string[]}
         */
        trimSplit: (a, b) => {
            b = !b ? ',' : b;
            if (!a) return [];
            return a
                .replace(new RegExp('[\\' + b + '\\s][\\' + b + '\\s]*', 'ig'), b)
                .replace(new RegExp('[\\' + b + '\\s]*?$', 'i'), '')
                .split(b);
        },
        /**
         * ROLE 권한 체크
         *
         * @param s {string} 권한이 나열된 문자열 1, 2..
         * @param t {string} 확인할 권한
         * @return {boolean} 권현 존재 여부 반환
         */
        hasRole: (s, t) => {
            return $customWebData.tools.trimSplit(s).reduce(function (a, b) {
                if (new RegExp('(\\s|\\,|^)' + b + '(\\s|\\,|$)', 'i').test(t)) a = true;
                return a;
            }, false);
        },
        /**
         * 16진수{#ffffff} -> 255|255|255 타입 변환
         *
         * @param hexColor {string}
         * @return {string}
         */
        hexColorToRgbColor: (hexColor) => {
            if (!/^#?[a-zA-Z0-9]{6}$/.test(hexColor)) {
                console.log('16진수 color 값 필요');
                return hexColor;
            }
            return hexColor
                .replace('#', '')
                .match(/.{2}/g)
                .reduce((str, color, index, array) => {
                    str += parseInt(color, 16) + (index < array.length - 1 ? '|' : '');
                    return str;
                }, '');
        },
        /**
         * 255|255|255 -> 16진수{#ffffff} 타입 변환
         *
         * @param rgbColor {string}
         * @return {string}
         */
        rgbColorToHexColor: (rgbColor) => {
            if (!/^\d{1,3}\|\d{1,3}\|\d{1,3}$/.test(rgbColor)) {
                console.log('R|G|B 10진수값 필요');
                return rgbColor;
            }
            return rgbColor.split('|').reduce((str, color, index) => {
                str += (index === 0 ? '#' : '') + parseInt(color).toString(16);
                return str;
            }, '');
        },
        isEmptyObject: (o = {}) => {
            return Object.keys(o).length === 0;
        },
        /**
         * 숨겨진 컬럼을 제외하고 보이는 컬럼명만 가져온다
         *
         * @param gridObj {object}
         * @return {string[]}
         */
        getVisibleGridColumnKeys: (gridObj) => {
            return gridObj.getGridHeaders().reduce((keys, column) => {
                if (!gridObj.rg.style.isColumnHide(column['key'])) keys.push(column['key']);
                return keys;
            }, []);
        },
        /**
         * 정렬 등으로 인해 위치가 변경된 경우 실제 데이터 위치값을 가져온다
         *
         * @param gridObj {object}
         * @param rowIndex {number|string}
         * @return {number}
         */
        originalRowIndex: (gridObj, rowIndex) => {
            return gridObj._rg.gridView.getValues(rowIndex)['__rowId'];
        }
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

            $self.init = function () {
                $self.$el.append('<div class="input-box"><input type="text" readonly/></div>');
                $input = $self.$el.find('input');
                $input.click(function () {
                    $u.dialog.JSONInputDialog.open(function (data) {
                        $self.setValue(data);
                    }, $self.getValue());
                });
            };

            $self.getValue = function () {
                return $input.val() ? JSON.parse($input.val()) : {};
            };

            $self.setValue = function (value) {
                value = value ? JSON.stringify(value) : '';
                $input.val(value);
            };

            $self.init();
        }
    };
    $customWebData.customInput = new $customWebData.customInputManager();

    $customWebData.moduleManager = function (path) {
        this.basePath = path;
        this.modules = {};
    };
    $customWebData.moduleManager.prototype = {
        add: function (data) {
            let name = data['moduleName'],
                module;
            if (this.modules[name]) throw `모듈 ${name}(이/가) 중복 등록 불가`;
            module = this.modules[name] = data || {};
            module.path = this.basePath + name;
            $customWebData.extendWebData(data['webData']);
            if (typeof data['init'] === 'function') data['init'].call(this);
        },
        load: function () {
            $customWebData.moduleLoad(this.basePath);
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
    $customWebData.module = new $customWebData.moduleManager('vendorCustom/extend/');
    $customWebData.module.load();

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
     * _onRowActivate, setGroupHeader 재정의
     *
     * @param gridObj 그리드 객체
     */
    function customizeBindExtendAPI(gridObj) {
        gridObj.setCheckBarAsRadio = function (columnKey, useAsRadio) {
            if ($customWebData.module.hasModule('gridSelectedOptions')) {
                var module = $customWebData.module.getModule('gridSelectedOptions');
                if (module.option.isForce) useAsRadio = module.option.isRadio;
            }
            gridObj._rg.setCheckBar({
                exclusive: useAsRadio === null || useAsRadio === undefined ? true : useAsRadio
            });
        };
        gridObj.setHeaderCheckBox = function (columnKey, useHeaderCheckbox) {
            if ($customWebData.module.hasModule('gridSelectedOptions')) {
                var module = $customWebData.module.getModule('gridSelectedOptions');
                if (module.option.isForce) useHeaderCheckbox = module.option.isCheckAll;
            }
            gridObj._rg.setCheckBar({showAll: useHeaderCheckbox});
        };
        gridObj.setColumnHide = function (columnKey, isHide) {
            if ($customWebData.module.hasModule('gridSelectedOptions')) {
                var module = $customWebData.module.getModule('gridSelectedOptions');
                if (module.option.isForce) isHide = module.option.isHide;
            }
            var visible = isHide === false;
            if (columnKey === 'SELECTED') gridObj._rg.setCheckBar({visible: visible});
            else gridObj._rg.setColumnProperty(columnKey, 'visible', visible);

            if (gridObj.getGridHeader(columnKey) && gridObj.getGridHeader(columnKey)['serverType'] === 'popup') {
                gridObj._rg.setColumnProperty(columnKey + '_', 'visible', visible);
                gridObj._rg.setColumnProperty(columnKey + '_TXT', 'visible', visible);
            }
        };
        gridObj.setSortEnable = function (enable) {
            if ($customWebData.module.hasModule('gridSorting')) {
                var module = $customWebData.module.getModule('gridSorting');
                if (module.option.isForce) enable = module.option.isSort;
            }
            gridObj._rg.setSortingOptions({enabled: enable});
        };
        gridObj._onRowActivate = function (rowIndex) {
            gridObj['__onRowActivate'].apply(this, arguments);
            if ($customWebData.module.hasModule('gridRowColor')) $customWebData.module.getModule('gridRowColor').changeBgColorHandler(gridObj, rowIndex);
        };
        gridObj.setGroupHeader = function (groupInfo) {
            gridObj.groupInfo = $.extend(true, [], groupInfo);
            gridObj.columnsKeyGroupIndexMap = {};
            $.each(gridObj.groupInfo, function (index, item) {
                $.each(item['childColumns'], function (index2, item2) {
                    let gridHeader = gridObj.getGridHeader(item2);
                    if (!gridHeader) throw item2 + ' grid header undefined.';
                    if (!item.subColumns) item.subColumns = [];
                    item.subColumns.push($.extend(true, {}, gridHeader));
                    gridObj.columnsKeyGroupIndexMap[gridHeader.key] = index;
                });
            });
            let headers = gridObj.rg._gridHeadersToRealGridHeaders(gridObj.getGridHeaders(), gridObj.getRealGridUserDateFormat());
            let groupHeaderTemplate = {
                type: 'group',
                orientation: 'horizontal',
                width: 0,
                columns: []
            };
            let groupHeaders = [];
            gridObj.groupIndexGroupHeaderMap = {};
            $.each(headers, function (index, item) {
                let groupIndex = gridObj.columnsKeyGroupIndexMap[item.fieldName];
                if (groupIndex === undefined) {
                    groupHeaders.push(item);
                    return true;
                }
                if (!gridObj.groupIndexGroupHeaderMap[groupIndex]) {
                    let groupHeader = $.extend(true, {name: groupInfo[groupIndex]['groupText']}, groupHeaderTemplate);
                    gridObj.groupIndexGroupHeaderMap[groupIndex] = groupHeader;
                    groupHeaders.push(groupHeader);
                }
                gridObj.groupIndexGroupHeaderMap[groupIndex].columns.push(item);
                gridObj.groupIndexGroupHeaderMap[groupIndex].width += Number(item.width);
            });
            gridObj._rg.setColumns(groupHeaders);
            $.each(gridObj.getGridHeaders(), function (index, header) {
                if ($.type(header['combos']) === 'array') gridObj.setComboOptions(header.key, header['combos']);
            });
            gridObj.rg._applyGridFormat();
            gridObj.setGridNumberPrecision($u.unidocuCurrency.getSystemPrecision());

            var os_data = $u.webData.gridSetting.getData($u.webData.getWEB_DATA_ID([$u.page.getPROGRAM_ID(), $(gridObj).data('subId')]))['OS_DATA'];
            if ($customWebData.module.hasModule('gridHeaderColor')) $customWebData.module.getModule('gridHeaderColor').setOptions(gridObj, os_data);
            if ($customWebData.module.hasModule('gridTooltip')) $customWebData.module.getModule('gridTooltip').setOptions(gridObj, os_data);
        };
    }

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

        var importParam = {
            MODE: 'selectOne',
            SCOPE: scope,
            WEB_DATA_ID: web_data_id
        };
        $nst.is_data_os_data('ZUNIECM_WEB_DATA', importParam, function (os_data) {
            var data = $u.webData.getSingleSafeData(os_data['DATA']);
            callback(data);
            if (scope === 'gridSetting') {
                if ($customWebData.module.hasModule('gridSorting'))
                    $customWebData.module.getModule('gridSorting').changeHandler(data['OS_DATA']['SORTING_NOT_USED']);
                if ($customWebData.module.hasModule('gridSummary'))
                    $customWebData.module.getModule('gridSummary').changeHandler(data['OS_DATA']['USE_SUMMARY']);
            }
        });
    };

    // render custom
    const _renderUIComponents = $u.renderUIComponents;
    $u.renderUIComponents = function ($scope, subGroup, customParam) {
        _renderUIComponents($scope, subGroup, customParam);
        $efi.currencyEventAfterRender($scope);
        if (subGroup === 'gridSetting') {
            if ($customWebData.module.hasModule('gridSorting')) $customWebData.module.getModule('gridSorting').addEvent();
            if ($customWebData.module.hasModule('gridSummary')) $customWebData.module.getModule('gridSummary').addEvent();
            $customWebData.customInput.init();
        }
    };

    // grid custom
    const _renderGridSingle = $u.renderGridSingle;
    $u.renderGridSingle = function (gridObj, subGroup) {
        _renderGridSingle(gridObj, subGroup);
        $customWebData.module.setOptions(gridObj, $u.webData.gridSetting.getData($u.webData.getWEB_DATA_ID([subGroup, $(gridObj).data('subId')]))['OS_DATA']);
    };
});
