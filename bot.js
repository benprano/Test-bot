var translate = require('yandex-translate')('trnsl.1.1.20190622T195840Z.883153fa386f31d1.c99c3dbf66751dcce3df205c6a54fb0a8bed502b')
io.on('connection', function (socket) {
  socket.on('translate message', function (msg) {
    translate.detect(msg, function(err,res){
    if(res.lang=='en'){
      translate.translate(msg, { from: 'en', to: 'vi' }, function (err, res) {
        socket.emit('translate message',res.text)
          })
    }
    else{
      socket.emit('translate message',msg)
    }
    })      
    io.emit('translate message', msg)
  })
})