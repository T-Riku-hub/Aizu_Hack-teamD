import { hungerComment } from "./chengeState.js";
export function reset(){
    const button = document.getElementById('resetButton');
    button.onclick = function() {
        let energy = parseInt(localStorage.getItem('energy')||50);
        energy =50;
        localStorage.setItem('energy', energy);//新しい[元気さ]を保存
        document.getElementById('energy').textContent = energy;//HTML内のIDが energy の要素のテキス


        let charLv = parseInt(localStorage.getItem('charLv')||'0');
        charLv=0;
        document.getElementById("char-img").src='assets/image/charcther/phase01.png';
        localStorage.setItem('charLv', charLv);//新しい[Lv]を保存
        document.getElementById('charLv').textContent = charLv;

        let love = parseInt(localStorage.getItem('love')||0);
        love=0;
        localStorage.setItem('love',love);
        document.getElementById('love').textContent=love;

        let Hunger_level = parseInt(localStorage.getItem('Hunger-level')||49);
        Hunger_level=50;
        localStorage.setItem('Hunger-level',Hunger_level);
        document.getElementById('Hunger-level').textContent=Hunger_level;

        document.getElementById('lv-comment').textContent="";
        document.getElementById('max-Lv').textContent="";
};
}

export function eat(){
    const button=document.getElementById('eat-button');
    button.onclick=function(){
        //love,Hunger-level,enery
        let love = parseInt(localStorage.getItem('love')||0);
        let Hunger_level = parseInt(localStorage.getItem('Hunger-level')||49);
        let energy = parseInt(localStorage.getItem('energy') || '50');

        love+=1
        Hunger_level+=20;
        energy+=2;

        //元気さの範囲は1~100(1<=energy<=100)
        if(energy>100)energy=100;
        if(energy<=0)energy=1;

        if(love>100)love=100;
        if(Hunger_level>100)Hunger_level=100;
        else{
        hungerComment(Hunger_level);
        localStorage.setItem('love',love);
        localStorage.setItem('Hunger-level',Hunger_level);
        localStorage.setItem('energy',energy);

        document.getElementById('love').textContent=love;
        document.getElementById('Hunger-level').textContent=Hunger_level;
        document.getElementById('energy').textContent = energy;
        }
    };
}