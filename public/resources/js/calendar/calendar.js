var yearSelect = document.getElementById("selectYear");
var monthSelect = document.getElementById("selectMonth");
var weekdayRow = document.getElementById("weekday-row");
var dateRow = document.getElementById("date-row");
/*var viewBtn = document.getElementById("viewCalendar");*/

var weekdays = ['일', '월', '화', '수', '목', '금', '토'];
//공휴일은 API 사용해야 하므로 제외
//var holidays = [1, 15]; // 예시 공휴일

// 오늘 날짜
var today = new Date();
var todayYear = today.getFullYear();
var todayMonth = today.getMonth() + 1;
var todayDate = today.getDate();

// 연도/월 셀렉트박스 채우기
var currentYear = todayYear;

for (let y = currentYear - 5; y <= currentYear + 5; y++) {
    var option = document.createElement("option");
    option.value = y;
    option.textContent = y;
    if (y === currentYear) option.selected = true;
    yearSelect.appendChild(option);
}

for (let m = 1; m <= 12; m++) {
    var option = document.createElement("option");
    option.value = m;
    option.textContent = m + "월";
    if (m === todayMonth) option.selected = true;
    monthSelect.appendChild(option);
}

// 검색조회 리스트
var paramSearchDate;
var orderColumn;
var orderType;
function fnSearchWorkReportList(searchDate) {
    paramSearchDate = searchDate;

    $("#searchWorkReportForm #searchDate").val(searchDate);

    $.ajax({
        type: "POST"
        ,url: "/dailySafety/workReportList.do"
        ,data: $("#searchWorkReportForm").serialize()
        ,dataType: "html"
        ,beforeSend:function () {
            $("#loadingBar").css("display", "");
        }
        ,success: function (data) {
            $("#_SAFETY_WORK_REPORT_LIST").html(data);

            // set sort
            if(orderColumn === "model_type_name") {
                if(orderType === "asc") {
                    $("._WORK_ORDER_CLASS").eq(0).removeClass('icon-down').addClass('icon-up');
                    $("._WORK_ORDER_CLASS").eq(0).attr("data-order-type", "asc");
                }
                else {
                    $("._WORK_ORDER_CLASS").eq(0).removeClass('icon-up').addClass('icon-down');
                    $("._WORK_ORDER_CLASS").eq(0).attr("data-order-type", "desc");
                }
            }

            if(orderColumn === "sv_dept_name") {
                if(orderType === "asc") {
                    $("._WORK_ORDER_CLASS").eq(1).removeClass('icon-down').addClass('icon-up');
                    $("._WORK_ORDER_CLASS").eq(1).attr("data-order-type", "asc");
                }
                else {
                    $("._WORK_ORDER_CLASS").eq(1).removeClass('icon-up').addClass('icon-down');
                    $("._WORK_ORDER_CLASS").eq(1).attr("data-order-type", "desc");
                }
            }
        }
        , error: function () {
            alert("에러가 발생했습니다.\n잠시 후 다시 시도해 주시기 바랍니다.");
        }
        , complete:function () {
            $("#loadingBar").css("display", "none");
        }
    });
}

// 달력 생성 함수
function generateCalendar(year, month) {
    weekdayRow.innerHTML = "";
    dateRow.innerHTML = "";

    var daysInMonth = new Date(year, month, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month - 1, day);
        const dayOfWeek = date.getDay();

        // 요일 셀
        let dayCell;
        let dateCell;

        dayCell = document.createElement("div");
        dayCell.className = "cell";
        dayCell.textContent = weekdays[dayOfWeek];
        if (dayOfWeek === 0) dayCell.classList.add("sunday");
        if (dayOfWeek === 6) dayCell.classList.add("saturday");
        weekdayRow.appendChild(dayCell);

        // 날짜 셀
        dateCell = document.createElement("div");
        dateCell.className = "cell";
        dateCell.textContent = day;
        if (dayOfWeek === 0) dateCell.classList.add("sunday");
        if (dayOfWeek === 6) dateCell.classList.add("saturday");
        //if (holidays.includes(day)) dateCell.classList.add("holiday");

        // 오늘 날짜 강조
        if (year === todayYear && month === todayMonth && day === todayDate) {
            dateCell.classList.add("today");
            dayCell.classList.add("today");

            dateCell.classList.add("active");
            dayCell.classList.add("active");
        }

        // today 날짜에 포커스
        setTimeout(() => {
            const todayEl = document.querySelector(".calendar .today");
            if (todayEl) {
                todayEl.scrollIntoView({
                    behavior: "smooth",
                    inline: "center",
                    block: "nearest"
                });
            }
        }, 100);

        // 클릭된 날짜에 active 클래스 추가
        dateCell.addEventListener("click", () => {
            // 기존 active 제거
            document.querySelectorAll(".calendar-row .cell").forEach(C => C.classList.remove("active"));

            // 현재 클릭된 셀에 active 추가
            dateCell.classList.add("active");
            dayCell.classList.add("active");

            const selectedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

            // search list
            fnSearchWorkReportList(selectedDate);
        });

        dateRow.appendChild(dateCell);
    }
}



// 버튼 클릭 시 달력 새로고침
monthSelect.addEventListener("change", () => {
    const selectedYear = parseInt(yearSelect.value);
    const selectedMonth = parseInt(monthSelect.value);

    generateCalendar(selectedYear, selectedMonth);
});

/*viewBtn.addEventListener("click", () => {
    const selectedYear = parseInt(yearSelect.value);
    const selectedMonth = parseInt(monthSelect.value);

    generateCalendar(selectedYear, selectedMonth);
});*/

/*
*   로딩 표시
*   달력 리스트
*   검색 조회 리스트
*/
generateCalendar(currentYear, todayMonth);
fnSearchWorkReportList(currentYear + "-" + String(todayMonth).padStart(2, '0') + "-" + String(todayDate).padStart(2, '0'));
