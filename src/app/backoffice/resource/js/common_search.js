/**
 * 검색박스 공통 js 	
 */
 

//사용유무
var selUseYn = [
	{"key": "", "name" : "선택"}
	,{"key": "search_use", "name" : "사용"}
	,{"key": "search_not_use", "name" : "미사용"}
]

//사용유무 + 삭제 
var selUseDelYn = [
	{"key": "", "name" : "선택"}
	,{"key": "search_use", "name" : "사용"}
	,{"key": "search_not_use", "name" : "미사용"}
	,{"key": "search_del", "name" : "삭제"}
]

//회원등급 (계정관리)
var selUsGrade = [
	{"key": "", "name" : "선택"}
	,{"key": "search_general", "name" : "일반회원"}
	,{"key": "search_tmp", "name" : "임시회원"}
	,{"key": "search_mng", "name" : "일반관리자"}
	,{"key": "search_mst", "name" : "마스터관리자"}
]


//등급 (신청내역조회, 제출내역조회)
var selGrade = [
	{"key": "", "name" : "선택"}
	,{"key": "search_AAA", "name" : "AAA"}
	,{"key": "search_AA", "name" : "AA"}
	,{"key": "search_A", "name" : "A"}
	,{"key": "search_BBB", "name" : "BBB"}
	,{"key": "search_BB", "name" : "BB"}
	,{"key": "search_B", "name" : "B"}
	,{"key": "search_CCC", "name" : "CCC"}
	,{"key": "search_CC", "name" : "CC"}
	,{"key": "search_C", "name" : "C"}
	,{"key": "search_D", "name" : "D"}
]

//검색기준 (계정관리, 활동이력) 
var selUs = [
	{"key": "", "name" : "선택"}
	,{"key": "search_nm", "name" : "사용자명"}
	,{"key": "search_id", "name" : "ID"}
	,{"key": "search_biz_nm", "name" : "기업명"}
]
//검색기준 (약관관리)
var selTerms = [
	{"key": "", "name" : "약관명"}
	,{"key": "search_code", "name" : "관리코드"}
	,{"key": "search_no", "name" : "약관개정번호"}
	,{"key": "search_desc", "name" : "비고"}
]







//검색기준(계정관리 접속이력)
var selAcctConn = [
	{"key": "", "name" : "선택"}
	,{"key": "search_biz_nm", "name" : "기업명"}
	,{"key": "search_id", "name" : "아이디(ID)"}
	,{"key": "search_biz_no", "name" : "사업자등록번호"}
	,{"key": "search_ip", "name" : "접속IP"}
]

//정산관리 상품구분
var selPrdt = [
	{"key": "", "name" : "선택"}
	,{"key": "search_credit_doc", "name" : "기업신용펑가등급확인서"}
]

//정산관리 결제수단
var selPay = [
	{"key": "", "name" : "선택"}
	,{"key": "search_credit", "name" : "신용카드"}
	,{"key": "search_transfer", "name" : "실시간계좌이체"}
	,{"key": "search_virtual", "name" : "가상계좌"}
]

//정산관리 결제상태
var selPayStatus = [
	{"key": "", "name" : "선택"}
	,{"key": "search_normal", "name" : "정상"}
	,{"key": "search_fail", "name" : "실패"}
	,{"key": "search_cancel", "name" : "취소"}
]


//약관관리 적용시점
var selTermsYmd = [
	{"key": "", "name" : "선택"}
	,{"key": "search_a", "name" : "A"}
	,{"key": "search_b", "name" : "B"}
	,{"key": "search_c", "name" : "C"}
	,{"key": "search_d", "name" : "D"}
]


//약관관리 구분
var selTermsStatus = [
	{"key": "", "name" : "선택"}
	,{"key": "status_copy", "name" : "개정"}
	,{"key": "status_modi", "name" : "수정"}
	,{"key": "status_del", "name" : "삭제"}
]

 // 검색기준(사업자관리)
var selBiz = [
	{"key": "", "name" : "선택"}
	,{"key": "search_biz_nm", "name" : "기업명"}
	,{"key": "search_biz_no", "name" : "사업자등록번호"}
	,{"key": "search_ceo_nm", "name" : "대표자명"}
]

//검색기준 (계정관리-접속이력)
var selConn = [
	{"key": "", "name" : "선택"}
	,{"key": "search_biz_nm", "name" : "기업명"}
	,{"key": "search_id", "name" : "ID"}
	,{"key": "search_biz_no", "name" : "사업자등록번호"}
	,{"key": "search_ip", "name" : "접속IP"}
]

//검색기준 (정산관리)
var selOrder = [
	{"key": "", "name" : "선택"}
	,{"key": "search_no", "name" : "관리번호"}
	,{"key": "search_nm", "name" : "주문자명"}
	,{"key": "search_id", "name" : "주문자ID"}
]

//공지사항 공지구분
var selNotiDesc = [
	{"key": "", "name" : "선택"}
	,{"key": "search_system", "name" : "시스템점검"}
	,{"key": "search_run", "name" : "운영정책"}
	,{"key": "search_settle", "name" : "정산정책"}
	,{"key": "search_event", "name" : "이벤트"}
	,{"key": "search_etc", "name" : "기타"}
]

