/**
 * @param origin_password 기존 비밀번호
 * @param admin_password 등록/변경할 비밀번호
 * @param admin_password_check 등록/변경할 비밀번호 확인
 * @returns {boolean|null}
 */
function checkPassWordChange(origin_password, admin_password, admin_password_check){
    var isValidPassword = false;
    if(origin_password == undefined || origin_password == null){
        DcloudToast.alert("<b>기존 비밀번호를 입력해주세요. </b>");
        return isValidPassword;
    }else if(admin_password == undefined || admin_password == null){
        DcloudToast.alert("<b>비밀번호를 입력해주세요. </b>");
        return isValidPassword;
    }else if(admin_password_check == undefined || admin_password_check == null){
        DcloudToast.alert("<b>비밀번호 확인을 입력해주세요. </b>");
        return isValidPassword;
    }else if(admin_password != admin_password_check){
        DcloudToast.alert("<b>비밀번호와 비밀번호 확인이 일치하지 않습니다. </b>");
        return isValidPassword;
    }

    // 비밀번호 확인
    const regex = {
        success: /^[a-zA-Z0-9!"#$%'()*,-./:<=>?@\[\\\]^_`{|}~]*$/,
        repeat: /(\w)\1\1/,
        continuity: /(qwe)|(wer)|(ert)|(rty)|(tyu)|(yui)|(uio)|(iop)|(asd)|(sdf)|(dfg)|(fgh)|(ghj)|(hjk)|(jkl)|(zxc)|(xcv)|(cvb)|(vbn)|(bnm)|(123)|(234)|(345)|(456)|(567)|(678)|(789)|(890)/,
        reverse : /(poi)|(oiu)|(iuy)|(uyt)|(ytr)|(tre)|(rew)|(ewq)|(lkj)|(kjh)|(jhg)|(hgf)|(gfd)|(fds)|(dsa)|(mnb)|(nbv)|(bvc)|(vcx)|(cxz)|(098)|(987)|(876)|(765)|(654)|(543)|(432)|(321)/,
        safe: /^[a-zA-Z0-9!"#$%'()*,-./:<=>?@\[\\\]^_`{|}~]$/,
    };

    const titles = {
        error: "비밀번호 보안등급: 사용불가",
        success: "비밀번호 보안등급: 안전",
        warning: "비밀번호 보안등급: 안전하지 않음",
    };

    var tooltipTitle = '';
    var tooltipContent = '';
    if(admin_password != "") {
        if (admin_password.search(regex['success']) != 0) {
            isValidPassword = false;
            this.refs.inputNewPw1.validationError();
            tooltipTitle = titles['error'];
            tooltipContent = '사용할 수 없는 문자열을 입력하셨습니다.';
        } else if (admin_password.search(regex['repeat']) > -1 || admin_password.search(regex['continuity']) > -1 || admin_password.search(regex['reverse']) > -1) {
            isValidPassword = false;
            tooltipTitle = titles['error'];
            tooltipContent = "동일한 문자가 3회이상 반복 또는 키보드 상에서 연속한 위치에 존재하는 비밀번호를 사용할 수 없습니다.";
        } else if(admin_password.length < 8 || admin_password.length > 16) {
            isValidPassword = false;
            tooltipTitle = titles['error'];
            tooltipContent = "8자 이상 16자 이하의 비밀번호만 사용할 수 있습니다.";
        } else if (admin_password.indexOf("${wehagoSession.admin_contact}") > -1 || admin_password.indexOf("${wehagoSession.admin_id}") > -1) {
            isValidPassword = false;
            tooltipTitle = titles['error'];
            tooltipContent = "개인정보(휴대전화번호, ID)를 포함할 수 없습니다.";
        } else if (admin_password.search(regex['success']) == 0 && admin_password.length >= 8 && admin_password.length <= 16) {
            isValidPassword = false;
            if (isSafe(admin_password)) {
                isValidPassword = true;
            } else {
                tooltipTitle = titles['error'];
                tooltipContent = "영문 대/소문자, 숫자, 특수문자 중 2가지 조합으로 10~16자 또는 영문 대/소문자, 숫자, 특수문자 중 3가지 조합으로 8~16자의 비밀번호를 입력해주세요.";
            }
        } else {
            isValidPassword = false;
            tooltipTitle = titles['error'];
            tooltipContent = "사용할 수 없는 문자열을 입력하셨습니다.";
        }
    } else {
        isValidPassword = false;
        tooltipTitle = titles['error'];
        tooltipContent = "비밀번호를 입력해주세요.";
    }

    if(!isValidPassword) {
        DcloudToast.alert(tooltipContent);
    }

    return isValidPassword;
}

function isSafe(password) {
    var pattern = {
        capital: /[A-Z]/,
        small: /[a-z]/,
        number: /[0-9]/,
        special: /[!"#$%'()*,-./:<=>?@\[\\\]^_`{|}~]/,
    };
    var trueCount = 0;

    if (password.search(pattern['capital']) >= 0) trueCount++;
    if (password.search(pattern['small']) >= 0) trueCount++;
    if (password.search(pattern['number']) >= 0) trueCount++;
    if (password.search(pattern['special']) >= 0) trueCount++;
    return (trueCount >= 2 && password.length >= 10) || (trueCount >= 3 && password.length >= 8);
};



function checkNull(str){
	//str = Trim(str);
	if( typeof  str == "undefined" || str == null ||  str == "")  {
		return false;
	}
	return true;
}

function fixNull(str){
    
    if(typeof str == "undefined" || str == null || str == "")
        return "";
    else
        return str ;
}