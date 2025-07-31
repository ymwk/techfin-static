/**
 * Custom Page Navigator
 * 2011.07.18 신승현
 * jqgrid 의 pager를 사용하지않고 사용자 지정 pager 생성
 * jqgrid 에서만 사용 가능
 * @param options - navigatorName : Navigator 이름
 * 					gridName : grid 이름
 * 					pages : 페이지 갯수
 */
;(function($) {
	
	jQuery.dcloudPageNavigator = function (options) {
		
		var defaults = {
			navigatorName: 'divPageNavigator',
			currPage: 1,
			totCnt: 10,
			rowOfPage: 10,
			pages: 10,
			billCustom: false
		};
		
		if (options) {options = $.extend(defaults, options);}
		
		
		var navigatorId = "#" + options.navigatorName;

		var currPage = options.currPage;
		var totCnt = options.totCnt;
		var rowOfPage = options.rowOfPage;	//10
		var billCustom = options.billCustom;

		if(!currPage || currPage == "")
			currPage = 1;
		
		var fromPage = 0; 
		var toPage = 0;
		var pages = options['pages'];	//5 보여질 페이지 번호 갯수
		var html = '<div class="common_new_pagination"><div class="pagein">';

		var totPage = Math.floor(totCnt / rowOfPage);

		if (totCnt % rowOfPage > 0){
			totPage = totPage + 1;		//토탈 카운트
		}

		if (currPage <= pages){
			fromPage = 1;

			if ((fromPage + (pages-1)) <= totPage){
				toPage = fromPage + (pages-1);
			} else {
				toPage = totPage;
			}
		} else {
			if (currPage % pages == 0){
				fromPage = ((currPage / pages) - 1) * pages + 1;
			} else {
				var temp = Math.floor(currPage / pages);
				fromPage = temp * pages+1;
			}

			if ((fromPage + (pages-1)) <= totPage){
				toPage = fromPage + (pages-1);
			} else {
				toPage = totPage;
			}
		}
		
		//처음 페이지
//		if (1 < currPage){
//			html += "<a class='direction1' id='" + 1 + "' navid='start' style='cursor:pointer;'><img id='" + 1 + "' navid='start' src='/images/common/btn_page_first.gif' alt='first' /></a>";
//		}

		//이전페이지
		if (fromPage <= pages){

		} else {
			if(billCustom){
				// html += "<a class='direction1' id='" + 1 + "' navid='start' style='cursor:pointer;'><img id='" + 1 + "' navid='start' src='/images/common/btn_page_first.gif' alt='first' /></a>";
                html += "<button type='button' navid='start' class='btn btn2 btn_prev' id='" + 1 + "'><span class='blindItem' style='background-position:-46px -94px;'>첫번째페이지</span></button>";
                html += "<button type='button' navid='prev' class='btn btn_prev' id='" + (fromPage - 1) + "'><span class='blindItem' style='background-position:-46px -69px;'>이전페이지</span></button>";
			} else {
                html += "<button type='button' navid='prev' class='btn btn_prev' id='" + (fromPage - 1) + "'><span class='blindItem'>이전페이지</span></button>";
			}
		}

		//클릭페이지
		for (i = fromPage; i <= toPage; i++){
			if (currPage == i){
                html += "<strong id='" + i + "' class='num on'>" + String(i).padStart(2, '0') + "</strong> ";
			} else {
                html += "<a id='" + i + "' class='num'>" + String(i).padStart(2, '0') + "</a> ";
			}
		}
		
		//다음페이지
		if (totPage > toPage && totPage-fromPage >= pages ){
			if(billCustom){
                html += "<button type='button' navid='next' class='btn btn_next' id='" + (toPage + 1) + "'><span class='blindItem'>다음페이지</span></button>";
                html += "<button type='button' navid='end' class='btn btn2 btn_next' id='" + totPage + "'><span class='blindItem'>마지막페이지</span></button>";
			} else {
                // html += "<button type='button' navid='next' class='btn btn_next'><span class='sp_lux' id='" + (toPage + 1) + "'>다음페이지</span></button>";
                html += "<button type='button' navid='next' class='btn btn_next' id='" + (toPage + 1) + "'><span class='blindItem'>다음페이지</span></button>";
			}
		}
		
		//마지막 페이지
//		if (totPage > currPage){
//			html += "<a class='direction1' id='" + totPage + "' navid='end' style='cursor:pointer;'><img id='" + totPage + "' navid='end' src='/images/common/btn_page_end.gif' alt='last' /></a>";
//		}
		
		html += "</div></div>";
		$(navigatorId).html(html);
		
		//페이지 네비게이터에 style 적용하기
	    
	    //$(navigatorId).attr("style", "width:100%;text-align:center;padding-top:5px;font-size:14px;");
	    
	    
	};

})(jQuery);