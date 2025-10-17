//트리메뉴 구조 및 관련 데이터 포함
$(document).ready(function () {
    // 트리메뉴 - jsTree 3.3.15 버전
    function facilityMaster1(data) {
        // jsTree 초기화
        $('#facilityMaster1, #facilityLoc1').jstree({
            'core': {
                'worker': true,
                'animation': 0,
                'multiple': false,
                'data': data
            },
            /*'state': { 속도 저하
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
        $('#facilityMaster1, #facilityLoc1').on('ready.jstree', function () {
            var jstree = $('#facilityMaster1, #facilityLoc1').jstree(true);
        });

        // **검색 기능**
        $('#search-input').on('keyup', function () {
            var searchString = $(this).val();
            $('#facilityMaster1').jstree('search', searchString);
        });

        //마지막 노드 클릭 이벤트
        $('#facilityMaster1').on('click', '.jstree-anchor', function (e) {
            var treeInstances = $('#facilityMaster1').jstree(true); // jstree 인스턴스 가져오기
            var nodeIds = $(this).closest('li').attr('id'); // 클릭된 노드의 ID 가져오기
            var nodes = treeInstances.get_node(nodeIds); // 노드 객체 가져오기

            if (treeInstances.is_leaf(nodes)) {
                $("#loadingBar").css("display", "");
                $.ajax({
                    type: "POST"
                    , url: "/common/facilitydetailList.do?searchUseYn=M1"
                    , data: {locNo: nodeIds}
                    , dataType: "html"
                    , success: function (data) {
                        $("#facilityMasterList").html(data);
                        $("#loadingBar").css("display", "none");
                    }
                    , error: function (request, status, error) {
                        console.log("code:" + request.status + "\n message:" + request.responseText + "\n error:" + error);
                    }
                });
            }
        });

        //기능위치번호 마지막 노드 클릭 이벤트
        $('#facilityLoc1').on('click', '.jstree-anchor', function (e, data) {
            var typeInstances = $('#facilityLoc1').jstree(true); // jstree 인스턴스 가져오기
            var typeIds = $(this).closest('li').attr('id'); // 클릭된 노드의 ID 가져오기
            var typenodes = typeInstances.get_node(typeIds); // 노드 객체 가져오기
            var name = typenodes.text;
            var code_name = name.replace(/^\[[^\]]+\]/, '').trim();

            if (typeInstances.is_leaf(typenodes)) {
                $('#fnLocationOption').val(typeIds);
                $('#fnLocationInput').val(code_name);
                $('#facilityLoc1').jstree("deselect_all");
                $('#facilityLoc1').jstree("close_all");
                //$('#searchFacilityLocTreePopup').removeClass('show').bPopup().close();
                $('#searchFacilityLocTreePopup').find('.close').trigger('click');
            }
        });
    }

    /* list data */
    $.ajax({
        type: "POST"
        , url: "/common/facilityLocList.do"
        , dataType: "json"
        , success: function (data) {
            facilityMaster1(data);
        }
    });
});
