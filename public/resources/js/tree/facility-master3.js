//트리메뉴 구조 및 관련 데이터 포함
$(document).ready(function () {
    // 트리메뉴 - jsTree 3.3.15 버전
    function facilityMaster3(data) {
        // jsTree 초기화
        $('#facilityMaster3, #facilityType1').jstree({
            'core': {
                'worker': true,
                'animation': 0,
                'multiple': false,
                'data': data
            },
            /*'state': {
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
        $('#facilityMaster3, #facilityType1').on('ready.jstree', function () {
            var jstree = $('#facilityMaster3, #facilityType1').jstree(true);
        });

        // **검색 기능**
        $('#search-input').on('keyup', function () {
            var searchString = $(this).val();
            $('#facilityMaster3').jstree('search', searchString);
        });

        //마지막 노드 클릭 이벤트
        $('#facilityMaster3').on('click', '.jstree-anchor', function (e) {
            var treeInstances = $('#facilityMaster3').jstree(true); // jstree 인스턴스 가져오기
            var nodeIds = $(this).closest('li').attr('id'); // 클릭된 노드의 ID 가져오기
            var nodes = treeInstances.get_node(nodeIds); // 노드 객체 가져오기

            if (treeInstances.is_leaf(nodes)) {
                $("#loadingBar").css("display", "");
                $.ajax({
                    type: "POST"
                    , url: "/common/facilitydetailList.do?searchUseYn=M3"
                    , data: {eqType: nodeIds}
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

        //설비종류 마지막 노드 클릭 이벤트
        $('#facilityType1').on('click', '.jstree-anchor', function (e, data) {
            var typeInstances = $('#facilityType1').jstree(true); // jstree 인스턴스 가져오기
            var typeIds = $(this).closest('li').attr('id'); // 클릭된 노드의 ID 가져오기
            var typenodes = typeInstances.get_node(typeIds); // 노드 객체 가져오기
            var name = typenodes.text;
            var code_name = name.replace(/^\[[^\]]+\]/, '').trim();

            if (typeInstances.is_leaf(typenodes)) {
                $('#equipTypeOption').val(typeIds);
                $('#equipTypeInput').val(code_name);
                $('#facilityType1').jstree("deselect_all");
                $('#facilityType1').jstree("close_all");
                //$('#searchFacilityTypeTreePopup').removeClass('show').bPopup().close();
                $('#searchFacilityTypeTreePopup').find('.close').trigger('click');
            }
        });
    }

    /* list data */
    $.ajax({
        type: "POST"
        , url: "/common/facilityTypeList.do"
        , dataType: "json"
        , success: function (data) {
            facilityMaster3(data);
        }
    });
});
