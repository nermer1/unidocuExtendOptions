/**
 *
 *
 */
export const info = {
    version: '1.0.0',
    category: 'gridSetting',
    moduleName: 'gridSorting',
    webData: {
        'gridSetting@form-data': {
            OT_DATA: [
                {
                    COLUMN_ID: 'SORTING_NOT_USED',
                    TEXT: '그리드정렬',
                    COLUMN_TYPE: 'Uni_CheckBox',
                    OPTIONS: [{text: 'unused', value: 'A'}]
                },
                {
                    COLUMN_ID: 'SORTING_NOT_USED_A',
                    TEXT: '옵션',
                    COLUMN_TYPE: 'Uni_CheckBox',
                    OPTIONS: [
                        {text: 'explicit', value: 'A'},
                        {text: 'force', value: 'B'}
                    ]
                }
            ]
        }
    },
    state: {
        option: {
            isSort: false,
            isForce: false
        }
    },
    hooks: {
        setGridOption: function (gridObj, os_data) {
            const alphaOption = os_data['SORTING_NOT_USED_A'] || '';
            var option = os_data['SORTING_NOT_USED'] || '',
                isSort = !option.match('A'),
                isExplicit = alphaOption.match('A'),
                isForce = !!alphaOption.match('B');
            info.state.option.isSort = isSort;
            info.state.option.isForce = isForce;
            gridObj._rg.setSortingOptions({enabled: isSort});
            if (isSort && isExplicit) gridObj._rg.gridView.setOptions({sortMode: 'explicit'});
        },
        changeHandler: function (os_data = {}) {
            const {SORTING_NOT_USED: used = ''} = os_data;
            var formId = 'SORTING_NOT_USED_A';
            if (!$u.get(formId)) return;
            if (used.match('A')) {
                $u.get(formId).$el.find('input').first().prop('disabled', true);
                $u.get(formId).setValue($u.get(formId).getValue().replace(/A,?/, ''));
            } else {
                $u.get(formId).$el.find('input').first().prop('disabled', false);
            }
        },
        test: function () {
            $efi.createStatement.bindEvent.bindChange('SORTING_NOT_USED', function () {
                info.hooks.changeHandler({SORTING_NOT_USED: $u.get('SORTING_NOT_USED').getValue()});
            });
            $efi.createStatement.bindEvent.triggerChange('SORTING_NOT_USED');
        },
        setSortEnableArg: function (args) {
            if (info.state.option.isForce) {
                args.enable = info.state.option.isSort;
            }
            return args;
        }
    },
    init: function () {}
};
