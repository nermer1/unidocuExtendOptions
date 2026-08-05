/**
 *
 *
 */
export const info = {
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
    hooks: {
        setGridOption: function (gridObj, os_data) {
            let groupInfo = os_data['GROUPING'] || '';
            const height = os_data['HEADER_HEIGHT'] || '';
            if (height) gridObj._rg.gridView.setHeader({height: height});
            if (!groupInfo) return;
            else if (Array.isArray(groupInfo) && groupInfo.length === 0) return;
            else if (typeof groupInfo === 'object' && Object.keys(groupInfo).length === 0) return;

            if (Array.isArray(groupInfo)) {
                groupInfo = groupInfo.map((item) => {
                    if (item.hasOwnProperty('groupText')) return item;
                    const key = Object.keys(item)[0];
                    const value = item[key];

                    return {
                        groupText: key,
                        childColumns: value
                    };
                });
            } else {
                groupInfo = Object.keys(groupInfo).map((key) => {
                    return {
                        groupText: key,
                        childColumns: groupInfo[key]
                    };
                });
            }
            gridObj.setGroupHeader(groupInfo);
        }
    },
    init: function () {}
};
