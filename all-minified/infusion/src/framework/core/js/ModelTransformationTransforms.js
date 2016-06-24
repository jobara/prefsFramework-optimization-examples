var fluid_2_0_0=fluid_2_0_0||{},fluid=fluid||fluid_2_0_0;!function($,fluid){"use strict";fluid.registerNamespace("fluid.model.transform"),fluid.registerNamespace("fluid.transforms"),fluid.defaults("fluid.transforms.value",{gradeNames:"fluid.standardTransformFunction",invertConfiguration:"fluid.identity"}),fluid.transforms.value=fluid.identity,fluid.transforms.identity=fluid.transforms.value,fluid.defaults("fluid.transforms.identity",{gradeNames:"fluid.transforms.value"}),fluid.transforms.invertToIdentity=function(transformSpec){return transformSpec.type="fluid.transforms.identity",transformSpec},fluid.defaults("fluid.transforms.literalValue",{gradeNames:"fluid.standardOutputTransformFunction"}),fluid.transforms.literalValue=function(transformSpec){return transformSpec.input},fluid.defaults("fluid.transforms.stringToNumber",{gradeNames:["fluid.standardTransformFunction","fluid.lens"],invertConfiguration:"fluid.transforms.stringToNumber.invert"}),fluid.transforms.stringToNumber=function(value){var newValue=Number(value);return isNaN(newValue)?void 0:newValue},fluid.transforms.stringToNumber.invert=function(transformSpec){return transformSpec.type="fluid.transforms.numberToString",transformSpec},fluid.defaults("fluid.transforms.numberToString",{gradeNames:["fluid.standardTransformFunction","fluid.lens"],invertConfiguration:"fluid.transforms.numberToString.invert"}),fluid.transforms.numberToString=function(value){return"number"!=typeof value?void 0:""+value},fluid.transforms.numberToString.invert=function(transformSpec){return transformSpec.type="fluid.transforms.stringToNumber",transformSpec},fluid.defaults("fluid.transforms.count",{gradeNames:"fluid.standardTransformFunction"}),fluid.transforms.count=function(value){return fluid.makeArray(value).length},fluid.defaults("fluid.transforms.round",{gradeNames:["fluid.standardTransformFunction","fluid.lens"],invertConfiguration:"fluid.transforms.invertToIdentity"}),fluid.transforms.round=function(value){return Math.round(value)},fluid.defaults("fluid.transforms.delete",{gradeNames:"fluid.transformFunction"}),fluid.transforms["delete"]=function(transformSpec,transformer){var outputPath=fluid.model.composePaths(transformer.outputPrefix,transformSpec.outputPath);transformer.applier.change(outputPath,null,"DELETE")},fluid.defaults("fluid.transforms.firstValue",{gradeNames:"fluid.standardOutputTransformFunction"}),fluid.transforms.firstValue=function(transformSpec,transformer){transformSpec.values&&transformSpec.values.length||fluid.fail('firstValue transformer requires an array of values at path named "values", supplied',transformSpec);for(var i=0;i<transformSpec.values.length;i++){var value=transformSpec.values[i],expanded=transformer.expand(value);if(void 0!==expanded)return expanded}},fluid.defaults("fluid.transforms.linearScale",{gradeNames:["fluid.multiInputTransformFunction","fluid.standardTransformFunction","fluid.lens"],invertConfiguration:"fluid.transforms.linearScale.invert",inputVariables:{factor:1,offset:0}}),fluid.transforms.linearScale=function(input,extraInputs){var factor=extraInputs.factor(),offset=extraInputs.offset();return"number"==typeof input&&"number"==typeof factor&&"number"==typeof offset?input*factor+offset:void 0},fluid.transforms.linearScale.invert=function(transformSpec){return delete transformSpec.factorPath,delete transformSpec.offsetPath,void 0!==transformSpec.factor&&(transformSpec.factor=0===transformSpec.factor?0:1/transformSpec.factor),void 0!==transformSpec.offset&&(transformSpec.offset=-transformSpec.offset*(void 0!==transformSpec.factor?transformSpec.factor:1)),transformSpec},fluid.defaults("fluid.transforms.binaryOp",{gradeNames:["fluid.multiInputTransformFunction","fluid.standardOutputTransformFunction"],inputVariables:{left:null,right:null}}),fluid.transforms.binaryLookup={"===":function(a,b){return fluid.model.isSameValue(a,b)},"!==":function(a,b){return!fluid.model.isSameValue(a,b)},"<=":function(a,b){return b>=a},"<":function(a,b){return b>a},">=":function(a,b){return a>=b},">":function(a,b){return a>b},"+":function(a,b){return a+b},"-":function(a,b){return a-b},"*":function(a,b){return a*b},"/":function(a,b){return a/b},"%":function(a,b){return a%b},"&&":function(a,b){return a&&b},"||":function(a,b){return a||b}},fluid.transforms.binaryOp=function(inputs,transformSpec,transformer){var left=inputs.left(),right=inputs.right(),operator=fluid.model.transform.getValue(void 0,transformSpec.operator,transformer),fun=fluid.transforms.binaryLookup[operator];return void 0===fun||void 0===left||void 0===right?void 0:fun(left,right)},fluid.defaults("fluid.transforms.condition",{gradeNames:["fluid.multiInputTransformFunction","fluid.standardOutputTransformFunction"],inputVariables:{"true":null,"false":null,condition:null}}),fluid.transforms.condition=function(inputs){var condition=inputs.condition();if(null!==condition)return inputs[condition?"true":"false"]()},fluid.defaults("fluid.transforms.valueMapper",{gradeNames:["fluid.transformFunction","fluid.lens"],invertConfiguration:"fluid.transforms.valueMapper.invert",collectInputPaths:"fluid.transforms.valueMapper.collect"}),fluid.model.transform.compareMatches=function(speca,specb){return specb.matchValue-speca.matchValue},fluid.model.transform.matchValueMapperFull=function(outerValue,transformSpec,transformer){var o=transformSpec.options;0===o.length&&fluid.fail("valueMapper supplied empty list of options: ",transformSpec);for(var matchPower=[],i=0;i<o.length;++i){var option=o[i],value=fluid.firstDefined(fluid.model.transform.getValue(option.inputPath,void 0,transformer),outerValue),matchValue=fluid.model.transform.matchValue(option.undefinedInputValue?void 0:void 0===option.inputValue?transformSpec.defaultInputValue:option.inputValue,value,transformSpec.partialMatches||option.partialMatches);matchPower[i]={index:i,matchValue:matchValue}}return matchPower.sort(fluid.model.transform.compareMatches),matchPower[0].matchValue<=0||o.length>1&&matchPower[0].matchValue===matchPower[1].matchValue?-1:matchPower[0].index},fluid.transforms.valueMapper=function(transformSpec,transformer){transformSpec.options||fluid.fail('valueMapper requires a list or hash of options at path named "options", supplied ',transformSpec);var value=fluid.model.transform.getValue(transformSpec.inputPath,void 0,transformer),deref=fluid.isArrayable(transformSpec.options)?function(testVal){var index=fluid.model.transform.matchValueMapperFull(testVal,transformSpec,transformer);return-1===index?null:transformSpec.options[index]}:function(testVal){return transformSpec.options[testVal]},indexed=deref(value);if(indexed||(indexed=deref(transformSpec.defaultInputValue)),indexed){var outputPath=void 0===indexed.outputPath?transformSpec.defaultOutputPath:indexed.outputPath;transformer.outputPrefixOp.push(outputPath);var outputValue;return fluid.isPrimitive(indexed)?outputValue=indexed:indexed.undefinedOutputValue?outputValue=void 0:(outputValue=fluid.model.transform.resolveParam(indexed,transformer,"outputValue",void 0),outputValue=void 0===outputValue?transformSpec.defaultOutputValue:outputValue),"string"==typeof outputPath&&void 0!==outputValue&&(fluid.model.transform.setValue(void 0,outputValue,transformer,transformSpec.merge),outputValue=void 0),transformer.outputPrefixOp.pop(),outputValue}},fluid.transforms.valueMapper.invert=function(transformSpec,transformer){var options=[],togo={type:"fluid.transforms.valueMapper",options:options},isArray=fluid.isArrayable(transformSpec.options),findCustom=function(name){return fluid.find(transformSpec.options,function(option){return option[name]?!0:void 0})},anyCustomOutput=findCustom("outputPath"),anyCustomInput=findCustom("inputPath");anyCustomOutput||(togo.inputPath=fluid.model.composePaths(transformer.outputPrefix,transformSpec.defaultOutputPath)),anyCustomInput||(togo.defaultOutputPath=fluid.model.composePaths(transformer.inputPrefix,transformSpec.inputPath));var def=fluid.firstDefined;return fluid.each(transformSpec.options,function(option,key){var outOption={},origInputValue=def(isArray?option.inputValue:key,transformSpec.defaultInputValue);void 0===origInputValue&&fluid.fail("Failure inverting configuration for valueMapper - inputValue could not be resolved for record "+key+": ",transformSpec),outOption.outputValue=fluid.model.transform.literaliseValue(origInputValue);var origOutputValue=def(option.outputValue,transformSpec.defaultOutputValue);outOption.inputValue=fluid.model.transform.getValue(option.outputValuePath,origOutputValue,transformer),anyCustomOutput&&(outOption.inputPath=fluid.model.composePaths(transformer.outputPrefix,def(option.outputPath,transformSpec.outputPath))),anyCustomInput&&(outOption.outputPath=fluid.model.composePaths(transformer.inputPrefix,def(option.inputPath,transformSpec.inputPath))),option.outputValuePath&&(outOption.inputValuePath=option.outputValuePath),options.push(outOption)}),togo},fluid.transforms.valueMapper.collect=function(transformSpec,transformer){var togo=[];return fluid.model.transform.accumulateInputPath(transformSpec.inputPath,transformer,togo),fluid.each(transformSpec.options,function(option){fluid.model.transform.accumulateInputPath(option.inputPath,transformer,togo)}),togo},fluid.defaults("fluid.transforms.arrayToSetMembership",{gradeNames:["fluid.standardTransformFunction","fluid.lens"],invertConfiguration:"fluid.transforms.arrayToSetMembership.invert"}),fluid.transforms.arrayToSetMembership=function(value,transformSpec,transformer){var output={},options=transformSpec.options;return value&&fluid.isArrayable(value)||fluid.fail("arrayToSetMembership didn't find array at inputPath nor passed as value.",transformSpec),options||fluid.fail("arrayToSetMembership requires an options block set"),void 0===transformSpec.presentValue&&(transformSpec.presentValue=!0),void 0===transformSpec.missingValue&&(transformSpec.missingValue=!1),fluid.each(options,function(outPath,key){var outVal=-1!==value.indexOf(key)?transformSpec.presentValue:transformSpec.missingValue;fluid.set(output,outPath,outVal,transformer.resolverSetConfig)}),output},fluid.transforms.arrayToSetMembership.invertWithType=function(transformSpec,transformer,newType){transformSpec.type=newType;var newOptions={};return fluid.each(transformSpec.options,function(path,oldKey){newOptions[path]=oldKey}),transformSpec.options=newOptions,transformSpec},fluid.transforms.arrayToSetMembership.invert=function(transformSpec,transformer){return fluid.transforms.arrayToSetMembership.invertWithType(transformSpec,transformer,"fluid.transforms.setMembershipToArray")},fluid.defaults("fluid.transforms.setMembershipToArray",{gradeNames:["fluid.standardTransformFunction","fluid.lens"],invertConfiguration:"fluid.transforms.setMembershipToArray.invert"}),fluid.transforms.setMembershipToArray=function(input,transformSpec,transformer){var options=transformSpec.options;options||fluid.fail("setMembershipToArray requires an options block specified"),void 0===transformSpec.presentValue&&(transformSpec.presentValue=!0),void 0===transformSpec.missingValue&&(transformSpec.missingValue=!1);var outputArr=[];return fluid.each(options,function(outputVal,key){var value=fluid.get(input,key,transformer.resolverGetConfig);value===transformSpec.presentValue&&outputArr.push(outputVal)}),outputArr},fluid.transforms.setMembershipToArray.invert=function(transformSpec,transformer){return fluid.transforms.arrayToSetMembership.invertWithType(transformSpec,transformer,"fluid.transforms.arrayToSetMembership")},fluid.model.transform.applyPaths=function(operation,pathOp,paths){for(var i=0;i<paths.length;++i)"push"===operation?pathOp.push(paths[i]):pathOp.pop()},fluid.model.transform.expandInnerValues=function(inputPath,outputPath,transformer,innerValues){var inputPrefixOp=transformer.inputPrefixOp,outputPrefixOp=transformer.outputPrefixOp,apply=fluid.model.transform.applyPaths;apply("push",inputPrefixOp,inputPath),apply("push",outputPrefixOp,outputPath);var expanded={};return fluid.each(innerValues,function(innerValue){var expandedInner=transformer.expand(innerValue);fluid.isPrimitive(expandedInner)?expanded=expandedInner:$.extend(!0,expanded,expandedInner)}),apply("pop",outputPrefixOp,outputPath),apply("pop",inputPrefixOp,inputPath),expanded},fluid.defaults("fluid.transforms.indexArrayByKey",{gradeNames:["fluid.standardTransformFunction","fluid.lens"],invertConfiguration:"fluid.transforms.indexArrayByKey.invert"}),fluid.transforms.indexArrayByKey=function(arr,transformSpec,transformer){void 0===transformSpec.key&&fluid.fail("indexArrayByKey requires a 'key' option.",transformSpec),fluid.isArrayable(arr)||fluid.fail("indexArrayByKey didn't find array at inputPath.",transformSpec);var newHash={},pivot=transformSpec.key;return fluid.each(arr,function(v,k){var newKey=v[pivot],keyType=typeof newKey;"string"!==keyType&&"boolean"!==keyType&&"number"!==keyType&&fluid.fail("indexArrayByKey encountered untransformable array due to missing or invalid key",v);var content=fluid.copy(v);delete content[pivot],transformSpec.innerValue&&(content=fluid.model.transform.expandInnerValues([transformer.inputPrefix,transformSpec.inputPath,k.toString()],[transformSpec.outputPath,newKey],transformer,transformSpec.innerValue)),newHash[newKey]=content}),newHash},fluid.transforms.indexArrayByKey.invert=function(transformSpec){if(transformSpec.type="fluid.transforms.deindexIntoArrayByKey",transformSpec.innerValue)for(var innerValue=transformSpec.innerValue,i=0;i<innerValue.length;++i)innerValue[i]=fluid.model.transform.invertConfiguration(innerValue[i]);return transformSpec},fluid.defaults("fluid.transforms.deindexIntoArrayByKey",{gradeNames:["fluid.standardTransformFunction","fluid.lens"],invertConfiguration:"fluid.transforms.deindexIntoArrayByKey.invert"}),fluid.transforms.deindexIntoArrayByKey=function(hash,transformSpec,transformer){void 0===transformSpec.key&&fluid.fail('deindexIntoArrayByKey requires a "key" option.',transformSpec);var newArray=[],pivot=transformSpec.key;return fluid.each(hash,function(v,k){var content={};content[pivot]=k,transformSpec.innerValue&&(v=fluid.model.transform.expandInnerValues([transformSpec.inputPath,k],[transformSpec.outputPath,newArray.length.toString()],transformer,transformSpec.innerValue)),$.extend(!0,content,v),newArray.push(content)}),newArray},fluid.transforms.deindexIntoArrayByKey.invert=function(transformSpec){if(transformSpec.type="fluid.transforms.indexArrayByKey",transformSpec.innerValue)for(var innerValue=transformSpec.innerValue,i=0;i<innerValue.length;++i)innerValue[i]=fluid.model.transform.invertConfiguration(innerValue[i]);return transformSpec},fluid.defaults("fluid.transforms.limitRange",{gradeNames:"fluid.standardTransformFunction"}),fluid.transforms.limitRange=function(value,transformSpec){var min=transformSpec.min;if(void 0!==min){var excludeMin=transformSpec.excludeMin||0;min+=excludeMin,min>value&&(value=min)}var max=transformSpec.max;if(void 0!==max){var excludeMax=transformSpec.excludeMax||0;max-=excludeMax,value>max&&(value=max)}return value},fluid.defaults("fluid.transforms.indexOf",{gradeNames:["fluid.standardTransformFunction","fluid.lens"],invertConfiguration:"fluid.transforms.indexOf.invert"}),fluid.transforms.indexOf=function(value,transformSpec){"number"==typeof transformSpec.notFound&&transformSpec.notFound>=0&&fluid.fail("A positive number is not allowed as 'notFound' value for indexOf");var offset=fluid.transforms.parseIndexationOffset(transformSpec.offset,"indexOf"),array=fluid.makeArray(transformSpec.array),originalIndex=array.indexOf(value);return-1===originalIndex&&transformSpec.notFound?transformSpec.notFound:originalIndex+offset},fluid.transforms.indexOf.invert=function(transformSpec,transformer){var togo=fluid.transforms.invertArrayIndexation(transformSpec,transformer);return togo.type="fluid.transforms.dereference",togo},fluid.defaults("fluid.transforms.dereference",{gradeNames:["fluid.standardTransformFunction","fluid.lens"],invertConfiguration:"fluid.transforms.dereference.invert"}),fluid.transforms.dereference=function(value,transformSpec){if("number"==typeof value){var offset=fluid.transforms.parseIndexationOffset(transformSpec.offset,"dereference"),array=fluid.makeArray(transformSpec.array),index=value+offset;return array[index]}},fluid.transforms.dereference.invert=function(transformSpec,transformer){var togo=fluid.transforms.invertArrayIndexation(transformSpec,transformer);return togo.type="fluid.transforms.indexOf",togo},fluid.transforms.parseIndexationOffset=function(offset,transformName){var parsedOffset=0;return void 0!==offset&&(parsedOffset=fluid.parseInteger(offset),isNaN(parsedOffset)&&fluid.fail(transformName+' requires the value of "offset" to be an integer or a string that can be converted to an integer. '+offset+" is invalid.")),parsedOffset},fluid.transforms.invertArrayIndexation=function(transformSpec){return isNaN(Number(transformSpec.offset))||(transformSpec.offset=-1*Number(transformSpec.offset)),transformSpec},fluid.defaults("fluid.transforms.stringTemplate",{gradeNames:"fluid.standardOutputTransformFunction"}),fluid.transforms.stringTemplate=function(transformSpec){return fluid.stringTemplate(transformSpec.template,transformSpec.terms)},fluid.defaults("fluid.transforms.free",{gradeNames:"fluid.transformFunction"}),fluid.transforms.free=function(transformSpec){var args=fluid.makeArray(transformSpec.args);return fluid.invokeGlobalFunction(transformSpec.func,args)},fluid.defaults("fluid.transforms.quantize",{gradeNames:"fluid.standardTransformFunction"}),fluid.transforms.quantize=function(value,transformSpec,transform){transformSpec.ranges&&transformSpec.ranges.length||fluid.fail("fluid.transforms.quantize should have a key called ranges containing an array defining ranges to quantize");for(var i=0;i<transformSpec.ranges.length;i++){var rangeSpec=transformSpec.ranges[i];if(value<=rangeSpec.upperBound||void 0===rangeSpec.upperBound&&value>=Number.NEGATIVE_INFINITY)return fluid.isPrimitive(rangeSpec.output)?rangeSpec.output:transform.expand(rangeSpec.output)}},fluid.defaults("fluid.transforms.inRange",{gradeNames:"fluid.standardTransformFunction"}),fluid.transforms.inRange=function(value,transformSpec){return(void 0===transformSpec.min||transformSpec.min<=value)&&(void 0===transformSpec.max||transformSpec.max>=value)}}(jQuery,fluid_2_0_0);