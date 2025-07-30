var webSta_refer = document.referrer;
webSta_refer = webSta_refer.replace(new RegExp("&","gm"),"*rums*");
webSta_refer = encodeURI(webSta_refer);
webSta_refer = encodeURI(webSta_refer);
var webSta_rums = $("#webSta_rums").attr("data");
var url = $("#webSta_rums").attr("url");
if(typeof(url)=="undefined"){
	url = "/creatorCMS/statisticManage/count.page";
}
url += "?"+webSta_rums+"&referrer="+webSta_refer
$.getScript(url);
