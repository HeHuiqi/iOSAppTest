var http = require('http');
var fs = require('fs');
var url = require('url');
var port = 8081;

function hasSuffix(str,suffix) {
 return str.indexOf(suffix,this.length - suffix.length)!==-1;
};
// 创建服务器
http.createServer( function (request, response) {
   // 解析请求，包括文件名
   var pathname = url.parse(request.url).pathname;

   // 输出请求的文件名
   console.log("Request for " + pathname + " received.");

   // 从文件系统中读取请求的文件内容
   console.log("pathname=="+pathname);
   if (pathname == '/') {
      pathname = '/index.html';
   }
   fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
         console.log(err);
         // HTTP 状态码: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
         response.write("页面未找到");
      }else{
         // HTTP 状态码: 200 : OK
         // Content Type: text/plain
         if (hasSuffix(pathname,'html')) {
             response.writeHead(200, {'Content-Type': 'text/html'});
             response.write(data.toString());
         }else if (hasSuffix(pathname,'png')){
              response.writeHead(200, {"Content-Type": "image/png"});
              response.write(data,'binary');
          }else{
              response.writeHead(200, "Ok");
              response.write(data,'binary');
          }
      }
      response.end();
   });
}).listen(port);

//获取本机IP地址
var os=require('os'),
    iptable={},
    ifaces=os.networkInterfaces();
for (var dev in ifaces) {
  ifaces[dev].forEach(function(details,alias){
    if (details.family=='IPv4') {
      iptable[dev+(alias?':'+alias:'')]=details.address;
    }
  });
}
console.log(iptable);
console.log('Server running at http://'+iptable['en0:1']+':8081/');
