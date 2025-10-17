/**
 * 메뉴 팝업창 열기
 * @param url
 * @param target
 */
function fnOpenPopup(url, target) {
    var title = target.data("title");

    /* 4개 프레임 : 위치 설정 */
    /*new WinBox("개별 Left Top", {
        class: ["no-full"]
        , top: 88
        , left: 0
        , border: "1px"
        , url: url
    });

    var rt = new WinBox("개별 Right Top", {
        class: ["no-full"]
        , top: 88
        , border: "1px"
        , url: url
    });

    rt.move("right", "top");

    var lb  = new WinBox("개별 Left Bottom", {
        class: ["no-full"]
        , border: "1px"
        , url: url
    });

    lb.move("left", "bottom");

    var rb = new WinBox("개별 Right Bottom", {
        class: ["no-full"]
        , border: "1px"
        , url: url
    });

    rb.move("right", "bottom");
*/

    /* 창 생성 */
    var winbox;

    if (checkMobile === "999") {
        winbox = new WinBox(title, {
            class: ["no-full"], top: 50, left: 0, border: 1, url: url, onCreate: function (options) {
                options.autoResize = true;
            }
        });
    } else {
        winbox = new WinBox(title, {
            class: ["no-full"], top: 88, left: 48, border: 1, url: url, onCreate: function (options) {
                options.autoResize = true;
            }
        });
    }

    /* 모든 창 닫기 처리 */
    winbox.addControl({
        index: 0, class: "wb-all-close", image: "/resources/js/winbox/icon-close-all-tab.svg", click: function (event, winbox) {
            if (confirm("모든 창을 닫겠습니까?")) {
                window.parent.$(".wb-close").trigger('click');
            }
        }
    });

    /* 모든 창 최소화 처리 */
    winbox.addControl({
        index: 1, class: "wb-all-min", image: "/resources/js/winbox/icon-collapse-all.svg", click: function (event, winbox) {
            if (confirm("모든 창을 최소화하겠습니까?")) {
                window.parent.$(".winbox:not(.min) .wb-min").trigger('click');
            }
        }
    });

    /* 브라우저를 조절할때 처리 */
    window.addEventListener("resize", () => {
        if (!winbox || !winbox.g) return;
        if (!winbox.min) {
            winbox.restore();
            winbox.maximize();
        }
    });

    winbox.maximize();
    //winbox.minimize();

    /* 분할 - 4개 프레임 : 각 구역에서 벗어나지 않음 */
    /*var spLB = new WinBox("Splitscreen (Left Bottom)", {
        right: "50%"
        , top: "50%"
        , max: true
        , border: "2px"
        , url: url
    });

    spLB.minimize();
    spLB.close();

    var spRB = new WinBox("Splitscreen (Right Bottom)", {
        left: "50%"
        , top: "50%"
        , max: true
        , border: "2px"
        , url: url
    });

    spRB.minimize();
    spRB.close();

    var spLT = new WinBox("Splitscreen (Left TOP)", {
        right: "50%"
        , bottom: "50%"
        , max: true
        , border: "2px"
        , url: url
    });

    spLT.minimize();

    var spRT = new WinBox("Splitscreen (Right TOP)", {
        left: "50%"
        , bottom: "50%"
        , max: true
        , border: "2px"
        , url: url
    });

    spRT.minimize();*/
}

/**
 * 전체화면으로 팝업창 열기
 * @param url
 * @param target
 */
function fnOpenPopupFullscreen(url, target) {
    var title = target.data("title");

    /* 창 생성 */
    var winbox;

    if (checkMobile === "999") {
        winbox = new WinBox(title, {
            class: ["no-full"], top: 0, left: 0, border: 1, url: url, onCreate: function (options) {
                options.autoResize = true;
            }
        });
    } else {
        winbox = new WinBox(title, {
            class: ["no-full"], top: 0, left: 0, border: 1, url: url, onCreate: function (options) {
                options.autoResize = true;
            }
        });
    }

    /* 모든 창 닫기 처리 */
    winbox.addControl({
        index: 0, class: "wb-all-close", image: "/resources/js/winbox/icon-close-all-tab.svg", click: function (event, winbox) {
            if (confirm("모든 창을 닫겠습니까?")) {
                window.parent.$(".wb-close").trigger('click');
            }
        }
    });

    /* 모든 창 최소화 처리 */
    winbox.addControl({
        index: 1, class: "wb-all-min", image: "/resources/js/winbox/icon-collapse-all.svg", click: function (event, winbox) {
            if (confirm("모든 창을 최소화하겠습니까?")) {
                window.parent.$(".winbox:not(.min) .wb-min").trigger('click');
            }
        }
    });

    /* 브라우저를 조절할때 처리 */
    window.addEventListener("resize", () => {
        if (!winbox || !winbox.g) return;
        if (!winbox.min) {
            winbox.restore();
            winbox.maximize();
        }
    });

    winbox.maximize();
}

