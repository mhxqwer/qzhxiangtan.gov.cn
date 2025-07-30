/*
 * WXA11Y.JS
 * version: 3.0.0 (2021/12/03)
 *
 * Copyright 2015,΢��Ƽ�-���,moaol@foxmail.com
 *����JS���ԣ�֧��վȺ��ʽ
 *id="WXA11Y"	JS�ļ�ID
 *c="/WXA11Y3.0/"	���ϰ�Ŀ¼
 *u="/hjs/wza/2017-04/13/content_26dfebb1614f4255b5cabe38d0b1635e.shtml"	����˵���ĵ���ַ
 *b="ID" ���ϰ������ť���������ͨ������ð�ť��������ʾ|����,Ĭ����ʾ
 *20180117����-���ҳ����û�����ϰ�������ť�����Զ�����
 *f=���ϰ���ť�ķ���left|right[Ĭ��]��
 *w=ҳ���ȣ�������
 *�����Ҫ����������������������Ҫ������DOM�ڵ�������wxa11ycont����
 */
window.require = function() {
    var doc = document,
        head = doc.getElementsByTagName("head")[0],
        jsNode = doc.getElementsByTagName("script"),
        stackFlag = 1,
        stackJSs = [],
        stackBacks = [],
        jsLoaded = {};

    function stackPush(urls, callBack, charset) {
        callBack && stackBacks.push(callBack);
        if (typeof urls == "string") {
            stackJSs.push([urls, stackShift, charset]);
        } else {
            for (var i = 0; i < urls.length; i += 1) {
                stackJSs.push([urls[i], stackShift, charset]);
            }
        }
        if (stackFlag == 0) {
            stackFlag = 1;
            stackShift();
        }
    }

    function stackShift() {
        if (stackJSs.length) {
            disorderJS.apply(null, stackJSs.shift());
        } else if (stackBacks.length) {
            stackBacks.pop()();
            stackShift();
        } else {
            stackFlag = 0;
        }
    }

    function loadJS(src, callBack, charset) {
        var url = src;
        if (jsLoaded[url]) {
            setTimeout(function() {
                callBack && callBack();
            });
            return;
        }
        var t = doc.createElement("script");
        t.setAttribute("type", "text/javascript");
        charset && t.setAttribute("charset", charset);
        t.onreadystatechange = t.onload = t.onerror = function() {
            if (!t.readyState || t.readyState == 'loaded' || t.readyState == 'complete') {
                t.onreadystatechange = t.onload = t.onerror = null;
                t = null;
                jsLoaded[url] = true;
                setTimeout(function() {
                    callBack(src);
                }, 200);
            }
        };
        t.src = url;
        head.appendChild(t);
    }

    function disorderJS(urls, callBack, charset) {
        if (typeof urls == "string") {
            loadJS(urls, function() {
                callBack && callBack();
            }, charset);
            return require;
        }
        var led = {};

        function loadBack(src) {
            delete led[src];
            for (var n in led) {
                return;
            }
            callBack && callBack();
        }
        for (var i = 0; i < urls.length; i += 1) {
            led[urls[i]] = true;
            loadJS(urls[i], loadBack, charset);
        }
        return require;
    }

    function ready() {
        stackFlag = 0;
        stackShift();
    }

    function readyExe() {
        Array.prototype.shift.call(arguments).apply(window, arguments);
        return require;
    }
    if (doc.attachEvent) {
        doc.attachEvent("onreadystatechange", function() {
            if (doc.readyState == "complete" || doc.readyState == "loaded") {
                ready();
            }
        });
    } else {
        doc.addEventListener("DOMContentLoaded", ready, false);
    }

    function require() {
        var initFiles = [];
        var l = arguments.length;
        var jnum = 0;
        if (!(typeof(jQuery) == "undefined")) {
            jnum = 1;
        }
        for (var j = jnum; j < l; j++) {
            for (var i = 0; i < jsNode.length; i++) {
                if (jsNode[i].src.indexOf(arguments[j]) >= 0) {
                    break;
                }
                if (i == jsNode.length - 1) {
                    initFiles.push(arguments[j]);
                }
            }
        }
        var ls = initFiles.length;
        if (ls == 1 && typeof initFiles[ls] == "function") {
            stackPush(Array.prototype.slice.call(initFiles, 0, ls), initFiles[ls]);
            return;
        }
        ls -= 1;
        if (initFiles[ls] == null || typeof initFiles[ls]) {
            stackPush(Array.prototype.slice.call(initFiles, 0, ls), initFiles[ls], initFiles[ls + 1]);
            return require;
        }
        stackPush(Array.prototype.slice.call(initFiles));
        return;
    };
    require.version = "3.0.0";
    require.bale = function() {
        var callBack = Array.prototype.pop.call(arguments);

        function back() {
            len -= 1;
            len == 0 && setTimeout(function() {
                callBack.apply(ex, bs);
            });
        }
        var len = arguments.length,
            ex = {}, bs = [];
        for (var i = 0; i < arguments.length; i += 1) {
            bs[i] = arguments[i](back, ex);
        }
        return require;
    };
    require.appendCSS = function(filename, isframe) {
        var fileref = doc.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
        if (typeof fileref != "undefined") head.appendChild(fileref);
    };
    require.getMsec = function(str) {
        var timeNum = str.substring(0, str.length - 1) * 1;
        var timeStr = str.substring(str.length - 1, str.length);
        if (timeStr == "s") {
            return timeNum * 1000;
        } else if (timeStr == "h") {
            return timeNum * 60 * 60 * 1000;
        } else if (timeStr == "d") {
            return timeNum * 24 * 60 * 60 * 1000;
        }
    };
    require.setCookie = function(name, value, time) {
        var msec = this.getMsec(time);
        var exp = new Date();
        exp.setTime(exp.getTime() + msec * 1);
        document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString();
    };
    require.getCookie = function(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return unescape(arr[2]);
        } else {
            return null;
        }
    };
    require.bodyPT = function(h) {
        $(doc).find("body:first").animate({
            "paddingTop": h + "px"
        },"fast");
    };
    require.initA11y = function(b) {
        var _b = $(b);
		if(require.isoldmod){
			require.quitoldmode(2);
		}else{
			require.quitoldmode(1);
		}
		if (_b.is(':hidden')) {
			require.bodyPT(_b.outerHeight() - 6);
		} else {
		    require.reset();
		    require.bodyPT(0);
		}
		_b.slideToggle("fast");
		
		if($("#a11ybody").length<1){
			var wxwzaA11ybody = document.createElement("div");
			wxwzaA11ybody.setAttribute("id","a11ybody");
			wxwzaA11ybody.setAttribute("role","WXWZA");
			document.body.append(wxwzaA11ybody);
			var wxwzaBodyChilds = document.body.children;
			var appArr = [];
			for(var i=0;i<wxwzaBodyChilds.length;i++){
				if(!/SCRIPT/.test(wxwzaBodyChilds[i].tagName) && wxwzaBodyChilds[i].getAttribute("role")!="WXWZA"){
					//appArr.push(i);
					wxwzaA11ybody.append(wxwzaBodyChilds[i]);
					i--;
				}
			}
		}
    };
	require.quitoldmode = function(num){
			var $oldbtn = $("#tool-oldmode");
			if(num==1 && $oldbtn.hasClass("active")){
				$oldbtn.trigger("click");
			}else if(num==2 && !$oldbtn.hasClass("active")){
				$oldbtn.trigger("click");
			}
	};
	require.timeoutfun = function(d,e,t){
		setTimeout('$(function(){$("#"+"'+d+'").trigger("'+e+'")})',t);
	};
	require.reset = function(){
		$(".a11ytoolbar .active").not($(".fun-normalmode")).each(function() {
			$(this).trigger("click");
		});
		//�����ʽ��ԭ
		$("#mousestyle").remove();
		//ҳ��Ŵ�ԭ
		$("#a11ybody").removeAttr("class");
		$("#a11ybody").removeAttr("style");
		//���ٻ�ԭ
		$("#tts-speed").attr("speed",5);
	};
	require.isoldmod = false;
	require.cookieName = "cssstyle";
	require.quitBtn = null;
	require.isinited = false;
	require.WXA11yOpen;
	var _J = document.getElementById("WXA11Y"),
		charset = document.characterSet.match(/UTF/),
		hostname = location.host;
		if(charset){
			charset = "UTF8";
		}else{
			charset = "GBK";
		}
	require.path="https://tts.wxzwb.com/WXA11y3.0/"+charset+"/";
	//require.path="/WXA11y3.0/"+charset+"/";
	require(require.path + "jquery.js", require.path + "soundmanager2-nodebug-jsmin.js",require.path+hostname+".selectorConfig.js", require.path + "WXA11yPinyin.js", require.path + "WXA11y.js",function() {
		require.bale(function() {
			require.appendCSS(require.path + "WXA11y.css");
			var _doc = document,
				helpURL = _J.getAttribute("u"),
				helpStr="",
				toggleBtn = _J.getAttribute("b"),
				_enter = _J.getAttribute("e"),
				_quit = _J.getAttribute("q");
				
				if(helpURL){
					helpStr = helpURL;
				}
				var toolHTML = '<div class="WXA11Y" id="WXA11Y"><a title="ҳ������" class="fun" id="tool-reload" href="javascript:;" target="_self"></a><span class="wx-space"></span><a title="����ģʽ" class="fun fun-oldmode" id="tool-oldmode" href="javascript:;" target="_self" readTxt=""></a><span class="wx-space"></span><a id="oldmodbox"></a><a title="������" class="fun fun-oldmode" id="tool-line" href="javascript:;" target="_self"></a><a title="�����ʽ" class="fun fun-oldmode" id="tool-mousestyle" href="javascript:;" target="_self"></a><a title="������ʾ��" class="fun fun-oldmode" id="tool-screen" href="javascript:;" target="_self"></a><a title="�߶Աȶ�" class="fun fun-oldmode" id="tool-contrast" num="0" href="javascript:;" target="_self"></a><span class="wx-space"></span><a title="ҳ��Ŵ�" class="fun" id="page-zoomin" href="javascript:;" target="_self"></a><a title="ҳ����С" class="fun" id="page-zoomout" href="javascript:;" target="_self"></a><span class="wx-space"></span><a title="����ָ��" class="fun fun-normalmode" id="tts-single" href="javascript:;" target="_self"></a><a title="��������" class="fun" id="tts-screenread" href="javascript:;" target="_self"></a><a title="���ٵ���" class="fun" id="tts-speed" href="javascript:;" target="_self" speed="5"></a><span class="wx-space"></span><a title="���ϰ�����˵��" class="fun" id="WXA11y-help" target="_blank" href="'+helpStr+'"></a><a title="�ر����ϰ����" class="fun" id="WX-easyRead-Smooth" href="javascript:;" target="_self"></a></div>',
				// displayHTML = '<span aria-hidden="true" title="�ر���ʾ��">X</span><center></center>',
				easyReadBtn = document.createElement("div");
				// wxwzadisplay = document.createElement("div");
				easyReadBtn.className = 'a11ytoolbar';
				easyReadBtn.innerHTML = toolHTML;
				easyReadBtn.setAttribute("role","WXWZA");
			// wxwzadisplay.setAttribute("id", "wxwzadisplay");
			// wxwzadisplay.innerHTML = displayHTML;
			// wxwzadisplay.style.display = "none";
			//�����ж��Ƿ�����ģʽ��cookie
			require.cookieName = _J.getAttribute("i");
			if(require.cookieName && require.cookieName!=""){
				//1����ģʽ��2����ģʽ
				if(require.getCookie(require.cookieName)=="2"){
					require.isoldmod = true;
				}
			}
			//��λĬ�����ϰ����
			require.WXA11yOpen = $("iframe[src$='top.html']").contents().find("#" + toggleBtn);
			if (require.WXA11yOpen.length < 1) {
				require.WXA11yOpen = $("#" + toggleBtn);
			}
			if(_enter){
				easyReadBtn.style.display = 'none';
				$("#"+_enter).on("click", function(e) {
					require.isoldmod = true;
					//������Ϊ��״̬��ֱ�ӵ��������ģʽ����ť
					if($(".a11ytoolbar").is(":hidden")){
						require.initA11y(easyReadBtn);
					}else{
						require.quitoldmode(2);
					}
					e.stopPropagation;
				});
			}
			if (require.WXA11yOpen.length < 1) {
				require.WXA11yOpen = _doc.createElement("a");
				require.WXA11yOpen.setAttribute("class", "toggleBtn");
				_doc.body.appendChild(require.WXA11yOpen)
				require.WXA11yOpen = $(require.WXA11yOpen);
				var _f = _J.getAttribute("f") || "right",
					_w = _J.getAttribute("w") || 1300,
					_py = 60;
				if (_f == "left") {
					_f = -1;
				} else {
					_f = 1;
					_py = -30;
				}
				require.WXA11yOpen.css({
					"marginLeft": (_w / 2 + _py) * _f + "px"
				});
			}
			if (require.WXA11yOpen) {
				easyReadBtn.style.display = 'none';
			} else {
				require.initA11y(easyReadBtn);
			}
			require.WXA11yOpen.on("click", function(e) {
				require.initA11y(easyReadBtn);
				if(require.isoldmod || $("#tool-oldmode").hasClass("active")){
					$("#tool-oldmode").trigger("click");
				}
				if($("#tool-screen").hasClass("active"))
				{
					$("#tool-screen").trigger("click");
				}
				e.stopPropagation;
			});
			//������˳�����ģʽ��ť����Ӧ���¼�
			if(_quit && _quit!="")
			{
				require.quitBtn = $("#"+_quit);
				require.quitBtn.on("click", function(e) {
					require.reset();
					require.isoldmod = false;
					require.initA11y(easyReadBtn);
					e.stopPropagation;
				});
			}
			_doc.body.appendChild(easyReadBtn);
			//_doc.body.appendChild(wxwzadisplay);
			
		}, function() {
	
		}, function() {
			//�������������ť ��Ҫ������ҳ�������� wxa11ycont ����
			function hastext($WXCont,textLen){
				var back=true;
				$WXCont.find("img").each(function(){
					if($.trim($(this).attr("alt")).length>textLen){
						back = true;
						return false;
					}else{
						back = false;
					}
				})
				return back;
			}
			$WXCont = $("[wxa11ycont]"),textLen = 5;
			if($WXCont.length>0 && ($.trim($WXCont.text()).length>textLen || hastext($WXCont,textLen))){
				$WXCont.prepend($('<div class="voiceTip"><i class="stoped"></i></div>'));
				//������ɳ���󣬽��м��Ϊ�û������׼��
				//setTimeout('$(".voiceTip").trigger("click")', 3000);
			}
		}, function() {
			//��������ģʽ
			
		});
	})
	
    return require;
}();