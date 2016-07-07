/*
Copyright 2013 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

var fluid_2_0_0 = fluid_2_0_0 || {};
(function ($, fluid) {
    "use strict";

    // Gradename to invoke "fluid.uiOptions.prefsEditor"
    fluid.prefs.builder({
        gradeNames: ["fluid.prefs.auxSchema.starter"]
    });

    fluid.defaults("fluid.uiOptions.prefsEditor", {
        gradeNames: ["fluid.prefs.constructed.prefsEditor", "{that}.getLazyLoadGrade"],
        lazyLoad: false,
        distributeOptions: [{
            source: "{that}.options.tocTemplate",
            target: "{that uiEnhancer}.options.tocTemplate"
        }, {
            source: "{that}.options.ignoreForToC",
            target: "{that uiEnhancer}.options.ignoreForToC"
        }],
        enhancer: {
            distributeOptions: [{
                source: "{that}.options.tocTemplate",
                target: "{that > fluid.prefs.enactor.tableOfContents}.options.tocTemplate"
            }, {
                source: "{that}.options.ignoreForToC",
                target: "{that > fluid.prefs.enactor.tableOfContents}.options.ignoreForToC"
            }]
        },
        invokers: {
            getLazyLoadGrade: {
                funcName: "fluid.uiOptions.prefsEditor.getLazyLoadGrade",
                args: ["{that}.options.lazyLoad"]
            }
        }
    });

    fluid.uiOptions.prefsEditor.getLazyLoadGrade = function (lazyLoad) {
        if (lazyLoad) {
            return "fluid.uiOptions.prefsEditor.lazyLoad";
        }
    };

    fluid.defaults("fluid.uiOptions.prefsEditor.lazyLoad", {
        distributeOptions: {
            record: "fluid.prefs.separatedPanel.lazyLoad",
            target: "{that separatedPanel}.options.gradeNames"
        }
    });

})(jQuery, fluid_2_0_0);