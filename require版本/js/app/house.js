//#region  config
require.config({
    baseUrl: "../js",
    paths: {
        "jquery": "jquery.min",
        "knockout": "knockout",
        "knockout.mapping": "knockout.mapping",
        "popper": "popper/popper.min",
        "bootstrap": "bootstrap/js/bootstrap.min",
        "lodash": "lodash/lodash.core.min",
        "storage": "js-storage/js.storage",
        "parsley": "parsley/parsley.min",
        "parsley.zh-cn": "parsley/zh-cn",
        "sweetalert": "sweetalert/sweetalert.min",
        "daterangepicker": "daterangepicker/daterangepicker",
        "moment": "moment/moment-with-locales",

        "jqxcore": "jqwidgets/js/jqxcore",
        "jqxdata": "jqwidgets/js/jqxdata",
        "jqxdata.export": "jqwidgets/js/jqxdata.export",

        "jqxgrid": "jqwidgets/js/jqxgrid",
        "jqxgrid.export": "jqwidgets/js/jqxgrid.export",
        "jqxgrid.sort": "jqwidgets/js/jqxgrid.sort",
        "jqxgrid.filter": "jqwidgets/js/jqxgrid.filter",
        "jqxgrid.pager": "jqwidgets/js/jqxgrid.pager",
        "jqxgrid.selection": "jqwidgets/js/jqxgrid.selection",
        "jqxgrid.zh-cn": "jqwidgets/js/jqxgrid.zh-cn",

        "jqxscrollbar": "jqwidgets/js/jqxscrollbar",
        "jqxbuttons": "jqwidgets/js/jqxbuttons",
        "jqxcheckbox": "jqwidgets/js/jqxcheckbox",
        "jqxmenu": "jqwidgets/js/jqxmenu",
        "jqxlistbox": "jqwidgets/js/jqxlistbox",
        "jqxdropdownlist": "jqwidgets/js/jqxdropdownlist",
        "jqxdropdownbutton": "jqwidgets/js/jqxdropdownbutton",
        "jqxtree": "jqwidgets/js/jqxtree",
        "jqxknockout": "jqwidgets/js/jqxknockout"
    },
    shim: {
        "knockout.mapping": {
            export: "ko",
            deps: ["knockout"]
        },
        "jqxcore": {
            export: "$",
            deps: ["jquery"]
        },
        "jqxdata": {
            export: "$",
            deps: ["jquery", "jqxcore"]
        },
        "jqxdata.export": {
            export: "$",
            deps: ["jquery", "jqxcore", "jqxdata"]
        },
        "jqxgrid": {
            export: "$",
            deps: ["jquery", "jqxcore", "jqxdata"]
        },
        "jqxgrid.export": {
            export: "$",
            deps: ["jquery", "jqxcore", "jqxdata.export", "jqxgrid"]
        },
        "jqxgrid.selection": {
            export: "$",
            deps: ["jquery", "jqxcore", "jqxgrid"]
        },
        "jqxgrid.sort": {
            export: "$",
            deps: ["jquery", "jqxcore", "jqxgrid"]
        },
        "jqxgrid.filter": {
            export: "$",
            deps: ["jquery", "jqxcore", "jqxgrid"]
        },
        "jqxgrid.pager": {
            export: "$",
            deps: ["jquery", "jqxcore", "jqxgrid"]
        },
        "jqxbuttons": {
            export: "$",
            deps: ["jquery", "jqxcore"]
        },
        "jqxscrollbar": {
            export: "$",
            deps: ["jquery", "jqxcore"]
        },
        "jqxmenu": {
            export: "$",
            deps: ["jquery", "jqxcore"]
        },
        "jqxlistbox": {
            export: "$",
            deps: ["jquery", "jqxcore"]
        },
        "jqxdropdownlist": {
            export: "$",
            deps: ["jquery", "jqxcore"]
        },
        "jqxdropdownbutton": {
            export: "$",
            deps: ["jquery", "jqxcore"]
        },
        "jqxtree": {
            export: "$",
            deps: ["jquery", "jqxcore"]
        },
        "jqxcheckbox": {
            export: "$",
            deps: ["jquery", "jqxcore"]
        },
        "parsley.zh-cn": ["parsley"]
    }
});
//#endregion
define(["jquery", "knockout", "knockout.mapping", "lodash", "jqxgrid.zh-cn", "sweetalert", "bootstrap", "parsley.zh-cn", "jqxknockout", "jqxcheckbox", "jqxscrollbar", "jqxbuttons", "jqxlistbox", "jqxdropdownlist", "jqxdropdownbutton", "jqxtree", "jqxmenu", "jqxgrid", "jqxgrid.selection", "jqxgrid.sort", "jqxgrid.filter", "jqxgrid.pager", "jqxgrid.export", "daterangepicker"],
    function ($, ko, kom, _, locale) {
        'use strict';

        //#region 页面基础操作
        function myMain() {
            var self = this, myGrid = $("#myGrid"), main = $(".content-wrapper");
            //ko视图模型
            self.viewModel = {
                //主窗体权限按钮控制
                myAuthorBtns: {
                    isAdd: ko.observable(true),
                    isRemove: ko.observable(true),
                    isEdit: ko.observable(true),
                    isSearch: ko.observable(true)
                },
                //设置表格搜索条件
                mySearchModel: {
                   
                },
                getData: function () {
                    var index = myGrid.jqxGrid('getselectedrowindex');
                    return myGrid.jqxGrid('getrowdata', index)
                },
                myAdd: function () {
                    _myModel1.show("新增");
                },
                myRemove: function () {
                    if (this.getData() == null) {
                        swal({
                            text: "请至少选择一条数据！",
                            icon: "info"
                        });
                    } else {
                        swal({
                            title: "确定删除选择项?",
                            icon: "warning",
                            buttons: ["取消", "确认"],
                        }).then(willDelete => {

                        });
                    }
                },
                myEdit: function () {
                    if (this.getData() == null) {
                        swal({
                            text: "请至少选择一条数据！",
                            icon: "info"
                        });
                    } else {
                        _myModel1.show("编辑");
                    }
                },
                mySearch: function () {
                    myGrid.jqxGrid('updatebounddata');
                }

            }
            //获取权限
            self.initAuthor = function () {

            }
            //初始化表格
            self.init = function (fn) {
                //加载外部函数
                if ($.isFunction(fn)) {
                    fn();
                }
                //获取按钮授权
                self.initAuthor();
                //绑定表格
                var source =
                {
                    type: "GET",
                    datatype: "json",
                    contenttype: "application/json",
                    datafields: [
                       
                    ],
                    url: "",
                    data: {},
                    processdata: function (data) {
                        $.each(self.mySearchModel, function (key, value) {
                            data[key] = value;
                        });
                    },
                    beforeprocessing: function (data) {
                        source.totalrecords = data.pagecount;
                    }
                }
                var dataAdapter = new $.jqx.dataAdapter(source, {
                    downloadComplete: function (data) {
                        var result = JSON.parse(data.Entity);
                        return result.data;
                    }
                });
                myGrid.jqxGrid(
                    {
                        localization: locale.localizationobj,
                        width: "100%",
                        pagermode: "simple",
                        pageable: true,
                        sortable: true,
                        source: dataAdapter,
                        virtualmode: true,
                        rendergridrows: function (obj) {
                            return obj.data;
                        },
                        columns: [
                          
                        ]
                    });
                ko.applyBindings(self.viewModel, main.get(0));
            }
        }
        //#endregion

        //#region myModel1
        function myModel1() {
            var self = this, myModel = $("#myModel1");
            self.viewModel = {
                title: ko.observable("编辑"),//窗体标题
                entity: {
                    
                },
                mySave: function () {
                    myModel.find("form").parsley().whenValidate().done(function () {

                    });
                }
            }
            self.show = function (title) {
                self.viewModel.title(title);
                myModel.modal("show");
            }
            self._resetBind = function (entity) {
                var node = myModel.find("form").get(0);
                ko.cleanNode(node);
                ko.applyBindings({ entity: kom.fromJS(entity) }, node);
            }
            self.init = function () {
                self.viewModel.oldEntity = kom.toJS(self.viewModel.entity);//表单NUll对象，便于重新绑定窗体使用
                myModel.on("shown.bs.modal", function () {
                    //由于ko.clendNode会清空所有当前dom操作，所以必须通过这种方式重新渲染
                }).on('hidden.bs.modal', function (e) {
                    myModel.find("form").parsley().reset();
                    self._resetBind(self.viewModel.oldEntity);
                });
                ko.applyBindings(self.viewModel, myModel.get(0));
            }
        }
        //#endregion

        var _myMain = new myMain();
        var _myModel1 = new myModel1();
        _myMain.init(function () {
            _myModel1.init();
        });

    });