import {weatherApiKey} from "./apiKeys.js";//Open Weather APIキー
import {geoApiKey} from "./apiKeys.js";//OpenCage のAPIキー

function getWeatherByCoords(lat, lon) {
    
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
	    document.getElementById('weather').textContent = '天気: ' + weather;
	    
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
	    
	    localStorage.setItem('energy', energy);//新しい[元気さ]を保存
	    document.getElementById('energy').textContent = energy;//HTML内のIDが energy の要素のテキストを、最新の元気さの値に更新
        })
        .catch(error => {//例外処理
	    document.getElementById('weather').textContent = '天気取得エラー';
	    console.error(error);
        });
}

function getLocationName(lat, lon) {
    //緯度経度を OpenCage API に渡して、日本語の住所を取得。
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${geoApiKey}&language=ja`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
	    const components = data.results[0].components;//results[0].components:都道府県名や市区町村名などが入っているオブジェクト
	    //都道府県 (state) と市町村 (city, town, village) を連結
	    //どれかが無くてもエラーにならないように || '' で補完。
	    const locationName = `${components.state || ''} ${components.city || components.town || components.village || ''}`;
	    
	    document.getElementById('location').textContent = '現在地: ' + locationName;//表示を更新
	    setBackgroundByLocation(locationName)
        })
        .catch(error => {//例外処理
	    document.getElementById('location').textContent = '住所取得エラー';
	    console.error(error);
        });
}

function getLocationAndWeather() {
    //geolocation API を使って現在の緯度経度を取得
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
	    (position) => {
		//lat, lon は緯度経度
		const lat = position.coords.latitude;
		const lon = position.coords.longitude;
		//取得成功後、その緯度経度を getLocationName と getWeatherByCoords に渡す。
		getLocationName(lat, lon);
		getWeatherByCoords(lat, lon);
	    },
	    (error) => {
		document.getElementById('location').textContent = '位置情報の取得に失敗しました';
		console.error(error);
	    }
        );
    } else {
        document.getElementById('location').textContent = '位置情報非対応ブラウザです';
    }
}



function setBackgroundByWeather(weather) {
  //天気によって背景を変える
  const body = document.body;
  if (weather === 'Clear') {
    //body.style.backgroundImage = "url('./assets/image/sunny.png')";
  } else if (weather === 'Rain') {
    body.style.backgroundImage = "url('./assets/image/umbrella.png')";
  } else if (weather === 'Clouds') {
    //body.style.backgroundImage = "url('./assets/image/cloudy.png')"; // 画像があるなら
  } else {
    body.style.backgroundImage = "none"; // デフォルト背景に戻す
  }
}

function setBackgroundByLocation(locationName) {
    //位置情報によって背景を変える
    const body = document.body;
    if (locationName.includes('福島県')) {
	body.style.backgroundImage = "url('./assets/image/hukusima.jpg')";
	body.style.backgroundSize = "cover";
    }else {
    body.style.backgroundImage = "none"; // デフォルト背景に戻す
  }
}



getLocationAndWeather();//ページを開いたら即座に位置情報と天気情報を取得して処理を開始。
