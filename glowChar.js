export function glowCharacter(){
    //localStorage から以前保存した「charLv」を読み出し,もしなければ1
    let charLv = parseInt(localStorage.getItem('charLv')||'0');

    charLv+=1;
    if(charLv>=10 && charLv<20){
        document.getElementById("char-img").src='assets/image/charcther/phase02.png';
    }
    else if(charLv>=20 && charLv<30){
        document.getElementById("char-img").src='assets/image/charcther/phase03.png';
    }
    else if(charLv>=30 && charLv<40){
        document.getElementById("char-img").src='assets/image/charcther/phase04.png';
    }
    else if(charLv>=40 && charLv<50){
        document.getElementById("char-img").src='assets/image/charcther/phase05.png';
    }
    else if(charLv>=50){
        charLv=50;
        document.getElementById("char-img").src='assets/image/charcther/phase06.png';
    }
    if(charLv%10==9)document.getElementById('lv-comment').textContent="進化しそうだ...!";
    if(charLv%10==0 && charLv!=0)document.getElementById('lv-comment').textContent="進化した!";
    if(charLv==50)document.getElementById('max-Lv').textContent="これ以上進化しなそうだ..."
    localStorage.setItem('charLv', charLv);//新しい[Lv]を保存
    document.getElementById('charLv').textContent = charLv;
}