$(function() {
	/**title**/
	$.ajax({
		url: path() + '/foreignHall/queryRecommendInfo.do',
		type: "post",
		dataType: "json",
		success: function(res) {
			var createdDate = new Date(res.createdDate).formatDate("yyyy-MM-dd");
			var html = "";
			html += '<img src="' + path() + '/common/download_photo.jsp?path=' + res.logo + '" />';
			html += '<div class="add-dimmer"></div><div class="carbonInfo-recommend">';
			html += '<div class="wrap-recommend"><h2><a href="">' + res.title + '</a></h2>';
			html += '<p>' + res.intro + '</p>';
			html += '<div class="recommend-user"><a href=""><i class="icon-user"></i>' + res.auth + '</a>';
			html += '<span><i class="icon-time"></i>' + createdDate + '</span>';
			html += '<span><i class="icon-watch"></i>' + res.focusOn + '次</span></div></div></div>';

			$("#carbonInfoTitle").append(html);
		}
	});
	/***列表表头分类**/
	var cateid = getQueryString("cateid"); //获取当前id
	$.ajax({
		url: path() + "/foreignMenu/getCategoryList.do?parentId=05a5c5fb3a4045d4a4aca08ff1b23857&cateLevle=2",
		//url: path() + "/0.json",
		type: 'post',
		dataType: 'json',
		success: function(res) {
			var html = ""
			for (var i = 0; i < res.length; i++) {
				var value = res[i];
				html += '<li class="tab-item" attr-id="' + value.id + '">';
				html += '<a href="carbonInfoList.html?cateid=' + value.id + '">' + value.name + '</a>';
				html += '<div class="wrap-list-sort"><div class="list-sort">';
				html += ' <span class="sort-item active-item" onclick="sortData(this)" attr-id="' + value.id + '">全部</span>'
				for (var n = 0; n < value.parent.length; n++) {
					html += '<span class="sort-item" onclick="sortData(this)" attr-id="' + value.parent[n].id + '">' + value.parent[n].name + '</span>';
				}
				html += '</div></div></li>';

			}
			$("#carbonInfoTab").append(html);
			var _tabItem = $("#carbonInfoTab").find(".tab-item");
			_tabItem.each(function() {
				if ($(this).attr("attr-id") == cateid) {
					$(this).addClass("active-item");
				}
			})

		}
	});
	/**列表数据*/
	$.ajax({
		url: path() + "/foreignHall/getHallList.do",
		type: "get",
		dataType: "json",
		data: {
			page: "1",
			pageSize: "10",
			cateid: cateid
		},
		success: function(res) {
			dataTogether(res)
		}
	})
});

/**分组数据*/
function sortData(obj) {
	$("#carbonInfo-recommed0").html('');
	$(obj).addClass("active-item");
	$(obj).siblings().removeClass("active-item");
	$.ajax({
		url: path() + "/foreignHall/getHallList.do",
		type: "get",
		dataType: "json",
		data: {
			page: "1",
			pageSize: "10",
			cateid: $(obj).attr("attr-id")
		},
		success: function(res) {
			dataTogether(res)
		}
	})
}
/**数据拼凑**/
function dataTogether(res) {
	var html = '';
	for (var i = 0; i < res.rows.length; i++) {
		var value = res.rows[i];
		html += '<li class="list-item"><h5><span class="icon-mark">' + value.cateName + '</span><a href="carbonInfoDetails.html' + value.address + '">' + value.title + '</a></h5>';
		html += '<div class="info-user"><a href=""><i class="icon-user"></i>' + value.auth + '</a>';
		html += '<span><i class="icon-time"></i>' + value.issueTime + '</span>';
		html += '<span><i class="icon-watch"></i>' + value.focusOn + '次</span></div></li>';
	}
	$("#carbonInfo-recommed0").append(html);
}