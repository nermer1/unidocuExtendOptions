/**
 *
 *
 */
(function () {
    var info = {
        version: '1.0.0',
        category: 'gridSetting',
        moduleName: 'gridHeaderGroup',
        webData: {
            'gridSetting@form-data': {
                OT_DATA: [
                    {
                        COLUMN_ID: 'GROUPING',
                        TEXT: '헤더그룹핑',
                        COLUMN_TYPE: 'Uni_Empty',
                        SUB_COLUMN_TYPE: 'jsonEditor',
                        COL_SPAN: '2'
                    }
                ]
            }
        },
        method: {
            setOptions: function (gridObj, os_data) {
                var groupInfo = os_data['GROUPING'] || '';
                if (!groupInfo) return;
                else if (Array.isArray(groupInfo) && groupInfo.length === 0) return;
                else if (typeof groupInfo === 'object' && Object.keys(groupInfo).length === 0) return;
                gridObj.setGroupHeader(groupInfo);
            }
        },
        init: function () {}
    };
    $customWebData.module.add(info);
})();
