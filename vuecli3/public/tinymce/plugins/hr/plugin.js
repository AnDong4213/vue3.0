/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 */
!function(){"use strict";tinymce.util.Tools.resolve("tinymce.PluginManager").add("hr",function(n){var o,t;function e(){return t.execCommand("InsertHorizontalRule")}(o=n).addCommand("InsertHorizontalRule",function(){o.execCommand("mceInsertContent",!1,"<hr />")}),(t=n).ui.registry.addButton("hr",{icon:"horizontal-rule",tooltip:"Horizontal line",onAction:e}),t.ui.registry.addMenuItem("hr",{icon:"horizontal-rule",text:"Horizontal line",onAction:e})})}();