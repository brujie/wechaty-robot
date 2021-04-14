var convert = require('xml-js')

function pareseXmlToJson(xml){
    var json = convert.xml2json(xml,{compact: true, spaces: 4})
    return json
}

function pareseJsonToXml(json){
    var options = {compact: true, ignoreComment: true, spaces: 4}
    var xml = convert.json2xml(json,options)
    return xml
}

function pareMiniProgramMsg(msg){
    var str = msg.replace(/'\n'/g,'').replace(/'\t'/g,'').replace(/'\'/g,'')
    return str
}

module.exports = {
    pareseXmlToJson,
    pareseJsonToXml,
    pareMiniProgramMsg
}


