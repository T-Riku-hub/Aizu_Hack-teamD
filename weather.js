/*
このファイルは天気の情報で処理を切り替える機能を実現するコードです。
現在はまだ天気の情報で処理を切り替える機能は未完成です。
*/
import {weatherApiKey} from "./apiKeys.js";//Open Weather APIキー

export function getWeatherByCoords(lat,lon){

    //export function:他のjsファイルでこの関数を使えるようにするという意味
    //lat, lon は緯度経度
    //OpenWeatherMap の API を使って、現在の天気データを取得。
    //res.json() はレスポンスの「本文（ボディ）」を JSON形式のデータ として読み取るメソッド
    //res.json() はレスポンスの中身を文字列として受け取り、それをJavaScriptのオブジェクトに変換
    //res.json() 自体はPromiseを返すので、次の .then() で受け取れる形になっている

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`;
    fetch(url)//fetch:APIにリクエスト
        .then(res => res.json())
        .then(data => {
	    //ここでの data は res.json() によって変換された JavaScriptのオブジェクト
	    const weather = data.weather[0].main;//data.weather[0].main:天気の種類を取り出す
	    document.getElementById('current-weather').textContent = weather;
	    
	    //setBackgroundByWeather(weather);
	    //localStorage から以前保存した「元気さ」を読み出し,もしなければ50
	    let energy = parseInt(localStorage.getItem('energy') || '50');//parseInt() は文字列を整数に変換する関数

	    if (weather === 'Clear') {
		energy += 5;
		//この下に追加予定
	    }

	    if (weather === 'Rain'){
		energy -= 3;
		const container = document.getElementById('container');
		const img = document.createElement('img');
		img.src = './assets/image/umbrella.png';
		img.alt = '傘の画像';
		container.appendChild(img);
	    }
		
	    if (weather === 'Clouds'){
		energy += 1;
		//この下に追加予定
	    }
	    

        //変更予定
	    localStorage.setItem('energy', energy);//新しい[元気さ]を保存
	    document.getElementById('energy').textContent = energy;//HTML内のIDが energy の要素のテキストを、最新の元気さの値に更新
        })

        
        .catch(error => {//例外処理
	    document.getElementById('current-weather').textContent = '天気取得エラー';
	    console.error(error);
        });
}
 