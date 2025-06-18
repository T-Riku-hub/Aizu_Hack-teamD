export function getCurrentTime(){
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth()+1;
    const date = now.getDate();
    const hour = now.getHours();
    const min = now.getMinutes();
    const dayIndex = now.getDay();
    
    const day = passDay(dayIndex);

    const clock = [year,month,date,hour,min];
    const nowTime = `${clock[0]}年 ${clock[1]}月 ${clock[2]}日 (${day}) ${clock[3]}:${String(clock[4]).padStart(2,'0')}`;
    document.getElementById("time").textContent = nowTime;
    refresh();
}

function passDay(dayIndex){
    const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
    const day = `${weekdays[dayIndex]}`;
    return day;
}
