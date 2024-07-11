/**
 *
 *
 */
(function () {
    const info = {
        version: '1.0.0',
        category: 'gridSetting',
        moduleName: 'gridSelectedOptions',
        webData: {
            'gridSetting@form-data': {
                OT_DATA: [
                    {
                        COLUMN_ID: 'SELECTED_OPTIONS',
                        TEXT: '그리드선택옵션',
                        COLUMN_TYPE: 'Uni_Radio',
                        DEFAULT_VALUE: 'none',
                        OPTIONS: [
                            {text: 'hide', value: 'A'},
                            {text: 'radio', value: 'B'},
                            {text: 'checkAll', value: 'C'},
                            {text: 'none', value: 'D'}
                        ]
                    },
                    {
                        COLUMN_ID: 'SELECTED_OPTIONS_A',
                        TEXT: '옵션',
                        COLUMN_TYPE: 'Uni_CheckBox',
                        OPTIONS: [{text: 'force', value: '1'}]
                    }
                ]
            }
        },
        method: {
            option: {
                isHide: false,
                isRadio: false,
                isCheckAll: false,
                isForce: false
            },
            setOptions: function (gridObj, os_data) {
                const alphaOption = os_data['SELECTED_OPTIONS_A'] || '';
                const option = os_data['SELECTED_OPTIONS'] || '',
                    isHide = !!option.match('A'),
                    isRadio = !!option.match('B'),
                    isCheckAll = !!option.match('C'),
                    isForce = !!alphaOption.match('1');
                info.method.option.isHide = isHide;
                info.method.option.isRadio = isRadio;
                info.method.option.isCheckAll = isCheckAll;
                info.method.option.isForce = isForce;
                gridObj.setColumnHide('SELECTED', isHide);
                gridObj.setCheckBarAsRadio('SELECTED', isRadio);
                gridObj.setHeaderCheckBox('SELECTED', isCheckAll);
            }
        },
        init: function () {}
    };
    $customWebData.module.add(info);
})();
