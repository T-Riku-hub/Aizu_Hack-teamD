/*
このファイルは天気の情報で処理を切り替える機能を実現するコードです。
現在はまだ天気の情報で処理を切り替える機能は未完成です。
*/
import {weatherApiKey} from "./apiKeys.js";//Open Weather APIキー

export function getWeatherByCoords(lat,lon){

    //export function:他のjsファイルでこの関数を使えるようにするという意味
    //lat, lon は緯度経度
    //OpenWeatherMap の API を使って、現在の天気データを取得。
    
	const url="https://api.openweathermap.org/data/2.5/weather";
	const appID = weatherApiKey;
	
	//$.ajax()を使うのでhtml側で<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>を先に読み込ませる
	//$.ajax():APIリクエストの際に幾つかの情報をJSのプログラムからAPIを送信する必要がある。送信するにはパラメータにdataプロパティを追加
	$.ajax({
		url:url,//使用するapi.今回はCurrent wether data
		data:{
			appid:appID,
			lat:lat,
			lon:lon,
			units: "metric",  // 摂氏（°C）
			lang:'ja',//言語設定  
		}		
	})
	.done(function(data){
		const weather = data.weather[0].main;//data.weather[0].main:天気の種類を取り出す
		const temp = Math.floor(data.main.temp);//気温,小数点以下は切り捨てる
        
        
        //setBackgroundByWeather(weather);
        //localStorage から以前保存した「元気さ」を読み出し,もしなければ50
        let energy = parseInt(localStorage.getItem('energy') || '50');//parseInt() は文字列を整数に変換する関数

        if (weather === 'Clear') {//晴れの時の処理
        energy += 5;
        //この下に追加予定
		document.getElementById('current-weather').textContent = "晴れ  気温:"+temp+"℃";
        const weatherIcon = document.getElementById('weatherIcon');
        const img = document.createElement('img');
        img.src = "./assets/image/sunny.png";
        img.alt = '晴れの画像';
        weatherIcon.appendChild(img);
        }

        else if (weather === 'Rain'){//雨の時の処理
        energy -= 3;
		document.getElementById('current-weather').textContent = "雨  気温:"+temp+"℃";
        const weatherIcon = document.getElementById('weatherIcon');
        const img = document.createElement('img');
        img.src = './assets/image/umbrella.png';
        img.alt = '傘の画像';
        weatherIcon.appendChild(img);
        }
        
        else if (weather === 'Clouds'){//曇りの時の処理
        energy += 1;
        //この下に追加予定
		document.getElementById('current-weather').textContent = "曇り  気温:"+temp+"℃";
        const weatherIcon = document.getElementById('weatherIcon');
        const img = document.createElement('img');
        img.src = './assets/image/kumori.png';
        img.alt = '曇りの画像';
        weatherIcon.appendChild(img);
        }
        

        //変更予定
        localStorage.setItem('energy', energy);//新しい[元気さ]を保存
        document.getElementById('energy').textContent = energy;//HTML内のIDが energy の要素のテキストを、最新の元気さの値に更新
			
	})
	.fail(function(){
		document.getElementById('current-weather').textContent = '天気取得エラー';
        console.error(error);
		console.log('$.ajax faild');
	})
}
    
