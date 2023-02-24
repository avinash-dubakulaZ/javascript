function getpagedata(pageload) {
    fetch('./restaurant.json')
        .then(function (results) { return results.json(); })
        .then(function (data) {
        var temp = data;
        console.log(temp.tableCardList, "type asks", typeof temp.tableCardList);
        console.log(temp.tableCardList);
        if (sessionStorage.getItem("menuCardList") == null) {
            sessionStorage.setItem("menuCardList", JSON.stringify(temp.menuCardList));
        }
        if (sessionStorage.getItem("tableCardList") == null) {
            sessionStorage.setItem("tableCardList", JSON.stringify(temp.tableCardList));
        }
        pageload();
    });
}
getpagedata(pageload);
function pageload() {
    //storing for table 
    var tableCardList = JSON.parse(sessionStorage.getItem("tableCardList"));
    var tableCards = document.getElementById("Table-list");
    tableCardList.forEach(function (tableCard) {
        var nd = document.createElement('div');
        nd.setAttribute("class", "table-card");
        nd.setAttribute("id", "".concat(tableCard.id));
        var tableCardHtml = "\n        <h2 class=\"table-card-title drop\" attr-key=".concat(tableCard.id, ">Table ").concat(tableCard.id + 1, "</h2>\n        <p class=\"table-card-para drop\" attr-key=").concat(tableCard.id, ">Total cost: <span id=").concat(tableCard.id.toString() + "c", " attr-key=").concat(tableCard.id, ">").concat(tableCard.tableTotal, "</span></p>\n        ");
        nd.innerHTML = tableCardHtml;
        if (tableCards !== null) {
            tableCards.appendChild(nd);
        }
    });
    var MenuCardList = JSON.parse(sessionStorage.getItem("menuCardList"));
    var menucards = document.getElementById("Menu-list");
    MenuCardList.forEach(function (menuCard) {
        var nd = document.createElement('div');
        nd.setAttribute("class", "menu-card");
        nd.setAttribute("id", "".concat(menuCard.id));
        nd.setAttribute("draggable", "true");
        var menuCardHtml = "\n                <h2 attr-key=".concat(menuCard.id, ">").concat(menuCard.name, "</h2>\n                <p attr-key=").concat(menuCard.id, ">Total cost: <span id=\"total-cost\" attr-key=").concat(menuCard.id, ">").concat(menuCard.cost, "</span></p>\n                <p attr-key=").concat(menuCard.id, ">Item type: <span id=\"item-type\" attr-key=").concat(menuCard.id, ">").concat(menuCard.type, "</span></p>\n        ");
        nd.innerHTML = menuCardHtml;
        if (menucards !== null) {
            menucards.appendChild(nd);
        }
    });
    var ob = document.querySelectorAll(".table-card");
    console.log("helloo", ob);
    ob.forEach(function (obj) {
        obj.addEventListener("click", function (e) {
            var tableCardList = JSON.parse(sessionStorage.getItem("tableCardList"));
            if (tableCardList[(parseInt(e.currentTarget.id))].tableTotal == 0 || false) {
                document.getElementById("tableempty").style.display = "block";
            }
            else {
                tablebodyreload((parseInt(e.currentTarget.id) + 1).toString());
            }
            //tablebodyreload((parseInt((e.currentTarget as HTMLElement).id)+1).toString());
        });
    });
    var newob = document.querySelectorAll(".menu-card");
    newob.forEach(function (obj) {
        obj.addEventListener("dragstart", function (e) {
            var _a;
            console.log("dragged");
            (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData("iddata", e.target.id);
        });
    });
    var newob2 = document.querySelectorAll(".table-card");
    newob2.forEach(function (obj) {
        obj.addEventListener("dragover", function (e) {
            console.log("dragg over");
            e.preventDefault();
        });
        obj.addEventListener("drop", function (e) {
            changetable(e);
            // console.log(ei);
            // console.log(tableCardList[ct].tableItems);    
        });
    });
    window.onclick = function (event) {
        if (event.target.id == "mainmodal") {
            document.getElementById("mainmodal").style.display = "none";
            for (var tabno = 0; tabno < 3; tabno++) {
                document.getElementById((tabno).toString()).style.backgroundColor = "white";
            }
        }
        if (event.target.id == "billmain") {
            document.getElementById("billmain").style.display = "none";
        }
        if (event.target.id == "tableempty") {
            document.getElementById("tableempty").style.display = "none";
        }
    };
}
function menusearch(e) {
    if (e.target != null) {
        var element = e.target;
        var currsearch = element.value.toLowerCase().trim();
    }
    //getting menu cards
    var menuCards = document.querySelectorAll(".menu-card");
    menuCards.forEach(function (card) {
        var _a, _b;
        var cardelement = card;
        var cardName = (_a = card.children[0].textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        var itemType = (_b = card.children[2].children[0].textContent) === null || _b === void 0 ? void 0 : _b.toLowerCase();
        //console.log(cardName,itemType,"check on console",currsearch)    
        if ((cardName === null || cardName === void 0 ? void 0 : cardName.includes(currsearch)) || (itemType === null || itemType === void 0 ? void 0 : itemType.includes(currsearch))) {
            cardelement.style.display = "block";
        }
        else {
            cardelement.style.display = "none";
        }
    });
}
function tablesearch(e) {
    if (e.target != null) {
        var element = e.target;
        var currsearch = element.value.toLowerCase();
    }
    //getting menu cards
    var tableCards = document.querySelectorAll(".table-card");
    tableCards.forEach(function (card) {
        var _a;
        var cardelement = card;
        var cardName = (_a = card.children[0].textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        //console.log(cardName,"check on console",currsearch)    
        if (cardName === null || cardName === void 0 ? void 0 : cardName.includes(currsearch)) {
            cardelement.style.display = "block";
        }
        else {
            cardelement.style.display = "none";
        }
    });
}
// // let ob=document.querySelectorAll(".table-card");
// // console.log("helloo",ob)
function tablebodyreload(tabno) {
    document.getElementById((parseInt(tabno) - 1).toString()).style.backgroundColor = "#ffc61a";
    var tableCardList = JSON.parse(sessionStorage.getItem("tableCardList"));
    console.log("table body is reloaded");
    var modalnode = document.getElementById("mainmodal");
    if (modalnode.style.display != undefined) {
        modalnode.style.display = "block";
    }
    //const tabno=(parseInt(e.currentTarget.id)+1).toString();
    console.log(tabno);
    var tnomodal = document.getElementById("tablenomodal");
    tnomodal.innerHTML = tabno;
    var parent = document.getElementById("billbody");
    document.getElementById("billbody").innerHTML = null;
    var ttotal = 0;
    var traverse = tableCardList[parseInt(tabno) - 1].tableItems;
    for (var i = 0; i < traverse.length; i++) {
        var chil = document.createElement('tr');
        ttotal += parseInt(traverse[i][1]) * parseInt(traverse[i][2]);
        var txt = "\n            <td>".concat(i + 1, "</td>\n            <td>").concat(traverse[i][0], "</td>\n            <td>").concat(traverse[i][1], "</td>\n            <td>\n                <p>No of servings</p>\n                <input type=\"number\" id=").concat(i.toString() + "input", " onchange=inputbutton(").concat(traverse[i][2], ",").concat(tabno, ",").concat(traverse[i][0], ".id,").concat(i, ") style=\"width:80%;padding:1%;\" value=").concat(traverse[i][2], ">\n            </td>\n            <td><i id=").concat(traverse[i][0], " class=\"far fa-trash-alt ievent\" onclick=deletebutton(").concat(traverse[i][0], ",").concat(tabno, ",").concat(traverse[i][0], ".id) style=\"font-size:150%;float:right;\"></i></td>\n            ");
        chil.innerHTML = txt;
        parent === null || parent === void 0 ? void 0 : parent.appendChild(chil);
    }
    //console.log("this is an",e.currentTarget.id)
    var tochange = parseInt(tabno) - 1;
    var closenode = document.getElementById("closesession");
    closenode.addEventListener("click", function (e) {
        closesessionfun(tochange, ttotal);
    });
    console.log("table total is", ttotal);
    document.getElementById("total").innerHTML = ttotal.toString();
}
function changetable(e) {
    var tableCardList = JSON.parse(sessionStorage.getItem("tableCardList"));
    var MenuCardList = JSON.parse(sessionStorage.getItem("menuCardList"));
    console.log("change table method");
    console.log("before update", tableCardList);
    document.getElementById("billbody").innerHTML = null;
    // console.log("dragg over");
    console.log("change table is called");
    var ct = e.currentTarget.id;
    var ei = e.dataTransfer.getData("iddata");
    var _a = MenuCardList[ei], idn = _a.id, namen = _a.name, typen = _a.type, costn = _a.cost;
    var currc = getcurrcount(tableCardList[ct].tableItems, namen);
    // console.log("curr returned",currc);
    if (currc == 0) {
        var aray = [namen, costn, 1];
        tableCardList[ct].tableItems.push(aray);
        // console.log(aray,"avinash checks");
    }
    var tabletotal = gettabletotal(tableCardList[ct].tableItems, namen);
    var tablet = document.getElementById(ct).childNodes[3].childNodes[1].innerHTML = tabletotal.toString();
    tableCardList[ct].tableTotal = tabletotal;
    //     console.log("this is table ct",tablet)
    //     console.log("This is table Total",tabletotal);   
    console.log("after update table card list", tableCardList);
    sessionStorage.setItem("tableCardList", JSON.stringify(tableCardList));
}
function gettabletotal(li, n) {
    var count = 0;
    console.log("getcurr", li);
    for (var i = 0; i < li.length; i++) {
        count += li[i][1] * li[i][2];
    }
    return count;
}
function getcurrcount(li, n) {
    var count = 0;
    console.log("getcurrentcount is called");
    // console.log("getcurr",li)
    for (var i = 0; i < li.length; i++) {
        if (li[i][0] == n) {
            console.log(typeof li[i][0], "type check by a");
            count = li[i][2];
            li[i][2] = (parseInt(li[i][2]) + 1).toString();
            console.log(li[i][2], "this is suspect", n, "n", li[i][0]);
            break;
        }
    }
    return count;
}
function closemodal(e) {
    var modalnode = document.getElementById("mainmodal");
    if (modalnode.style.display != undefined) {
        modalnode.style.display = "none";
    }
    for (var tabno = 0; tabno < 3; tabno++) {
        document.getElementById((tabno).toString()).style.backgroundColor = "white";
    }
}
function closesessionfun(tochange, ttotal) {
    for (var tabno = 0; tabno < 3; tabno++) {
        document.getElementById((tabno).toString()).style.backgroundColor = "white";
    }
    console.log("tochange check", tochange);
    var node = document.getElementById("billmain");
    if (node.style.display != undefined) {
        node.style.display = "block";
    }
    var modalnode = document.getElementById("mainmodal");
    if (modalnode.style.display != undefined) {
        modalnode.style.display = "none";
    }
    document.getElementById("closebillno").innerHTML = (parseInt(tochange) + 1).toString();
    document.getElementById("tablebilltotal").innerHTML = ttotal;
    var tableCardList = JSON.parse(sessionStorage.getItem("tableCardList"));
    console.log("this table is changing", tochange);
    tableCardList[tochange].tableItems = [];
    tableCardList[tochange].tableTotal = 0;
    sessionStorage.setItem("tableCardList", JSON.stringify(tableCardList));
    tablecardsrel();
}
function closebill(e) {
    var node = document.getElementById("billmain");
    if (node.style.display != undefined) {
        node.style.display = "none";
    }
    //console.log("this is e.target",(e.target! as HTMLElement)!.parentNode())
    console.log(e.target.parentNode);
}
function tablecardsrel() {
    var tableCardList = JSON.parse(sessionStorage.getItem("tableCardList"));
    var _loop_1 = function (i) {
        console.log("tablecardsrel funct", i);
        var t = 0;
        tableCardList[i].tableItems.forEach(function (i) {
            t += i[1] * i[2];
        });
        console.log("Total computed", t);
        tableCardList[i].tableTotal = t;
        document.getElementById(tableCardList[i].id.toString() + "c").innerHTML = t.toString();
    };
    for (var i = 0; i < tableCardList.length; i++) {
        _loop_1(i);
    }
    sessionStorage.setItem("tableCardList", JSON.stringify(tableCardList));
}
function deletebutton(i, j, k) {
    console.log(i);
    console.log(j);
    console.log(k);
    var tableCardList = JSON.parse(sessionStorage.getItem("tableCardList"));
    console.log(tableCardList[j - 1].tableItems);
    var a = tableCardList[j - 1].tableItems;
    var index = -1;
    for (var x = 0; x < a.length; x++) {
        if (a[x][0] == k) {
            index = x;
            break;
        }
    }
    if (index != -1) {
        console.log(a[index]);
        a.splice(index, 1);
        tableCardList[j - 1].tableItems = a;
        sessionStorage.setItem("tableCardList", JSON.stringify(tableCardList));
    }
    tablebodyreload(j);
    tablecardsrel();
}
function inputbutton(i, j, k, l) {
    console.log("this is input button");
    console.log(i);
    console.log(j);
    console.log(k);
    console.log(l);
    var inputvalue = document.getElementById(l.toString() + "input").value;
    console.log(inputvalue);
    var tableCardList = JSON.parse(sessionStorage.getItem("tableCardList"));
    console.log(tableCardList[j - 1].tableItems);
    var a = tableCardList[j - 1].tableItems;
    // let index=-1;
    for (var x = 0; x < a.length; x++) {
        if (a[x][0] == k) {
            a[x][2] = inputvalue;
            break;
            // index=x;
        }
    }
    tableCardList[j - 1].tableItems = a;
    sessionStorage.setItem("tableCardList", JSON.stringify(tableCardList));
    tablebodyreload(j);
    tablecardsrel();
}
function closetableempty(event) {
    document.getElementById("tableempty").style.display = "none";
}
