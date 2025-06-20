export function chengeWetherIcon(weather,temp){
    
    if (weather === 'Clear') {//晴れの時の処理
        //この下に追加予定
		document.getElementById('current-weather').textContent = "晴れ  気温:"+temp+"℃";
        const weatherIcon = document.getElementById('weatherIcon');
        const img = document.createElement('img');
        img.src = "./assets/image/sunny.png";
        img.alt = '晴れの画像';
        weatherIcon.appendChild(img);
        }

        else if (weather === 'Rain'){//雨の時の処理
		document.getElementById('current-weather').textContent = "雨  気温:"+temp+"℃";
        const weatherIcon = document.getElementById('weatherIcon');
        const img = document.createElement('img');
        img.src = './assets/image/umbrella.png';
        img.alt = '傘の画像';
        weatherIcon.appendChild(img);
        }
        
        else if (weather === 'Clouds'){//曇りの時の処理
        //この下に追加予定
		document.getElementById('current-weather').textContent = "曇り  気温:"+temp+"℃";
        const weatherIcon = document.getElementById('weatherIcon');
        const img = document.createElement('img');
        img.src = './assets/image/kumori.png';
        img.alt = '曇りの画像';
        weatherIcon.appendChild(img);
        }
}