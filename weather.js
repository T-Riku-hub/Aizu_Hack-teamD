/*
このファイルは天気の情報で処理を切り替える機能を実現するコードです。
現在はまだ天気の情報で処理を切り替える機能は未完成です。
*/
import {weatherApiKey} from "./apiKeys.js";//Open Weather APIキー
import { chengeEnergyByWeather } from "./chengeState.js";
import { chengeWetherIcon } from "./chengeWeatherIcon.js";

export function getWeather(lat,lon){

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
        const feelTemp = Math.floor(data.main.feels_like); // 体感温度
        chengeEnergyByWeather(feelTemp);
        chengeWetherIcon(weather,temp);
    })
	.fail(function(){
		document.getElementById('current-weather').textContent = '天気取得エラー';
        console.error(error);
		console.log('$.ajax faild');
	})
}
    