/**
 * 설비정보 메뉴 팝업창 열기
 * @param url
 * @param target
 */
function fnOpenPopupFacilityMenu(url, target) {
    var title = target.data("title");

    /* 창 생성 */
    var winbox;

    if (checkMobile === "999") {
        // mobile
        winbox = new WinBox(title, {
            id: "facilityMenu", class: ["no-full", "no-max"], top: 50, left: 0, border: 1, url: url
            , onCreate: function (options) {
                options.autoResize = true;
            }
        });
    } else {
        // pc
        winbox = new WinBox(title, {
            id: "facilityMenu", class: ["no-full", "no-max"], top: 88, left: 48, border: 1, width: "50%", height: "100%", url: url
            , onCreate: function (options) {
                options.autoResize = true;
            }
        });
    }

    /* 모든 창 닫기 처리 */
    winbox.addControl({
        index: 0, class: "wb-all-close", image: "/resources/js/winbox/icon-close-all-tab.svg", click: function (event, winbox) {
            if (confirm("모든 창을 닫겠습니까?")) {
                window.parent.$(".wb-close").trigger('click');
            }
        }
    });

    /* 모든 창 최소화 처리 */
    winbox.addControl({
        index: 1, class: "wb-all-min", image: "/resources/js/winbox/icon-collapse-all.svg", click: function (event, winbox) {
            if (confirm("모든 창을 최소화하겠습니까?")) {
                window.parent.$(".winbox:not(.min) .wb-min").trigger('click');
            }
        }
    });

    /* 브라우저를 조절할때 처리 */
    window.addEventListener("resize", () => {
        if (!winbox.min) {
            winbox.restore();
        }
    });
}

/**
 * 메뉴링크 및 bPopup 열기 함수
 * @param url
 * @param target
 */
function fnOpenPopupModal(url, target) {
    $('#menuList').removeClass('show');
    $("#toggle-button").attr('aria-expanded', 'false');
    $('#toggle-button img').attr('src', '/images/icons/icon-menu.svg').attr('alt', '메뉴 열기');

    var classString = target.data("class") || "";
    var title = target.data("title");
    var classesArray = classString.split(" ");

    // 특정 클래스가 포함되어 있는지 체크
    const noOverlayClasses = ['facility', 'folded', 'with-tree'];
    var isOverlayDisabled = classesArray.some(cls => noOverlayClasses.includes(cls));

    // 모달 제목 설정
    $("#modalTitle").text(title);

    $("#externalPopup").bPopup({
        modalClose: false, follow: [false, false],	// left 방향, top 방향으로 리사이징 또는 스크롤시 따라가지 않도록
        opacity: 0.2, speed: 450, closeClass: "modal-close, move-to-3D", modal: !isOverlayDisabled,	// 오버레이 꺼짐 여부
        onOpen: function () {
            // #externalPopup에 data-class에서 가져온 클래스 추가
            if (classString) {
                $("#externalPopup").addClass(classString).addClass('modal fade show external-popup');

                // 특정 클래스가 아닐시 modal 클래스 추가
                if (!isOverlayDisabled) {
                    $("#externalPopup .modal-dialog").addClass("modal-fullscreen");
                } else {
                    $("#externalPopup .modal-dialog").removeClass("modal-fullscreen");
                }
            }
        }, onClose: function () {
            // 모달이 닫힐 때 초기화 작업 수행
            $("#externalPopup #modalTitle").empty();
            $("#externalPopup #modalBodyContent").empty();

            $("#externalPopup").removeClass();
            $("#externalPopup").find(".modal-dialog").removeClass("modal-fullscreen");

            closeOtherPopups();
        }
    }, function () {
        // AJAX 요청으로 modalContent에 HTML 로드
        $.ajax({
            url: url,  // 원하는 HTML 파일 경로
            dataType: "html",
            beforeSend: function () {
                $("#loadingBar").css("display", "");
            },
            success: function (data) {
                // 아래 영역에 가져온 HTML 삽입
                $("#modalBodyContent").html(data);

                // 성공 시 팝업의 위치 설정
                $("#externalPopup").css({
                    top: 0, left: 0
                });
            }, error: function () {
                alert("에러가 발생했습니다.\n잠시 후 다시 시도해 주시기 바랍니다.");
            }
            , complete: function () {
                $("#loadingBar").css("display", "none");
            }
        });
    });
}

