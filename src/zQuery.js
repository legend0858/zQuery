/**
 * Created with JetBrains WebStorm.
 * User: littlebug
 * Date: 2013-7-29
 * Time: 下午4:23
 * To change this template use File | Settings | File Templates.
 */

function $(arg) {
    return new zQuery(arg);
}

//构造函数
function zQuery(arg) {
    this.elements = [];
    this.str = "";

    switch(typeof arg) {
        case "function":
            addReady(arg);
            break;
        case "string":
            if(arg.indexOf("<") != -1) {
                this.str = arg;
            }
            else {
                this.elements = select(document,arg);
            }
            break;
        case "object":
            if(arg instanceof Array) {
                this.elements = arg;
            }
            else {
                this.elements.push(arg);
            }
            break;
    }
    this.length = this.elements.length;
}

//核心操作
zQuery.prototype.get = function (num) {
    return this.elements[num];
}

zQuery.prototype.size = function () {
    return this.elements.length;
}

zQuery.prototype.each = function (fn) {
    for(var i=0; i<this.elements.length; i++) {
        fn.call(this.elements[i],i,this.elements[i]);
    }
    return $(this.elements);
}

zQuery.prototype.index = function () {
    var _this = this.elements[0];
    var children = _this.parentNode.children;
    var siblings = [];
    for(var i=0; i<children.length; i++) {
        if(children[i].nodeType == 1) {
            siblings.push(children[i]);
        }
    }
    for(var i=0; i<siblings.length; i++) {
        if(siblings[i] == _this) {
            return i;
        }
    }
}

//class相关
zQuery.prototype.addClass = function (sClass) {
    for(var i=0; i<this.elements.length; i++) {
        addClass(this.elements[i],sClass);

    }
    return $(this.elements);
}

zQuery.prototype.removeClass = function (sClass) {
    for(var i=0; i<this.elements.length; i++) {
        removeClass(this.elements[i],sClass);
    }
    return $(this.elements);
}

zQuery.prototype.hasClass = function (sClass) {
    var _this = this.elements[0];
    return hasClass(_this,sClass);
}

//html与text
zQuery.prototype.html = function(html) {
	if(html) {
		for(var i=0; i<this.elements.length; i++) {
			this.elements[i].innerHTML = html;
		}
		return $(this.elements);	
	}
	else {
		var _this = this.elements[0];
		return _this.innerHTML;
	}    
}

zQuery.prototype.text = function(text) {
	if(text) {
		if(this.elements[0].textContent) {
			for(var i=0; i<this.elements.length; i++) {
				this.elements[i].textContent = text;
			}
		}
		else {
			for(var i=0; i<this.elements.length; i++) {
				this.elements[i].innerText = text;
			}
		}
		return $(this.elements);	
	}
    else {
		var _this = this.elements[0];
		if(_this.textContent) {
			return _this.textContent;
		}
		else {
			return _this.innerText;
		}	
	}
}

//属性与样式的getter与setter
zQuery.prototype.css = function (arg) {
    //1.一个参数
    //类型：字符串
    //      get 值 css("width")
    //类型：json
    //      set 值 css({"width":100,"height":100})

    //2.两个参数 set值
    if(arguments.length==2) {
         for(var i=0; i<this.elements.length; i++) {    //两个参数，string，设置CSS样式
             var name = arguments[0];
             if(/\w+\-\w+/.test(name)) {
                 name = name.toLowerCase().replace(/\-\w/g,function (str) {
                     return str.charAt(1).toUpperCase();
                 })
             }
             this.elements[i].style[name] = arguments[1];
         }
    }
    else {
        if(typeof arguments[0] == "string") {        //一个参数，string，读取CSS样式
            var name = arguments[0];
            if(/\w+\-\w+/.test(name)) {
                name = name.toLowerCase().replace(/\-\w/g,function (str) {
                    return str.charAt(1).toUpperCase();
                })
            }
            return getStyle(this.elements[0],name);
        }
        else if(typeof arguments[0] == "object") {  //一个参数，json，设置样式
            for(var i=0; i<this.elements.length; i++) {
                for(var name in arguments[0]) {
                    if(/\w+\-\w+/.test(name)) {
                        var trueName = name.toLowerCase().replace(/\-\w/g,function (str) {
                            return str.charAt(1).toUpperCase();
                        })
                    }
                    else {
                        var trueName = name;
                    }
                    this.elements[i].style[trueName] = arguments[0][name];
                }
            }
        }
    }
    return $(this.elements);
}

