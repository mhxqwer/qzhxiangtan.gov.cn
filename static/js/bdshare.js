// JavaScript Document
document.write('<div id="share" style="float:right;margin-top:5px;width:100%;display: inline;"><div class="bshare-custom" style="float:right;display: inline;white-space: nowrap;height:24px;"><a title="������Ѷ΢��" class="bshare-weixin"></a><a title="��������΢��" class="kc-share-btn" style="background: url(http:\/\/static.bshare.cn\/frame\/images\/logos\/s4\/sprite\/top_logos_sprite.png) no-repeat 0 -270px;display:inline-block;" id="wb"></a></div></div>');
document.write('<script type="text/javascript" charset="utf-8" src="http://static.bshare.cn/b/buttonLite.js#style=-1&amp;uuid=&amp;pophcol=2&amp;lang=zh"></script><script type="text/javascript" charset="utf-8" src="http://static.bshare.cn/b/bshareC0.js"></script>');
  

 
  


	  
(function() {
  //var share = $('#share');
  var title = encodeURIComponent(document.title);   //��ǰҳ��title
  var url = encodeURIComponent(window.location.href); //��ǰҳ���ַ
  var shareA = document.getElementById("wb");


      shareA.onclick=function(){
		window.open('http://service.weibo.com/share/share.php?url=' + url + "&title=" + title);
    }

 
})();