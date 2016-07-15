var fluid_2_0_0=fluid_2_0_0||{};!function(fluid){"use strict";fluid.defaults("fluid.prefs.termsAware"),fluid.defaults("fluid.prefs.auxSchema.starter",{gradeNames:["fluid.prefs.auxSchema"],auxiliarySchema:{loaderGrades:["fluid.prefs.separatedPanel"],namespace:"fluid.prefs.constructed",terms:{templatePrefix:"../../framework/preferences/html",messagePrefix:"../../framework/preferences/messages"},template:"%templatePrefix/SeparatedPanelPrefsEditor.html",message:"%messagePrefix/prefsEditor.json",textSize:{type:"fluid.prefs.textSize",enactor:{type:"fluid.prefs.enactor.textSize"},panel:{type:"fluid.prefs.panel.textSize",container:".flc-prefsEditor-text-size",template:"%templatePrefix/PrefsEditorTemplate-textSize.html",message:"%messagePrefix/textSize.json"}},lineSpace:{type:"fluid.prefs.lineSpace",enactor:{type:"fluid.prefs.enactor.lineSpace",fontSizeMap:{"xx-small":"9px","x-small":"11px",small:"13px",medium:"15px",large:"18px","x-large":"23px","xx-large":"30px"}},panel:{type:"fluid.prefs.panel.lineSpace",container:".flc-prefsEditor-line-space",template:"%templatePrefix/PrefsEditorTemplate-lineSpace.html",message:"%messagePrefix/lineSpace.json"}},textFont:{type:"fluid.prefs.textFont",classes:{"default":"",times:"fl-font-times",comic:"fl-font-comic-sans",arial:"fl-font-arial",verdana:"fl-font-verdana"},enactor:{type:"fluid.prefs.enactor.textFont",classes:"@textFont.classes"},panel:{type:"fluid.prefs.panel.textFont",container:".flc-prefsEditor-text-font",classnameMap:{textFont:"@textFont.classes"},template:"%templatePrefix/PrefsEditorTemplate-textFont.html",message:"%messagePrefix/textFont.json"}},contrast:{type:"fluid.prefs.contrast",classes:{"default":"fl-theme-prefsEditor-default",bw:"fl-theme-prefsEditor-bw fl-theme-bw",wb:"fl-theme-prefsEditor-wb fl-theme-wb",by:"fl-theme-prefsEditor-by fl-theme-by",yb:"fl-theme-prefsEditor-yb fl-theme-yb",lgdg:"fl-theme-prefsEditor-lgdg fl-theme-lgdg"},enactor:{type:"fluid.prefs.enactor.contrast",classes:"@contrast.classes"},panel:{type:"fluid.prefs.panel.contrast",container:".flc-prefsEditor-contrast",classnameMap:{theme:"@contrast.classes"},template:"%templatePrefix/PrefsEditorTemplate-contrast.html",message:"%messagePrefix/contrast.json"}},tableOfContents:{type:"fluid.prefs.tableOfContents",enactor:{type:"fluid.prefs.enactor.tableOfContents",tocTemplate:"../../components/tableOfContents/html/TableOfContents.html"},panel:{type:"fluid.prefs.panel.layoutControls",container:".flc-prefsEditor-layout-controls",template:"%templatePrefix/PrefsEditorTemplate-layout.html",message:"%messagePrefix/tableOfContents.json"}},emphasizeLinks:{type:"fluid.prefs.emphasizeLinks",enactor:{type:"fluid.prefs.enactor.emphasizeLinks",cssClass:"fl-link-enhanced"},panel:{type:"fluid.prefs.panel.emphasizeLinks",container:".flc-prefsEditor-emphasizeLinks",template:"%templatePrefix/PrefsEditorTemplate-emphasizeLinks.html",message:"%messagePrefix/emphasizeLinks.json"}},inputsLarger:{type:"fluid.prefs.inputsLarger",enactor:{type:"fluid.prefs.enactor.inputsLarger",cssClass:"fl-text-larger"},panel:{type:"fluid.prefs.panel.inputsLarger",container:".flc-prefsEditor-inputsLarger",template:"%templatePrefix/PrefsEditorTemplate-inputsLarger.html",message:"%messagePrefix/inputsLarger.json"}},groups:{linksControls:{container:".flc-prefsEditor-links-controls",template:"%templatePrefix/PrefsEditorTemplate-linksControls.html",message:"%messagePrefix/linksControls.json",type:"fluid.prefs.panel.linksControls",panels:["emphasizeLinks","inputsLarger"]}}}}),fluid.defaults("fluid.prefs.schemas.textSize",{gradeNames:["fluid.prefs.schemas"],schema:{"fluid.prefs.textSize":{type:"number","default":1,minimum:1,maximum:2,divisibleBy:.1}}}),fluid.defaults("fluid.prefs.schemas.lineSpace",{gradeNames:["fluid.prefs.schemas"],schema:{"fluid.prefs.lineSpace":{type:"number","default":1,minimum:1,maximum:2,divisibleBy:.1}}}),fluid.defaults("fluid.prefs.schemas.textFont",{gradeNames:["fluid.prefs.schemas"],schema:{"fluid.prefs.textFont":{type:"string","default":"default","enum":["default","times","comic","arial","verdana"]}}}),fluid.defaults("fluid.prefs.schemas.contrast",{gradeNames:["fluid.prefs.schemas"],schema:{"fluid.prefs.contrast":{type:"string","default":"default","enum":["default","bw","wb","by","yb","lgdg"]}}}),fluid.defaults("fluid.prefs.schemas.tableOfContents",{gradeNames:["fluid.prefs.schemas"],schema:{"fluid.prefs.tableOfContents":{type:"boolean","default":!1}}}),fluid.defaults("fluid.prefs.schemas.emphasizeLinks",{gradeNames:["fluid.prefs.schemas"],schema:{"fluid.prefs.emphasizeLinks":{type:"boolean","default":!1}}}),fluid.defaults("fluid.prefs.schemas.inputsLarger",{gradeNames:["fluid.prefs.schemas"],schema:{"fluid.prefs.inputsLarger":{type:"boolean","default":!1}}})}(fluid_2_0_0);