//공지사항 게시상태
var selNotiStatus = [
	{"key": "", "name" : "선택"}
	,{"key": "search_progress", "name" : "진행"}
	,{"key": "search_close", "name" : "종료"}

]

//검색기준 (공지사항)
var selNoti = [
	{"key": "", "name" : "선택"}
	,{"key": "search_tit", "name" : "제목"}
	,{"key": "search_usr", "name" : "등록자"}
]

// 검색기준(제휴코드관리)
var selOutEnt = [
	{"key": "", "name" : "선택"}
	,{"key": "search_usr", "name" : "등록자"}
]

//검색기준 (관리자 계정관리)
var selMng = [
	{"key": "", "name" : "전체"}
	,{"key": "search_nm", "name" : "이름"}
	,{"key": "search_id", "name" : "아이디"}
	,{"key": "search_dept", "name" : "소속"}
	,{"key": "search_phone", "name" : "전화번호"}
	,{"key": "search_auth", "name" : "관리권한"}
	
]

//검색기준 (접속/활동 접속이력)
var selConn = [
	{"key": "", "name" : "선택"}
	,{"key": "search_nm", "name" : "이름"}
	,{"key": "search_id", "name" : "아이디"}
	,{"key": "search_dept", "name" : "소속"}
	,{"key": "search_conn", "name" : "접속유형"}
	,{"key": "search_os", "name" : "운영체제"}
	,{"key": "search_browser", "name" : "브라우저/앱"}
	,{"key": "search_ip", "name" : "접속IP"}
]

//검색기준 (접속/활동 활동이력)
var selAct = [
	{"key": "", "name" : "선택"}
	,{"key": "search_nm", "name" : "이름"}
	,{"key": "search_id", "name" : "아이디"}
	,{"key": "search_dept", "name" : "소속"}
	,{"key": "search_menu", "name" : "메뉴"}
	,{"key": "search_ip", "name" : "접속IP"}
	,{"key": "search_desc", "name" : "처리내용"}
]

//접속이력 접속유무
var selConnYn = [
	{"key": "", "name" : "선택"}
	,{"key": "search_success", "name" : "성공"}
	,{"key": "search_fail", "name" : "실패"}
]

var selAuth = [
	{"key": "", "name" : "선택"}
	,{"key": "search_auth", "name" : "권한구분"}
	,{"key": "search_nm", "name" : "사용자명"}
	,{"key": "search_id", "name" : "아이디"}
]

// 신청내역 관리 
var selReqHis = [
	 {"key": "", "name" : "선택"}
	,{"key": "search_no_req", "name" : "관리번호"}
	,{"key": "search_no_issued", "name" : "발급번호"}
	,{"key": "search_grade", "name" : "등급"}
	,{"key": "search_nm_issued", "name" : "용도"}
	,{"key": "search_nm_dam", "name" : "담당자명"}
	,{"key": "search_em_dam", "name" : "담당자이메일"}
]

// 대분류
var selMajorCate = [
	 {"key": "", "name" : "전체"}
	,{"key": "MJ001", "name" : "회원서비스"}
	,{"key": "MJ002", "name" : "이벤트"}
	,{"key": "MJ003", "name" : "신용평가"}
	,{"key": "MJ004", "name" : "결제"}
	,{"key": "MJ005", "name" : "기타"}
]

// 중분류
var selMJ001Cate = [
	{"key": "MD001", "name" : "회원일반/계정"}
	,{"key": "MD002", "name" : "회원가입/탈퇴"}
	,{"key": "MD003", "name" : "인증서"}
	,{"key": "MD004", "name" : "서비스이용"}
]
var selMJ002Cate = [
	{"key": "MD001", "name" : "이벤트"}
]
var selMJ003Cate = [
	{"key": "MD001", "name" : "신용등급조회"}
	,{"key": "MD002", "name" : "등급확인서"}
	,{"key": "MD003", "name" : "데이터"}
	,{"key": "MD004", "name" : "AI경영진단보고서"}
]
var selMJ004Cate = [
	{"key": "MD001", "name" : "환불"}
	,{"key": "MD002", "name" : "쿠폰"}
	,{"key": "MD003", "name" : "비용"}
	,{"key": "MD004", "name" : "결제방식"}
]
var selMJ005Cate = [
	{"key": "MD001", "name" : "기타"}
]
//중 카테고리 끝

//검색기준 (1:1 문의)
var selQna = [
	{"key": "", "name" : "선택"}
	,{"key": "search_tit", "name" : "제목"}
	,{"key": "search_cont", "name" : "내용"}
	,{"key": "search_usr", "name" : "작성자"}
]

var selAnsYn = [
	{"key": "", "name" : "선택"}
	,{"key": "search_ans", "name" : "답변완료"}
	,{"key": "search_not_ans", "name" : "답변대기"}
]

//select box 생성
function createSelectBox(id, item){ 
	var option = '';
	var selId = '#' + id;
	$(selId).empty();
	for(var i=0; i<item.length; i++){
		var key = item[i].key;
		var name = item[i].name;
		option += '<option value="' + key + '">' + name + '</option>';
	}

	$(selId).append(option);
}