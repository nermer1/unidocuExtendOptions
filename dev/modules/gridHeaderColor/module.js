/**
 *
 *
 */
(function () {
    const defalutColor = {
            background: '#fcfcfc',
            font: '#333333',
            hover: '#efefef',
            selectedBackground: '#efefef'
        },
        info = {
            version: '1.0.0',
            category: 'gridSetting',
            moduleName: 'gridHeaderColor',
            webData: {
                'gridSetting@form-data': {
                    OT_DATA: [
                        {
                            COLUMN_ID: 'COLOR_HEADERS',
                            TEXT: '색상적용헤더',
                            COLUMN_TYPE: 'Uni_InputText'
                        },
                        {
                            COLUMN_ID: 'HEADER_COLOR',
                            TEXT: '색상',
                            COLUMN_TYPE: 'Uni_Empty',
                            SUB_COLUMN_TYPE: 'colorPicker',
                            OPTIONS: [
                                {
                                    key: 'background',
                                    defalutValue: defalutColor['background'],
                                    element:
                                        "<div style='display: inline-flex; align-items: center; margin-right: 10px;'><span style='margin-right: 5px;'>배경:</span><input type='color'></div>"
                                },
                                {
                                    key: 'font',
                                    defalutValue: defalutColor['font'],
                                    element:
                                        "<div style='display: inline-flex; align-items: center; margin-right: 10px;'><span style='margin-right: 5px;'>글자:</span><input type='color'></div>"
                                },
                                {
                                    key: 'hover',
                                    defalutValue: defalutColor['hover'],
                                    element:
                                        "<div style='display: inline-flex; align-items: center; margin-right: 10px;'><span style='margin-right: 5px;'>오버:</span><input type='color'></div>"
                                },
                                {
                                    key: 'selectedBackground',
                                    defalutValue: defalutColor['selectedBackground'],
                                    element:
                                        "<div style='display: inline-flex; align-items: center; margin-right: 10px;'><span style='margin-right: 5px;'>선택배경:</span><input type='color'></div>"
                                }
                            ]
                        }
                    ]
                }
            },
            method: {
                setOptions: function (gridObj, os_data) {
                    let isAll = os_data['COLOR_HEADERS'] === 'ALL',
                        columns = isAll ? $customWebData.tools.getVisibleGridColumnKeys(gridObj).join() : os_data['COLOR_HEADERS'] || '',
                        color = os_data['HEADER_COLOR'] || defalutColor,
                        colorMap = {
                            styles: {
                                background: color['background'],
                                foreground: color['font'],
                                hoveredBackground: color['hover'],
                                selectedBackground: color['selectedBackground']
                            }
                        },
                        gridGroupHeaderInfo = gridObj.groupIndexGroupHeaderMap || {};

                    $customWebData.tools
                        .trimSplit(columns)
                        .concat(isAll ? Object.values(gridGroupHeaderInfo).map((groupParent) => groupParent['name']) : [])
                        .forEach((columnKey) => gridObj._rg.gridView.setColumnProperty(columnKey, 'header', colorMap));
                }
            },
            init: function () {}
        };
    $customWebData.module.add(info);
})();
