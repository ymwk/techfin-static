/**
 * ============================================================================
 * 공통함수
 *
 * @author		<A Href="mailto:ssh@duzon.com</A>
 * @version		1.0
 * @since		1.0
 *
 * History
 * 1.0	2015. 4. 6.	신승현	Initial Version
 * ============================================================================
 */

var ExcelDownloadDialog = {
    init: false,
    zindex: 2000,
    i: 0,

    /**
     * 공공기관용 엑셀 다운로드 오픈
     */
    openWehagov: function(callback, count) { // 공공기관용 엑셀 다운로드
        var dn = 'common_excel_wehagov'; // 다이얼로그 네임
        var _count_box = isNaN(count) ? '' :
            '<div class="dialog_data_section">\n' +
            '    <dl class="dlgCommon_infoDl">\n' +
            '        <div>\n' +
            '            <dt>다운로드 대상</dt>\n' +
            '            <dd><em id="downloadCount">' + Format.decimal(count) + '</em>건</dd>\n' +
            '        </div>\n' +
            '    </dl>\n' +
            '</div>\n';

        var _html =
            '<div class="LUX_basic_dialog" id="dlg_' + dn + '">\n' +
            '    <div class="dimmed"></div>\n' +
            '    <div class="dialog_wrap_tbl">\n' +
            '        <div class="dialog_wrap_tblcel">\n' +
            '            <div class="dialog_wrap" style="padding:0;border:0;border-radius:10px">\n' +
            '                <div class="dialog_content">\n' +
            '                    <div class="platform_dialog_container defaultApply">\n' +
            '                        <div class="dialog_content roundstyle" style="width:480px">\n' +
            '                            <div class="dialog_data" style="padding:20px">\n' +
            '                                <div class="dialog_data_tit">\n' +
            '                                    <h1 class="txtcnt">엑셀 다운로드</h1>\n' +
            '                                    <button type="button" id="btn_' + dn + '_close" class="LUX_basic_btn btn_clr">\n' +
            '                                        <span class="sp_lux">닫기</span>\n' +
            '                                    </button>\n' +
            '                                </div>\n' +
            '                                <div class="dialog_data_area noline">\n' +
            _count_box +
            '                                    <div class="dialog_data_section mgv2">\n' +
            '                                        <h2 class="basic_dlgTitle dz_font">사유<span class="subtitle">개인정보 포함된 자료 다운로드 시 사유입력이 필요합니다.</span></h2>\n' +
            '                                        <div class="dlg_radioListBox">\n' +
            '                                            <ul class="dlg_radioListBox__listGroup">\n' +
            '                                                <li class="dlg_radioListBox__listItem">\n' +
            '                                                    <div class="radioLabel">\n' +
            '                                                        <label>\n' +
            '                                                            <input class="radioInput" type="radio" name="rdo_' + dn + '" checked value="agency" onchange="changeReason()">\n' +
            '                                                            <span class="radioIcon"></span>\n' +
            '                                                            <span class="label_text">기관 제출용</span>\n' +
            '                                                        </label>\n' +
            '                                                    </div>\n' +
            '                                                </li>\n' +
            '                                                <li class="dlg_radioListBox__listItem">\n' +
            '                                                    <div class="radioLabel">\n' +
            '                                                        <label>\n' +
            '                                                            <input class="radioInput" type="radio" name="rdo_' + dn + '" value="inside">\n' +
            '                                                            <span class="radioIcon"></span>\n' +
            '                                                            <span class="label_text">내부 확인용</span>\n' +
            '                                                        </label>\n' +
            '                                                    </div>\n' +
            '                                                </li>\n' +
            '                                                <li class="dlg_radioListBox__listItem listItem--textInput">\n' +
            '                                                    <div class="radioLabel">\n' +
            '                                                        <label>\n' +
            '                                                            <input class="radioInput" type="radio" name="rdo_' + dn + '"value="etc">\n' +
            '                                                            <span class="radioIcon"></span>\n' +
            '                                                            <span class="label_text">기타</span>\n' +
            '                                                        </label>\n' +
            '                                                    </div>\n' +
            '                                                    <div class="LUX_basic_text LUX_renewal" style="flex:1;margin-left:10px">\n' +
            '                                                        <!-- 입력창에 포커스 - inpbx class="on" 추가  -->\n' +
            '                                                        <div class="inpbx">\n' +
            '                                                            <input type="text" id="txt_' + dn + '_reason" placeholder="내용을 입력하세요." title="내용입력" readonly>\n' +
            '                                                        </div>\n' +
            '                                                    </div>\n' +
            '                                                </li>\n' +
            '                                            </ul>\n' +
            '                                        </div>\n' +
            '                                    </div>\n' +
            '                                    <div class="dialog_btnbx">\n' +
            '                                        <div>\n' +
            '                                            <button type="button" id="btn_' + dn + '_cancel" class="LUX_basic_btn LUX_renewal Confirm Default basic">\n' +
            '                                                <span>취소</span>\n' +
            '                                            </button>\n' +
            '                                            <button type="button" id="btn_' + dn + '_confirm" class="LUX_basic_btn LUX_renewal Confirm Default basic2">\n' +
            '                                                <span>확인</span>\n' +
            '                                            </button>\n' +
            '                                        </div>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>';


        var ff = document.createElement('div');
        ff.setAttribute('id','div_common_excel_wehagov');
        ff.style.zIndex = ExcelDownloadDialog.zindex;
        ff.innerHTML = _html;

        document.body.appendChild(ff);

        ff.querySelector("#btn_" + dn + "_close").addEventListener("click", function () {
            document.body.removeChild(ff);
        });

        ff.querySelector("#btn_" + dn + "_cancel").addEventListener("click", function () {
            document.body.removeChild(ff);
        });

        ff.querySelectorAll('input[name="rdo_'+ dn +'"]').forEach(function (input) {
            input.addEventListener('change', function (e) {
                if (document.querySelector('input[name="rdo_'+ dn +'"]:checked').value === "etc") {
                    var reason = document.querySelector("#txt_" + dn + "_reason").value;
                    document.getElementById("txt_" + dn + "_reason").readOnly = false;
                } else {
                    document.getElementById("txt_" + dn + "_reason").readOnly = true;
                }
            });
        });

        ff.querySelector("#btn_" + dn + "_confirm").addEventListener("click", function () {
            var value = document.querySelector('input[name="rdo_'+ dn +'"]:checked').value;
            var reason = value === "agency" ? "기관 제출용" : value === "inside" ? "내부 확인용" : $("#txt_" + dn + "_reason").val();
            if (value === "etc" && reason === "") {
                var errorMsg = "다운로드 사유를 입력하세요.";
                if (dcloudConfirm && dcloudConfirm.alert) {
                    dcloudConfirm.alert(errorMsg, function(){
                    }, {
                        ok: "확인"
                    });
                } else {
                    alert(errorMsg);
                }
                return;
            }
            callback(reason);
            document.body.removeChild(ff)
        });
    },
};
