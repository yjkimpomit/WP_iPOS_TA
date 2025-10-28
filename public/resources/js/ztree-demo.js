// zTree 설정
var setting = {
	view: {
		showLine: true,
		showIcon: false,
		selectedMulti: false,
        addDiyDom: customizeNode, 
	},
	data: {
		simpleData: {
			enable: true,
			idKey: "id",
			pIdKey: "pId",
			rootPId: 0
		}
	}
};

// 샘플 데이터
var zNodes = [
  { id: 1, pId: 0, name: "메뉴 1", open: true },

  // 기존 메뉴 1 하위
  { id: 11, pId: 1, name: "서브메뉴 1-1" },
  { id: 12, pId: 1, name: "서브메뉴 1-2" },

  // 기존 메뉴 2 계층을 메뉴1 하위로 이동
  { id: 2, pId: 1, name: "메뉴 2", open: true },
  { id: 21, pId: 2, name: "서브메뉴 2-1" },
  { id: 211, pId: 21, name: "서브메뉴 2-1-1" },
  { id: 212, pId: 21, name: "서브메뉴 2-1-2" },
  { id: 22, pId: 2, name: "서브메뉴 2-2" },

  // 기존 메뉴 3 계층도 메뉴1 하위로 이동
  { id: 3, pId: 1, name: "메뉴 3", open: false, icon: "icons/folder.png" },
  { id: 31, pId: 3, name: "서브메뉴 3-1", icon: "icons/doc.png" },
  { id: 32, pId: 3, name: "서브메뉴 3-2", icon: "icons/doc.png" }
];


function customizeNode(treeId, treeNode) {
    var aObj = $("#" + treeNode.tId + "_a");
    var spanObj = $("#" + treeNode.tId + "_span");

    // 기존 span 내용을 덮어씀
    var html = `
        <div class="menu-item" data-node="node-${treeNode.id}">
            <span class="fac-name">${treeNode.name}</span>
			<span class="icon-3d"></span>
        </div>
    `;
    spanObj.html(html);

    // a 태그 속성 추가
    aObj
        .attr({
            "target": "_blank",
            "title": html
        })
        .addClass(treeNode.level ? treeNode.level : "")
        .find("span.button.ico_docu").hide(); // 불필요한 아이콘 숨김
}