/**
 *
 *
 */
define(function () {
    return function () {
        var info = {
            version: '1.0.0',
            category: 'gridSetting',
            moduleName: 'gridSelectedOptions',
            webData: {
                'gridSetting@form-data': {
                    OT_DATA: [
                        {
                            COLUMN_ID: 'SELECTED_OPTIONS',
                            TEXT: '그리드선택옵션',
                            COLUMN_TYPE: 'Uni_CheckBox',
                            OPTIONS: [
                                {text: 'hide', value: 'A'},
                                {text: 'radio', value: 'B'},
                                {text: 'checkAll', value: 'C'},
                                {text: 'force', value: 'D'}
                            ],
                            COL_SPAN: '2'
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
                    var option = os_data['SELECTED_OPTIONS'] || '',
                        isHide = !!option.match('A'),
                        isRadio = !!option.match('B'),
                        isCheckAll = !!option.match('C'),
                        isForce = !!option.match('D');
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
    };
});
