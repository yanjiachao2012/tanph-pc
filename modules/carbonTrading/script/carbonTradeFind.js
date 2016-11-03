$(function() {
	obtainSort(this, null, 'createDate')
		//我要寻集
	$("#applyBtn").on("click", function() {
			var userName = $("#userName").val(),
				findNumber = $("#findNumber").val(),
				userObject = $("#userObject").val(),
				findUse = $("#findUse").val(),
				findTitle = $("#findTitle").val();
			if (userName == "") {
				alert("碳友昵称不能为空")
				return false;
			}
			if (findTitle == "") {
				alert("寻集标题不能为空")
				return false;
			}
			if (findNumber == "") {
				alert("寻集碳币数不能为空")
				return false;
			}
			if (userObject == "") {
				alert("寻集对象不能为空")
				return false;
			}
			if (findUse == "") {
				alert("用途不能为空")
				return false;
			}
			$.ajax({
				type: 'post',
				url: path() + "/foreignTrading/findenough.do",
				dataType: 'json',
				data: {
					userName: userName,
					tradingNum: findNumber,
					tradingClass: userObject,
					memo: findUse,
					message: findTitle
				},
				success: function(res) {
					if (res.success) {
						$("#myModal").fadeOut();

					} else {
						alert(res.message);
					}

				}

			})
		})
		//我要赠送
	$("#applyBtn1").on("click", function() {
		var SendCarbon = $("#SendCarbon").val(),
			SendCarbon = $("#SendCarbon").val();
		if (SendCarbon == "") {
			alert("赠送碳币数不能为空")
			return false;
		}
		$.ajax({
			type: 'post',
			url: path() + "/foreignTrading/findenough.do",
			dataType: 'json',
			data: {
				giveCoinCount: SendCarbon
			},
			success: function(res) {
				if (res.success) {
					$("#myModal").fadeOut();
				} else {
					alert(res.message);
				}

			}

		})

	})
});


function obtainItem(obj, argShow, argHidden) {
	var _text = $(obj).text();
	$("#" + argShow).text(_text);
	$("#" + argHidden).val(_text);
	$(obj).parent().fadeOut();
}

function showDropdown(target) {
	$("#" + target).fadeIn();
}

function openModal(obj) {
	$("#" + obj).fadeIn();
}

function closeModal(obj) {
	$("#" + obj).fadeOut();
}

function obtainSort(obj, target, rank) {
	$(obj).parent().fadeOut();
	$("#" + target).text($(obj).text())
	var page1 = getQueryString('page');
	if (!page1) {
		page1 = 1;
	}
	var cateId = getQueryString("cateid");
	$.ajax({
		type: "post",
		url: path() + "/foreignTrading/getCo2TradingList.do",
		dataType: "json",
		data: {
			page: page1,
			pageSize: "10",
			cateid: cateId,
			sortType: rank
		},
		success: function(res) {
			var html = '';
			for (var i = 0; i < res.rows.length; i++) {
				var value = res.rows[i];
				html += '<li class="item item-find"><div class="item-right"><a href="JavaScript:openModalSend();">去赠送/交易</a></div>';
				html += '<div class="item-left"><div class="left-pic"><div class="wrap-pic">';
				html += '<img src="' + path() + '/common/download_photo.jsp?path=' + value.logo + '" /></div>';
				html += '<p class="name"><a href="' + value.address + '">' + value.userName + '</a></p></div>';
				html += '<div class="left-content"><h5>' + value.message + '</h5>';
				html += '<div class="content-info"><span class="info">认购碳币数：<b>' + value.countNum + '</b></span>';
				html += '<span class="info">认购对象：<b>' + value.tradingClass + '</b></span>';
				html += '<span class="info">认购用途：<b>' + value.subscribe + '</b></span>';
				html += '<span class="info">已得碳币：<b>' + value.obtainCarbon + '</b></span></div>';
				if (value.issueTime == 0) {
					html += '<div class ="item-info"><span class="item-time"><i class="icon-time"></i>刚刚发布</span>';
				} else if (value.issueTime > 0 && value.issueTime < 24) {
					html += '<div class ="item-info"><span class="item-time"><i class="icon-time"></i>' + value.issueTime + '小时之前</span>';
				} else {
					html += '<div class ="item-info"><span class="item-time"><i class="icon-time"></i>' + value.issueTime + '</span>';
				}

				html += '</div> </div> </div> </li>';

			}
			$("#carbonTradeFind-list").html(html);
			var page = Math.ceil(res.count / 10);
			sortPage(res.count, page, cateId, "carbonTradeFind")

			function sortPage(totalRecord, page, cid, linkAddress) {
				var totalPage = page;
				var totalRecords = totalRecord;
				var pageNo = getQueryString('page');
				if (!pageNo) {
					pageNo = 1;
				}
				//生成分页
				//有些参数是可选的，比如lang，若不传有默认值
				kkpager.generPageHtml({
					pno: pageNo,
					//总页码
					total: totalPage,
					//总数据条数
					totalRecords: totalRecords,
					//链接前部
					hrefFormer: linkAddress,
					//链接尾部
					hrefLatter: '.html?cateid=' + cid,
					getLink: function(n) {
						return this.hrefFormer + this.hrefLatter + "&page=" + n;
					},
					lang: {
						firstPageText: ' ',
						firstPageTipText: '首页',
						lastPageText: ' ',
						lastPageTipText: '尾页',
						prePageText: ' ',
						prePageTipText: '上一页',
						nextPageText: ' ',
						nextPageTipText: '下一页'
					}
				});
			}
		}
	});
}