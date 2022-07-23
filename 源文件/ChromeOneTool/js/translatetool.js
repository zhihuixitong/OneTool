function searchTranslate(info) {

	// console.log(info);
	var translateStr = info.selectionText;
	var appid = '20181027000226165';
	var key = 'IRVVcnfkT2h1O96WzVOu';
	var salt = (new Date).getTime();
	var query = translateStr;
	// 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
	var from = 'en';
	var to = 'zh';

	//验证是否是中文
	var pattern = new RegExp("[\u4E00-\u9FA5]+");
	if (pattern.test(translateStr)) {
		from = 'zh';
		to = 'en';
	}
	//验证是否是英文
	var pattern2 = new RegExp("[A-Za-z]+");
	if (pattern2.test(translateStr)) {
		from = 'en';
		to = 'zh';
	}
	//验证是否是数字
	var pattern3 = new RegExp("[0-9]+");
	if (pattern3.test(translateStr)) {
		from = 'zh';
		to = 'en';
	}

	var str1 = appid + query + salt + key;
	var sign = MD5(str1);


	$.ajax({
		url: 'https://api.fanyi.baidu.com/api/trans/vip/translate',
		type: 'get',
		dataType: 'jsonp',
		data: {
			q: query,
			appid: appid,
			salt: salt,
			from: from,
			to: to,
			sign: sign
		},
		success: function(data, status) {
			console.log(data);

			if (status == "success" && data.trans_result != null) {

				var translateToStr = "";
				for (var i = 0; i < data.trans_result.length; i++) {
					translateToStr = translateToStr + (data.from == "en" ? "英文" : "中文") + "：" + data
						.trans_result[i]
						.src + "\n" + (data.to == "en" ? "英文" : "中文") + "：" + data
						.trans_result[i].dst + "\n";
				}
				alert("翻译结果\n\n" + translateToStr + "\n\n状态: " + status);
			} else {
				alert("翻译结果\n\n" + "数据: " + JSON.stringify(data) + "\n\n状态: " + status);
			}
		}
	});



}
try{
chrome.contextMenus.create({
	title: "百度翻译:'%s'",
	contexts: ["selection"],
	onclick: searchTranslate
});	
}catch(e){
	//TODO handle the exception
}


