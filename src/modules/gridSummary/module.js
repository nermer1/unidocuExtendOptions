/**
 *
 *
 */
(function () {
    const info = {
        version: '1.0.0',
        category: 'gridSetting',
        moduleName: 'gridSummary',
        webData: {
            'gridSetting@form-data': {
                OT_DATA: [
                    {
                        COLUMN_ID: 'USE_SUMMARY',
                        TEXT: '합계사용',
                        COLUMN_TYPE: 'Uni_CheckBox',
                        OPTIONS: [{text: '', value: '1'}]
                    },
                    {
                        COLUMN_ID: 'USE_SUMMARY_A',
                        TEXT: '옵션',
                        COLUMN_TYPE: 'Uni_CheckBox',
                        OPTIONS: [{text: 'footer', value: '1'}]
                    }
                ]
            }
        },
        method: {
            setOptions: function (gridObj, os_data) {
                const isSummary = os_data['USE_SUMMARY'] === '1',
                    footer = os_data['USE_SUMMARY_A'] === '1' ? 'footer' : '';
                gridObj.setSummaryVisible(isSummary, footer);
            },
            changeHandler: function (used) {
                const formId = 'USE_SUMMARY_A';
                if (!$u.get(formId)) return;
                if (used === '1') $u.get(formId).setReadOnly(false);
                else $u.get(formId).setReadOnly(true);
            },
            addEvent: function () {
                $efi.createStatement.bindEvent.bindChange('USE_SUMMARY', function () {
                    info['method'].changeHandler($u.get('USE_SUMMARY').getValue());
                });
            }
        },
        init: function () {}
    };
    $customWebData.module.add(info);
})();
