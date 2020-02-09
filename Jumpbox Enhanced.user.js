// ==UserScript==
// @name         WoD Jumpbox Enhanced
// @namespace    github.com/DotIN13
// @version      0.1
// @description  Easier jumpbox search
// @author       DotIN13
// @match        http://canto.world-of-dungeons.org/*
// @grant        none
// ==/UserScript==

(function()
{
    'use strict';

    //get jumpboxSpan
    var jumpboxSpan = document.getElementById("jumpbox_center");

    //create jumpboxSelect
    var jumpboxSelect = document.createElement("select");
    jumpboxSelect.id = "jumpboxSelect";
    jumpboxSpan.appendChild(jumpboxSelect);

    //add select options
    var itemList = ["item", "hero", "player", "group", "clan", "skill", "npc", "post", "auction", "set", "class"];
    var jumpboxSelObj = document.getElementById("jumpboxSelect");
    var addItemList = function(list)
    {
        for (var i = 0; i < itemList.length; i++)
        {
            var option = document.createElement("option");
            option.value = (itemList[i]);
            option.text = (itemList[i])
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