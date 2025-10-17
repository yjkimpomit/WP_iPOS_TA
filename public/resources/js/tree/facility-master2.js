//트리메뉴 구조 및 관련 데이터 포함
$(document).ready(function () {
    // 트리메뉴 - jsTree 3.3.15 버전
    function facilityMaster2(data) {
        // jsTree 초기화
        $('#facilityMaster2').jstree({
            'core': {
                'worker': true,
                'animation': 0,
                'multiple': false,
                'data': data
            },
           /* 'state': {
                'key': 'jstree'
            },*/
            'types': {
                'default': {
                    'icon': false // 아이콘 숨기기
                },
                'folder': {
                    'icon': false // 폴더 아이콘 숨기기
                }
            },
            'plugins': ["types", "search"]
        });

        // jstree가 준비 완료되면
        $('#facilityMaster2').on('ready.jstree', function () {
            var jstree = $('#facilityMaster2').jstree(true);
        });

        // **검색 기능**
        $('#search-input').on('keyup', function () {
            var searchString = $(this).val();
            $('#facilityMaster2').jstree('search', searchString);
        });

        $('#facilityMaster2').on('click', '.jstree-anchor', function (e) {
            var nodeIds = $(this).closest('li').attr('id'); // 클릭된 노드의 ID 가져오기
            $("#loadingBar").css("display", "");
            $.ajax({
                type: "POST"
                , url: "/common/facilitydetailList.do?searchUseYn=M2"
                , data: {eqCategory: nodeIds}
                , dataType: "html"
                , success: function (data) {
                    $("#facilityMasterList").html(data);
                    $("#loadingBar").css("display", "none");
                }
                , error: function (request, status, error) {
                    console.log("code:" + request.status + "\n message:" + request.responseText + "\n error:" + error);
                }
            });
        });
    }

    /* list data */
    $.ajax({
        type: "POST"
        , url: "/common/facilitySysList.do"
        , dataType: "json"
        , success: function (data) {
            facilityMaster2(data);
        }
    });
});
