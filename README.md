# zQuery

##核心方法
###核心方法
####$(arg)
说明：转换zQuery对象
参数：见jQuery函数
返回值：生成zQuery构造函数的实例

####zQuery(arg)
说明：核心构造函数
参数：function，str，dom对象
返回值：zQuery(fn)  ->  页面的ready功能
        zQuery(dom)  ->  将dom对象包装成zQuery对象
        zQuery(str)  ->  选择器，返回一个zQuery对象
目前已经实现的选择器：
标签选择器	zQuery(“input”)
ID选择器		zQuery(“#btn1”)	支持zQuery(“div#title”)的写法
类选择器		zQuery(“.title”)	支持zQuery(“div.title”)的写法
子选择器		zQuery(“ul li a”)
属性选择器	zQuery(“input[type=button]”)
伪类选择器	zQuery(“input:first”)
:first		第一个元素
:last		第二个元素
:eq(num)	第num个元素

####.length
说明：获得zQuery包含的dom元素数量，与.size方法同用
返回值：dom元素数量（num）

####.size()
说明：获得zQuery包含的dom元素数量，与.length属性同用
参数：无
返回值：dom元素数量

####.each(function(index,domEle) {…})
说明：元素的遍历，相当于for循环
参数：回调函数，fn的第一个参数是序号，第二个参数是当前元素
返回值：zQuery对象

####.index()
说明：获得第一个元素在同级元素中的序号
参数：无
返回值：第一个元素在同级元素中的序号（num）

##DOM操作
###样式
####.addClass(sClass)
说明：给zQuery元素添加对应的class
参数：要添加的类名
返回值：zQuery对象

####.removeClass(sClass)
说明：删除zQuery元素中对应的class
参数：要删除的类名
返回值：zQuery对象

####.hasClass(sClass)
说明：查询第一个元素是否包含该class
参数：要查询的类名
返回值：是否存在（bool）

####.css(arg)
说明：样式的getter与setter
参数：getter –> .css(样式名)
      setter -> .css(样式名，样式值)
			  -> .css({"样式名1":样式值1,"样式名2":样式值2})
返回值：getter –> 对应的样式值
        setter –> zQuery对象

###html/text/value操作
####.html(arg)
说明：html的getter与setter
参数：getter  –>  .html()
	  setter  –>  .html(html代码)
返回值：getter  ->  第0个元素的html内容
		setter  ->  zQuery对象

####.text()
说明：text的getter与setter
参数：getter  –>  .text()
	  setter  –>  . text (text文本内容)
返回值：getter  ->  第0个元素的text内容
		setter  ->  zQuery对象

###文档操作，控制
####.prev()
说明：获取所有选中元素的上一个兄弟元素
参数：无
返回值；获取到的元素集合的zQuery对象

####.next()
说明：获取所有选中元素的下一个兄弟元素
参数：无
返回值；获取到的元素集合的zQuery对象

####.appendTo(str)
说明：将新创建的元素添加到str对应的选择器元素的结尾部分
参数：str，选择器
返回值：无
TODO：暂时只能实现新创建的元素添加，$(str)，str需要包含 “<” 字符，参数暂时只能是选择器，不能传入dom对象或zQuery对象

####.prependTo()
说明：将新创建的元素添加到str对应的选择器元素的开头部分
参数：str，选择器
返回值：无
TODO：同.appendTo()方法

####.insertBefore()
说明：将新创建的元素作为str对应的选择器元素的上一个兄弟元素
参数：str，选择器
返回值：无
TODO：同.appendTo()方法

####.insertAfter()
说明：将新创建的元素作为str对应的选择器元素的下一个兄弟元素
参数：str，选择器
返回值：无
TODO：同.appendTo()方法

###位置，范围
####.width()
说明：获取第一个dom元素真实的宽度
参数：无
返回值：第一个dom元素真实的宽度

####.innerWidth()
说明：获取第一个dom元素宽度 + 左右填充
参数：无
返回值：第一个dom元素内宽度 width + 左右padding

####.outerWidth(bool)
说明：获取第一个dom元素的外宽度（左右边距可选）
参数：bool，是否包含左右margin
返回值：
bool为真 –> 第一个元素的width + 左右padding + 左右border宽度 + 左右margin
bool为假 –> 第一个元素的width + 左右padding + 左右border宽度

####.height()
说明：获取第一个dom元素真实的高度
参数：无
返回值：第一个dom元素真实的高度

####.innerHeight()
说明：获取第一个dom元素高度 + 上下填充
参数：无
返回值：第一个dom元素内高度 height + 上下padding

####.outerHeight(bool)
说明：获取第一个dom元素的外宽度（上下边距可选）
参数：bool，是否包含上下margin
返回值：
bool为真 –> 第一个元素的height+ 上下padding + 上下border宽度 + 上下margin
bool为假 –> 第一个元素的height+ 上下padding + 上下border宽度

####.position()
说明：获取第一个元素相对于offsetParent的定位值
参数：无
返回值：{“left”:left,“top”:top}

####.offset()
说明：获取第一个元素相对于页面的定位值
参数：无
返回值：{“left”:left,“top”:top}

###事件
####.bind(sEv,fn)
说明：事件绑定，支持mouseenter与mouseleave事件，已解决this的兼容性问题
参数：事件名(str)，回调函数(fn(event))，已解决event兼容性问题
返回值：zQuery对象

####.unbind(sEv,fn)
说明：事件解绑，支持mouseenter与mouseleave事件
参数：事件名(str)，回调函数(fn) 
返回值：zQuery对象

####.click(fn)
说明：click事件绑定，支持解绑
参数：回调函数(fn(event)) 
返回值：zQuery对象

####.mouseenter(fn)
说明：mouseenter事件绑定，支持解绑
参数：回调函数(fn(event)) 
返回值：zQuery对象

####.mouseleave(fn)
说明：mouseleave事件绑定，支持解绑
参数：回调函数(fn(event)) 
返回值：zQuery对象

####.hover(fn1,fn2)
说明：mouseenter与mouseleave的组合事件
参数：回调函数fn1  ->  mouseenter
	  回调函数fn2  ->  mouseleave
返回值：zQuery对象

###属性
####.attr(arg)
说明：属性的getter与setter
参数：getter –> .attr(属性名)
      setter -> .attr (属性名，属性值)
			  -> .attr ({"属性名1":属性值1,"属性名2":属性值2})
返回值：getter –> 对应的属性值
        setter –> zQuery对象

###筛选
####.eq(num)
说明：选取zQuery对象集合中的第num个元素
参数：选取元素的序号
返回值：zQuery对象中的第num个元素

####.children()
说明：选取zQuery对象集合的所有直接子元素
参数：无
返回值：所有直接子元素节点，包装为zQuery对象

####.find(str)
说明：通过str选择器选取zQuery对象集合所有子元素中符合条件的元素
参数：str选择器：例如”ul li.active”等
返回值：符合条件的元素，包装为zQuery对象


##网络传输
###Ajax
####$.ajax(url,json)
说明：静态方法，封装一系列ajax方法
参数：url必传，json内的参数为可选，包括 {
		type : “GET” || “POST”	默认值为 “GET”
		async: true || false		默认值为 true
		success: function(responseText) {}		//成功时的回调函数
		error: function() {}						//失败时的回调函数
		complete: function() {}					//完成时的回调函数
}
返回值：无

###Jsonp
####$.jsonp(url,data,fnSucc,cbName)
说明：静态方法，用于发送jsonp请求
参数；url  ->  接收数据的页面
		 data ->  需要发送的数据，json格式
		 fnSucc –> 成功时执行的回调函数
		 cbName -> 后台接口中回调函数的属性名
返回值：无

##特效
###动画
####.animate(json,time,[type,fnSucc])
说明：实现所有zQuery对象的动画效果，支持所有的px属性和opacity 
参数：json  ->  需要改变的属性的键值对，例如{“top”:200,”height”:300,”top”:50}
		 time  ->  到达目标点所需要的时间
		 type  ->  运动类型：linear -> 线性	swing -> 缓动	y=(sinx)3
		 		    可选参数，默认类型为swing
		 fnSucc –> 运动结束时的回调函数，可选参数
返回值：无

###插件机制
第一种方法：$.fn.方法名 = function(){}
第二种方法：$.fn.extend({
					方法1:function () {},
	方法2:function () {}
})