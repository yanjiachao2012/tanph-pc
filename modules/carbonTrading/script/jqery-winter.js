 winter = {
 	/**
 	 * {mask: 是否遮盖,
 	 *	title: 标题,
 	 *	url: 地址,
 	 *	params： 参数，
 	 *	id：
 	 *  }
 	 */
 	dialog: function(w) {
 		var d = new dialog(w);
 		if (w != null) {
 			d.open();
 		}
 		return d;
 	},
 	ajax: function() {

 	}

 }