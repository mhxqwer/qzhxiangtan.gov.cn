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
   alert("�ղ�ʧ�ܣ���ʹ��Ctrl+D�����ղ�"); 
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
                            alert("�˲�����������ܾ���\n�����������ַ�����롰about:config�����س�\nȻ�� [signed.applets.codebase_principal_support]��ֵ����Ϊ'true',˫�����ɡ�");
                    }
                    var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                    prefs.setCharPref('browser.startup.homepage',vrl);
             }else{
                 alert("�����������֧�֣��밴�����沽�������1.����������á�2.���������ҳ��3.���룺"+vrl+"���ȷ����"); 
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
