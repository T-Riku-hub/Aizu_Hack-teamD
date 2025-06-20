import { getLocationName } from "./location.js";
import { getWeather} from "./weather.js";
import { getCurrentTime } from "./currentTime.js";
import { glowCharacter } from "./glowChar.js";
import { eat, reset } from "./buttonFunctions.js";

function getLocationAndWeather() {
    /*
	geolocation API を使って現在の緯度経度を取得
	navigator.geolocation:ブラウザに今の自分の緯度や経度を教えてもらう
	navigator.geolocation.getCurrentPositio:現在の位置を1回だけ取得する命令
	*/
    const body = document.body;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
		//succes
	    (position) => {
		//lat, lon は緯度経度
		const lat = position.coords.latitude;
		const lon = position.coords.longitude;
		//取得成功後、その緯度経度を getLocationName と getWeatherByCoords に渡す。
		getLocationName(lat, lon);//位置情報
		getWeather(lat, lon);//天気
		
		
	    },
		//error
	    (error) => {
		//navigator.geolocation.getCurrentPositionで位置情報が取得できなかったときにここに飛ぶ
		document.getElementById('location-name').textContent = '位置情報の取得に失敗しました';
		console.error(error);
		
		body.style.backgroundImage = "url('./assets/image/default_Background.jpg')"; // デフォルト背景に戻す
		body.style.backgroundSize = "cover";
    
		/*
		エラー番号
		1 : ユーザーが位置情報の取得を拒否した
		2 : 位置情報が取得できなかった
		3 : 一定時間内に位置情報が取得できなかった
		*/
	    }
        );
    } else {//navigator.geolocation が 使えるブラウザではない時の処理
        document.getElementById('location-name').textContent = '位置情報非対応ブラウザです';
		body.style.backgroundImage = "url('./assets/image/default_Background.jpg')"; // デフォルト背景に戻す
		body.style.backgroundSize = "cover";
    }
}


getLocationAndWeather();
getCurrentTime();
glowCharacter();
eat();
reset();
setInterval(() => {
	location.reload();
}, 60000);//1分おきに画面をリロード

