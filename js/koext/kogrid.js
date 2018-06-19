(function ($, ko) {
    ko.koGrid = {
        viewModel: function (options) {

            /**
             * columns 包含以下字段
             * @param {显示文本}  text 
             * @param {数据字段}  datafield 
             * @param {单元格宽度}  width 
             * @param {数据类型}  type 
             * @param {表头分组标识} columngroup
             */

            var self = this; _options = $.extend({}, {
                width: $(".content-wrapper").width(), datatype: "json", columns: [], localdata: [], url: "", columnsresize: true,
                selectionmode: "checkbox",
                columngroups: [],
                sortable: true,
                pageable: true
            }, options || {});
            //处理source-->datafields字段
            var _fields = [];
            $.each(_options.columns, function (i, o) {
                var item = { name: o.datafield };
                if (o.type !== undefined) {
                    item.type = o.type;
                }
                _fields.push(item);
            });
            var _source =
            {
                datatype: _options.datatype,
                datafields: _fields
            };
            //判断数据处理方式，一旦传入了url代表需要请求远程api，反之则使用本地数据展示
            if (_options.localdata.length!=0) {
                _source.localdata = _options.localdata;
            }else if(_options.url != ""){
                _source.url=_options.url;
            }
            //数据适配器
            var _dataAdapter = new $.jqx.dataAdapter(_source);
            //合并grid参数
            var _gridOptions = {
                width: _options.width,
                source: _dataAdapter,
                columnsresize: _options.columnsresize,
                selectionmode: _options.selectionmode,
                columns: _options.columns,
                columngroups: _options.columngroups,
                sortable: _options.sortable,
                pageable: _options.pageable
            }
            self.options = _gridOptions;


            ////////////////////////////////////////////////////华丽的分割，未完待续，以下是所有函数封装/////////////////////////////////////////////////////////////
            self.refresh = function () {
                self.grid.jqxGrid('updatebounddata', 'cells');
            }
            self.getselectdata = function () {
                var indexs = self.grid.jqxGrid('getselectedrowindexes');
                var datas = [];
                $.each(indexs, function (i, index) {
                    var row = self.grid.jqxGrid('getrowdata', index)
                    datas.push(row);
                });
                return datas;
            }
            /**
             * 根据需要自行传入相应类型 默认为excel
             * 支持 xls，xml，csv，tsv，html，json，pdf
             * @param {导出类型} type 
             */
            self.exportdata = function (type = "xls") {
                self.grid.jqxGrid('exportdata', type, "jqxGrid");
            }

        }
    }
    ko.bindingHandlers.koGrid = {
        init: function () {
            return { controlsDescendantBindings: true };
        },
        update: function (element, valueAccessor) {
            var value = valueAccessor();
            value.grid = $(element).jqxGrid(value.options);
        }
    };
})(jQuery, ko);
