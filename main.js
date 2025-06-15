import { getLocationName } from "./location.js";
import { getWeatherByCoords } from "./weather.js";

function getLocationAndWeather() {
    /*
	geolocation API を使って現在の緯度経度を取得
	navigator.geolocation:ブラウザに今の自分の緯度や経度を教えてもらう
	navigator.geolocation.getCurrentPositio:現在の位置を1回だけ取得する命令
	*/
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
		//succes
	    (position) => {
		//lat, lon は緯度経度
		const lat = position.coords.latitude;
		const lon = position.coords.longitude;
		//取得成功後、その緯度経度を getLocationName と getWeatherByCoords に渡す。
		getLocationName(lat, lon);//位置情報
		getWeatherByCoords(lat, lon);//天気
	    },
		//error
	    (error) => {
		//navigator.geolocation.getCurrentPositionで位置情報が取得できなかったときにここに飛ぶ
		document.getElementById('location').textContent = '位置情報の取得に失敗しました';
		console.error(error);
		/*
		エラー番号
		1 : ユーザーが位置情報の取得を拒否した
		2 : 位置情報が取得できなかった
		3 : 一定時間内に位置情報が取得できなかった
		*/
	    }
        );
    } else {//navigator.geolocation が 使えるブラウザではない時の処理
        document.getElementById('location').textContent = '位置情報非対応ブラウザです';
    }
}

getLocationAndWeather();


