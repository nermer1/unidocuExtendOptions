/**
 *
 *
 */
define(function() {
    return function() {
        const defalutColor = {"background": "#ffffff"},
            info = {
            "version": "1.0.0",
            "category": "gridSetting",
            "moduleName": "gridRowColor",
            "webData": {
                "gridSetting@form-data": {
                    "OT_DATA": [
                        {
                            "COLUMN_ID": "SET_ROW_COLOR",
                            "TEXT": "행색상적용",
                            "COLUMN_TYPE": "Uni_CheckBox",
                            "OPTIONS": [
                                { "text": "used", "value": "1" }
                            ]
                        },
                        {
                            "COLUMN_ID": "SET_ROW_COLOR_SELECT",
                            "TEXT": "색상",
                            "COLUMN_TYPE": "Uni_Empty",
                            "SUB_COLUMN_TYPE": "colorPicker",
                            "OPTIONS": [
                                {
                                    "key": "background",
                                    "defalutValue": defalutColor["background"],
                                    "element": "<div style='display: inline-flex; align-items: center; margin-right: 10px;'><span style='margin-right: 5px;'>배경:</span><input type='color'></div>"
                                }
                            ]
                        }
                    ]
                }
            },
            "method": {
                "option": {
                    "isUsed": false,
                    "color": ""
                },
                "setOptions": function(gridObj, os_data) {
                    var color = os_data["SET_ROW_COLOR_SELECT"]? os_data["SET_ROW_COLOR_SELECT"]["background"] : defalutColor["background"];
                    info.method.option.isUsed = os_data["SET_ROW_COLOR"] === "1";
                    info.method.option.color = $customWebData.tools.hexColorToRgbColor(color);
                },
                "getUsed": function(gridObj) {
                    var readOnly = true, headers = $customWebData.tools.getVisibleGridColumnKeys(gridObj);
                    for(var i in headers) {
                        if(headers[i]["key"] === "SELECTED" || headers[i]["key"] === "CRUD") continue;
                        if(headers[i]["edit"] === true) { readOnly = false; break; }
                    }
                    if(gridObj.rg.tree.isTreeMode()) return info.method.option.isUsed && readOnly;
                    return info.method.option.isUsed && readOnly && !gridObj._rg.gridView.isMergedGrouped();
                },
                "changeBgColorHandler": function(gridObj, rowIndex) {
                    if(!info.method.getUsed(gridObj)) return;
                    if(gridObj.preSelectedIndex !== undefined) {
                        Object.keys(gridObj.preCellColorMap).map(function(key) {
                            gridObj.setCellBgColor(key, gridObj.preSelectedIndex, gridObj.preCellColorMap[key] ? gridObj.rg.style._toWisegridColorText(gridObj.preCellColorMap[key]) : "");
                        });
                    }
                    gridObj.preSelectedIndex = $customWebData.tools.originalRowIndex(gridObj, rowIndex);
                    gridObj.preCellColorMap = info.method.getSaveColors(gridObj, gridObj.preSelectedIndex);
                    gridObj.setRowBgColor(gridObj.preSelectedIndex, info.method.option.color);
                },
                "getSaveColors": function(gridObj, rowIndex) {
                    return gridObj.getGridHeaders().reduce(function(colorMap, gridInfo) {
                        const color = gridObj.rg.style._getCellStyleMap(gridInfo["key"], rowIndex);
                        colorMap[gridInfo["key"]] = color ? color["background"] : color;
                        return colorMap;
                    }, {});
                }
            },
            "init": function() {

            }
        };
        $customWebData.module.add(info);
    }
})