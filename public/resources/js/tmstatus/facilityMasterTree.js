
//트리메뉴 구조 및 관련 데이터 포함
$(document).ready(function () {

	/* ** 트리메뉴 영역 ** */
	initializeJSTree();

	// 트리메뉴 임시데이터 - jsTree 3.3.15 버전
	function initializeJSTree() {

		// jsTree 초기화
		$('#facTree1').jstree({
			"plugins": ["themes", "types", "search"],
			'core': {
                'worker': true,
                'animation': 0,
                'multiple': false,
				'data': { 
					url: "/common/facilityLocList.do",
					dataType: "json", 
					dataFilter : function(data,type){
						var jsonData = jQuery.parseJSON(data);
						var sData = JSON.stringify(jsonData);
						return sData;
					}
				}
			},
			"state": {
				"key": 'jstree'
			},
			"types": {
				'default': {
					'icon': false
					//'icon': "icon-3d" // 3D 모델 아이콘
				}
			}
		});
		
		// jsTree 초기화
		$('#facTree2').jstree({
			'core': {
				'data': { 
					url: "/common/facilitySysList.do",
					dataType: "json", 
					dataFilter : function(data,type){

						var jsonData = jQuery.parseJSON(data);
						var sData = JSON.stringify(jsonData);
						return sData;
					}
				}
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
		
		// jsTree 초기화
		$('#facTree3').jstree({
			'core': {
                'worker': true,
                'animation': 0,
                'multiple': false,
				'data': { 
					url: "/common/facilityTypeList.do",
					dataType: "json", 
					dataFilter : function(data,type){

						var jsonData = jQuery.parseJSON(data);
						var sData = JSON.stringify(jsonData);
						return sData;
					}
				}
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
		$('#facTree1, #facTree2, #facTree3').on('ready.jstree', function () {
			const jstree = $('#facTree1, #facTree2, #facTree3').jstree(true);
		});

		// **검색 기능**
		$('#facTree1-input, #facTree2-input, #facTree3-input').on('keyup', function () {
			var searchString = $(this).val();
			$('#facTree1, #facTree2, #facTree3').jstree('search', searchString);
		});

	}

});
