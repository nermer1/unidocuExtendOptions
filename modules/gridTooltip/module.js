/**
 *
 *
 */
(function () {
    var info = {
        version: '1.0.0',
        category: 'gridSetting',
        moduleName: 'gridTooltip',
        webData: {
            'gridSetting@form-data': {
                OT_DATA: [
                    {
                        COLUMN_ID: 'TOOLTIP_COLUMNS',
                        TEXT: '툴팁적용컬럼',
                        COLUMN_TYPE: 'Uni_InputText',
                        COL_SPAN: '2'
                    }
                ]
            }
        },
        method: {
            setOptions: function (gridObj, os_data) {
                var columns =
                    os_data['TOOLTIP_COLUMNS'] === 'ALL' ? $customWebData.tools.getVisibleGridColumnKeys(gridObj).join() : os_data['TOOLTIP_COLUMNS'] || '';
                $customWebData.tools.trimSplit(columns).map(function (column) {
                    if (gridObj.getGridHeader(column)) gridObj.useColumnTooltip(column, true);
                });
            }
        },
        init: function () {}
    };
    $customWebData.module.add(info);
})();
