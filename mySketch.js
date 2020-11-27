let capture
let cacheGraphics // 儲存物件中每一張影像
let noise2

function preload(){
	noise2 = loadImage("noise2.jpeg")
}

function setup() {
	createCanvas(640,480);
	background(100);
	capture = createCapture(VIDEO)
	capture.size(640,480)
	cacheGraphics = createGraphics(640,480)
	cacheGraphics.translate(640,0)
	cacheGraphics.scale(-1,1)
	capture.hide()  // 藏起原生的物件
}

var mode = 2  // 預設模式為1
function draw() {
	cacheGraphics.image(capture,0,0) // 製作一個暫存的圖片檔案
	// image(capture,mouseX,mouseY)  // 影像像畫筆一樣匯出
	noStroke()
	scale(1)
	background(0)
	
	// 避免mouseX取值小於0當機,設定為mouseX跟0,mouseX小於0時直接取0
	let span = 12+ max(mouseX,0)/20
	for(var i=0;i<cacheGraphics.width;i+=span){     // x軸重複
			for(var o=0;o<cacheGraphics.width;o+=span){   // y軸重複
				let pixel = cacheGraphics.get(i,o)  // 指定使用i,o這位置的顏色做填充
				
				// 用pixel[0]+pixel[1]+pixel[2]分別代表RGB,算出平均亮度值
				let bk = (pixel[0]+pixel[1]+pixel[2])/3  
				fill(255)
				if (mode==1){
					// 原本bk是0~255,重新定位黑到白0~1,黑的地方乘0沒有圈圈,白的地方乘1維持不變
					ellipse(i,o,span*map(bk,0,255,0,1)) 
				}
				if (mode==2){
					fill(pixel)
					push()
						colorMode(HSB)
						fill(pixel[0],100,90)
						translate(i,o)
						rotate(pixel[0]/100) // 每隔pixel各自旋轉
						rectMode(CENTER) // 方形以中心點旋轉
						rect(mouseX/10,mouseY/10,span*0.3 + pixel[2]/10) 
					
						// 在每個pixel方形中間加小圓型裝飾
						fill(0)
						ellipse(0,0,5)
					pop()
				}
				if (mode==3){
					let txt = "一二三四五田電龍龕鑫"
					// 使用清單需加上int取整數,深色(10)對應鑫,淺色(0)對應一二三字
					let bkid = int(map(bk,0,255,10,0)) 
					
					fill(pixel[0]+50,pixel[1]+50,pixel[2]+50)
					textSize(span)
					textStyle(BOLD)
					text(txt[bkid],i,o)  // 取txt裡的第[bkid]個字
				}
			}
		} 
	push()
		blendMode(MULTIPLY)
		image(noise2,0,0,640,480)
	pop()
}

// 切換模式
function keyPressed(){
	if (key=="1"){
		mode = 1
	}
	if (key=="2"){
		mode = 2
	}
	if (key=="3"){
		mode = 3
	}
}