zQuery.prototype.attr = function (arg) {
    if(arguments.length==2) {
        for(var i=0; i<this.elements.length; i++) {    //两个参数，string，设置attr样式
            var name = arguments[0];
            this.elements[i][name] = arguments[1];
        }
    }
    else {
        if(typeof arguments[0] == "string") {          //一个参数，string，读取CSS样式
            var name = arguments[0];
            return this.elements[0].getAttribute(name);
        }
        else if(typeof arguments[0] == "object") {     //一个参数，json，设置样式
            for(var i=0; i<this.elements.length; i++) {
                for(var name in arguments[0]) {
                    this.elements[i][name] = arguments[0][name];
                }
            }

        }
    }
    return $(this.elements);
}

//CSS宽度与高度
zQuery.prototype.width = function () {
    var _this = this.elements[0];
    var width = _this.offsetWidth;
    var arr = [];
    arr[0] = parseInt(getStyle(_this,"paddingLeft"));
    arr[1] = parseInt(getStyle(_this,"paddingRight"));
    arr[2] = parseInt(getStyle(_this,"borderLeftWidth"));
    arr[3] = parseInt(getStyle(_this,"borderRightWidth"));

    for(var i=0; i<arr.length; i++) {
        if(arr[i]) {
            width -= arr[i];
        }
    }

    return width;
}

zQuery.prototype.innerWidth = function () {
    var _this = this.elements[0];
    var width = _this.offsetWidth;
    var arr = [];
    arr[0] = parseInt(getStyle(_this,"borderLeftWidth"));
    arr[1] = parseInt(getStyle(_this,"borderRightWidth"));

    for(var i=0; i<arr.length; i++) {
        if(arr[i]) {
            width -= arr[i];
        }
    }

    return width;
}

zQuery.prototype.outerWidth = function (bool) {
    var _this = this.elements[0];
    var width = _this.offsetWidth;

    if(bool) {
        var marginLeft = parseInt(getStyle(_this,"marginLeft"));
        var marginRight = parseInt(getStyle(_this,"marginRight"));
        if(marginLeft) {
            width = width + marginLeft;
        }
        if(marginRight)
            width = width + marginRight;
    }

    return width;
}

zQuery.prototype.height = function () {
    var _this = this.elements[0];
    var height = _this.offsetHeight;
    var arr = [];
    arr[0] = parseInt(getStyle(_this,"paddingTop"));
    arr[1] = parseInt(getStyle(_this,"paddingBottom"));
    arr[2] = parseInt(getStyle(_this,"borderTopWidth"));
    arr[3] = parseInt(getStyle(_this,"borderBottomWidth"));

    for(var i=0; i<arr.length; i++) {
        if(arr[i]) {
            height -= arr[i];
        }
    }

    return height;
}

zQuery.prototype.innerHeight = function () {
    var _this = this.elements[0];
    var height = _this.offsetHeight;
    var arr = [];
    arr[0] = parseInt(getStyle(_this,"borderTopWidth"));
    arr[1] = parseInt(getStyle(_this,"borderBottomWidth"));

    for(var i=0; i<arr.length; i++) {
        if(arr[i]) {
            height -= arr[i];
        }
    }

    return height;
}

zQuery.prototype.outerHeight = function (bool) {
    var _this = this.elements[0];
    var height = _this.offsetHeight;

    if(bool) {
        var marginTop = parseInt(getStyle(_this,"marginTop"));
        var marginBottom = parseInt(getStyle(_this,"marginBottom"));
        if(marginTop) {
            height = height + marginTop;
        }
        if(marginBottom)
            height = height + marginBottom;
    }

    return height;
}

//获取位置
zQuery.prototype.position = function () {
    var _this = this.elements[0];
    var left = _this.offsetLeft;
    var top = _this.offsetTop;
    return {"left":left,"top":top};
}

zQuery.prototype.offset = function () {
    var _this = this.elements[0];
    var left = 0,top = 0;
    while(_this) {
        left += _this.offsetLeft;
        top += _this.offsetTop;
        _this = _this.offsetParent;
    }
    return {"left":left,"top":top};
}