// 3D모델 사용가이드 버튼제어	
function closeControlGuide() {
    $('.unity-guide').fadeOut(500);
}

// 유니티에서 하단 버튼클릭시 가이드팝업 나타남
function openControlGuide() {
    $('.unity-guide').fadeIn(500);
}

// 글로벌메뉴
function globalMenu() {
    //다른 버튼 초기화
    $('.operation-status').removeClass('visible');
    $('#operationStatus img').attr('src', '/resources/images/icons/icon-power.svg').attr('alt', '기타정보 열기');

    //클릭시 실행
    if ($('#toggle-button').attr('aria-expanded') === 'true') {
        //console.log('opened');
        // #toggle-button에서 img의 src와 alt 속성 변경
        $('#toggle-button img').attr('src', '/resources/images/icons/icon-menu-close.svg').attr('alt', '메뉴 닫기');
    } else {
        //console.log('closed');
        // #toggle-button에서 img의 src와 alt 속성 초기화
        $('#toggle-button img').attr('src', '/resources/images/icons/icon-menu.svg').attr('alt', '메뉴 열기');
    }
}

// 모바일: 헤더 > 운전정보 클릭시 실행
function operationInfo() {
    $('#menuList').removeClass('show');
    $('#toggle-button img').attr('src', '/resources/images/icons/icon-menu.svg').attr('alt', '메뉴 열기');

    if ($('.operation-status').hasClass('visible')) {
        // .operation-status에서 'visible' 클래스 제거
        $('.operation-status').removeClass('visible');
        // #operationStatus에서 img의 src와 alt 속성 초기화
        $('#operationStatus img').attr('src', '/resources/images/icons/icon-power.svg').attr('alt', '기타정보 열기');
    } else {
        $('.operation-status').addClass('visible');
        $('#operationStatus img').attr('src', '/resources/images/icons/icon-menu-close-brand.svg').attr('alt', '기타정보 닫기');
    }
}

// 모바일: 윈도우 리사이징 메뉴와 운전정보 버튼 초기화
$(window).on('resize', function () {
    $('#operationStatus img').attr('src', '/resources/images/icons/icon-power.svg').attr('alt', '기타정보 열기');
    $('#toggle-button img').attr('src', '/resources/images/icons/icon-menu.svg').attr('alt', '메뉴 열기');
    $('.operation-status').removeClass('visible');
    $('#toggle-button').attr('aria-expanded', 'false');
    $('#menuList').removeClass('show');
});

