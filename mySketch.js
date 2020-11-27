function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100);
}

// -----為了重複擴大動作，在此設定黑、白眼睛-----
// -----用push、pop包覆語法，可避免內外設定值互相影響-----
function eye(x,y,sc) {    // eye設定x,y,scale，方便後續直接指定數值
	
	push()
		translate(x,y)	// 定義translate位置為x,y，方便後續填入數值
		scale(sc)			 // 定義scale代號為sc，方便後續填入數值
	
		// 眼球白底
		fill(255)
		ellipse(0,0,200) 
		// 眼珠黑底
		fill(0)
		let ang = atan2(mouseY-y,  // 取出x差與y差的角度
									mouseX-x) 
		rotate(ang)  // 告知p5在繪製方形之前先跟隨角度 
		ellipse(50,0,100)	
	pop()
	
}


// -----繪出眼睛-----
function draw() {
	background(0)
	
	// o指定往height(Y軸)方向重複 
	for (var o=0;o<height;o+=100) {
		
		// i指定width(X軸)方向重複 
		for (var i=0;i<width;i+=100) { 			
			eye(i,o,0.4) // 將x,y,scale帶入指定位置，記得將i與o帶入以利控制
		}
	}
}