//事件相关
zQuery.prototype.bind = function (sEv,fn) {
    for(var i=0; i<this.elements.length; i++) {
        addEvent(this.elements[i],sEv,fn);
    }
    return $(this.elements);
}

zQuery.prototype.unbind = function (sEv,fn) {
    for(var i=0; i<this.elements.length; i++) {
        removeEvent(this.elements[i],sEv,fn);
    }
    return $(this.elements);
}

zQuery.prototype.click = function (fn) {
    for(var i=0; i<this.elements.length; i++) {
        addEvent(this.elements[i],"click",fn);
    }
    return $(this.elements);
}

zQuery.prototype.mouseenter = function(fn) {
    for(var i=0; i<this.elements.length; i++) {
        addEvent(this.elements[i],"mouseenter",fn);
    }
    return $(this.elements);
}

zQuery.prototype.mouseleave = function(fn) {
    for(var i=0; i<this.elements.length; i++) {
        addEvent(this.elements[i],"mouseleave",fn);
    }
    return $(this.elements);
}

zQuery.prototype.hover = function (fn1,fn2) {
    for(var i=0; i<this.elements.length; i++) {
        addEvent(this.elements[i],"mouseenter",fn1);
        addEvent(this.elements[i],"mouseleave",fn2);
    }
    return $(this.elements);
}

zQuery.prototype.toggle = function (arg) {}

//选元素
zQuery.prototype.eq = function (num) {
    if(num < 0) {
        return $(this.elements[this.elements.length + num]);
    }
    else {
        return $(this.elements[num]);
    }
}

zQuery.prototype.children = function () {
    var aResult = [];
    for(var i=0; i<this.elements.length; i++) {
        for(var j=0; j<this.elements[i].children.length; j++) {
            if(this.elements[i].children[j].nodeType == 1) {
                aResult.push(this.elements[i].children[j]);
            }
        }
    }
    return $(aResult);
}

zQuery.prototype.find = function (str) {
    var aResult = [];
    for(var i=0; i<this.elements.length; i++) {
        var arr = select(this.elements[i],str);
        aResult = aResult.concat(arr);
    }
    return $(aResult);
}

//DOM操作
zQuery.prototype.prev = function () {
    var aResult = [];

    function prevEle(obj) {
        if(obj.previousElementSibling) {
            return obj.previousElementSibling;
        }
        else {
            return obj.previousSibling;
        }
    }

    for(var i=0; i<this.elements.length; i++) {
        var obj = prevEle(this.elements[i]);
        if(obj) {
            aResult.push(obj);
        }
    }

    return $(aResult);
}

zQuery.prototype.next = function () {
    var aResult = [];

    function nextEle(obj) {
        if(obj.nextElementSibling) {
            return obj.nextElementSibling;
        }
        else {
            return obj.nextSibling;
        }
    }

    for(var i=0; i<this.elements.length; i++) {
        var obj = nextEle(this.elements[i]);
        if(obj) {
            aResult.push(obj);
        }
    }

    return $(aResult);
}

zQuery.prototype.appendTo = function (str) {            //暂时只能传字符串，相当于选择器
    var aParents = select(document,str);
    for(var i=0; i<aParents.length; i++) {
        var oDiv = document.createElement("div");
        oDiv.innerHTML = this.str;
        while(oDiv.childNodes.length > 0) {
            aParents[i].appendChild(oDiv.childNodes[0]);
        }
    }
}

zQuery.prototype.prependTo = function (str) {            //暂时只能传字符串，相当于选择器
    var aParents = select(document,str);
    for(var i=0; i<aParents.length; i++) {
        var oDiv = document.createElement("div");
        oDiv.innerHTML = this.str;
        var nodeList = [];
        for(var j=0; j<oDiv.childNodes.length; j++) {
            nodeList.push(oDiv.childNodes[j]);
        }
        nodeList.reverse();
        for(var k=0; k<nodeList.length; k++) {
            if(aParents[i].childNodes.length == 0) {
                aParents[i].appendChild(nodeList[k]);
            }
            else {
                aParents[i].insertBefore(nodeList[k],aParents[i].childNodes[0]);
            }
        }
    }
}

zQuery.prototype.insertBefore = function (str) {        //暂时只能传字符串，相当于选择器
    var aSiblings = select(document,str);
    for(var i=0; i<aSiblings.length; i++) {
        var oDiv = document.createElement("div");
        oDiv.innerHTML = this.str;
        while(oDiv.childNodes.length > 0) {
            aSiblings[i].parentNode.insertBefore(oDiv.childNodes[0],aSiblings[i]);
        }
    }
}

