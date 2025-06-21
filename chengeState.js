
export function chengeEnergyByWeather(temp){

    let energy = parseInt(localStorage.getItem('energy') || '50');//parseInt() は文字列を整数に変換する
    
    //カメレオンが変温動物なので体感温度で元気さが変化する
    if (temp < -10) {
        energy -= 5;
        document.getElementById('look-like').textContent="とても寒そうだ";
    } else if (temp < 0) {
        energy -= 3;
        document.getElementById('look-like').textContent="寒そうだ";
    } else if (temp < 10) {
        energy -= 2;
        document.getElementById('look-like').textContent="少し寒そうだ";
    } else if (temp < 20) {
        energy += 1;
        document.getElementById('look-like').textContent="快適そうだ";
    } else if (temp < 30) {
        energy += 2;
        document.getElementById('look-like').textContent="快適そうだ";
    } else if (temp < 40) {
        energy -= 2;
        document.getElementById('look-like').textContent="暑そうだ";
    } else {
        energy -= 6;//temp<-10 or 40<temp
        document.getElementById('look-like').textContent="辛そうだ";
    }
    
    //元気さの範囲は1~100(1<=energy<=100)
    if(energy>100)energy=100;
    if(energy<=0)energy=1;


    localStorage.setItem('energy', energy);//新しい[元気さ]を保存
    document.getElementById('energy').textContent = energy;//HTML内のIDが energy の要素のテキス
    document.getElementById('feelTemp').textContent=temp+"℃";
}

export function hungerComment(HungerLevel){

    if(HungerLevel>=1 && HungerLevel<=20){
        document.getElementById('hunger-comment').textContent="空腹そうだ";
    }else if(HungerLevel>20 && HungerLevel<=40){
        document.getElementById('hunger-comment').textContent="少し空腹そうだ";
    }else if(HungerLevel>40 && HungerLevel<=80){
        document.getElementById('hunger-comment').textContent="";
    }else{
        document.getElementById('hunger-comment').textContent="満腹そうだ";
    }
}