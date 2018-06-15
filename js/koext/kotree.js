(function ($, ko) {
    ko.koTree = {
        viewModel: function (options) {

            /**
             * 注意 core 的所有参数已经剥离出来，需要单独定义，如 multiple，这样就不用在前端调用进行core参数传递,其他设置无变化
             * data 是自定义扩展数据，方便处理ajax动态加载
             * @param {url} 请求地址,一般情况是url字符串地址，不存在自己去实现ajax，如果看官方他是2种形式，一种是函数自己去获取，一种就是字符串地址
             * 'url' : function (node) {
                    return node.id === '#' ?
                        'ajax_roots.json' :
                        'ajax_children.json';
                    },
             * @param {data} 请求节点数据。如果没理解错官方的意思，如果要实现ajax动态加载，必须实现该函数，否则只是执行url以获取json数据
             * 'data' : function (node) {
                    return { 'id' : node.id };
                }
             */
            var self = this; _options = $.extend({}, { data: { "dataType": "json" }, localData: [], multiple: false }, options || {});
            var data = (typeof _options.localData.length == 0) ? _options.data : _options.localData;
            if (data != null) {
                _options = $.extend({}, { core: { data: data, multiple: _options.multiple } }, _options || {});
            }

            self.options = _options;
            /**
             * 获取当前选中节点
             */
            self.getNode = function () {
                var jt = self.tree.jstree(true);
                var ele = jt.get_selected();
                return jt.get_node(ele);
            }
            /**
             * 获取当前选中的上级节点
             */
            self.getParentNode = function () {
                var jt = self.tree.jstree(true);
                var ele = jt.get_selected();
                var parentId = jt.get_parent(ele);
                return jt.get_node(parentId);
            }
            /**
             * 刷新数据
             */
            self.refresh = function () {
                var jt = self.tree.jstree(true);
                if (self.options.data.url !== undefined) {
                    $.getJSON(self.options.data.url, {}, function (data) {
                        jt.settings.core.data = data;
                        jt.refresh();
                    });
                }
                else {
                    jt.refresh();
                }
            }
            /**
             * 获取选中的节点
             * @param {定义数据返回格式，false只返回id，true返回全部} flag 
             */
            self.getSelected = function (flag = false) {
                var jt = self.tree.jstree(true);
                return jt.get_selected(flag);
            }
        }
    }
    ko.bindingHandlers.koTree = {
        init: function () {
            return { controlsDescendantBindings: true };
        },
        update: function (element, valueAccessor) {
            var value = valueAccessor();
            value.tree = $(element).jstree(value.options);
        }
    };
})(jQuery, ko);