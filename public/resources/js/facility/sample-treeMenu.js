
//트리메뉴 구조 및 관련 데이터 포함
$(document).ready(function () {

	/* ** 트리메뉴 영역 ** */
	initializeJSTree();

	// 트리메뉴 임시데이터 - jsTree 3.3.15 버전
	function initializeJSTree() {
		// jsTree 데이터 정의
		const treeData = [
			//1뎁스
			{ "id": "node1", "parent": "#", "type": "icon-disabled", "text": "<div class='menu-item'><strong class='fac-name'>평택복합2단계</strong></div>" },

			// 2뎁스
			{ "id": "node1-1", "parent": "node1", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>#1 C/C 전기설비</span></div>" },
			{
				"id": "node1-2", 
				"parent": "node1", 
				"type": "icon-3d", "text": "<div class='menu-item'><strong class='fac-name'>#1 가스터빈설비</strong></div>",
				"data-url": "modal01-facility-tab0101.html"
			},
			{ "id": "node1-3", "parent": "node1", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>#1 계측제어설비</span></div>" },
			{ "id": "node1-4", "parent": "node1", "type": "icon-disabled", "text": "<div class='menu-item'><span class='fac-name'>#1 배열회수보일러설비</span></div>" },
			{ "id": "node1-5", "parent": "node1", "type": "icon-disabled", "text": "<div class='menu-item'><span class='fac-name'>#1 증기터빈설비</span></div>" },
			{ "id": "node1-6", "parent": "node1", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>#2 가스터빈설비</span></div>" },
			{ "id": "node1-7", "parent": "node1", "type": "icon-disabled", "text": "<div class='menu-item'><span class='fac-name'>#2 배열회수보일러설비</span></div>" },
			{ "id": "node1-8", "parent": "node1", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>발전소내 공용부대시설</span></div>" },
			{ "id": "node1-9", "parent": "node1", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>전호기공용설비</span></div>" },
			{ "id": "node1-10", "parent": "node1", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>제1블록공용설비</span></div>" },
			{ "id": "node1-11", "parent": "node1", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>환경설비</span></div>" },

			//1-1 : 3뎁스 - #1 C/C 전기설비
			{ "id": "node1-1-1", "parent": "node1-1", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>#1 GT 발전기및보조계통</span></div>" },
			{ "id": "node1-1-2", "parent": "node1-1", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>#1 ST 발전기및보조계통</span></div>" },
			{ "id": "node1-1-3", "parent": "node1-1", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>#2 GT 발전기및보조계통</span></div>" },
			{ "id": "node1-1-4", "parent": "node1-1", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>기타전기설비(집중경보/조명/방식/동결방지/PLC/사무용전력)</span></div>" },
			{ "id": "node1-1-5", "parent": "node1-1", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>소내전력계통</span></div>" },
			{ "id": "node1-1-6", "parent": "node1-1", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>송수전계통</span></div>" },

			//1-2 : 3뎁스 - #1 가스터빈설비
			{ "id": "node1-2-1", "parent": "node1-2", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>가스터빈보조설비</span></div>" },
			{ "id": "node1-2-2", "parent": "node1-2", "type": "icon-3d", "text": "<div class='menu-item'><strong class='fac-name'>가스터빈본체</strong></div>" },
			{ "id": "node1-2-3", "parent": "node1-2", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>권양장치</span></div>" },
			{ "id": "node1-2-4", "parent": "node1-2", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>연료공급설비</span></div>" },
			{ "id": "node1-2-5", "parent": "node1-2", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>조작유및윤활유설비</span></div>" },
			{ "id": "node1-2-6", "parent": "node1-2", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>흡배기설비</span></div>" },

			//1-3 : 3뎁스 - #1 계측 제어설비
			{ "id": "node1-3-1", "parent": "node1-3", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>가스터빈제어계통</span></div>" },
			{ "id": "node1-3-2", "parent": "node1-3", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>보일러제어계통</span></div>" },
			{ "id": "node1-3-3", "parent": "node1-3", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>자료분석및감시계통</span></div>" },
			{ "id": "node1-3-4", "parent": "node1-3", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>증기터빈제어계통</span></div>" },

			//1-4 : 3뎁스 - #1 배열회수보일러설비
			{ "id": "node1-4-1", "parent": "node1-4", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>HRSG Common SYS</span></div>" },
			{ "id": "node1-4-2", "parent": "node1-4", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>HRSG Feed Water SYS</span></div>" },
			{ "id": "node1-4-3", "parent": "node1-4", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>HRSG 본체</span></div>" },

			//1-5 : 3뎁스 - #1 증기터빈설비
			{ "id": "node1-5-1", "parent": "node1-5", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>권양장치</span></div>" },
			{ "id": "node1-5-2", "parent": "node1-5", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>복수설비</span></div>" },
			{ "id": "node1-5-3", "parent": "node1-5", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>순환수설비</span></div>" },
			{ "id": "node1-5-4", "parent": "node1-5", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>증기터빈본체</span></div>" },
			{ "id": "node1-5-5", "parent": "node1-5", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>터빈보조계통</span></div>" },
			{ "id": "node1-5-6", "parent": "node1-5", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>터빈증기및드레인계통</span></div>" },

			//1-6 : 3뎁스 - #2 가스터빈설비
			{ "id": "node1-6-1", "parent": "node1-6", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>가스터빈보조설비</span></div>" },
			{ "id": "node1-6-2", "parent": "node1-6", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>가스터빈본체</span></div>" },
			{ "id": "node1-6-3", "parent": "node1-6", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>권양장치</span></div>" },
			{ "id": "node1-6-4", "parent": "node1-6", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>연료공급설비</span></div>" },
			{ "id": "node1-6-5", "parent": "node1-6", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>조작유및윤활유설비</span></div>" },
			{ "id": "node1-6-6", "parent": "node1-6", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>흡배기설비</span></div>" },

			//1-7 : 3뎁스 - #2 배열회수보일러설비
			{ "id": "node1-7-1", "parent": "node1-7", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>HRSG Common SYS</span></div>" },
			{ "id": "node1-7-2", "parent": "node1-7", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>HRSG Feed Water SYS</span></div>" },
			{ "id": "node1-7-3", "parent": "node1-7", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>HRSG 본체</span></div>" },

			//2-2 : 4뎁스 - #1 가스터빈본체 
			{ "id": "node1-2-2-1", "parent": "node1-2-2", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>Compressor</span></div>" },
			{ "id": "node1-2-2-2", "parent": "node1-2-2", "type": "icon-3d", "text": "<div class='menu-item'><strong class='fac-name'>Gas Turbine</strong></div>" },
			{ "id": "node1-2-2-3", "parent": "node1-2-2", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>Combustor</span></div>" },

			//2-2 : 5뎁스 - Gas Turbine
			{ "id": "node1-2-2-2-1", "parent": "node1-2-2-2", "type": "icon-3d", "text": "<div class='menu-item'><strong class='fac-name'>Bearing</strong></div>" },
			{ "id": "node1-2-2-2-2", "parent": "node1-2-2-2", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>Gas Turbine Line & VV</span></div>" },
			{ "id": "node1-2-2-2-3", "parent": "node1-2-2-2", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>Gas Turbine 현장계측기</span></div>" },
			{ "id": "node1-2-2-2-4", "parent": "node1-2-2-2", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>Over Speed Device ASSY</span></div>" },
			{ "id": "node1-2-2-2-5", "parent": "node1-2-2-2", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>Seal Housing ASSY</span></div>" },
			{ "id": "node1-2-2-2-6", "parent": "node1-2-2-2", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>TBN Blade</span></div>" },
			{ "id": "node1-2-2-2-7", "parent": "node1-2-2-2", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>TBN Blade Ring</span></div>" },
			{ "id": "node1-2-2-2-8", "parent": "node1-2-2-2", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>TBN Casing</span></div>" },

			//2-2 : 6뎁스 - TBN Casing
			{ "id": "node1-2-2-2-8-1", "parent": "node1-2-2-2-8", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>#1 GT Support</span></div>" },
			{ "id": "node1-2-2-2-8-2", "parent": "node1-2-2-2-8", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>#1 GT TBN Casing 기타부속설비</span></div>" },
			{ "id": "node1-2-2-2-8-3", "parent": "node1-2-2-2-8", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>#1 GT TBN Cylinder</span></div>" },
			{ "id": "node1-2-2-2-8-4", "parent": "node1-2-2-2-8", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>#1 GT TBN Cylinder Bolt류</span></div>" },

			//3-1 : 5-1뎁스 - Bearing
			{ "id": "node1-2-2-2-1-1", "parent": "node1-2-2-2-1", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>#1 GT NO1 BRG ASSY</span></div>" },
			{ "id": "node1-2-2-2-1-2", "parent": "node1-2-2-2-1", "type": "icon-3d", "text": "<div class='menu-item'><span class='fac-name'>#1 GT NO1 BRG 기타부속설비</span></div>" },

		];

		// jsTree 초기화
		$('#facTree').jstree({
			'plugins': ["types", "search"],
			'core': {
				'data': treeData
			},
			'state': {
				'key': 'jstree'
			},
			'types': {
				'default': {
					'icon': 'icon-3d'
				},
				'icon-disabled': {
					'icon': "icon-3d disabled"
				}
			}
		});

		// jstree가 준비 완료되면
		$('#facTree').on('ready.jstree', function () {
			const jstree = $('#facTree').jstree(true);
		});

		// **검색 기능**
		$('#search-input').on('keyup', function () {
			var searchString = $(this).val();
			$('#facTree').jstree('search', searchString);
		});

		/* 
		$('#facTree').on("select_node.jstree", function (e, data) {
			// 메뉴 클릭 시 패널 항상 열기
			openSidePanel();
		});
		 */
		// 눈 아이콘 클릭 이벤트
		/* 
		$('#facTree').on("click", ".eye-icon", function (e) {
			e.stopPropagation(); // 클릭 이벤트가 부모 노드로 전파되지 않도록 방지

			const $icon = $(this);
			const nodeId = $icon.data('node');

			// 아이콘 상태 토글
			if ($icon.text() === 'visibility') {
				$icon.text('visibility_off'); // 눈 감기 아이콘
				//console.log(`아이콘 비활성화: ${nodeId}`);
			} else {
				$icon.text('visibility'); // 눈 뜨기 아이콘
				//console.log(`아이콘 활성화: ${nodeId}`);
			}
		});
		 */
	}

});
