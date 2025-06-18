/*
位置もしくは天気によってホームページの背景を切り替える関数
function setBackgroundByWeather(weather)は不採用もしくは中身を変更する予定
function setBackgroundByLocation(locationName)はif文の量を増やしたり、デフォルトの背景を追加したい
*/


export function setBackgroundByWeather(weather){
    //天気によってホームページの背景を変える
    const body = document.body;
    if (weather === 'Clear') {
        body.style.backgroundImage = "url('./assets/image/umbrella.png')";
        //body.style.backgroundImage = "url('./assets/image/sunny.png')";
      } else if (weather === 'Rain') {
        body.style.backgroundImage = "url('./assets/image/umbrella.png')";
      } else if (weather === 'Clouds') {
        body.style.backgroundImage = "url('./assets/image/umbrella.png')";
        //body.style.backgroundImage = "url('./assets/image/cloudy.png')"; // 画像があるなら
      } else {
        body.style.backgroundImage = "none"; // デフォルト背景に戻す
      }
}

export function setBackgroundByLocation(locationName){
    //現在地によってホームページの背景を変える
    const body = document.body;
    if(locationName.includes("福島県")){//"福島"だと検知されないので注意
        body.style.backgroundImage = "url('./assets/image/hukusima.jpg')";
    	body.style.backgroundSize = "cover";
	}else if(locationName.includes("北海道")){ // 以下のelse if文はくにおが追加　2025年6月18日
		body.style.backgroundImage = "url('./assets/image/hokkaido_tokeidai_sunny.jpg')";
    	body.style.backgroundSize = "cover";
	}else if(locationName.includes("青森県") || locationName.includes("岩手県") || locationName.includes("宮城県") || locationName.includes("秋田県") || locationName.includes("山形県")){ // 福島県を除く東北5県は、画像が一緒
		body.style.backgroundImage = "url('./assets/image/'tohoku_nebuta_night.jpg)";
    	body.style.backgroundSize = "cover";
	}else if(locationName.includes("茨城県") || locationName.includes("栃木県") || locationName.includes("群馬県") || locationName.includes("埼玉県") || locationName.includes("東京都") || locationName.includes("千葉県") || locationName.includes("神奈川県")){ //　東京都を含む関東7都県は、画像がいっしょ 
		body.style.backgroundImage = "url('./assets/image/tokyo_skytree_sunny.jpg')";
    	body.style.backgroundSize = "cover";
	}else if(locationName.includes("長野県") || locationName.includes("山梨県") || locationName.includes("静岡県") || locationName.includes("愛知県") || locationName.includes("岐阜県") || locationName.includes("新潟県") || locationName.includes("富山県") || locationName.includes("石川県") || locationName.includes("福井県")){ //　中部・北陸の9県は、画像がいっしょ 
		body.style.backgroundImage = "url('./assets/image/shizuoka_yamanashi_mount_fuji.jpg')";
    	body.style.backgroundSize = "cover";
	}else if(locationName.includes("京都府")){ 
		body.style.backgroundImage = "url('./assets/image/kyoto_kinkakuji_sunny.jpg')";
    	body.style.backgroundSize = "cover";
	}else if(locationName.includes("滋賀県") || locationName.includes("大阪府") || locationName.includes("奈良県") || locationName.includes("三重県") || locationName.includes("和歌山県") || locationName.includes("兵庫県")){ //　京都府を除く関西の6府県は、画像がいっしょ 
		body.style.backgroundImage = "url('./assets/image/osaka_doutonbori.jpg')";
    	body.style.backgroundSize = "cover";
	}else if(locationName.includes("岡山県") || locationName.includes("広島県") || locationName.includes("山口県") || locationName.includes("島根県") || locationName.includes("鳥取県") || locationName.includes("香川県") || locationName.includes("愛媛県") || locationName.includes("高知県") || locationName.includes("徳島県")){ //　中国・四国の9県は、画像がいっしょ 
		body.style.backgroundImage = "url('./assets/image/shikoku_setooohashi.jpg')";
    	body.style.backgroundSize = "cover";
	}else if(locationName.includes("福岡県") || locationName.includes("大分県") || locationName.includes("宮崎県") || locationName.includes("鹿児島県") || locationName.includes("熊本県") || locationName.includes("佐賀県") || locationName.includes("長崎県")){ //　九州の7県は、画像がいっしょ 
		body.style.backgroundImage = "url('./assets/image/kyushu_nagasaki_heiwakinenzo.jpg')";
    	body.style.backgroundSize = "cover";
	}else if(locationName.includes("沖縄県")){ 
		body.style.backgroundImage = "url('./assets/image/okinawa_beach_sunny.jpg')";
    	body.style.backgroundSize = "cover";
    }else{
        body.style.backgroundImage = "none"; // デフォルト背景に戻す
    }
}
