var $ = jQuery.noConflict()
var cli = cli || {};
(function($) {
	'use strict'
	var title = $('.title')
	var terminal = $('.terminal')
	var prompt = '➜'
	var path = '~'
	var history = []
	var historyIndex = 0
	var command = ''
	var commands = [
		{
			name: 'clear',
			function: function() {
				terminal.text('')
			}
		}, {
			name: 'ls',
			function: function() {
				terminal.append('README  CONTACT\n')
			}
		}, {
			name: 'cat',
			function: function() {
			}
		}, {
			name: 'help',
			function: function() {
				// as well as some undocuments features for you to find
        terminal.append('Not much in terms of help atm. Wanna talk? try `email`\n')
			}
		}, {
			name: 'echo',
			function: function() {
			}
		}, {
			name: 'fortune',
			function: function() {
				// var xhr = new XMLHttpRequest();
				// xhr.open('GET', 'https://cdn.rawgit.com/bmc/fortunes/master/fortunes', false);
				// xhr.send(null);
				//
				// if (xhr.status === 200) {
				// 		var fortunes = xhr.responseText.split("%");
				// 		var fortune = fortunes[getRandomInt(0, fortunes.length)].trim();
				// 		terminal.append(fortune + "\n");
				// }
			}
		}, {
			name: 'cd',
			function: function() {
				terminal.append('\n')
			}
		}, {
			name: 'su',
			function: function() {
				terminal.append('You are now God\n')
			}
		}, {
			name: 'sudo',
			function: function() {
				terminal.append('You are now playing God\n')
			}
		}, {
			name: 'rm',
			function: function() {
				terminal.append('Leave my files alone!\n')
			}
		}, {
			name: 'del',
			function: function() {
				terminal.append('This is not dos\n')
			}
		}, {
			name: 'whoami',
			function: function() {
				terminal.append('email me <a href="mailto:c@meron.io">c@meron.io</a> and find out\n')
			}
		}, {
			name: 'twitter',
			function: function() {
				terminal.append('<a href="https://twitter.com/cameronrye">https://twitter.com/cameronrye</a>\n')
			}
		}, {
			name: 'website',
			function: function() {
				terminal.append('<a href="https://cameronrye.com/">https://cameronrye.com/</a>\n')
			}
		}, {
			name: 'email',
			function: function() {
				terminal.append('<a href="mailto:c@meron.io">c@meron.io</a>\n')
			}
		}, {
			name: 'github',
			function: function() {
				terminal.append('<a href="https://github.com/cameronrye">https://github.com/cameronrye</a>\n')
			}
		}
	]
	cli.init = function () {
		// set window title
		title.text('cameronrye@keybase')
		// display initial message
		terminal.append('# Welcome... Lost? try help 💁\n\n')
		cli.events()
		cli.prompt()
	}
	cli.prompt = function () {
		// populate comman prompt
		terminal.append('<span class="prompt">' + prompt + '</span> ')
		terminal.append('<span class="path">'   + path   + '</span> ')
	}
	cli.process = function () {
		var valid = false
		// create args list by splitting the command
		// by space characters and then shift off the
		// actual command
		var args = command.split(' ')
		var cmd = args[0]
		args.shift()
		// iterate through the available commands to find a match
		// then call that command and pass in any arguments
		for (var i = 0; i < commands.length; i++) {
			if (cmd.toLowerCase() === commands[i].name) {
				commands[i].function(args)
				valid = true
				break
			}
		}
		// if not match was found
		if (!valid) terminal.append('command not found: ' + command + '\n')
		// add to command history and clean up
		history.push(command)
		historyIndex = history.length
		command = ''
	}
	cli.erase = function (n) {
		// delete n number of characters from the end of our output
		command = command.slice(0, -n)
		terminal.html(terminal.html().slice(0, -n))
	}
	cli.clearCommand = function () {
		if (command.length > 0) cli.erase(command.length)
	}
	cli.appendCommand = function (str) {
		terminal.append(str)
		command += str
	}
	cli.getRandomInt = function (min, max) {
			return Math.floor(Math.random() * (max - min)) + min
	}
	cli.events = function () {
		$(document).keydown(function (e) {
			// make sure we get the right event
			e = e || window.event
			var keyCode = typeof e.which === 'number' ? e.which : e.keyCode
			// keypress does not catch special keys so we catch the backspace
			// here and prevent it from navigating to the previous page
			if (keyCode === 8 && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
				e.preventDefault()
				if (command !== '') cli.erase(1)
			}
			// handle arrow keys for command history
			if (keyCode === 38 || keyCode === 40) {
				if (keyCode === 38) {
					// UP arrow key
					historyIndex--
					if (historyIndex < 0) historyIndex++
				}
				if (keyCode === 40) {
					// DOWN arrow key
					historyIndex++
					if (historyIndex > history.length -1) historyIndex--
				}
				// get command
				var cmd = history[historyIndex]
				if (cmd !== void 0) {
					cli.clearCommand()
					cli.appendCommand(cmd)
				}
			}
		})
		$(document).keypress(function (e) {
			// make sure we get the right event
			e = e || window.event
			var keyCode = typeof e.which === 'number' ? e.which : e.keyCode
			// type of key pressed
			switch (keyCode) {
				// ENTER
				case 13: {
					terminal.append('\n')
					cli.process()
					cli.prompt()
					break
				}
				default: { cli.appendCommand(String.fromCharCode(keyCode)) }
			}
		})
	}
	$(document).ready(cli.init)
})(jQuery)
