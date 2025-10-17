// ______________________________________________________________________________________________ Send

/**
 * Unity -> Web 모델 정보 팝업
 * @param modelId String
 */
function openModelInfoPopup(modelId) {
    console.log("## openModelInfoPopup ## " + modelId);

    /* Open winbox url */
    /* 타이틀 생성 */
    var target = $('<input type="hidden" id="_openModelInfoPopup" data-title="3D Model 설비정보"/>');

    /* 해당 설비정보 팝업 창 오픈 */
    fnOpenPopup("/facility/modelInfo.do?iegNo=" + modelId, target);

    /* 전달 후 타이틀 삭제 */
    $("#_openModelInfoPopup").remove();
}

/**
 * Unity -> 파노라마 핫스팟 이동
 * @param panoLv
 * @param panoId
 */
function openPanoInfoPopup(panoLv, panoId) {
    console.log(panoLv);
    console.log(panoId);
    var pciTag = panoLv;
    var tagno = panoId;
    var tagNumberJason = {"tagno": tagno}

    var checkBool = 0;

    if (panoId !== "") {
        $.ajax({
            type: "post",
            url: "/pcm/adm/unityIdCheck.do",
            data: tagNumberJason,
            async: false,
            dataType: "json",
            beforeSend: function () {
                $("#loadingBar").css("display", "");
            },
            success: function (data) {
                if (data.result === "OK") {
                    checkBool = 1;
                }
            },
            error: function (xhr, status, error) {
                alert("태그오류");
            },
            complete: function () {
                $("#loadingBar").css("display", "none");
            }
        });

        if (checkBool === 1) {
            var popup = window.open("/pcm/vi/main.do?pct_sn=8&pci_tag=" + pciTag, '_viewPano', 'height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');
            popup.focus();
        } else {
            var popup = window.open("/pcm/vi/panoview.do?pct_sn=8&tagno=" + tagno, '_viewPano', 'height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');
            popup.focus();
        }
    } else {
        var popup = window.open("/pcm/vi/main.do?pct_sn=8&pci_tag=평택", '_viewPano', 'height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');
        popup.focus();
    }
}

/**
 * 운영정보 데이터 뷰 페이지 부분
 * @param targetId
 * @param id
 */
function fnOperationLoadInterval(targetId, id) {
    $.ajax({
        type: "POST"
        , url: "/operation/ModelDatas.do"
        , data: {modelType: id}
        , dataType: "json"
        , success: function (data) {
            const dataList = data.list;
            let targetIdVew;

            for (const key in dataList) {
                targetIdVew = targetId + " #_" + id + "_" + key.toUpperCase();
                $(targetIdVew).html(dataList[key]);
            }
        },
        error: function () {
            console.error("Error loading operation data.");
        }
    });
}

/**
 * Unity -> Web 운전정보 팝업
 * @param modelIdAndActive  String
 */
function requestOperationInfo(modelIdAndActive) {
    let result = modelIdAndActive.split(",");
    let id = result[0];
    let active = JSON.parse(result[1].toLowerCase());

    let modelId;
    const equals = {
        "ALL": () => {
            modelId = null;
        },
        "GT": () => {
            modelId = '#_OPERATION_GT_';
        },
        "ST": () => {
            modelId = '#_OPERATION_ST_';
        },
        "HRSG": () => {
            modelId = '#_OPERATION_HRSG_';
        }
    }

    if (equals[id]) {
        equals[id]();

        if (modelId == null) {
            close_opDataBox('#_OPERATION_GT_');
            close_opDataBox('#_OPERATION_ST_');
            close_opDataBox('#_OPERATION_HRSG_');
        } else {
            if (active) {
                open_opDataBox(modelId, id);
            } else {
                close_opDataBox(modelId);
            }
        }
    } else {
        //console.log("requestOperationInfo | Null");
    }
}

/**
 * Unity -> Web Unity가 로딩되고 호출하는 함수
 */
function initializeOnLoad() {
    sendModelsByPanoramaId();
}

/**
 * Unity -> Web Unity가 로딩완료 시 호출하는 함수
 */
function initializeOnLoadComplete() {
    fnMainIntervalRun();
}

// ______________________________________________________________________________________________ Receive

/**
 * Web -> CCTV 설비 모델
 * @param modelId String
 */
function cctvToUnity(modelId) {
    try {
        // TODO : 창닫기 처리 부분
        $("#externalPopup").find('.modal-close').trigger('click');

        var systemTarget = "" + "," + modelId;
        const isSuccess = true;

        if (isSuccess) {
            unityObj.SendMessage("Network", "LoadModelFromWeb", systemTarget);
        } else {
            throw new Error("전송 실패");
        }
    } catch (error) {
        alert(error.message + '\n' + '3D모델이 연결되지 않았습니다.');
    }
}

/**
 * Web -> Unity 모델 로딩
 * @param modelType
 * @param modelId
 */
function modelLoadToUnity(modelType, modelId) {
    try {
        var systemTarget = modelType + "," + modelId;

        console.log("### modelLoadToUnity ## " + systemTarget);
        const isSuccess = true;

        if (isSuccess) {
            unityObj.SendMessage("Network", "LoadModelFromWeb", systemTarget);
        } else {
            throw new Error("전송 실패");
        }
    } catch (error) {
        alert(error.message + '\n' + '3D모델이 연결되지 않았습니다.');
    }
}

/**
 * panorama -> Unity 모델 로딩
 * @param modelType
 * @param modelId
 */
function panoramaLoadToUnity(modelType, modelId) {
    try {
        // TODO : 창닫기 처리 부분
        $("#externalPopup").find('.modal-close').trigger('click');

        var systemTarget = modelType + "," + modelId;
        console.log("### panoramaLoadToUnity ## " + systemTarget);

        const isSuccess = true;

        if (isSuccess) {
            unityObj.SendMessage("Network", "LoadModelFromWeb", systemTarget);
        } else {
            throw new Error("전송 실패");
        }
    } catch (error) {
        alert(error.message + '\n' + '3D모델이 연결되지 않았습니다.');
    }
}

/**
 * Web -> Unity 파노라마 연계된 모델 설비번호들 전달
 */
function sendModelsByPanoramaId() {
    var modelIds = "";
    unityObj.SendMessage("Network", "GetModelsByPanoramaId", modelIds);
}

/**
 * Web -> Unity 요청한 모델이나 정보가 없을 경우 Unity Popup Message 전달
 * @param message
 */
function popupMessageToUnity(message) {
    unityObj.SendMessage("Network", "PopupMessageFromWeb", message);
}
