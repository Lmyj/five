window.onload=function(){
	var ROW = 15,
	cross,vertical,
	width = Math.floor((600-ROW)/ROW) + 'px',
	sence = document.getElementById('sence'),
	blocks = document.getElementsByClassName('block'),
	changPerson = true,
	block,
	dict1 = {},dict2 = {};
	for(var i=0;i<ROW;i++){
		cross = document.createElement('div');
		cross.setAttribute('id','cross');
		cross.style.width = '600px';
		cross.style.height =  '1px';
		cross.style.background = '#C17017';
		cross.style.position = 'absolute';
		cross.style.top = (600/ROW)/2+(600/ROW)*i+'px';
		sence.appendChild(cross);
		vertical = document.createElement('div');
		vertical.setAttribute('id','vertical');
		vertical.style.width = '1px';
		vertical.style.height =  '600px';
		vertical.style.background = '#C17017';
		vertical.style.position = 'absolute';
		vertical.style.left = (600/ROW)/2+(600/ROW)*i+'px';
		sence.appendChild(vertical);
	}
	for(var i=0;i<ROW;i++){
		for(var j=0;j<ROW;j++){
			block = document.createElement('div');
			block.setAttribute('class','block');
			block.setAttribute('id',i+'_'+j);
			block.style.width = width; 
			block.style.height = width;
			sence.appendChild(block);
		}
	}
	var panDuan = function(id,dict){
		var x = Number(id.split('_')[0]),
			y = Number(id.split('_')[1]),
			tx,ty;
			hang = 1;
		while(dict[tx+'_'+(ty+1)]){hang++;ty++;}
		tx = x;ty = y;
		while(dict[tx+'_'+(ty-1)]){hang++;ty--;}
		if(hang==5) return true;

		var lie = 1;
		tx = x;ty=y;
		while(dict[(tx-1)+'_'+ty]){lie++;tx--;}
		tx = x;ty = y;
		while(dict[(tx+1)+'_'+ty]){lie++;tx++;}
		if(lie==5) return true;

		var zx = 1;
		tx = x;ty=y;
		while(dict[(tx-1)+'_'+(ty+1)]){zx++;ty++;tx--;}
		tx = x;ty = y;
		while(dict[(tx+1)+'_'+(ty-1)]){zx++;ty--;tx++;}
		if(zx==5) return true;

		var yx = 1;
		tx = x;ty=y;
		while(dict[(tx+1)+'_'+(ty+1)]){yx++;ty++;tx++;}
		tx = x;ty = y;
		while(dict[(tx-1)+'_'+(ty-1)]){yx++;ty--;tx--;}
		if(yx==5) return true;

		return false;
	};
	for(var i=0;i<blocks.length;i++){
		blocks[i].onclick = function(){
			if( this.hasAttribute('hasColor') ){return;}
			this.style.webkitTransform = 'scale(0.9)';
			var id = this.getAttribute('id');
			if(changPerson){
				this.style.background = 'white';
				this.style.boxShadow = '0 0 5px #e5e5e5';
				changPerson = false;
				dict1[id] = true;
				if( panDuan(id,dict1) ){
					alert('白色赢了');
					location.reload();
				}
			}else{
				this.style.background = 'black';
				changPerson = true;
				dict2[id]=true;
				if(panDuan(id,dict2)){
					alert('黑色赢了')
					location.reload();
				}
			}
			this.setAttribute('hasColor','true');
		};
	}
};