class Menu {
    constructor(id, url, title, childNode, icon) {
        this.id = id;
        this.url = url;
        this.title = title;
        this.childNode = childNode;
        this.icon = icon;
    }
}
class MenuHelper {
    static node(data) {
        let html = "";
        $.each(data, function (i, item) {
            html += `<li>
                        <a href="#menu`+ item.id + `" data-toggle="collapse">
                            <em class="`+item.icon+`"></em>
                            <span>`+ item.title + `</span>
                            <span class="pull-right-container">
                                <i class="fa fa-angle-left pull-right"></i>
                            </span>
                        </a>
                        `+ MenuHelper._node1(item.childNode, item.id) + `
                    </li>`;
        });
        return html;
    }
    static _node1(data, pid) {
        let html = `<ul class="sidebar-nav sidebar-subnav collapse" id="menu` + pid + `">`;
        $.each(data, function (i, item) {
            html += `<li>` + ((item.childNode == null||item.childNode=="") ?
                `<a href="` + item.url + `" title="` + item.title + `" data-tab>
                    <span>`+ item.title + `</span>
                </a>`:
                `<a href="#menu` + item.id + `"  data-toggle="collapse">
                        <em class="fa fa-angle-right"></em>
                        <span>`+ item.title + `</span>
                </a>`+ MenuHelper._node2(item.childNode, item.id)) + `</li>`;
        });
        return html += "</ul>";
    }
    static _node2(data, pid) {
        let html = `<ul class="sidebar-nav sidebar-subnav collapse" id="menu` + pid + `">`;
        $.each(data, function (i, item) {
            html += `<li>
                            <a href="`+ item.url + `" title="` + item.title + `" data-tab>
                                <span>`+ item.title + `</span>
                            </a>
                        </li>`
        });
        return html += "</ul>";
    }
}

$(window).on('load.menu', function () {
    let html = "";
    if (true) {
        let kogrid = new Menu(11, "demo/jqxGrid.html", "KO表格", null, null);
        let kotree = new Menu(12, "demo/jqxTree.html", "KO树形", null, null);
        let flowchart = new Menu(14, "demo/flowchart.html", "流程设计", null, null);
        let test = new Menu(13, "", "三级菜单演示", [new Menu(131, "http://www.ibuyeasy.com/", "爱购", null, null)], null);
        let demo = new Menu(1, "", "Demo", [kogrid, kotree,flowchart, test], "icon-speedometer");
        var m1 = JSON.parse(JSON.stringify(demo));
        html += MenuHelper.node([m1]);
    }
    $(".sidebar-nav").append(html);
});

/**
 * author maizi
 * time 2018-06-10
 * descrption tab插件文件
 */


/**
 * tab操作基础类
 */
class tab {
	/**
	 * 重置所有iframe窗体高度
	 */
	static handleIframeContent() {
		var header = $(".topnavbar-wrapper");
		var footer = $(".footer-container");
		var tabs = $(".content-tabs");
		var cht = $(document).height() - footer.outerHeight() - header.outerHeight() - tabs.outerHeight() - 20;
		$(".tab_iframe").css({
			height: cht
		});
	}
	/**
	 * 获取tab页对应的panel
	 * @param {tab编号} tabId
	 */
	static findTabPanel(tabId) {
		return $("#tab-content").find("div#" + tabId);
	}
	/**
	 * 计算当前对象总宽度
	 * @param {当前html对象} element
	 */
	static calSumWidth(element) {
		var width = 0;
		$(element).each(function () {
			width += $(this).outerWidth(true);
		});
		return width;
	}
	/**
	 * 获取当前激活TAB
	 */
	static getActiveTab() {
		var tabId = $(".page-tabs-content").find("a.active").prop("id");
		return {
			iframe: $("#tab-content").find("iframe#" + tabId),
			tab: $(".page-tabs-content").find("a#" + tabId),
			tabId: tabId,
		}
	}
}

/**
 * 控制tab右移动
 */

function toTabRight() {
	var marginLeftVal = Math.abs(parseInt($('.page-tabs-content').css('margin-left')));
	var tabOuterWidth = tab.calSumWidth($(".content-tabs").children().not(".menuTabs"));
	var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
	var scrollVal = 0;
	if ($(".page-tabs-content").width() < visibleWidth) {
		return false;
	} else {
		var tabElement = $(".menu_tab:first");
		var offsetVal = 0;
		while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) {
			offsetVal += $(tabElement).outerWidth(true);
			tabElement = $(tabElement).next();
		}

		offsetVal = 0;
		while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth) && tabElement.length > 0) {
			offsetVal += $(tabElement).outerWidth(true);
			tabElement = $(tabElement).next();
		}
		scrollVal = tab.calSumWidth($(tabElement).prevAll());
		if (scrollVal > 0) {
			$('.page-tabs-content').animate({
				marginLeft: 0 - scrollVal + 'px'
			}, "fast");
		}
	}
}

/**
 * 控制tab左移动
 */
