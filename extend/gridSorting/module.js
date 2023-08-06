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
                            "TEXT": "그리드정렬",
                            "COLUMN_TYPE": "Uni_CheckBox",
                            "OPTIONS": [
                                { "text": "unused", "value": "A" },
                                { "text": "force", "value": "B" }
                            ]
                        },
                        {
                            "COLUMN_ID": "SORTING_MODE",
                            "TEXT": "옵션",
                            "COLUMN_TYPE": "Uni_CheckBox",
                            "OPTIONS": [
                                { "text": "explicit", "value": "A" }
                            ]
                        }
                    ]
                }
            },
            "method": {
                "option": {
                    "isSort": false,
                    "isForce": false,
                },
                "setOptions": function(gridObj, os_data) {
                    var option = os_data["SORTING_NOT_USED"] || "",
                        isSort = !option.match("A"),
                        isForce = !!option.match("B"),
                        isExplicit = os_data["SORTING_MODE"] === "A";
                    info.method.option.isSort = isSort;
                    info.method.option.isForce = isForce;
                    gridObj._rg.setSortingOptions({enabled: isSort});
                    if(isSort && isExplicit) gridObj._rg.gridView.setOptions({sortMode: "explicit"});
                },
                "changeHandler": function(used) {
                    used = used || "";
                    var formId = "SORTING_MODE";
                    if(!$u.get(formId)) return;
                    if(!!used.match("A")) $u.get(formId).setReadOnly(true);
                    else $u.get(formId).setReadOnly(false);
                },
                "addEvent": function() {
                    $efi.createStatement.bindEvent.bindChange("SORTING_NOT_USED", function() {
                        info["method"].changeHandler($u.get("SORTING_NOT_USED").getValue());
                    });
                }
            },
            "init": function() {

            }
        };
        $customWebData.module.add(info);
    }
})