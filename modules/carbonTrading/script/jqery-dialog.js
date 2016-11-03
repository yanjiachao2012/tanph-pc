var dialog = function(w) {
		this.w = w;
		this.open = function() {
			var ht = $(".myModal-title").html();
			if (ht != null) {
				$(w.id).fadeIn();
				$("#myModal-mask").fadeIn();
			} else {
				loading(this.w);
			}
		};
		this.close = function() {
			$("#" + this.w.id).fadeOut();
			$("#myModal-mask").fadeOut();
		}
		return this;
	}
	/***请求数据**/
function loading(w) {
	$.ajax({
		type: "get", //提交方式
		url: w.url, //提交的页面/方法名
		data: w.params, //参数（如果没有参数：null）
		dataType: "html", //类型
		beforeSend: function(XMLHttpRequest) {
			//正在查询...;
		},
		success: function(result) {
			if (w.mask) {
				$(w.id).before('<div class="myModal-mask" id="myModal-mask"></div>');
			}
			var html = '<div class="myModal">';
			html += '	<div class="myModal-title">';
			html += w.title == null ? '' : w.title;
			html += '		<i class="icon-close" onclick="winter.dialog().close();"></i>';
			html += '	</div>';
			html += '	<div>';
			//

			var REG_BODY = /<body[\S\s]*?<\/body>/;
			html += REG_BODY.exec(result);
			//
			html += '	</div>';
			html += '</div>';
			$(w.id).html(html).fadeIn();
			$("#myModal-mask").fadeIn();
		}
	});
}