//날짜 한달 전으로 세팅하는 공통 함수
function setDateS() {
    //날짜 현재날짜 기준 한 달 전 세팅
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = ("0" + (today.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 +1
    var dd = ("0" + today.getDate()).slice(-2);
    var currentDate = yyyy + "-" + mm + "-" + dd;
    $('#designDateEnd').val(currentDate); // 첫 번째 input에 오늘 날짜 설정

    // 두 번째 input 태그 (한 달 전 날짜로 설정)
    today.setMonth(today.getMonth() - 1); // 현재 날짜 기준 한 달 전으로 설정
    var lastMonthDate = today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + ("0" + today.getDate()).slice(-2);
    $('#designDateStart').val(lastMonthDate); // 두 번째 input에 한 달 전 날짜 설정
}

function fnWoSearchForm() {
    $.ajax({
        type: "POST"
        , url: "/common/wolInfo.do"
        , dataType: "html"
        , beforeSend: function () {
            $("#loadingBar").css("display", "");
        }, success: function (data) {
            $("#woSearchListForm").html(data);
        }, error: function (request, status, error) {
            console.log("code:" + request.status + "\n message:" + request.responseText + "\n error:" + error);
        }, complete: function () {
            $("#loadingBar").css("display", "none");
        }
    });
}

// 검색박스내 W/O  팝업
function searchWoTreePopup(target) {
    $("#searchWoTreePopup").bPopup({
        modalClose: false
        , opacity: 0.2
        , speed: 450
        , closeClass: "close"
        , onOpen: function () {
            $("#searchWoTreePopup").addClass('show');
            fnWoSearchForm();
        }, onClose: function () {
            $("#searchWoTreePopup").removeClass('show');
            $("#woSearchListForm").html('');
        }
    });
}

//W/O 상세 검색 
function fnWoDetailSearch() {
    var startVal = "";
    var endVal = "";

    //조회 시작일
    startVal = document.getElementById("designDateStart").value;
    //조회 종료일
    endVal = document.getElementById("designDateEnd").value;

    if (startVal !== "" && endVal === "") {
        alert("조회 종료일을 선택해주세요");
        return false;
    } else if (startVal === "" && endVal !== "") {
        alert("조회 시작일을 선택해주세요");
        return false;
    } else if (startVal > endVal) {
        alert("조회 종료일을 시작일 이전으로 설정할 수 없습니다.\n조회 종료일을 다시 선택해주세요.");
        return false;
    }

    $.ajax({
        type: "POST", url: "/common/wolList.do"
        , data: $("#form_search_woresult1").serialize()
        , dataType: "html"
        , beforeSend: function () {
            $("#loadingBar").css("display", "");
        }, success: function (data) {
            $("#_VIEW_WO_RESULTS_LIST").html(data);
        }, error: function (request, status, error) {
            console.log("code:" + request.status + "\n message:" + request.responseText + "\n error:" + error);
        }, complete: function () {
            $("#loadingBar").css("display", "none");
        }
    });
}

//설비마스터 상세 검색
function fnFacilityDetailSearch() {
    $.ajax({
        type: "POST"
        , url: "/common/facilitydetailList.do?searchUseYn=S"
        , data: $("#form_search_result1").serialize()
        , dataType: "html"
        , beforeSend: function () {
            $("#loadingBar").css("display", "");
        }, success: function (data) {
            $("#facilityMasterList").html(data);
        }, error: function (request, status, error) {
            console.log("code:" + request.status + "\n message:" + request.responseText + "\n error:" + error);
        }, complete: function () {
            $("#loadingBar").css("display", "none");
        }
    });
}

//설비마스터 페이지 이동 부분
function fnfacilityDetailPageMove(f) {
    var detailCurrentPage = parseInt($("#detailCurrentPage").val());

    var flg = $("#chkItemNo").val();
    var flgNo = "";
    if (f === 'P') {
        if (detailCurrentPage === 1) {
            alert("처음 페이지입니다.");
            return false;
        }

        detailCurrentPage = detailCurrentPage - 1;
    } else if (f === 'N') {
        if (detailCurrentPage == totalPage) {
            alert("마지막 페이지입니다.");
            return false;
        }

        detailCurrentPage = detailCurrentPage + 1;
    } else if (f === 'M') {
        if (detailCurrentPage > totalPage) {
            alert("마지막 페이지는 " + totalPage + "입니다. 이 페이지를 초과할 수 없습니다.");
            $("#detailCurrentPage").val(totalPage);
            return false;
        }
    }

    $("#detailCurrentPage").val(detailCurrentPage);
    var dataToSend = {};

    if (flg === "S") {
        $.ajax({
            type: "POST"
            , url: "/common/facilitydetailList.do?searchUseYn=S&pageIndex=" + detailCurrentPage
            , data: $("#form_search_result1").serialize()
            , dataType: "html"
            , beforeSend: function () {
                $("#loadingBar").css("display", "");
            }, success: function (data) {
                $("#facilityMasterList").html(data);
            }, error: function (request, status, error) {
                console.log("code:" + request.status + "\n message:" + request.responseText + "\n error:" + error);
            }, complete: function () {
                $("#loadingBar").css("display", "none");
            }
        });
    } else {
        flgNo = $("#chkItemVal").val();
        if (flg === "M1") {
            dataToSend = {locNo: flgNo}
        } else if (flg === "M2") {
            dataToSend = {eqCategory: flgNo}
        } else if (flg === "M3") {
            dataToSend = {eqType: flgNo}
        }

        $.ajax({
            type: "POST"
            , url: "/common/facilitydetailList.do?searchUseYn=" + flg + "&pageIndex=" + detailCurrentPage
            , data: dataToSend
            , dataType: "html"
            , beforeSend: function () {
                $("#loadingBar").css("display", "");
            }, success: function (data) {
                $("#facilityMasterList").html(data);
            }, error: function (request, status, error) {
                console.log("code:" + request.status + "\n message:" + request.responseText + "\n error:" + error);
            }, complete: function () {
                $("#loadingBar").css("display", "none");
            }
        });
    }
}

// 검색박스내 설비종류 검색팝업
function searchFacilityTypeTreePopup(target) {
    $("#searchFacilityTypeTreePopup").bPopup({
        modalClose: false
        , opacity: 0.2
        , speed: 450
        , closeClass: "close"
        , onOpen: function () {
            $("#searchFacilityTypeTreePopup").addClass('show');
        }, onClose: function () {
            $("#facilityType1").jstree("close_all");
            $("#facilityType1").jstree("deselect_all");
            $("#searchFacilityTypeTreePopup").removeClass('show');
        }
    });
}

// 검색박스내 설비기능위치 검색팝업
function searchFacilityLocTreePopup(target) {
    $("#searchFacilityLocTreePopup").bPopup({
        modalClose: false, opacity: 0.2, speed: 450, closeClass: "close", onOpen: function () {
            $("#searchFacilityLocTreePopup").addClass('show');
        }, onClose: function () {
            $("#facilityLoc1").jstree("close_all");
            $("#facilityLoc1").jstree("deselect_all");
            $("#searchFacilityLocTreePopup").removeClass('show');
        }
    });
}

// 검색박스내 감독부서 검색팝업
function searchReqTreePopup(target) {
    $("#searchReqTreePopup").bPopup({
        modalClose: false, opacity: 0.2, speed: 450, closeClass: "close", onOpen: function () {
            // #searchTreePopup에 클래스 추가
            $("#searchReqTreePopup").addClass('show');
        }, onClose: function () {
            var tree = $.fn.zTree.getZTreeObj('reqTree1');
            if (tree) { tree.expandAll(false); tree.cancelSelectedNode(); }
            $("#searchReqTreePopup").removeClass('show');
        }
    });
}

// 검색박스내 설계부서 검색팝업
function searchdesignDeptTreePopup(target) {
    // 모달이 닫힐 때 초기화 작업 수행
    $("#searchdesignDeptTreePopup #searchdesignDeptTreeTitle").empty();

    var title = target.siblings('label').text();

    // 모달 제목 설정
    $("#searchdesignDeptTreeTitle").text(title);

    $("#searchdesignDeptTreePopup").bPopup({
        modalClose: false, //zIndex: 1200,
        opacity: 0.2, speed: 450, closeClass: "close", onOpen: function () {
            // #searchTreePopup에 클래스 추가
            $("#searchdesignDeptTreePopup").addClass('show');
        }, onClose: function () {
            var tree = $.fn.zTree.getZTreeObj('designDeptTree1');
            if (tree) { tree.expandAll(false); tree.cancelSelectedNode(); }
            $("#searchdesignDeptTreePopup").removeClass('show');
        }
    });
}

// 검색박스내 요청부서 검색팝업
function searchReqDeptTreePopup(target) {

    $("#searchReqDeptTreePopup").bPopup({
        modalClose: false, opacity: 0.2, speed: 450, closeClass: "close", onOpen: function () {
            // #searchTreePopup에 클래스 추가
            $("#searchReqDeptTreePopup").addClass('show');
        }, onClose: function () {
            var tree = $.fn.zTree.getZTreeObj('reqDeptTree1');
            if (tree) { tree.expandAll(false); tree.cancelSelectedNode(); }
            $("#searchReqDeptTreePopup").removeClass('show');
        }
    });
}

// 검색박스내 운전부서 검색팝업
function searchopDeptTreePopup(target) {
    $("#searchopDeptTreePopup").bPopup({
        modalClose: false, //zIndex: 1200,
        opacity: 0.2, speed: 450, closeClass: "close", onOpen: function () {
            // #searchTreePopup에 클래스 추가
            $("#searchopDeptTreePopup").addClass('show');
        }, onClose: function () {
            var tree = $.fn.zTree.getZTreeObj('opDeptTree1');
            if (tree) { tree.expandAll(false); tree.cancelSelectedNode(); }
            $("#searchopDeptTreePopup").removeClass('show');
        }
    });
}

// 검색박스내 정비부서 검색팝업
function searchmainDeptTreePopup(target) {
    // 모달이 닫힐 때 초기화 작업 수행
    $("#searchmainDeptTreePopup #searchmainDeptTreeTitle").empty();

    var title = target.siblings('label').text();

    // 모달 제목 설정
    $("#searchmainDeptTreeTitle").text(title);

    $("#searchmainDeptTreePopup").bPopup({
        modalClose: false, //zIndex: 1200,
        opacity: 0.2, speed: 450, closeClass: "close", onOpen: function () {
            // #searchTreePopup에 클래스 추가
            $("#searchmainDeptTreePopup").addClass('show');
        }, onClose: function () {
            // 모달이 닫힐 때 초기화 작업 수행
            var tree = $.fn.zTree.getZTreeObj('mainDeptTree1');
            if (tree) { tree.expandAll(false); tree.cancelSelectedNode(); }
            $("#searchmainDeptTreePopup").removeClass('show');
        }
    });
}

// 검색박스내 사용자검색 팝업
function searchItemPopup(target) {
    // 모달이 닫힐 때 초기화 작업 수행
    $("#searchItemPopup #searchItemTitle").empty();
    var title = target.siblings('label').text();

    if (title == "요청자 검색") {
        $("#chkTitleTree").val("1");
    } else if (title == "감독자 검색") {
        $("#chkTitleTree").val("2");
    } else if (title == "점검자 검색") {
        $("#chkTitleTree").val("3");
    } else if (title == "발행자 검색") {
        $("#chkTitleTree").val("4");
    } else if (title == "회수자 검색") {
        $("#chkTitleTree").val("5");
    } else if (title == "설계자 검색") {
        $("#chkTitleTree").val("6");
    }

    // 모달 제목 설정
    $("#searchItemTitle").text(title);
    $("#searchItemPopup").bPopup({
        modalClose: false, opacity: 0.2, speed: 0, closeClass: "close", onOpen: function () {
            // #searchItemPopup에 클래스 추가
            $("#searchItemPopup").addClass('show');

        }, onClose: function () {
            // 모달이 닫힐 때 초기화 작업 수행
            $("#userDetailList").html('');
            $("#searchItemPopup").removeClass('show');
            var tree = $.fn.zTree.getZTreeObj('divisionTree2');
            if (tree) { tree.cancelSelectedNode(); tree.expandAll(false); }
            $('#id_code1').prop('checked', false);
        }
    });
}

function userDetailList(id) {
    var chkVal = "";
    var checkbox = document.getElementById('id_code1');
    if (checkbox.checked) {
        chkVal = "N"
    } else {
        chkVal = "Y"
    }
    var deptNo = id;
    $("#loadingBar").css("display", "");
    $.ajax({
        type: "post", url: "/common/userList.do", data: {deptNo: deptNo, isJoin: chkVal}, dataType: "html", success: function (data) {
            $("#userDetailList").html(data);
            $("#loadingBar").css("display", "none");
        }, error: function (request, status, error) {
            console.log("code:" + request.status + "\n error:" + error);
        }
    });
}

// 검색박스내 설비마스터 팝업
function searchFacilityPopup(target) {
    $("#searchFacilityPopup").bPopup({
        modalClose: false, //zIndex: 1100,
        opacity: 0.2, speed: 450, closeClass: "close", onOpen: function () {
            // #searchFacilityPopup에 클래스 추가
            $("#searchFacilityPopup").addClass('show');

        }, onClose: function () {
            $("#searchFacilityPopup").removeClass('show');
            $("#facilityMasterList").html('');
            //검색 form 초기화
            document.getElementById('form_search_result1').reset();

            //기능위치 트리 닫기
            $('#facilityMaster1').jstree("deselect_all");
            $('#facilityMaster1').jstree("close_all");
            //계통 트리 닫기
            $('#facilityMaster2').jstree("deselect_all");
            $('#facilityMaster2').jstree("close_all");
            //종류 트리 닫기
            $('#facilityMaster3').jstree("deselect_all");
            $('#facilityMaster3').jstree("close_all");

            //tab 초기화
            $('#pills-tab2 li button').removeClass('active');
            $('#pills-tab2 li button').first().addClass('active');
            $('#pills-tabContent2 div').removeClass('active');
            $('#pills-tabContent2 div').first().addClass('active show');
        }
    });
}

//검색박스내 점검종류 팝업
function searchResultPopup(target) {
    $("#loadingBar").css("display", "");
    //ajax detail load
    var setData = "";
    $.ajax({
        url: "/common/pmlList.do", type: "POST", dataType: "html", success: function (data) {
            if (data !== "") {
                setData = data;
            }
        }, complete: function () {
            $("#codeDetailList").html(setData);

            $('#searchResultPopup').bPopup({
                modalClose: false, position: [0, 0], opacity: 0.2, speed: 450, //zIndex: 1200,
                closeClass: "close", onOpen: function () {
                    $(this).addClass('show');
                    $("#loadingBar").css("display", "none");
                }, onClose: function () {
                    $(this).removeClass('show');
                    $('#inspectorTypeCode').val('');
                    $('#inspectorTypeDesc').val('');
                }
            });
        }, error: function (request, status, error) {
            console.log("code:" + request.status + "\n message:" + request.responseText + "\n error:" + error);
        }
    });
}

//검색박스내 점검종류 검색기능
function fnCodeSearch() {
    $("#loadingBar").css("display", "");
    $.ajax({
        type: "post", url: "/common/pmlList.do", data: $("#form_search_result2").serialize(), dataType: "html", success: function (data) {
            $("#codeDetailList").html(data);
            $("#loadingBar").css("display", "none");
        }, error: function (request, status, error) {
            console.log("code:" + request.status + "\n error:" + error);
        }
    });
}

/* 메인페이지 왼쪽 메뉴에서 도면보기 팝업 */
function fnOpenDrawing(url) {
    $('#menuList').removeClass('show');
    $("#toggle-button").attr('aria-expanded', 'false');
    $('#toggle-button img').attr('src', '/resources/images/icons/icon-menu.svg').attr('alt', '메뉴 열기');

    var popup = window.open(url, '_viewDrawing', 'height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');
    popup.focus();
}

/* 메인페이지 왼쪽 메뉴에서 파노라마 팝업 */
function fnOpenPano() {
    $('#menuList').removeClass('show');
    $("#toggle-button").attr('aria-expanded', 'false');
    $('#toggle-button img').attr('src', '/resources/images/icons/icon-menu.svg').attr('alt', '메뉴 열기');

    var popup = window.open("/pcm/vi/main.do?pct_sn=8&pci_tag=%ED%8F%89%ED%83%9D%202%20%EB%B3%B5%ED%95%A9%20%ED%8C%8C%EB%85%B8%EB%9D%BC%EB%A7%88", '_viewPano', 'height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');
    popup.focus();
}

/* 모달 팝업창 띄우기 */
function fnOpenModal(url, title, x, y, width, height) {
    title = "Modal Window";
    x = "center";
    y = "center";
    width = "50%";
    height = "50%";

    new WinBox(title, {
        modal: true, x: x, y: y, width: width, height: height, url: url
    });
}

// closeOtherPopups
// 메인 화면에 종속된 모달 이외의 추가로 생성된 팝업 제거
function closeOtherPopups() {
    $('.modal').each(function () {
        const popupId = $(this).attr('id');

        if (popupId !== 'externalPopup' && popupId !== 'externalPopup2' && popupId !== 'cctvInstall' && popupId !== 'searchItemPopup' && popupId !== 'searchReqTreePopup' && popupId !== 'searchReqDeptTreePopup' && popupId !== 'searchFacilityPopup' && popupId !== 'searchResultPopup' && popupId !== 'searchopDeptTreePopup' && popupId !== 'searchmainDeptTreePopup' && popupId !== 'searchdesignDeptTreePopup' && popupId !== 'searchFacilityTypeTreePopup' && popupId !== 'searchFacilityLocTreePopup' && popupId !== 'searchWoTreePopup') {
            $(this).remove();
        }
    });
}

//사이드패널 열고 닫기
let $toggleSides, $modal, $panel; // let으로 선언하여 재할당 가능하게 수정

// 초기화 함수
function resetSidePanel() {
    $modal.addClass('folded').removeClass('unfolded');
    $panel.removeClass('show');
    updateToggleButtonIcon();
    isCollapsed = true;
}

// 열기 함수
function openSidePanel() {
    $modal.removeClass('folded').addClass('unfolded');
    $panel.addClass('show');
    updateToggleButtonIcon();
    isCollapsed = false;
}

// 닫기 함수
function closeSidePanel() {
    $modal.addClass('folded').removeClass('unfolded');
    $panel.removeClass('show');
    updateToggleButtonIcon();
    isCollapsed = true;
}

// 토글 함수
function toggleSidePanel() {
    isCollapsed ? openSidePanel() : closeSidePanel();
}

// 아이콘 업데이트
function updateToggleButtonIcon() {
    if ($panel.hasClass('show')) {
        $toggleSides.attr('title', '설비정보 닫기');
        $toggleSides.removeClass('icon-panel-open');
        $toggleSides.addClass('icon-panel-close');
        //$toggleSides.find('.material-symbols-rounded').text('arrow_menu_close');
    } else {
        $toggleSides.attr('title', '설비정보 열기');
        $toggleSides.removeClass('icon-panel-close');
        $toggleSides.addClass('icon-panel-open');
        //$toggleSides.find('.material-symbols-rounded').text('arrow_menu_open');
    }
}

// 리사이즈 핸들러
function handleResize() {
    updateToggleButtonIcon();
}

// 사이드패널 초기화 및 버튼 클릭 이벤트 설정
function initSidePanel(toggleSelectors, modalSelector, panelSelector) {
    $toggleSides = $(toggleSelectors); // 여러 버튼을 모두 선택
    $modal = $(modalSelector);
    $panel = $(panelSelector);

    // 초기화
    resetSidePanel();

    // 버튼 클릭 이벤트
    $toggleSides.each(function () {
        $(this).on('click', function () {
            toggleSidePanel();
        });
    });

    // 리사이즈 이벤트
    $(window).on('resize', handleResize);
    handleResize(); // 초기 실행
}

/* cctv nvl download file */
function downloadCctvView() {
    window.location.href = "/cctv/setupFilwDownload.do";

    if ($('#cctvInstall.show').length > 0) {
        $('#cctvInstall.show').find('.close').trigger('click');
    }
}

/* 파노라마 이동 */
function showPano(e, iegNo) {
    var tagNo = $(e).attr('data-no');
    var popup = window.open("/pcm/vi/panoview.do?pct_sn=8&tagno=" + iegNo, '_viewPano', 'height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');
}

/**
 * 로딩바 제어
 * @param flag
 */
function fnLoadingBarFlag(flag) {
    $("#loadingBar").css("display", flag);
}

$(document).ready(function () {
    // 터치디바이스 체크
    function checkTouchDevice() {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        // 기존 클래스 제거 (터치 디바이스 여부 갱신)
        $('body').removeClass('touch-device');

        if (isTouchDevice) {
            //console.log("터치 디바이스입니다.");
            $('body').addClass('touch-device');
        } else {
            $('body').removeClass('touch-device');
        }
    }

    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);

    setTimeout(function () {
        $('.left-box').fadeIn(500);

        // 2025.04.29 yjkim - 사용가이드 자동사라짐
        $('.unity-guide').fadeIn(500, function () {
            setTimeout(function () {
                $('.unity-guide').fadeOut(500);
                $('.unity-guide .unity-guide-footer').hide();
            }, 5000); // 페이드인 완료후 8초뒤 페이드아웃
        });

        $('.header .btn-status').fadeIn(500).css('display', 'flex');
    }, 500);
});
