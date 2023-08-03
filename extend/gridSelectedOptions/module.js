/**
 *
 *
 */
define(function() {
    return function() {
        var info = {
            "version": "1.0.0",
            "category": "gridSetting",
            "moduleName": "gridSelectedOptions",
            "webData": {
                "gridSetting@form-data": {
                    "OT_DATA": [
                        {
                            "COLUMN_ID": "SELECTED_OPTIONS",
                            "TEXT": "그리드선택옵션",
                            "COLUMN_TYPE": "Uni_CheckBox",
                            "OPTIONS": [
                                { "text": "hide", "value": "A" },
                                { "text": "radio", "value": "B" },
                                { "text": "checkAll", "value": "C" }
                            ],
                            "COL_SPAN": "2"
                        }
                    ]
                }
            },
            "method": {
                "setOptions": function(gridObj, os_data) {
                    var option = os_data["SELECTED_OPTIONS"] || "";
                    gridObj.setColumnHide('SELECTED', !!option.match("A"));
                    gridObj.setCheckBarAsRadio('SELECTED', !!option.match("B"));
                    gridObj.setHeaderCheckBox('SELECTED', !!option.match("C"));
                }
            }
        };
        $customWebData.module.add({
            ...info, init: function() {

            }
        });
    }
})