zQuery.prototype.insertAfter = function (str) {        //暂时只能传字符串，相当于选择器
    var aSiblings = select(document,str);

    function nextEle(obj) {
        if(obj.nextElementSibling) {
            return obj.nextElementSibling;
        }
        else {
            return obj.nextSibling;
        }
    }

    for(var i=0; i<aSiblings.length; i++) {
        var oDiv = document.createElement("div");
        oDiv.innerHTML = this.str;

        var nodeList = [];
        for(var j=0; j<oDiv.childNodes.length; j++) {
            nodeList.push(oDiv.childNodes[j]);
        }
        nodeList.reverse();
        for(var k=0; k<nodeList.length; k++) {
            if(nextEle(aSiblings[i])) {
                aSiblings[i].parentNode.insertBefore(nodeList[k],nextEle(aSiblings[i]));
            }
            else {
                aSiblings[i].parentNode.appendChild(nodeList[k]);
            }
        }
    }
}

//动画操作
zQuery.prototype.animate = function (json,time,type,fnSucc) {

    switch(arguments.length) {
        case 2:
            type = "swing";
            break;
        case 3:
            if(typeof arguments[2] == "string") {
                type = arguments[2];
            }
            else if(typeof arguments[2] == "function") {
                fnSucc = arguments[2];                   //如果和下一句对调，会把传入的回调函数覆盖掉
                type = "swing";
            }
    }

    var _this = this;
    for(var i=0; i<this.elements.length; i++) {

        this.elements[i].start = {};
        this.elements[i].dis = {};
        this.elements[i].count = parseInt(time/30);
        this.elements[i].n = 0;

        for(var name in json) {

            if(name == "opacity") {
                var opacity = getStyle(this.elements[i],name) || 1;     //修正IE6-8取不到opacity的bug
                this.elements[i].start[name] = Math.round(parseFloat(opacity)*100);
                this.elements[i].dis[name] = Math.round(parseFloat(json[name])*100) - this.elements[i].start[name];
            }
            else {
                this.elements[i].start[name] = parseInt(getStyle(this.elements[i],name));
                this.elements[i].dis[name] = parseInt(json[name]) - this.elements[i].start[name];
            }
        }

        (function (index) {
            clearInterval(_this.elements[index].timer);

            _this.elements[index].timer = setInterval(function () {

                var thisEle = _this.elements[index];

                thisEle.n = thisEle.n + 1;

                if(type == "linear") {
                    var radio = thisEle.n / thisEle.count;
                }
                else if(type == "swing") {
                    //使用正弦函数，转换曲线
					var tmp = Math.sin(Math.PI/2*(thisEle.n / thisEle.count));		// Math.PI/2代表0-90度角
                    var radio = Math.pow(tmp,3);
                }

                for(var name in json) {                     //这里要先执行一次
                    if(name == "opacity") {
                        var _opacity = thisEle.start[name] + thisEle.dis[name] * radio;
                        thisEle.style[name] = _opacity / 100 + "";
                        thisEle.style.filter = "alpha(opacity:" + _opacity + ")";
                    }
                    else {
                        thisEle.style[name] = thisEle.start[name] + thisEle.dis[name] * radio + "px";
                    }
                }

                if(thisEle.n == thisEle.count) {              //执行最后一次运动后再判断是否要清定时器
                    clearInterval(thisEle.timer);             //如果先清则最后一次没执行
                    fnSucc && fnSucc();
                }
            },30)
        })(i)

    }

}

/**********************静态方法**************************/

