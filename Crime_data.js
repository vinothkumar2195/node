var fs=require('fs');
var writeStream = fs.createWriteStream("barchart1.json")
var lineReader = require('readline').createInterface({
  input: fs.createReadStream('crimes2001onwards.csv')
  //output: fs.createwriteStream('barchart1.json.csv')
});


var headerarray = [];
var contentarray = [];
var JSONarray = [];
var JSONarray2 = [];
var over = [];
var under = [];
var assault_true = [];
var assault_false = [];
for(var v=2001;v<=2016;v++)
{
  over[v]=0;
  under[v]=0;
  assault_true[v]=0;
  assault_false[v]=0;

}
var count=0;
var i = 0;
var j=0;
lineReader.on('line', function (line) {
  if(i === 0){
    headerarray = line.split(",");
    i++;
  }
  else {
    var currentLineData =line.split(",");
    for(var year=2001;year<=2016;year++) {
      if(" "+currentLineData[17]==" "+year)
      {
        if(currentLineData[6]=="OVER $500")
        {
          over[year]++;
        }
        else if(currentLineData[6]=="$500 AND UNDER")
        {
          under[year]++;
        }
        if(currentLineData[5]=="ASSAULT" && currentLineData[8]=="true" )
        {
          assault_true[year]++;
        }
        else {
          assault_false[year]++;
        }
      }
    }



  }
});
lineReader.on('close',function()
{

  for(var k=2001;k<=2016;k++)
  {
    var JSONobject={};
    JSONobject["year"]=k;
    JSONobject["OVER $500"]=over[k];
    JSONobject["$500 AND UNDER"]=under[k];
    var JSONobject_assault={};
    JSONobject_assault["year"]=k;
    JSONobject_assault["True"]=assault_true[k];
    JSONobject_assault["False"]=assault_false[k];
    //console.log(assault_true[k]+" "+assault_false[k]);
    //console.log(count);
    JSONarray.push(JSONobject);
    JSONarray2.push(JSONobject_assault);
    //console.log(k+" "+over[k]+" "+under[k]);
  }
  //var jso=JSON.stringify(JSONarray);
  writeStream.write(JSON.stringify(JSONarray));
  writeStream.write(JSON.stringify(JSONarray2));
//  fs.appendFile('barchart1.json',jso,function(err) {});
//  var jso1=JSON.stringify(JSONarray2);
//  fs.appendFile('barchart2.json',jso1,function(err){});

});
