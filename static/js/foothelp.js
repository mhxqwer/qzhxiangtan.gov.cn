function bookmark(){
 var title=document.title
 var url=document.location.href
 if (window.sidebar) window.sidebar.addPanel(title, url,"");
 else if( window.opera && window.print ){
 var mbm = document.createElement('a');
 mbm.setAttribute('rel','sidebar');
 mbm.setAttribute('href',url);
 mbm.setAttribute('title',title);
 mbm.click();}
 else if( document.all ) {window.external.AddFavorite( url, title);}
 else{
   alert("收藏失败！请使用Ctrl+D进行收藏"); 
 }

}
function SetHome(obj,vrl){
    try{
            obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);
    }
    catch(e){
            if(window.netscape) {
                    try {
                            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                    }
                    catch (e) {
                            alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
                    }
                    var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                    prefs.setCharPref('browser.startup.homepage',vrl);
             }else{
                 alert("您的浏览器不支持，请按照下面步骤操作：1.打开浏览器设置。2.点击设置网页。3.输入："+vrl+"点击确定。"); 
             }              
    }
}

$(function () {


    $('.nav-toggle').click(function () {
        $('body').toggleClass('nav-open');
    });

    
    $('.navbar-soso').click(function () {
        if ($('.ip-top-search ').css('display') == 'none') {
            $('.ip-top-search ').slideDown()
        } else {
            $('.ip-top-search ').hide()
        }
    });

})
