fs = require 'fs'
inbox = require 'inbox'

process.stdin.resume()

process.stdin.on 'data',(data)->
	process.stdout.write 'ttt->' + data

buf = new Buffer 256
len = buf.write '哈哈',0
console.log buf.toString 'utf8',0,len
###
options = 
	 secureConnection: true
	 auth:
	 	user:'paul.wu@radicasys.com'
	 	pass:'HAha12345'
client = inbox.createConnection 993,'outlook.office365.com',options

client.on 'connect' , =>
	console.log "success connect"
	client.openMailbox 'INBOX',(error,info)->
		if error 
			throw error
		client.on 'new' , ->
			console.log 'new message'
		client.listMessages -5,(err , msgs)->
			for msg in msgs
				client.fetchData msg.UID ,->
					console.log msg


client.connect()
###









