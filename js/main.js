class Menu {
    constructor(id, url, title, childNode, ico) {
        this.id = id;
        this.url = url;
        this.title = title;
        this.childNode = childNode;
        this.ico = ico;
    }
}
class MenuHelper {
    static node(data) {
        let html = "";
        $.each(data, function (i, item) {
            html += `<li>
                        <a href="#menu`+ item.id + `" data-toggle="collapse">
                            <em class="icon-speedometer"></em>
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
            html += `<li>` + (item.childNode == null ?
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

$(function () {
    let html = "";
    if (true) {
        let kogrid = new Menu(11, "demo/kogrid.html", "KO表格", null, null);
        let kotree = new Menu(12, "demo/kotree.html", "KO表格", null, null);
        let test = new Menu(13, "", "三级菜单演示", [new Menu(131, "", "Test", null, null)], null);
        let demo = new Menu(1, "", "Demo", [kogrid, kotree, test], "icon-speedometer");
        var m = JSON.parse(JSON.stringify(demo));
        html += MenuHelper.node([m]);
    }
    $(".sidebar-nav").append(html);
});