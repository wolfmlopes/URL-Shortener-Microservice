$(document).ready(function(){
let url = ""
	$('.url').bind('keyup change', function(){
		let urlSplited = $('.url').val().split('http://')
		let urlSplited2 = $('.url').val().split('https://')
		if(urlSplited[1]){
			url = "new/"+urlSplited[1]
		}
		else if(urlSplited2[1]){
			url = "new/"+urlSplited2[1]
		}
		else{
			url = "new/"+$('.url').val()
		}

		$('a').attr('href',url)
		if(url.match(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)){

			$('a').removeClass('disabled')
		}
	})
})