server = require './lib/server'
Job = require './lib/job'
sock = require('axon').socket 'pub'
sock.bind 'tcp://127.0.0.1:2323'
#server.initServer()
#server.initWorker()
###
test = ()->
	num = 1000
	console.log '-----------------Test Start----------------'
	console.time 'Test'
	while num--
		server.acceptJob(new Job 'http://www.baidu.com',{image:__dirname + '/screen-shot/'},true)

setTimeout test , 10000
###
#setTimeout test , 20000
