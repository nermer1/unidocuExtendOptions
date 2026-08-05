/**
 *
 *
 */
export const info = {
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
    state: {
        option: {
            isHide: false,
            isRadio: false,
            isCheckAll: false,
            isForce: false
        }
    },
    hooks: {
        setGridOption: function (gridObj, os_data) {
            const alphaOption = os_data['SELECTED_OPTIONS_A'] || '';
            const option = os_data['SELECTED_OPTIONS'] || '',
                isHide = !!option.match('A'),
                isRadio = !!option.match('B'),
                isCheckAll = !!option.match('C'),
                isForce = !!alphaOption.match('1');
            info.state.option.isHide = isHide;
            info.state.option.isRadio = isRadio;
            info.state.option.isCheckAll = isCheckAll;
            info.state.option.isForce = isForce;
            gridObj.setColumnHide('SELECTED', isHide);
            gridObj.setCheckBarAsRadio('SELECTED', isRadio);
            gridObj.setHeaderCheckBox('SELECTED', isCheckAll);
        },
        setCheckBarAsRadioArgs: function (args) {
            if (info.state.option.isForce) {
                args.useAsRadio = info.state.option.isRadio;
            }
            return args;
        },
        setHeaderCheckBoxArgs: function (args) {
            if (info.state.option.isForce) {
                args.useHeaderCheckbox = info.state.option.isCheckAll;
            }
            return args;
        },
        setColumnHideArgs: function (args) {
            if (info.state.option.isForce) {
                args.isHide = info.state.option.isHide;
            }
            return args;
        }
    },
    init: function () {}
};
