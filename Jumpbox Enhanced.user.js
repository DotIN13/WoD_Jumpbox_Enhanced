// ==UserScript==
// @name         WoD Jumpbox Enhanced
// @namespace    github.com/DotIN13
// @version      0.3
// @description  Easier jumpbox search
// @author       DotIN13
// @updateURL    https://github.com/DotIN13/WoD_Jumpbox_Enhanced/raw/master/Jumpbox%20Enhanced.user.js
// @match        http://canto.world-of-dungeons.org/*
// @grant        GM_addStyle
// ==/UserScript==

(function()
{
    'use strict';

    //styling jumpboxSelect
    GM_addStyle("#jumpboxSelect{width: 50px;margin-right: 20px;height: 18px;}");

    //modifying tooltip
    var jumpboxTooltip = document.querySelector("#jumpbox_center>form>span");
    jumpboxTooltip.setAttribute("onmouseover","return wodToolTip(this,'<p>键入物品、英雄等名称，<br />选择相应类别，<br />按下按钮获知详情。<br />同时兼容[*:*]类型代码。<br /><br /><i>JumpBox Enhanced by DotIN13</i></p>');")

    //get jumpboxSpan
    var jumpboxSpan = document.getElementById("jumpbox_center");

    //create jumpboxSelect
    var jumpboxSelect = document.createElement("select");
    jumpboxSelect.id = "jumpboxSelect";
    jumpboxSpan.appendChild(jumpboxSelect);

    //add select options
    var itemList = ["item", "set", "hero", "player", "skill", "npc", "post", "group", "clan", "auction", "class"],
        itemChn = ["物品", "套装", "角色", "玩家", "技能", "NPC", "帖子", "团队", "联盟", "拍卖", "职业"];
    var jumpboxSelObj = document.getElementById("jumpboxSelect");
    var addItemList = function(list)
    {
        for (var i = 0; i < itemList.length; i++)
        {
            var option = document.createElement("option");
            option.value = (itemList[i]);
            option.text = (itemChn[i])
            jumpboxSelObj.add(option);
        }
    }
    addItemList(itemList);

    //reroute jumpbox Button
    var jumpboxBtn = document.querySelectorAll("#jumpbox_center>form>span>input");
    var jumpbox = document.querySelector('#jumpbox_center>form>input[name="link"]');
    jumpboxBtn[0].setAttribute("onclick", "window.jumper();return false;");

    window.jumper = function()
    {
        var jumpbox = document.querySelector('#jumpbox_center>form>input[name="link"]');
        var jumpboxValue = jumpbox.value;
        var regtest = /^\s*\[\s*([^:]+?)\s*:\s*(.+?)\s*\]\s*$/;
        var indicator = regtest.test(jumpboxValue);
        if (indicator)
        {
            wodlink(jumpboxValue);
        }
        else
        {
            var jumplink = "[" + jumpboxSelObj.value + ":" + jumpboxValue + "]";
            wodlink(jumplink);
        }
        jumpbox.value = "";
    }
})();