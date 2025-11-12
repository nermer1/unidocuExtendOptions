/**
 *
 *
 */
export const info = {
    version: '1.0.0',
    category: 'gridSetting',
    moduleName: 'gridPaging',
    webData: {
        'gridSetting@form-data': {
            OT_DATA: [
                {
                    COLUMN_ID: 'TEST_COLUMNS',
                    TEXT: '페이징',
                    COLUMN_TYPE: 'Uni_CheckBox',
                    OPTIONS: [{text: 'used', value: 'A'}]
                },
                {
                    COLUMN_ID: 'TEST_COLUMNS_A',
                    TEXT: '옵션',
                    COLUMN_TYPE: 'Uni_Empty',
                    SUB_COLUMN_TYPE: 'jsonEditor',
                    DEFAULT_VALUE: {
                        pageSize: 30,
                        pageSizes: [30, 50, 100, 200, '전체']
                    }
                }
            ]
        }
    },
    method: {
        setOptions: function (gridObj, os_data) {
            gridObj.__plugin__gridPaging_isUsed = os_data['TEST_COLUMNS'] === 'A';
            gridObj.__plugin__gridPaging_page = os_data['TEST_COLUMNS_A'];
            gridPagination(gridObj, []);
        },
        gridPagination: function (gridObj, ot_data) {
            gridPagination(gridObj, ot_data);
        }
    },
    init: function () {}
};
function gridPagination(gridObj, gridData) {
    if (!gridObj.__plugin__gridPaging_isUsed) return;
    const gridView = gridObj._rg.gridView;
    const options = gridObj.__plugin__gridRowColor_page || {pageSize: 30, pageSizes: [30, 50, 100, 200, '전체']};
    const paginationState = {currentPage: 1, pageSize: options.pageSize, totalCount: 0, totalPages: 0};
    const gridPaginationContainer = $('#grid-pagination-container');

    if (gridData.length.toString().length > 2) gridView.setIndicator({minWidth: gridData.length.toString().length * 9});
    // 중복 초기화 방지
    if (gridPaginationContainer.length > 0) gridPaginationContainer.remove();

    function createPaginationUI() {
        const pageSizeOptions = options.pageSizes
            .map((size) => {
                const value = size === '전체' ? 99999 : size;
                return `<option value="${value}">${size}</option>`;
            })
            .join('');

        const paginationHtml = `
                    <style>
                        #grid-pagination-container .page-btn {
                            padding: 5px 10px;
                            border: 1px solid #dee2e6;
                            background: #fff;
                            color: #3db7e4;
                            cursor: pointer;
                            border-radius: 3px;
                            font-size: 14px;
                            min-width: 30px;
                            text-align: center;
                            transition: all 0.2s ease;
                        }
                        #grid-pagination-container .page-btn:hover:not(.disabled):not(.active) {
                            background: #e9ecef;
                            border-color: #adb5bd;
                        }
                        #grid-pagination-container .page-btn.active {
                            background: #3db7e4;
                            color: white;
                            border-color: #3db7e4;
                        }
                        #grid-pagination-container .page-btn.disabled {
                            color: #6c757d;
                            cursor: not-allowed;
                            background: #f8f9fa;
                            border-color: #dee2e6;
                        }
                        #grid-pagination-container #page-jump-input::-webkit-inner-spin-button, 
                        #grid-pagination-container #page-jump-input::-webkit-outer-spin-button {
                            -webkit-appearance: none;
                            margin: 0;
                        }
                        #grid-pagination-container #page-jump-input {
                            -moz-appearance: textfield;
                        }
                        #grid-pagination-container select, 
                        #grid-pagination-container input {
                            transition: border-color 0.2s ease;
                        }
                        #grid-pagination-container select:focus, 
                        #grid-pagination-container input:focus {
                            outline: none;
                            border-color: #3db7e4;
                            box-shadow: 0 0 0 2px rgba(61, 183, 228, 0.2);
                        }
                    </style>
                    <div id="grid-pagination-container" style="
                        display: flex; 
                        justify-content: space-between; 
                        align-items: center; 
                        padding: 10px 20px; 
                        background: #ffffff; 
                        border: 1px solid #dee2e6; 
                        border-top: none;
                        height: 40px;
                        box-sizing: border-box;
                    ">
                        <div class="pagination-info" style="font-size: 14px; color: #6c757d;">
                            전체 <strong class="total-page-view">0</strong>건 중 <strong class="current-page-view">0-0</strong>건 표시
                        </div>
                        <div class="pagination-controls" style="display: flex; align-items: center; gap: 15px;">
                            <div class="page-size-control" style="display: flex; align-items: center; gap: 5px; font-size: 14px;">
                                <span>페이지당</span>
                                <select id="grid-page-size" style="padding: 4px 8px; border: 1px solid #ccc; border-radius: 3px;">
                                    ${pageSizeOptions}
                                </select>
                            </div>
                            <div class="pagination-nav" style="display: flex; gap: 3px;">
                                <button class="page-btn" data-action="first">«</button>
                                <button class="page-btn" data-action="prev">‹</button>
                                <span id="page-numbers" style="display: flex; gap: 3px;"></span>
                                <button class="page-btn" data-action="next">›</button>
                                <button class="page-btn" data-action="last">»</button>
                            </div>
                            <div class="page-jump-control" style="display: flex; align-items: center; gap: 5px; font-size: 14px;">
                                <input type="number" id="page-jump-input" min="1" style="width: 60px; padding: 4px; border: 1px solid #ccc; border-radius: 3px;" placeholder="페이지">
                                <button class="page-btn" data-action="jump">이동</button>
                            </div>
                        </div>
                    </div>
                `;

        $(gridObj).after(paginationHtml);
        $('#grid-page-size').val(options.pageSize);
    }
    // 그리드 높이 조정
    function adjustGridHeight() {
        const $grid = $(gridObj);
        const windowHeight = $(window).height();
        const gridTop = $grid.offset().top;
        const availableHeight = windowHeight - gridTop - 80;

        $grid.css({'max-height': `${availableHeight}px`, height: `${availableHeight}px`});
    }
    // 페이지네이션 UI 업데이트
    function updatePaginationDisplay() {
        const {currentPage, pageSize, totalCount, totalPages} = paginationState;

        // 정보 표시 업데이트
        const startIndex = totalCount > 0 ? (currentPage - 1) * pageSize + 1 : 0;
        const endIndex = Math.min(currentPage * pageSize, totalCount);

        $('.total-page-view').text(totalCount.toLocaleString());
        $('.current-page-view').text(totalCount > 0 ? `${startIndex.toLocaleString()}-${endIndex.toLocaleString()}` : '0-0');

        // 페이지 번호 생성
        const $pageNumbers = $('#page-numbers');
        $pageNumbers.empty();

        if (totalPages > 0) {
            const startPage = Math.max(1, currentPage - 2);
            const endPage = Math.min(totalPages, currentPage + 2);

            for (let i = startPage; i <= endPage; i++) {
                const displayPage = i.toString().padStart(2, '0'); // 두 자리로 포맷팅
                const btnClass = i === currentPage ? 'page-btn active' : 'page-btn';
                $pageNumbers.append(`<button class="${btnClass}" data-page="${i}">${displayPage}</button>`);
            }
        }

        $('.page-btn[data-action="first"], .page-btn[data-action="prev"]').toggleClass('disabled', currentPage <= 1);
        $('.page-btn[data-action="next"], .page-btn[data-action="last"]').toggleClass('disabled', currentPage >= totalPages);
        $('#page-jump-input').val(currentPage);
    }

    function goToPage(page) {
        if (page < 1 || page > paginationState.totalPages || page === paginationState.currentPage) return;

        paginationState.currentPage = page;
        gridView.setPage(page - 1);
        updatePaginationDisplay();
    }

    // 페이지 크기 변경
    function changePageSize(pageCount) {
        paginationState.pageSize = pageCount;
        paginationState.totalPages = Math.ceil(paginationState.totalCount / paginationState.pageSize);
        paginationState.currentPage = 1;

        gridView.setPaging(true, pageCount);
        updatePaginationDisplay();
    }

    // 전체 데이터 업데이트
    function updateAllData() {
        paginationState.totalCount = gridData ? gridData.length : 0;
        paginationState.totalPages = Math.ceil(paginationState.totalCount / paginationState.pageSize);
        paginationState.currentPage = 1;

        gridView.setPage(0); // RealGrid 첫 페이지로 이동 (0-based)
        updatePaginationDisplay();
    }

    // 이벤트 바인딩
    function bindEvents() {
        $(document)
            .off('change', '#grid-page-size')
            .on('change', '#grid-page-size', function () {
                let pageCount = $(this).val();
                if (pageCount === '전체') pageCount = 99999;
                changePageSize(parseInt(pageCount));
            });

        // 페이지네이션 버튼 클릭 이벤트
        $(document)
            .off('click', '.page-btn')
            .on('click', '.page-btn', function () {
                const $btn = $(this);
                if ($btn.hasClass('disabled')) return;

                const action = $btn.data('action');
                const page = $btn.data('page');

                if (action === 'first') {
                    goToPage(1);
                } else if (action === 'prev') {
                    goToPage(paginationState.currentPage - 1);
                } else if (action === 'next') {
                    goToPage(paginationState.currentPage + 1);
                } else if (action === 'last') {
                    goToPage(paginationState.totalPages);
                } else if (action === 'jump') {
                    const inputPage = parseInt($('#page-jump-input').val());
                    if (!isNaN(inputPage)) goToPage(inputPage);
                } else if (page !== undefined) {
                    goToPage(page);
                }
            });

        // 페이지 입력 필드에서 Enter 키로 이동
        $(document)
            .off('keypress', '#page-jump-input')
            .on('keypress', '#page-jump-input', function (e) {
                if (e.which === 13) {
                    // Enter 키
                    const inputPage = parseInt($(this).val());
                    if (!isNaN(inputPage)) goToPage(inputPage);
                }
            });
    }

    createPaginationUI();
    adjustGridHeight();
    bindEvents();
    updateAllData();

    gridView.setPaging(true, options.pageSize);
    gridObj.fitToWindowSize();
}
