
// 按下"看結果"，執行最後運算
var submit = document.querySelector('#submitBtn');
submit.addEventListener('click', result, false);
// saveRecord(recordData);

// 輸入表單時，執行驗證方法
// var input = document.querySelectorAll('.inputType');
// for (var i=0 ; i<input.length ; i++){
//     input[i].addEventListener('change', valid ,false);
// }

// 計算BMI
function BMIcalc() {
    var height = parseInt(document.querySelector('#heightId').value);
    var weight = parseInt(document.querySelector('#weightId').value);
    
    // *10000 > 公分平方轉公尺平方
    var BMI = (weight / (height * height)) * 10000;
    // toFixed四捨五入取2位
    return BMI.toFixed(2);  
};


// BMI範圍
function BMIrange() {
    if (BMIcalc() < 16) {
        return "嚴重體重不足";
    } else if (BMIcalc() > 16.1 && BMIcalc() < 18.4) {
        return "體重過輕";
    } else if (BMIcalc() > 18.5 && BMIcalc() < 24.9) {
        return "理想";
    } else if (BMIcalc() > 25 && BMIcalc() < 29.9) {
        return "體重過重";
    } else if (BMIcalc() > 30 && BMIcalc() < 34.9) {
        return "中度肥胖";
    } else if (BMIcalc() > 35 && BMIcalc() < 39.9) {
        return "重度肥胖";
    } else if (BMIcalc() > 40) {
        return "非常嚴重肥胖";
    }
}

// 表單驗證
function result(){
    var BMIsumAll = document.querySelector('.BMIsum_all');
    var reset = document.querySelector('#reBtn');
    var rangeTxt = document.querySelector('#BMIrange');
    var input = document.querySelectorAll('.inputType');
    var BMIsum = document.querySelector('#BMIsum');
    
    
    // forEach驗證每一個欄位
    input.forEach(function(e){
        if( e.value == null || e.value == "") {
            // nextElementSibling 當下欄位的下一個標籤
            e.nextElementSibling.innerHTML = "此欄不可為空";
            e.style.border = '2px solid #aeffdd';
            BMIsum.textContent = "";
            return;
        }

        else if ( isNaN(e.value) ) {
            e.nextElementSibling.innerHTML = "此欄需填寫數字";
            e.style.border = '2px solid #aeffdd';
            BMIsum.textContent = "";
            return;
        }

        else {
            e.style.border = '2px solid #FFD366';
            e.nextElementSibling.innerHTML = "";

            BMIsum.textContent = BMIcalc();
            submit.style.display = 'none';
            BMIsumAll.style.display = 'inline-block';
            BMIsum.style.display = 'inline-block';
            reset.style.display = 'inline-block';
            rangeTxt.textContent = BMIrange();
            rangeTxt.style.display = 'inline-block';
        }
            
    })


}


// 重置
var reset = document.querySelector('#reBtn');
reBtn.addEventListener('click', resetF , false);

function resetF() {
    var validWarn = document.querySelectorAll('.valid_warn');
    var BMIsum = document.querySelector('#BMIsum');
    var input = document.querySelectorAll('.inputType');
    var BMIsumAll = document.querySelector('.BMIsum_all');
    var rangeTxt = document.querySelector('#BMIrange');
    
    // 清除驗證警語、結果
    for(var i = 0; i < validWarn.length ; i++){
        validWarn[i].innerHTML = "";
        BMIsum.innerHTML = "";
    };

    // 清除紅框
    for (var i=0 ; i< input.length ; i++){
            input[i].style.border = "2px solid #FFD366";
    };



    // 清除表單內容
    document.getElementById('BMIform').reset();
    BMIsumAll.style.display = 'none';
    submit.style.display = 'block';
    rangeTxt.style.display = 'none';
    
}

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------



// function addRecord(event){
//     event.preventDefault();;
//     var BMIsumAll = document.querySelector('.BMIsum_all');
//     var reset = document.querySelector('#reBtn');
//     var rangeTxt = document.querySelector('#BMIrange');
//     var heightVal = parseInt(document.querySelector('#heightId').value);
//     var weightVal = parseInt(document.querySelector('#weightId').value);

//     var answer = "";
//     var bmiColor = "";

//     if (BMIcalc() < 16) {
//         answer = "嚴重體重不足";
//         bmiColor = "#0e89e0";
//     } else if (BMIcalc() > 16.1 && BMIcalc() < 18.4) {
//         answer = "體重過輕";
//         bmiColor = "#7ab8e4";
//     } else if (BMIcalc() > 18.5 && BMIcalc() < 24.9) {
//         answer = "理想";
//         bmiColor = "#a5ffab";
//     } else if (BMIcalc() > 25 && BMIcalc() < 29.9) {
//         answer = "體重過重";
//         bmiColor = "#f1b4b4";
//     } else if (BMIcalc() > 30 && BMIcalc() < 34.9) {
//         answer = "中度肥胖";
//         bmiColor = "#ef5e5e";
//     } else if (BMIcalc() > 35 && BMIcalc() < 39.9) {
//         answer = "重度肥胖";
//         bmiColor = "#f00";
//     } else if (BMIcalc() > 40) {
//         answer = "非常嚴重肥胖";
//         bmiColor = "#f00";
//     }

    

//     // var recordList = {
//     //     height: heightVal,
//     // };

//     // recordData.push(recordList);

    

    

//     updateList(recordData);
//     localStorage.setItem('record', JSON.stringify(recordData));

// }

// function updateList(items){
//     var str = '';
//     for (var i = 0; i < items.length; i++) {
//         str += '<li class="record_list" data-index = "'+ i +'"><span>身高cm'+ items[i].height +'</span> <span>體重kg'+ items[i].weight +'</span></li>'
//     }

//     var recordAll = document.querySelector('.record_table');
//     recordAll.innerHTML = str;
// }

// var recordBtn = document.querySelector('#recordBtn');
// recordBtn.addEventListener('click', addRecord);






