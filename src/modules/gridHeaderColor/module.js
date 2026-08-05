/**
 *
 *
 */
const defaultColor = {
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
                                defaultValue: defaultColor['background'],
                                element:
                                    "<div style='display: inline-flex; align-items: center; margin-right: 10px;'><input type='color'><span style='margin-right: 5px;'>:배경</span></div>"
                            },
                            {
                                key: 'font',
                                defaultValue: defaultColor['font'],
                                element:
                                    "<div style='display: inline-flex; align-items: center; margin-right: 10px;'><input type='color'><span style='margin-right: 5px;'>:글자</span></div>"
                            },
                            {
                                key: 'hover',
                                defaultValue: defaultColor['hover'],
                                element:
                                    "<div style='display: inline-flex; align-items: center; margin-right: 10px;'><input type='color'><span style='margin-right: 5px;'>:오버</span></div>"
                            },
                            {
                                key: 'selectedBackground',
                                defaultValue: defaultColor['selectedBackground'],
                                element:
                                    "<div style='display: inline-flex; align-items: center; margin-right: 10px;'><input type='color'><span style='margin-right: 5px;'>:선택배경</span></div>"
                            }
                        ]
                    }
                ]
            },
            'gridSetting@GRIDHEADER': {
                OS_DATA: {
                    HEADER_COLOR: defaultColor
                }
            }
        },
        hooks: {
            setGridOption: function (gridObj, os_data) {
                let isAll = os_data['COLOR_HEADERS'] === 'ALL',
                    columns = isAll ? $u.plugins.tools.getVisibleGridColumnKeys(gridObj).join() : os_data['COLOR_HEADERS'] || '',
                    color = os_data['HEADER_COLOR'] || defaultColor,
                    gridGroupHeaderInfo = gridObj.groupIndexGroupHeaderMap || {},
                    columnKeys = $u.plugins.tools
                        .trimSplit(columns)
                        .concat(isAll ? Object.values(gridGroupHeaderInfo).map((groupParent) => groupParent['name']) : []);

                $u.plugins.tools.setHeaderStyle(gridObj, columnKeys, color);
            }
        },
        init: function () {}
    };
export {info};
