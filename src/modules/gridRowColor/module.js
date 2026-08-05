/**
 *
 *
 */
const defaultColor = {background: '#ffffff'},
    info = {
        version: '1.0.0',
        category: 'gridSetting',
        moduleName: 'gridRowColor',
        webData: {
            'gridSetting@form-data': {
                OT_DATA: [
                    {
                        COLUMN_ID: 'SET_ROW_COLOR',
                        TEXT: '행색상적용',
                        COLUMN_TYPE: 'Uni_CheckBox',
                        OPTIONS: [{text: 'used', value: '1'}]
                    },
                    {
                        COLUMN_ID: 'SET_ROW_COLOR_SELECT',
                        TEXT: '색상',
                        COLUMN_TYPE: 'Uni_Empty',
                        SUB_COLUMN_TYPE: 'colorPicker',
                        OPTIONS: [
                            {
                                key: 'background',
                                defaultValue: defaultColor['background'],
                                element:
                                    "<div style='display: inline-flex; align-items: center; margin-right: 10px;'><input type='color'><span style='margin-right: 5px;'>:배경</span></div>"
                            }
                        ]
                    }
                ]
            }
        },
        hooks: {
            setGridOption: function (gridObj, os_data) {
                const color = os_data['SET_ROW_COLOR_SELECT'] ? os_data['SET_ROW_COLOR_SELECT']['background'] : defaultColor['background'];
                gridObj.__plugin__gridRowColor_isUsed = os_data['SET_ROW_COLOR'] === '1';
                gridObj.__plugin__gridRowColor_color = $u.plugins.tools.hexColorToRgbColor(color);
            },
            onAfterChangeCell: function (gridObj, columnKey, rowIndex) {
                if (columnKey === 'SELECTED') {
                    info.hooks._changeBgColorHandler(gridObj, rowIndex);
                }
            },
            onAfterRowActivate: function (gridObj, rowIndex) {
                info.hooks._changeBgColorHandler(gridObj, rowIndex);
            },
            _getUsed: function (gridObj) {
                let readOnly = true,
                    headers = $u.plugins.tools.getVisibleGridColumnKeys(gridObj);
                for (let i in headers) {
                    const header = gridObj.getGridHeader(headers[i]);
                    if (header['key'] === 'SELECTED' || header['key'] === 'CRUD') continue;
                    if (header['edit'] === true) {
                        readOnly = false;
                        break;
                    }
                }
                if (gridObj.rg.tree.isTreeMode()) return gridObj.__plugin__gridRowColor_isUsed && readOnly;
                return gridObj.__plugin__gridRowColor_isUsed && readOnly && !$u.plugins.tools.isMergedGrouped(gridObj);
            },
            _changeBgColorHandler: function (gridObj, rowIndex) {
                if (!info.hooks._getUsed(gridObj)) return;
                // 두 값은 아래에서 순차로 세팅되므로 하나만 세팅된 상태가 존재할 수 있다
                if (gridObj.preSelectedIndex !== undefined && gridObj.preCellColorMap) {
                    Object.keys(gridObj.preCellColorMap).map(function (key) {
                        $u.plugins.tools.restoreCellStyle(gridObj, key, gridObj.preSelectedIndex, gridObj.preCellColorMap[key]);
                    });
                }
                gridObj.preSelectedIndex = $u.plugins.tools.originalRowIndex(gridObj, rowIndex);
                gridObj.preCellColorMap = info.hooks._getSaveColors(gridObj, gridObj.preSelectedIndex);
                gridObj.setRowBgColor(gridObj.preSelectedIndex, gridObj.__plugin__gridRowColor_color);
            },
            /**
             * 행 색상 적용 전의 셀 스타일 스냅샷을 보관한다
             *
             * 스냅샷은 restoreCellStyle만 해석하는 불투명 값이므로 내용에 의존하지 않는다
             */
            _getSaveColors: function (gridObj, rowIndex) {
                return (gridObj.getGridHeaders() || []).reduce(function (styleMap, gridInfo) {
                    styleMap[gridInfo['key']] = $u.plugins.tools.getCellStyle(gridObj, gridInfo['key'], rowIndex);
                    return styleMap;
                }, {});
            }
        },
        init: function () {}
    };
export {info};
