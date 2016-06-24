var fluid_2_0_0=fluid_2_0_0||{};!function($,fluid){"use strict";fluid.XMLP=function(strXML){return fluid.XMLP.XMLPImpl(strXML)},fluid.XMLP.closedTags={abbr:!0,br:!0,col:!0,img:!0,input:!0,link:!0,meta:!0,param:!0,hr:!0,area:!0,embed:!0},fluid.XMLP._NONE=0,fluid.XMLP._ELM_B=1,fluid.XMLP._ELM_E=2,fluid.XMLP._ELM_EMP=3,fluid.XMLP._ATT=4,fluid.XMLP._TEXT=5,fluid.XMLP._ENTITY=6,fluid.XMLP._PI=7,fluid.XMLP._CDATA=8,fluid.XMLP._COMMENT=9,fluid.XMLP._DTD=10,fluid.XMLP._ERROR=11,fluid.XMLP._CONT_XML=0,fluid.XMLP._CONT_ALT=1,fluid.XMLP._ATT_NAME=0,fluid.XMLP._ATT_VAL=1,fluid.XMLP._STATE_PROLOG=1,fluid.XMLP._STATE_DOCUMENT=2,fluid.XMLP._STATE_MISC=3,fluid.XMLP._errs=[],fluid.XMLP._errs[fluid.XMLP.ERR_CLOSE_PI=0]="PI: missing closing sequence",fluid.XMLP._errs[fluid.XMLP.ERR_CLOSE_DTD=1]="DTD: missing closing sequence",fluid.XMLP._errs[fluid.XMLP.ERR_CLOSE_COMMENT=2]="Comment: missing closing sequence",fluid.XMLP._errs[fluid.XMLP.ERR_CLOSE_CDATA=3]="CDATA: missing closing sequence",fluid.XMLP._errs[fluid.XMLP.ERR_CLOSE_ELM=4]="Element: missing closing sequence",fluid.XMLP._errs[fluid.XMLP.ERR_CLOSE_ENTITY=5]="Entity: missing closing sequence",fluid.XMLP._errs[fluid.XMLP.ERR_PI_TARGET=6]="PI: target is required",fluid.XMLP._errs[fluid.XMLP.ERR_ELM_EMPTY=7]="Element: cannot be both empty and closing",fluid.XMLP._errs[fluid.XMLP.ERR_ELM_NAME=8]='Element: name must immediately follow "<"',fluid.XMLP._errs[fluid.XMLP.ERR_ELM_LT_NAME=9]='Element: "<" not allowed in element names',fluid.XMLP._errs[fluid.XMLP.ERR_ATT_VALUES=10]="Attribute: values are required and must be in quotes",fluid.XMLP._errs[fluid.XMLP.ERR_ATT_LT_NAME=11]='Element: "<" not allowed in attribute names',fluid.XMLP._errs[fluid.XMLP.ERR_ATT_LT_VALUE=12]='Attribute: "<" not allowed in attribute values',fluid.XMLP._errs[fluid.XMLP.ERR_ATT_DUP=13]="Attribute: duplicate attributes not allowed",fluid.XMLP._errs[fluid.XMLP.ERR_ENTITY_UNKNOWN=14]="Entity: unknown entity",fluid.XMLP._errs[fluid.XMLP.ERR_INFINITELOOP=15]="Infinite loop",fluid.XMLP._errs[fluid.XMLP.ERR_DOC_STRUCTURE=16]="Document: only comments, processing instructions, or whitespace allowed outside of document element",fluid.XMLP._errs[fluid.XMLP.ERR_ELM_NESTING=17]="Element: must be nested correctly",fluid.XMLP._checkStructure=function(that,iEvent){var stack=that.m_stack;if(fluid.XMLP._STATE_PROLOG==that.m_iState&&(that.m_iState=fluid.XMLP._STATE_DOCUMENT),fluid.XMLP._STATE_DOCUMENT===that.m_iState&&(fluid.XMLP._ELM_B!=iEvent&&fluid.XMLP._ELM_EMP!=iEvent||(that.m_stack[stack.length]=that.getName()),fluid.XMLP._ELM_E==iEvent||fluid.XMLP._ELM_EMP==iEvent)){if(0===stack.length)return fluid.XMLP._NONE;var strTop=stack[stack.length-1];if(that.m_stack.length--,null===strTop||strTop!==that.getName())return fluid.XMLP._setErr(that,fluid.XMLP.ERR_ELM_NESTING)}return iEvent},fluid.XMLP._parseCDATA=function(that,iB){var iE=that.m_xml.indexOf("]]>",iB);return-1==iE?fluid.XMLP._setErr(that,fluid.XMLP.ERR_CLOSE_CDATA):(fluid.XMLP._setContent(that,fluid.XMLP._CONT_XML,iB,iE),that.m_iP=iE+3,fluid.XMLP._CDATA)},fluid.XMLP._parseComment=function(that,iB){var iE=that.m_xml.indexOf("-->",iB);return-1==iE?fluid.XMLP._setErr(that,fluid.XMLP.ERR_CLOSE_COMMENT):(fluid.XMLP._setContent(that,fluid.XMLP._CONT_XML,iB-4,iE+3),that.m_iP=iE+3,fluid.XMLP._COMMENT)},fluid.XMLP._parseDTD=function(that,iB){var iE,strClose,iInt,iLast;if(iE=that.m_xml.indexOf(">",iB),-1==iE)return fluid.XMLP._setErr(that,fluid.XMLP.ERR_CLOSE_DTD);for(iInt=that.m_xml.indexOf("[",iB),strClose=-1!=iInt&&iE>iInt?"]>":">";;){if(iE==iLast)return fluid.XMLP._setErr(that,fluid.XMLP.ERR_INFINITELOOP);if(iLast=iE,iE=that.m_xml.indexOf(strClose,iB),-1==iE)return fluid.XMLP._setErr(that,fluid.XMLP.ERR_CLOSE_DTD);if("]]>"!=that.m_xml.substring(iE-1,iE+2))break}return that.m_iP=iE+strClose.length,fluid.XMLP._DTD},fluid.XMLP._parsePI=function(that,iB){var iE,iTB,iTE,iCB,iCE;return iE=that.m_xml.indexOf("?>",iB),-1==iE?fluid.XMLP._setErr(that,fluid.XMLP.ERR_CLOSE_PI):(iTB=fluid.SAXStrings.indexOfNonWhitespace(that.m_xml,iB,iE),-1==iTB?fluid.XMLP._setErr(that,fluid.XMLP.ERR_PI_TARGET):(iTE=fluid.SAXStrings.indexOfWhitespace(that.m_xml,iTB,iE),-1==iTE&&(iTE=iE),iCB=fluid.SAXStrings.indexOfNonWhitespace(that.m_xml,iTE,iE),-1==iCB&&(iCB=iE),iCE=fluid.SAXStrings.lastIndexOfNonWhitespace(that.m_xml,iCB,iE),-1==iCE&&(iCE=iE-1),that.m_name=that.m_xml.substring(iTB,iTE),fluid.XMLP._setContent(that,fluid.XMLP._CONT_XML,iCB,iCE+1),that.m_iP=iE+2,fluid.XMLP._PI))},fluid.XMLP._parseText=function(that,iB){var iE=that.m_xml.indexOf("<",iB);return-1==iE&&(iE=that.m_xml.length),fluid.XMLP._setContent(that,fluid.XMLP._CONT_XML,iB,iE),that.m_iP=iE,fluid.XMLP._TEXT},fluid.XMLP._setContent=function(that,iSrc){var args=arguments;fluid.XMLP._CONT_XML==iSrc?(that.m_cAlt=null,that.m_cB=args[2],that.m_cE=args[3]):(that.m_cAlt=args[2],that.m_cB=0,that.m_cE=args[2].length),that.m_cSrc=iSrc},fluid.XMLP._setErr=function(that,iErr){var strErr=fluid.XMLP._errs[iErr];return that.m_cAlt=strErr,that.m_cB=0,that.m_cE=strErr.length,that.m_cSrc=fluid.XMLP._CONT_ALT,fluid.XMLP._ERROR},fluid.XMLP._parseElement=function(that,iB){var iE,iDE,iType,strN;if(iDE=iE=that.m_xml.indexOf(">",iB),-1==iE)return fluid.XMLP._setErr(that,fluid.XMLP.ERR_CLOSE_ELM);if("/"==that.m_xml.charAt(iB)?(iType=fluid.XMLP._ELM_E,iB++):iType=fluid.XMLP._ELM_B,"/"==that.m_xml.charAt(iE-1)){if(iType==fluid.XMLP._ELM_E)return fluid.XMLP._setErr(that,fluid.XMLP.ERR_ELM_EMPTY);iType=fluid.XMLP._ELM_EMP,iDE--}that.nameRegex.lastIndex=iB;var nameMatch=that.nameRegex.exec(that.m_xml);if(!nameMatch)return fluid.XMLP._setErr(that,fluid.XMLP.ERR_ELM_NAME);if(strN=nameMatch[1].toLowerCase(),"li"===strN&&iType!==fluid.XMLP._ELM_E&&that.m_stack.length>0&&"li"===that.m_stack[that.m_stack.length-1]&&!that.m_emitSynthetic)return that.m_name="li",that.m_emitSynthetic=!0,fluid.XMLP._ELM_E;if(that.m_attributes={},that.m_cAlt="",that.nameRegex.lastIndex<iDE)for(that.m_iP=that.nameRegex.lastIndex;that.m_iP<iDE;){that.attrStartRegex.lastIndex=that.m_iP;var attrMatch=that.attrStartRegex.exec(that.m_xml);if(!attrMatch)return fluid.XMLP._setErr(that,fluid.XMLP.ERR_ATT_VALUES);var attrval,attrname=attrMatch[1].toLowerCase();if(61===that.m_xml.charCodeAt(that.attrStartRegex.lastIndex)){var valRegex=34===that.m_xml.charCodeAt(that.attrStartRegex.lastIndex+1)?that.attrValRegex:that.attrValIERegex;if(valRegex.lastIndex=that.attrStartRegex.lastIndex+1,attrMatch=valRegex.exec(that.m_xml),!attrMatch)return fluid.XMLP._setErr(that,fluid.XMLP.ERR_ATT_VALUES);attrval=attrMatch[1]}else attrval=attrname,valRegex=that.attrStartRegex;if(that.m_attributes[attrname]&&that.m_attributes[attrname]!==attrval)return fluid.XMLP._setErr(that,fluid.XMLP.ERR_ATT_DUP);that.m_attributes[attrname]=attrval,that.m_iP=valRegex.lastIndex}if(-1!=strN.indexOf("<"))return fluid.XMLP._setErr(that,fluid.XMLP.ERR_ELM_LT_NAME);if(that.m_name=strN,that.m_iP=iE+1,fluid.XMLP.closedTags[strN]){that.closeRegex.lastIndex=iE+1;var closeMatch=that.closeRegex.exec;if(closeMatch){var matchclose=that.m_xml.indexOf(strN,closeMatch.lastIndex);return matchclose===closeMatch.lastIndex?iType:fluid.XMLP._ELM_EMP}}return that.m_emitSynthetic=!1,iType},fluid.XMLP._parse=function(that){var iP=that.m_iP,xml=that.m_xml;if(iP===xml.length)return fluid.XMLP._NONE;var c=xml.charAt(iP);if("<"!==c)return fluid.XMLP._parseText(that,iP);var c2=xml.charAt(iP+1);return"?"===c2?fluid.XMLP._parsePI(that,iP+2):"!"!==c2?fluid.XMLP._parseElement(that,iP+1):iP===xml.indexOf("<!DOCTYPE",iP)?fluid.XMLP._parseDTD(that,iP+9):iP===xml.indexOf("<!--",iP)?fluid.XMLP._parseComment(that,iP+4):iP===xml.indexOf("<![CDATA[",iP)?fluid.XMLP._parseCDATA(that,iP+9):void 0},fluid.XMLP.XMLPImpl=function(strXML){var that={};return that.m_xml=strXML,that.m_iP=0,that.m_iState=fluid.XMLP._STATE_PROLOG,that.m_stack=[],that.m_attributes={},that.m_emitSynthetic=!1,that.getColumnNumber=function(){return fluid.SAXStrings.getColumnNumber(that.m_xml,that.m_iP)},that.getContent=function(){return that.m_cSrc==fluid.XMLP._CONT_XML?that.m_xml:that.m_cAlt},that.getContentBegin=function(){return that.m_cB},that.getContentEnd=function(){return that.m_cE},that.getLineNumber=function(){return fluid.SAXStrings.getLineNumber(that.m_xml,that.m_iP)},that.getName=function(){return that.m_name},that.next=function(){return fluid.XMLP._checkStructure(that,fluid.XMLP._parse(that))},that.nameRegex=/([^\s\/>]+)/g,that.attrStartRegex=/\s*([\w:_][\w:_\-\.]*)/gm,that.attrValRegex=/\"([^\"]*)\"\s*/gm,that.attrValIERegex=/([^\>\s]+)\s*/gm,that.closeRegex=/\s*<\//g,that},fluid.SAXStrings={},fluid.SAXStrings.WHITESPACE=" 	\n\r",fluid.SAXStrings.QUOTES="\"'",fluid.SAXStrings.getColumnNumber=function(strD,iP){if(!strD)return-1;iP=iP||strD.length;var arrD=strD.substring(0,iP).split("\n");arrD.length--;var iLinePos=arrD.join("\n").length;return iP-iLinePos},fluid.SAXStrings.getLineNumber=function(strD,iP){return strD?(iP=iP||strD.length,strD.substring(0,iP).split("\n").length):-1},fluid.SAXStrings.indexOfNonWhitespace=function(strD,iB,iE){if(!strD)return-1;iB=iB||0,iE=iE||strD.length;for(var i=iB;iE>i;++i){var c=strD.charAt(i);if(" "!==c&&"	"!==c&&"\n"!==c&&"\r"!==c)return i}return-1},fluid.SAXStrings.indexOfWhitespace=function(strD,iB,iE){if(!strD)return-1;iB=iB||0,iE=iE||strD.length;for(var i=iB;iE>i;i++)if(-1!=fluid.SAXStrings.WHITESPACE.indexOf(strD.charAt(i)))return i;return-1},fluid.SAXStrings.lastIndexOfNonWhitespace=function(strD,iB,iE){if(!strD)return-1;iB=iB||0,iE=iE||strD.length;for(var i=iE-1;i>=iB;i--)if(-1==fluid.SAXStrings.WHITESPACE.indexOf(strD.charAt(i)))return i;return-1},fluid.SAXStrings.replace=function(strD,iB,iE,strF,strR){return strD?(iB=iB||0,iE=iE||strD.length,strD.substring(iB,iE).split(strF).join(strR)):""}}(jQuery,fluid_2_0_0);