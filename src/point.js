/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-8-6
 * Time: 下午4:53
 * To change this template use File | Settings | File Templates.
 */

function createPoint(obj) {
    var oDiv = document.createElement("div");

    var left = obj.offsetLeft;
    var top = obj.offsetTop;

    oDiv.style.cssText = "width:3px; height:3px; background-color:black; position:absolute;left:" + left + "px; top:" + top + "px;";
    document.body.appendChild(oDiv);
}