//트리메뉴 구조 및 관련 데이터 포함
$(document).ready(function () {
    // 트리메뉴 임시데이터 - jsTree 3.3.15 버전
    function divisionJSTree(data) {
        // jsTree 초기화
        $('#reqTree1, #reqDeptTree1, #opDeptTree1, #divisionTree2, #mainDeptTree1, #designDeptTree1').jstree({
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
        $('#reqTree1, #reqDeptTree1, #divisionTree2, #opDeptTree1, #mainDeptTree1, #designDeptTree1').on('ready.jstree', function () {
            var jstree = $('#reqTree1, #reqDeptTree1, #divisionTree2, #opDeptTree1, #mainDeptTree1, #designDeptTree1').jstree(true);
        });

        // **검색 기능**
        $('#search-input').on('keyup', function () {
            var searchString = $(this).val();
            $('#divisionTree1, #divisionTree2').jstree('search', searchString);
        });

        // 감독부서 클릭 이벤트
        $('#reqTree1').on('select_node.jstree', function (e, data) {
            var code = data.node.id;
            var name = data.node.text;
            var code_name = name.replace(/^\[[^\]]+\]/, '').trim();
            $('#supvDeptOption').val(code);
            $('#supvDeptInput').val(code_name);
            $('#reqTree1').jstree("deselect_all");
            $('#reqTree1').jstree("close_all");
            //$('#searchReqTreePopup').removeClass('show').bPopup().close();
            $('#searchReqTreePopup').find('.close').trigger('click');
        });

        // 요청부서 클릭 이벤트
        $('#reqDeptTree1').on('select_node.jstree', function (e, data) {
            var code = data.node.id;
            var name = data.node.text;
            var code_name = name.replace(/^\[[^\]]+\]/, '').trim();
            $('#reqDeptOption').val(code);
            $('#reqDeptInput').val(code_name);
            $('#reqDeptTree1').jstree("deselect_all");
            $('#reqDeptTree1').jstree("close_all");
            //$('#searchReqDeptTreePopup').removeClass('show').bPopup().close();
            $('#searchReqDeptTreePopup').find('.close').trigger('click');
        });

        // 운전부서 클릭 이벤트
        $('#opDeptTree1').on('select_node.jstree', function (e, data) {
            var code = data.node.id;
            var name = data.node.text;
            var code_name = name.replace(/^\[[^\]]+\]/, '').trim();
            $('#opDeptOption').val(code);
            $('#opDeptInput').val(code_name);
            $('#opDeptTree1').jstree("deselect_all");
            $('#opDeptTree1').jstree("close_all");
            //$('#searchopDeptTreePopup').removeClass('show').bPopup().close();
            $('#searchopDeptTreePopup').find('.close').trigger('click');
        });

        // 정비부서 클릭 이벤트
        $('#mainDeptTree1').on('select_node.jstree', function (e, data) {
            var code = data.node.id;
            var name = data.node.text;
            var code_name = name.replace(/^\[[^\]]+\]/, '').trim();
            $('#maintDeptOption').val(code);
            $('#maintDeptInput').val(code_name);
            $('#mainDeptTree1').jstree("deselect_all");
            $('#mainDeptTree1').jstree("close_all");
            //$('#searchmainDeptTreePopup').removeClass('show').bPopup().close();
            $('#searchmainDeptTreePopup').find('.close').trigger('click');
        });

        // 설계부서 클릭 이벤트
        $('#designDeptTree1').on('select_node.jstree', function (e, data) {
            var code = data.node.id;
            var name = data.node.text;
            var code_name = name.replace(/^\[[^\]]+\]/, '').trim();
            $('#designDeptOption').val(code);
            $('#designDeptInput').val(code_name);
            $('#designDeptTree1').jstree("deselect_all");
            $('#designDeptTree1').jstree("close_all");
            //$('#searchdesignDeptTreePopup').removeClass('show').bPopup().close();
            $('#searchdesignDeptTreePopup').find('.close').trigger('click');
        });

        // 요청자 클릭 이벤트
        /*$('#divisionTree2').on('select_node.jstree', function(e, data) {
            var code = data.node.id;
            userDetailList(code);
        });*/

        //요청자 클릭 이벤트
        $('#divisionTree2').on('click', '.jstree-anchor', function (e) {
            var codeId = $(this).closest('li').attr('id'); // 클릭된 노드의 ID 가져오기
            userDetailList(codeId);
        });
    }

    /* list data */
    $.ajax({
        type: "POST"
        , url: "/common/deptList.do"
        , dataType: "json"
        , success: function (data) {
            divisionJSTree(data);
        }
    });
});
