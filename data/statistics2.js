import { allYearShift, members } from './object2.js'

function showAll(day, showType) {
  $('#showDate').html(day);
  let oneDayShift = allYearShift[day];
  let oneDayMember = []
  members.forEach((member, no) => {
    let times = 0; //時數
    oneDayShift.forEach((shift) => {
      if (shift.name == member) {
        if (showType == '防制危駕') {
          times += checkKeyword1(shift.remark);
        }
        else if (showType == '交通崗'){
          times += checkKeyword2(shift.remark)
        }
      }
    })
    oneDayMember.push(times);
    $(`#member-${no}`).html(times);
  })
  console.log(`${day}:${oneDayMember}`)
}

function checkKeyword1(input) {
  if (input.includes('危險駕車')) {
    return 1;
  }
  else {
    return 0;
  }
}

function checkKeyword2(input) {
  if (input.includes('交通稽查') || input.includes('交通疏導') || input.includes('護童')) {
    return 1;
  }
  else {
    return 0;
  }
}

// 主程式
let dayNo = 0;
let days = Object.keys(allYearShift); //所有日期清單



$('#item-select').on('change', () => {
  let showType = $('#item-select option:selected').text();
  showAll(days[dayNo], showType);
  $('#last').click(() => {
    if (dayNo > 0) {
      dayNo -= 1;
    }
    showAll(days[dayNo], showType)
  })
  $('#next').click(() => {
    if (dayNo < days.length - 1) {
      dayNo += 1;
    }
    showAll(days[dayNo], showType)
  })
})

