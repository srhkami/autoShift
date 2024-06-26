import { allShift, sumShift } from "./object.js";

function getOvertime(shiftTime){
  let overtime = -8;
  Object.values(shiftTime).forEach((value)=>{
    overtime+=value;
  })
  if (overtime <= 0){
    return 0;
  }
  else{
    return overtime;
  }
}

// 函式：取得上班時段
function getMoneyTime(oneDayShift){
  let times = oneDayShift.map(value => {return value.time})
  times = times.sort( (a,b) => {
    return a-b
  });
  let dayTime = times.filter(value => {
    if(value >= 8){
      return value;
    }
  })
  let nightTime = times.filter(value => {
    if(value < 8){
      return value==0?'0':value;
    }
  })
  times = dayTime.concat(nightTime);
  // console.log((times));
  let html ='';
  times.forEach((value,index)=>{
    if (index == 0){
      html += value;
    }
    else{
      html += `, ${value}`
    }
  })
  if(html){
    return html;
  }
  else{
    return '未上班';
  }
  
}

// 函式：取得深夜巡邏時段
function getNight(oneDayShift){
  let nightShift = oneDayShift.filter(value=>{
    if(value.time < 6 && value.shift == '巡邏'){
      return value;
    }
  })
  let times = nightShift.map(value => {return value.time})
  times = times.sort( (a,b) => {
    return a-b
  });
  let html ='';
  times.forEach((value,index)=>{
    if (index == 0){
      html += value;
    }
    else{
      html += `, ${value}`
    }
  })
  if(html){
    return html;
  }
  else{
    return '無';
  }
}

// 函式：主要顯示
function showAll(day, name){
  $('#showDate').html(day);
  let oneDayShift = sumShift(allShift[day],name); //單日勤務（清單）
  // console.log(oneDayShift);
  // 計算並顯示各班時數
  let shiftTime = {
    '值班': 0,  
    '勤區查察': 0,  
    '巡邏': 0, 
    '臨檢': 0, 
    '備勤': 0,
    '待命': 0, 
    '其他': 0 
  }
  oneDayShift.forEach((value)=>{
    if (value.shift == '守望'){
      shiftTime['巡邏']+=1;
    }
    else{
      shiftTime[value.shift]+=1;
    }
  })
  $('#shift-1').html(shiftTime['值班']);
  $('#shift-2').html(shiftTime['勤區查察']);
  $('#shift-3').html(shiftTime['巡邏']);
  $('#shift-4').html(shiftTime['臨檢']);
  $('#shift-5').html(shiftTime['備勤']);
  $('#shift-6').html(shiftTime['待命']);
  $('#shift-7').html(shiftTime['其他']);
  // 顯示超勤時數
  $('#shift-8').html(getOvertime(shiftTime));
  // 顯示報支時段
  $('#shift-9').html(getMoneyTime(oneDayShift));
  // 顯示深夜津貼
  $('#shift-10').html(getNight(oneDayShift));
  
}



// 主程式
let dayNo = 0;
let name;
let days = Object.keys(allShift); //所有日期清單

$('#search').click(()=>{
  name = $('#member-select option:selected').text();
  if (name == '請選擇人員'){
    alert('請選擇人員！')
    return
  }
  $('#name').html(name);
  showAll(days[dayNo],name) 

})


$('#last').click(()=>{
  if (dayNo > 0 ){
    dayNo -= 1;
  }
  console.log(days[dayNo])
  showAll(days[dayNo],name) 
})

$('#next').click(()=>{
  if (dayNo < days.length-1){
    dayNo += 1;
  }
  console.log(days[dayNo])
  showAll(days[dayNo],name) 
})
