fluid.prefs.builder({
    gradeNames: ["fluid.prefs.auxSchema.starter"]
});

fluid.prefs.constructed.uie("body", {
    enhancer: {
        distributeOptions: [{
            record: "../infusion/src/components/tableOfContents/html/TableOfContents.html",
            target: "{that > fluid.prefs.enactor.tableOfContents}.options.tocTemplate"
        }]
    }
});