function toTabLeft() {
	var marginLeftVal = Math.abs(parseInt($('.page-tabs-content').css('margin-left')));
	var tabOuterWidth = tab.calSumWidth($(".content-tabs").children().not(".menuTabs"));
	var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
	var scrollVal = 0;
	if ($(".page-tabs-content").width() < visibleWidth) {
		return false;
	} else {
		var tabElement = $(".menu_tab:first");
		var offsetVal = 0;
		while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) {
			offsetVal += $(tabElement).outerWidth(true);
			tabElement = $(tabElement).next();
		}
		offsetVal = 0;
		if (tab.calSumWidth($(tabElement).prevAll()) > visibleWidth) {
			while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth) && tabElement.length > 0) {
				offsetVal += $(tabElement).outerWidth(true);
				tabElement = $(tabElement).prev();
			}
			scrollVal = tab.calSumWidth($(tabElement).prevAll());
		}
	}

	$('.page-tabs-content').animate({
		marginLeft: 0 - scrollVal + 'px'
	}, "fast");
}

/**
 * 刷新当前tab
 */
function onRefreshTab() {
	tab.getActiveTab().iframe.prop('src', tab.getActiveTab().iframe.prop('src'));
}

/**
 * 关闭当前tab
 */
function onCloseTab(i) {
	if (i === undefined) {
		i = tab.getActiveTab().tab.find("i");
	}
	closeTab(i);
}

/**
 * 关闭所有tab
 */
function onCloseAllTab() {
	$(".page-tabs-content>a").each(function () {
		var i = $(this).find("i");
		onCloseTab(i)
	});
}

/**
 * 保留当前tab关闭其他tab
 */
function onCloseOtherTab() {
	$(".page-tabs-content>a").not(".active").each(function () {
		var i = $(this).find("i");
		onCloseTab(i)
	});
}

/**
 * 关闭选择的tab页
 * @param {当前关闭对象} obj
 */
function closeTab(obj) {

	var cTab = $(obj).parent();

	var tabOuterWidth = tab.calSumWidth($(".content-tabs").children().not(".menuTabs"));
	var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
	var pageSize = Math.abs(visibleWidth / 134);
	var pageData = $(".page-tabs-content>a").length - 1;
	var pageCount = Math.ceil(pageData / pageSize);
	var pageIndex = (pageCount - 1) * pageSize;
	var i = $(".page-tabs-content>a").eq(pageIndex + 1).nextAll(cTab).length;
	if (i == 0) {
		toTabLeft();
	}

	var lastTab = $("#tab-menu .menu_tab:last");
	if (cTab.hasClass("active")) {
		if (lastTab.is(cTab)) {
			tab.findTabPanel(cTab.prev().prop("id")).show();
			cTab.prev().addClass("active");
		} else {
			tab.findTabPanel(cTab.next().prop("id")).show().siblings().hide();
			cTab.next().addClass("active").siblings().removeClass("active");
		}
	}
	tab.findTabPanel(cTab.prop("id")).remove();
	cTab.remove();
}

/**
 * 菜单tab插件
 * 使用方式 在a标签添加 data-tab 属性，需设置title，href两个属性
 * @title 用于显示标签页标题
 * @href 用于iframe的src地址
 */
(function ($) {
	function Plugin(index) {
		return this.each(function () {
			var self = $(this), tabId = `tab` + index, tabName = self.prop("title") !== undefined ? self.prop("title") : '新标签页', url = self.prop("href");
			self.prop("id", tabId);
			function newTab() {
				$("#tab-menu .menu_tab").removeClass("active");
				var a = $(`<a href="javascript:void(0);" class="menu_tab active" id="` + tabId + `">
							<span style="width: 100px !important;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							display: block;
							float: left;">`+ tabName + `</span>
							<i class="fa fa-remove" style="cursor: pointer" onclick="javascript:closeTab(this);"></i>
						</a>`);
				$(".page-tabs-content").append(a);
				toTabRight();
			}
			function newIframe() {
				$("#tab-content .tab-pane").hide();
				var tabPanel = $('<div></div>').prop("id", tabId).addClass("tab-pane");
				var iframe = $("<iframe></iframe>").prop("src", url).css("width", "100%").prop("frameborder", "no").prop("id", tabId).addClass("tab_iframe");
				tabPanel.append(iframe);
				$("#tab-content").append(tabPanel);
				tab.handleIframeContent();
			}
			self.on("click", function (event) {
				var cTab = $("#tab-menu #" + tabId);
				if (!(cTab.length > 0)) {
					newTab();
					newIframe();
				} else {
					cTab.addClass("active").siblings().removeClass("active");
					tab.findTabPanel(tabId).show().siblings().hide();
				}
				return false;
			});
		});
	}
	/**
	 * 利用load事件进行初始化处理
	 */
	$(window).on('load.tab', function () {
		$('[data-tab]').each(function (index) {
			var self = $(this);
			Plugin.call(self, index + 1);
		});
		$("#tab-menu").on("click", ".menu_tab", function () {
			$(this).addClass("active").siblings().removeClass("active");
			tab.findTabPanel($(this).prop("id")).show().siblings().hide();
		});
		tab.handleIframeContent();
	});
	/**
	 * 窗体大小改变iframe大小
	 */
	$(window).resize(function () {
		tab.handleIframeContent();
	});
})(jQuery);