const weatherApiKey = 'f00fcf38b28e0cf8c0c39fb4755b73da';//Open Weather APIキー
const geoApiKey = '10dc3853be25422cac6a1ff19341a600'; // OpenCage APIキー

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

	    //localStorage から以前保存した「元気さ」を読み出し,もしなければ50
	    let energy = parseInt(localStorage.getItem('energy') || '50');//parseInt() は文字列を整数に変換する関数
	    if (weather === 'Clear') energy += 5;
	    if (weather === 'Rain') energy -= 3;
	    if (weather === 'Clouds') energy += 1;
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

getLocationAndWeather();//ページを開いたら即座に位置情報と天気情報を取得して処理を開始。