$.ajax = function (url,json) {
    var type = json.type || "GET";
    var async = json.async || true;

    if(window.XMLHttpRequest) {
        var oAjax = new XMLHttpRequest();
    }
    else {
        var oAjax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    json.data[t] = new Date().getTime();
    if(type == "GET") {
        var url = url + "?" + json2str(json.data);
        oAjax.open("GET",url,async);
        oAjax.send();
    }
    else if(type == "POST") {
        oAjax.open("POST",url,async);
        oAjax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        oAjax.send(json2str(json.data));
    }

    oAjax.onreadystatechange = function () {
        if(oAjax.readyState == 4) {
            if(oAjax.status == 200)	 {
                json.success(oAjax.responseText);
            }
            else {
                json.error && json.error();
            }
            json.complete && json.complete();
        }
    }
}

$.jsonp = function (url,data,fnSucc,cbName) {
    var fnName = "fn" + new Date().getTime();
    var oS = document.createElement("script");
    var oHead = document.getElementsByTagName("head")[0];
    var arr = [],str;

    window[fnName] = function (json) {
        fnSucc(json);
        oHead.removeChild(oS);
    }

    data[cbName] = fnName;

    for(var name in data) {
        str = name + "=" + data[name];
        arr.push(str);
    }

    var finalUrl = url + "?" + arr.join("&");

    oS.src = finalUrl;
    oHead.appendChild(oS);

}

//插件机制
$.fn = zQuery.prototype;
$.fn.extend = function (json) {
    for(var name in json) {
        zQuery.prototype[name] = json[name];
    }
}



/**********************工具函数**************************/

function json2str(json) {
    var result = "";
    var arr = [];
    for(var name in json) {
        var str = name + "=" + json[name];
        arr.push(str);
    }
    result = arr.join("&") + "&t=" + new Date().getTime();
    return result;
}

//zQuery选择器功能实现，使用空格分割，多级调用
function select(oParent,str) {
    var arr = str.replace(/^\s+|\s+$/g,"").split(/\s+/);
    var aParent = [oParent];
    var aChildren = [];
    for(var i=0; i<arr.length; i++) {
        var aChildren = getByStr(aParent,arr[i]);
        aParent = aChildren;
    }
    return aChildren;
}

//元素选择器的子方法，通过str获取元素，单级调用
function getByStr(oParent,str) {
    var aResult = [];
    switch(str.charAt(0)) {
        case ".":
            var str = str.slice(1);
            for(var i=0; i<oParent.length; i++) {
                var aEle = getByClass(oParent[i],str);
                for(var j=0; j<aEle.length; j++) {
                    aResult.push(aEle[j]);
                }
            }
            break;
        case "#":
            var str = str.slice(1);
            aResult = [document.getElementById(str)];
            break;
        default:

            //1.只有标签    li
            //2.标签+类名   li.list1
            //3.标签+ID     li#list1
            //4.标签+伪类   li:first    li:last    li:eq(0)
            //5.标签+属性   li[type=button]
            if(/\w+\.\w+/.test(str)) {
                //标签+类名   li.list1
                var arr = str.split(".");

                for(var i=0; i<oParent.length; i++) {
                    var aEle = oParent[i].getElementsByTagName(arr[0]);
                    var re = new RegExp("\\b" + arr[1] + "\\b");
                    for(var j=0; j<aEle.length; j++) {
                        if(re.test(aEle[j].className)) {
                            aResult.push(aEle[j]);
                        }
                    }
                }
            }
            else if(/\w+#\w+/.test(str)) {
                //标签+ID     li#list1
                var arr = str.split("#");
                aResult.push(document.getElementById(arr[1]));
            }
            else if(/\w+:[\w\(\)]+/.test(str)) {
                //标签+伪类   li:first    li:last    li:eq(0)
                var arr = str.split(":");

                for(var i=0; i<oParent.length; i++) {
                    var aEle = oParent[i].getElementsByTagName(arr[0]);
                    if(arr[1] == "first") {
                        aResult.push(aEle[0]);
                    }
                    else if(arr[1] == "last") {
                        aResult.push(aEle[aEle.length - 1]);
                    }
                    else if(/eq\(\-?\d+\)/.test(arr[1])) {
                        var num = parseInt(arr[1].match(/\-?\d+/)[0]);
                        if(num >= 0) {
                            aResult.push(aEle[num]);
                        }
                        else {
                            aResult.push(aEle[aEle.length + num]);
                        }
                    }
                }
            }
            else if(/\w+\[\w+=\w+\]/.test(str)) {

                //标签+属性   li[type=button]
                for(var i=0; i<oParent.length; i++) {

                    var arr = str.split("[");
                    var aEle = oParent[i].getElementsByTagName(arr[0]);

                    var attrArr = arr[1].split("=");
                    var attrName = attrArr[0];
                    var attrVal = attrArr[1].replace("]","");

                    for(var j=0; j<aEle.length; j++) {

                        if(aEle[j].getAttribute(attrName) == attrVal) {

                            aResult.push(aEle[j]);
                        }
                    }
                }
            }
            else {

                //只有标签
                for(var i=0; i<oParent.length; i++) {
                    var aEle = oParent[i].getElementsByTagName(str);
                    for(var j=0; j<aEle.length; j++) {
                        aResult.push(aEle[j]);
                    }
                }
            }

   }
    return aResult;
}

//通过类获取元素
function getByClass(oParent,sClass) {
    var aResult = [];
    var re = new RegExp("\\b" + sClass + "\\b");
    var aEle = oParent.getElementsByTagName("*");
    for(var i=0; i<aEle.length; i++) {
        if(re.test(aEle[i].className)) {
            aResult.push(aEle[i]);
        }
    }
    return aResult;
}

//获取最终样式
function getStyle(obj,name) {
    if(obj.currentStyle) {
        return obj.currentStyle[name];
    }
    else {
        return getComputedStyle(obj,false)[name];
    }
}

//ready事件
function addReady(fn) {
    if(document.addEventListener) {
        document.addEventListener("DOMContentLoaded",fn,false);
    }
    else {
        document.attachEvent("onreadystatechange",function () {
            if(document.readyState == "complete") {
                fn();
            }
        })
    }
}

function isChild(oParent,obj) {
    while(obj) {
        if(obj == oParent) {
            return true;
        }
        obj = obj.parentNode;
    }
    return false;
}

//绑定事件
function addEvent(obj,sEv,fn) {
    if(!obj._evlist) {
        obj._evlist = [];
    }
    var t = new Date().getTime();
    var fnName = "fn" + t;

    if(sEv == "mouseenter") {
        obj[fnName] = function (ev) {
            var oEvent = ev || event;
            var source = oEvent.relatedTarget || oEvent.fromElement;
            if(!isChild(obj,source)) {
                fn.call(obj,oEvent);
            }
        }
        sEv = "mouseover";
    }
    else if(sEv == "mouseleave") {
        obj[fnName] = function (ev) {
            var oEvent = ev || event;
            var source = oEvent.relatedTarget || oEvent.toElement;
            if(!isChild(obj,source)) {
                fn.call(obj,oEvent);
            }
        }
        sEv = "mouseout";
    }
    else {
        obj[fnName] = function (ev) {
            var oEvent = ev || event;
            if(fn.call(obj,oEvent) == false) {
                oEvent.cancelBubble = true;
                oEvent.preventDefault();
                return false;
            };
        }
    }

    if(obj.addEventListener) {
        obj.addEventListener(sEv,obj[fnName],false);
    }
    else {
        obj.attachEvent("on"+sEv,obj[fnName])
    }
    var json = {"name":sEv, "fn":fn, "pack":obj[fnName]};
    obj._evlist.push(json);
    //delete obj[fnName];           //加上这句IE低版本出错
}

//解除绑定
function removeEvent(obj,sEv,fn) {

    if(sEv == "mouseenter") {
        sEv = "mouseover";
    }

    if(sEv == "mouseleave") {
        sEv = "mouseout";
    }

    function doRemove(obj,sEv,fn) {
        if(obj.removeEventListener) {
            obj.removeEventListener(sEv,fn,false);
        }
        else {
            obj.detachEvent("on"+sEv,fn);
        }
    }

    if(!obj._evlist) {
        alert("没绑定解绑什么？");
        return;
    }
    for(var i=0; i<obj._evlist.length; i++) {
        if(obj._evlist[i].name == sEv && obj._evlist[i].fn == fn) {
            doRemove(obj,sEv,obj._evlist[i].pack);
            obj._evlist.splice(i,1);
            i--;
        }
    }
}

//添加类
function addClass(obj, sClass) {
    if(obj.className == "") {
        obj.className = sClass;
        return;
    }

    var re = new RegExp("\\b"+sClass+"\\b");

    if(!re.test(obj.className)) {
        obj.className += " " + sClass;
    }
}

//删除类
function removeClass(obj, sClass) {
    var re = new RegExp("^"+sClass+"\\s+|\\s+"+sClass+"\\b");
    obj.className = obj.className.replace(re,"");
}

//验证类
function hasClass(obj, sClass) {
    var re = new RegExp("\\b"+sClass+"\\b");
    return re.test(obj.className);
}
