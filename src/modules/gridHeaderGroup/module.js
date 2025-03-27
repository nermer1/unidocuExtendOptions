/**
 *
 *
 */
(function () {
    const info = {
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
                        SUB_COLUMN_TYPE: 'jsonEditor'
                    },
                    {
                        COLUMN_ID: 'HEADER_HEIGHT',
                        TEXT: '헤더높이',
                        COLUMN_TYPE: 'Uni_InputText'
                    }
                ]
            }
        },
        method: {
            setOptions: function (gridObj, os_data) {
                const groupInfo = os_data['GROUPING'] || '';
                const height = os_data['HEADER_HEIGHT'] || '';
                if (height) gridObj._rg.gridView.setHeader({height: height});
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
