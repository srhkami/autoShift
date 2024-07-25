import { allShift, members, info } from "./object.js";

function getOvertime(){
  members.forEach((member,no)=>{
    let monthOvertime = 0;
    Object.values(allShift).forEach((list)=>{
      let dayOvertime = 0
      list.forEach(value=>{
        if(value.name == member){
          dayOvertime += 1;
        }
      })
      if(dayOvertime>8){
        monthOvertime = monthOvertime + dayOvertime - 8;
      }
      else if(dayOvertime<8){
        monthOvertime += dayOvertime;
      }
    $(`#member-${no}`).html(monthOvertime);
    })
  })
}

function getNight(){
  members.forEach((member,no)=>{
    let monthNightTime = 0;
    Object.values(allShift).forEach((list)=>{
      let dayNightTime = 0
      list.forEach(value=>{
        if(value.name == member && value.time < 6 && value.shift == '巡邏'){
          dayNightTime += 1;
        }
      })
      monthNightTime += dayNightTime;
    })
    $(`#member-${no}`).html(monthNightTime);
  })
}


// 主程式
$('#info').html(info);
$('#item-select').on('change',()=>{
  let itemText = $('#item-select option:selected').text();
  if (itemText == '請選擇統計項目'){
    alert('請選擇統計項目！')
    return
  }
  else if(itemText == '加班時數'){
    getOvertime();
  }
  else{
    getNight();
  }

})

