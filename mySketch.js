function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100);
}

function draw() {
	colorMode(HSB)
	for(var i=0;i<width;i+=mouseX/5+5) {
		var h = map(i,0,width,0,360)
		for(var o=0;o<height;o+=mouseY/5+5) {
			var clr = color((h+o+frameCount*5)/2%360,mouseY/5,mouseX/5)
			clr.setAlpha(0.2)
			fill(clr)
			rect(i, o, 30, 40);
		}
		
	
	}
	
}