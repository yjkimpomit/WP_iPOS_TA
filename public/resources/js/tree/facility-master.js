/**
 * *******************************************************
 * 설비 마스터 트리 정보의 공통 메소드 *
 * *******************************************************
 */

'use strict';

function fnLoadFacilityTree(zNodes) {
    // zTree 설정
    var setting = {
        view: {
            showIcon: false,
            nameIsHTML: true,
            showTitle: true,
        },
        data: {
            key: {
                name: 'text'
            },
            simpleData: {
                enable: true,
                idKey: 'id',
                pIdKey: 'parent',
                rootPId: '#'
            }
        },
        callback: {
            onAsyncSuccess: function () {
            },
            onNodeCreated: function (event, treeId, node) {
                node._text = node.text.replace(/<[^>]*>/g, '').trim().toLowerCase();
                node._no = (node['data-no'] != null ? String(node['data-no']) : '').toLowerCase();
            },
            onClick: function (event, treeId, treeNode, clickFlag) {
                try {
                    console.log("## onclick ##");
                    // 마지막 노드(leaf)일 때만 우측 패널 컨텐츠 로드
                    if (treeNode && treeNode.isParent === false) {
                        var url = treeNode['data-url'];
                        var level = treeNode['data-level'];
                        var no = treeNode['data-no'];
                        console.log('## onclick ##', {url, level, no});
                        if (!url) return;

                        $.ajax({
                            type: "GET",
                            url: url,
                            dataType: "html",
                            beforeSend: function () {
                                $("#loadingBar").css("display", "");
                            },
                            success: function (data) {
                                $("#contentsPanel").html(data);
                            },
                            error: function (request, status, error) {
                                console.log("code:" + request.status + "\n message:" + request.responseText + "\n error:" + error);
                            },
                            complete: function () {
                                $("#loadingBar").css("display", "none");
                            }
                        });
                    }
                } catch (e) {
                    console.error('zTree onClick error:', e);
                }
            }
        }
    };

    // zTree 초기화
    var treeObj = $.fn.zTree.init($("#facTree"), setting, zNodes);

    // 검색 기능 구현 (설비명: zTree Fuzzy search, 부품: 서버 검색 결과 강조)
    $('#facSearchButton').off('click.zTreeSearch').on('click.zTreeSearch', function () {
        $("#facLoadingBar").css("display", "");
        $('#facTree').find('.text-danger').removeClass('text-danger');

        // 모든 노드 닫기
        treeObj.expandAll(false);

        var searchString = $('#facSearchInput').val();

        if (searchString.length >= 2) {
            var q = (searchString || '').trim().toLowerCase();
            var nodes = treeObj.getNodesByFilter(function (node) {
                return q && (node._text.indexOf(q) !== -1) || (node._no.indexOf(q) !== -1);
            }, false); // false면 전체 트리 대상

            var searchCondition = $('#facSelect option:selected').val();

            // 설비(1) 검색: 노드 name 기준 퍼지 검색
            if (String(searchCondition) === '1') {
                console.log("## nodes ##", nodes.length);
                for (var i = 0; i < nodes.length; i++) {
                    console.log("## nodes ##", nodes[i]);
                    var n = nodes[i];
                    // 부모 열기
                    openParentsTree(n);

                    // 앵커 강조
                    $("#" + n.tId + "_a").addClass('text-danger');
                }

                $("#facLoadingBar").css("display", "none");
            } else {
                // 부품(2) 검색:
                console.log("## nodes ##", nodes.length);
                for (var i = 0; i < nodes.length; i++) {
                    console.log("## nodes ##", nodes[i]);
                    var n = nodes[i];
                    // 부모 열기
                    openParentsTree(n);

                    // 앵커 강조
                    $("#" + n.tId + "_a").addClass('text-danger');
                }

                $.ajax({
                    type: "POST",
                    url: "/facility/treePartSearch.do",
                    data: {ietDecription: searchString},
                    dataType: "json",
                    success: function (data) {
                        var resultList = JSON.parse(data.result);
                        console.log("## 1111111111111 partSearchSelect ##", resultList);
                        partSearchSelect(resultList);
                    },
                    error: function (request, status, error) {
                        console.log("code:" + request.status + "\n message:" + request.responseText + "\n error:" + error);
                    },
                    complete: function () {
                        $("#facLoadingBar").css("display", "none");
                    }
                });
            }
        }
    });

    // **부모 트리 펼치기**
    function openParentsTree(node) {
        console.log("## 3333333333333333333 openParentsTree ##", node);
        if (!node) return;
        console.log("## openParentsTree 4444444444444444 ##");
        var parent = node.getParentNode ? node.getParentNode() : node.parent;
        // zTree에서는 parentNode 참조가 node.parent 또는 node.getParentNode()로 접근 가능
        // 안전하게 재귀적으로 열기
        var current = node;
        while (current) {
            var p = current.getParentNode ? current.getParentNode() : null;
            if (p) treeObj.expandNode(p, true, false, false);
            current = p;
        }
        // 자신 열기
        treeObj.expandNode(node, true, false, false);
    }

    // **부품 검색 관련 부모 노드 포커스/펼치기**
    function partSearchSelect(resultList) {
        for (var i = 0; i < resultList.length; i++) {
            var partParentNodeId = resultList[i].id;
            var partParentNode = treeObj.getNodeByParam('id', partParentNodeId, null);
            console.log("## 2222222222222222 partSearchSelect ##", partParentNode);
            if (partParentNode) {
                openParentsTree(partParentNode);
                $("#" + partParentNode.tId + "_a").addClass('text-danger');
            }
        }
    }
}

// 설비정보 팝업의 아이콘 클릭시 3d 모델로 이동
function fnGoto3dModelView(t) {
    var modelType = $(t).next('.menu-item').attr('data-3d-target');
    var iegNo = $(t).next('.menu-item').attr('data-3d-target-no');
    console.log("#### target no ### " + modelType + " ##### " + iegNo);

    // <%-- goto 3d model : call parent main script --%>
    /* 열려져 있는 모든 창을 최소화 함 : only view model */
    window.parent.$(".winbox:not(.min) .wb-min").trigger('click');
    window.parent.modelLoadToUnity(modelType, iegNo);
}

//<%-- // jstree의 아이콘 클릭시 제어 함수 --%>
function fnJsTreeIconEvent(t) {
    var check_target = $(t).attr('class');

    // 3d model로 이동
    if (check_target.indexOf("_FACILITY_3D_ICON_") !== -1) {
        fnGoto3dModelView(t);
    }
}

$(document).ready(function () {
    //<%-- load facility tree list --%>
    $.ajax({
        type: "POST",
        url: "/facility/tree.do",
        dataType: "json",
        beforeSend: function () {
            $("#facLoadingBar").css('display', '');
        },
        success: function (data) {
            fnLoadFacilityTree(data);
        },
        complete: function () {
            $("#facLoadingBar").css("display", "none");
        }
    });
});
