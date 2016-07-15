var fluid_2_0_0=fluid_2_0_0||{};!function($,fluid){"use strict";fluid.defaults("fluid.prefs.enactor.speak",{gradeNames:"fluid.prefs.enactor",preferenceMap:{"fluid.prefs.speak":{"model.enabled":"default"}},components:{tts:{type:"fluid.textToSpeech",options:{model:"{speak}.model",invokers:{queueSpeech:{funcName:"fluid.prefs.enactor.speak.queueSpeech",args:["{that}","fluid.textToSpeech.queueSpeech","{arguments}.0","{arguments}.1","{arguments}.2"]}}}}}}),fluid.prefs.enactor.speak.queueSpeech=function(that,speechFn,text,interrupt,options){var str=text.toString();str=str.trim(),str.replace(/\s{2,}/gi," "),that.model.enabled&&str&&("string"==typeof speechFn?fluid.invokeGlobalFunction(speechFn,[that,str,interrupt,options]):speechFn(that,str,interrupt,options))},fluid.defaults("fluid.prefs.enactor.selfVoicing",{gradeNames:["fluid.prefs.enactor.speak","fluid.viewComponent"],modelListeners:{enabled:{listener:"{that}.handleSelfVoicing",args:["{change}.value"]}},invokers:{handleSelfVoicing:{funcName:"fluid.prefs.enactor.selfVoicing.handleSelfVoicing",args:["{that}.options.strings.welcomeMsg","{tts}.queueSpeech","{that}.readFromDOM","{tts}.cancel","{arguments}.0"]},readFromDOM:{funcName:"fluid.prefs.enactor.selfVoicing.readFromDOM",args:["{that}","{that}.container"]}},strings:{welcomeMsg:"text to speech enabled"}}),fluid.prefs.enactor.selfVoicing.handleSelfVoicing=function(welcomeMsg,queueSpeech,readFromDOM,cancel,enabled){enabled?(queueSpeech(welcomeMsg,!0),readFromDOM()):cancel()},fluid.prefs.enactor.selfVoicing.nodeType={ELEMENT_NODE:1,TEXT_NODE:3},fluid.prefs.enactor.selfVoicing.readFromDOM=function(that,elm){elm=$(elm);var nodes=elm.contents();fluid.each(nodes,function(node){if(node.nodeType===fluid.prefs.enactor.selfVoicing.nodeType.TEXT_NODE&&node.nodeValue&&that.tts.queueSpeech(node.nodeValue),node.nodeType===fluid.prefs.enactor.selfVoicing.nodeType.ELEMENT_NODE&&"none"!==window.getComputedStyle(node).display)if("IMG"===node.nodeName){var altText=node.getAttribute("alt");altText&&that.tts.queueSpeech(altText)}else fluid.prefs.enactor.selfVoicing.readFromDOM(that,node)})}}(jQuery,fluid_2_0_0);