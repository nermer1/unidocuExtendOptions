/**
 *
 *
 */
(function () {
    const info = {
        version: '1.0.0',
        category: 'buttonSetting',
        moduleName: 'buttonRole',
        webData: {
            'buttonSetting@GRIDHEADER': {
                OT_DATA: [
                    {
                        FNAME: 'VISIBLE',
                        WIDTH: '100',
                        TYPE: 'customCombo',
                        EDIT: 'X',
                        ADD_EMPTY: 'X',
                        OPTIONS: ['hidden']
                    },
                    {
                        FNAME: 'BUTTON_ROLE',
                        WIDTH: '100',
                        TYPE: 'text',
                        EDIT: 'X'
                    }
                ]
            }
        },
        method: {
            isShowRoleButton: function (os_data) {
                if (!os_data['BUTTON_ROLE']) return true;
                const isUserRole = $customWebData.tools.hasRole(os_data['BUTTON_ROLE'], [staticProperties.user['ROLE'], staticProperties.user['PERNR']].join());
                if (!!os_data['VISIBLE'] && !!os_data['BUTTON_ROLE']) {
                    if (!isUserRole) os_data['VISIBLE'] = '';
                    return true;
                }
                return isUserRole;
            }
        },
        init: function () {}
    };
    $customWebData.module.add(info);
})();
