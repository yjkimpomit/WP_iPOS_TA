

//TM현황 작업요청 건수 차트
var procstat_data = {
	categories: chartList.map(item => item.labels),
	series: [
		{
			name: '발행',
			data: chartList.map(item => item.pubCnt)
		},
		{
			name: '취소',
			data: chartList.map(item => item.cancelCnt)
		},
		{
			name: '미결',
			data: chartList.map(item => item.susCnt)
		},
		{
			name: '완료',
			data: chartList.map(item => item.comCnt)
		}
	]
};

var maxValue = Math.max(...procstat_data.series.flatMap(series => series.data));

var procstat_chartoptions = {
		chart: {
			width: 1830,
			height: 640,
			title:{
				text: '호기별 작업요청 처리현황',
				offsetY: -5,
				align: 'center'
			}
		},
		series: {
			eventDetectType: 'grouped'
		},
		xAxis: {
			label: {
				fontSize: 12,
				fontWeight: 500,
				//categories 글자 기울기 설정
				rotatable: true
			}
		},
		yAxis: {
			scale: {
				min: 0,
				max: maxValue,
				stepSize: maxValue,
			}
		},
		legend: {
			visible: false,
		},
		theme:{
			title:{
				fontSize: 16,
				fontWeight: 700
			},
			series: {
				colors: ['#085FB5', '#FFD837', '#3EBB3C', '#FF8000'],
				//barWidth: 24
			}
		},
		responsive: {
			animation: { duration: 300 }
		},
		exportMenu:{visible: false}
};

var procstat_chart = document.getElementById('procstat_chart');

var chart_procstat = toastui.Chart.columnChart({el:procstat_chart, data:procstat_data, options:procstat_chartoptions});

updateCharts();

function updateCharts(){
	if(searchVal == "1"){
		procstat_chartoptions.chart.title.text = "호기별 작업요청 건수";
	}else if(searchVal == "2"){
		procstat_chartoptions.chart.title.text = "요청부서별 작업요청 건수";
	}else if(searchVal == "3"){
		procstat_chartoptions.chart.title.text = "감독부서별 작업요청 건수";
	}else if(searchVal == "4"){
		procstat_chartoptions.chart.title.text = "요청자별 작업요청 건수";
	}else if(searchVal == "5"){
		procstat_chartoptions.chart.title.text = "설비별 작업요청 건수";
	}else if(searchVal == "6"){
		procstat_chartoptions.chart.title.text = "요청부서별 & 감독부서별 작업요청 건수";
	}
	procstat_chartoptions.chart.title.align = "center";
	procstat_chartoptions.chart.title.offsetY = -5;
	
	//차트 검색 개수가 20개 이상 일 경우 글자 세로로 변경
	var procListCnt = chartList.length;
	if(procListCnt > 20){
		procstat_chartoptions.xAxis.label.interval = 1;
	}
	chart_procstat.setOptions(procstat_chartoptions);
}