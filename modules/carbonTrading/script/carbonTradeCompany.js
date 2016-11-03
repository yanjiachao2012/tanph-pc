$(function() {

	sortData(this, 'p.LAST_UPDATED_DATE')

});

function openModal() {
	winter.dialog({
		id: "#myModal",
		mask: true,
		title: "我要捐赠项目",
		url: "companyModal.html"
	});
}

function closeModal() {
	$("#myModal").fadeOut();
	$("#myModal-mask").fadeOut();
}
/**排序数据**/
function sortData(obj, rank) {
	var page1 = getQueryString('page');
	if (!page1) {
		page1 = 1;
	}
	var cateId = getQueryString("cateid");
	$.ajax({
		type: "get",
		url: path() + "/foreignTrading/getTradingList.do",
		data: {
			page: page1,
			pageSize: '10',
			sortType: rank,
			cateid: cateId
		},
		dataType: "json",
		success: function(res) {
			console.log(res.count)
			var html = "";
			for (var i = 0; i < res.rows.length; i++) {
				var value = res.rows[i];
				var createDate = new Date(value.createDate).formatDate("yyyy-MM-dd hh:mm");
				html += '<li class="item"><div class="item-right companyRight">';
				html += '<img src="' + path() + '/common/download_photo.jsp?path=' + value.logo + '" /></div>';
				html += '<div class="item-left"><h5><a href="carbonTradeDetail.html' + value.address + '">' + value.title + '</a></h5>';
				html += '<p class="item-details">' + value.memo + '</p>';
				html += '<div class="item-info">';
				html += '<span class="item-time"><i class="icon-time"></i>' + createDate + '</span>';
				html += '<span class="item-watch"><i class="icon-watch"></i>' + value.focusOn + '</span></div></div></li>';
			}
			$("#carbonTradeLists").html(html);
			var page = Math.ceil(res.count / 10);
			sortPage(res.count, page, cateId, 'carbonTradeCompany')

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
	$(obj).addClass("nowActive");
	$(obj).siblings().removeClass("nowActive");
}