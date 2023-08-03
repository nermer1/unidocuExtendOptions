/**
 *
 *
 */
define(function() {
    return function() {
        var info = {
            "version": "1.0.0",
            "category": "gridSetting",
            "moduleName": "gridSorting",
            "webData": {
                "gridSetting@form-data": {
                    "OT_DATA": [
                        {
                            "COLUMN_ID": "SORTING_NOT_USED",
                            "TEXT": "정렬미사용",
                            "COLUMN_TYPE": "Uni_CheckBox",
                            "OPTIONS": [
                                { "text": "", "value": "1" }
                            ]
                        },
                        {
                            "COLUMN_ID": "SORTING_MODE",
                            "TEXT": "옵션",
                            "COLUMN_TYPE": "Uni_CheckBox",
                            "OPTIONS": [
                                { "text": "explicit", "value": "1" }
                            ]
                        }
                    ]
                }
            },
            "method": {
                "setOptions": function(gridObj, os_data) {
                    var isSort = os_data["SORTING_NOT_USED"] !== "1",
                        isExplicit = os_data["SORTING_MODE"] === "1";
                    gridObj._rg.setSortingOptions({enabled: isSort});
                    if(isSort && isExplicit) gridObj._rg.gridView.setOptions({sortMode: "explicit"});
                },
                "changeHandler": function(used) {
                    var formId = "SORTING_MODE";
                    if(!$u.get(formId)) return;
                    if(used === "1") $u.get(formId).setReadOnly(true);
                    else $u.get(formId).setReadOnly(false);
                },
                "addEvent": function() {
                    $efi.createStatement.bindEvent.bindChange("SORTING_NOT_USED", function() {
                        info["method"].changeHandler($u.get("SORTING_NOT_USED").getValue());
                    });
                }
            }
        };
        $customWebData.module.add({
            ...info, init: function() {

            }
        });
    }
})