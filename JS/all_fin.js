// 按下"看結果"，執行最後運算
var submit = document.querySelector('#submitBtn');
submit.addEventListener('click', BMIfinal, false);

// 輸入框
var input = document.querySelectorAll('.inputType');
var heightId = document.querySelector('#heightId');
var weightId = document.querySelector('#weightId');


// 按下enter執行"看結果"
heightId.addEventListener("keyup", function(event) { 
    event.preventDefault();
    // "Enter" 的鍵盤編號是 13
    if (event.keyCode === 13) {
        submit.click();
    }
});
weightId.addEventListener("keyup", function(event) { 
    event.preventDefault();
    if (event.keyCode === 13) {
        submit.click();
    }
});



// 結果按鈕
var BMIsumAll = document.querySelector('.BMIsum_all');
var BMIsum = document.querySelector('#BMIsum');
var BMItxt = document.querySelector('.BMItxt');
var reset = document.querySelector('#reBtn');
var rangeTxt = document.querySelector('#BMIrange');



// 重置
var reset = document.querySelector('#reBtn');
reset.addEventListener('click', resetF, false);

// BMI紀錄列表
var BMItable = document.querySelector('.BMItable');
BMItable.addEventListener('click', deleteData, false)

// 取得新資料陣列
// 如果有資料則取得資料字串，否則視為空陣列
var BMIrecord = JSON.parse(localStorage.getItem('recordList')) || [];

updateList(BMIrecord);


// 最終所有結果
function BMIfinal() {

    // (1)檢查填入內容
    checkForm();

    // ------------------------------------------------------

    // (2)計算BMI
    BMIcalc();

    // ------------------------------------------------------

    // (3)判斷BMI範圍，回傳狀態和icon顏色
    var answer = '';
    var bmiColor = '';

    if (BMIcalc() < 16) {
        answer = "嚴重過輕";
        bmiColor = 'red';
    } else if (BMIcalc() > 16.1 && BMIcalc() < 18.4) {
        answer = "體重過輕";
        bmiColor = 'rgba(255, 91, 93, 1)';
    } else if (BMIcalc() > 18.5 && BMIcalc() < 24.9) {
        answer = "體重理想";
        bmiColor = '#a5ffab';
    } else if (BMIcalc() > 25 && BMIcalc() < 29.9) {
        answer = "體重過重";
        bmiColor = '#ff9898';
    } else if (BMIcalc() > 30 && BMIcalc() < 34.9) {
        answer = "中度肥胖";
        bmiColor = '#ef5e5e';
    } else if (BMIcalc() > 35 && BMIcalc() < 39.9) {
        answer = "重度肥胖";
        bmiColor = '#f00';
    } else if (BMIcalc() > 40) {
        answer = "嚴重肥胖";
        bmiColor = '#f00';
    }

    // ------------------------------------------------------

    // (4)按下看結果後顯示數值


    if (heightId.classList.contains('error') || weightId.classList.contains('error')) {
        return;
    }
    // 否則按下看結果後顯示數值
    else {
        // "看結果"按鈕隱藏
        submit.style.display = 'none';

        // 結果外框顯示
        BMIsumAll.style.display = 'inline-block';
        BMIsumAll.style.borderColor = bmiColor;

        // 結果數值顯示
        BMIsum.style.display = 'inline-block';
        BMIsum.textContent = BMIcalc();
        BMIsum.style.color = bmiColor;

        // "BMI"文字顯示
        BMItxt.style.color = bmiColor;

        // "重置"按鈕顯示
        reset.style.display = 'inline-block';
        reset.style.backgroundColor = bmiColor;

        // 範圍狀態顯示
        rangeTxt.style.display = 'inline-block';
        rangeTxt.textContent = answer;
        rangeTxt.style.color = bmiColor;
    }


    // ------------------------------------------------------

    // (5)設定 BMIrecord 空陣列準備裝資料

    // 本來全域變數已設定過身高體重值，但須再次設定區域變數，才能給下面空陣列用
    var heightVal = parseInt(document.querySelector('#heightId').value);
    var weightVal = parseInt(document.querySelector('#weightId').value);

    // 設定目前時間
    var nowTime = new Date();
    var date = nowTime.getDate();
    var month = nowTime.getMonth() + 1;
    var year = nowTime.getFullYear();
    var hours = nowTime.getHours();
    var minute = nowTime.getMinutes();
    var timeAll = `${month}/${date} ${year} ${hours}:${minute}`


    // 設定一個空物件準備裝資料
    var BMIlist = {
        borderColor: bmiColor,
        state: answer,
        BMI: BMIcalc(),
        height: heightVal,
        weight: weightVal,
        date: timeAll,
    };

    // unshift 往前加入物件 (新資料在前面)
    BMIrecord.unshift(BMIlist);
    updateList(BMIrecord);

    // 存進資料，將資料轉成字串
    localStorage.setItem('recordList', JSON.stringify(BMIrecord));


}



// 表單驗證
function checkForm() {

    // forEach驗證每一個欄位
    input.forEach(function (e) {
        if (e.value == null || e.value == "") {
            // 加入新的class "error"，如果有error的時候擋下後面步驟
            e.classList.add('error');
            // nextElementSibling 當下欄位的下一個標籤
            e.nextElementSibling.textContent = "此欄不可為空";
            e.nextElementSibling.style.opacity = "1";
            e.style.border = '2px solid #aeffdd';
        } else if (isNaN(e.value)) {
            e.classList.add('error');
            e.nextElementSibling.textContent = "此欄需填寫數字";
            e.nextElementSibling.style.opacity = "1";
            e.style.border = '2px solid #aeffdd';
        } else {
            // 當所有條件都成立時，移除class 'error'
            e.classList.remove('error');
            e.style.border = '2px solid #FFD366';
            // 將文字改成空的
            e.nextElementSibling.textContent = "原始透明";
            e.nextElementSibling.style.opacity = "0";
        }
    })
}


// 計算BMI
function BMIcalc() {
    var heightVal = parseInt(document.querySelector('#heightId').value);
    var weightVal = parseInt(document.querySelector('#weightId').value);

    // *10000 > 公分平方轉公尺平方
    var BMI = (weightVal / (heightVal * heightVal)) * 10000;
    // toFixed四捨五入取2位
    return BMI.toFixed(2);
}


// 重置
function resetF() {
    var validWarn = document.querySelectorAll('.valid_warn');
    var BMIsum = document.querySelector('#BMIsum');
    var input = document.querySelectorAll('.inputType');
    var BMIsumAll = document.querySelector('.BMIsum_all');
    var rangeTxt = document.querySelector('#BMIrange');

    // 清除驗證警語、結果
    for (var i = 0; i < validWarn.length; i++) {
        validWarn[i].textContent = "原始透明";
        validWarn[i].style.opacity = "0";
        BMIsum.innerHTML = "";
    };

    // 清除紅框
    for (var i = 0; i < input.length; i++) {
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



// 刷新資料，items是可變動值
function updateList(items) {

    var BMItable = document.querySelector('.BMItable');
    var str = 
        `<tr class="th_row">
            <td>狀態</td>
            <td>BMI</td>
            <td>身高</td>
            <td>體重</td>
            <td>日期</td>
            <td>刪除</td>
        </tr>
        <tr class="th_row">
            <td class="border_row">
                <div class="tb_border"></div>
            </td>
            <td class="border_row">
                <div class="tb_border"></div>
            </td>
            <td class="border_row">
                <div class="tb_border"></div>
            </td>
            <td class="border_row">
                <div class="tb_border"></div>
            </td>
            <td class="border_row">
                <div class="tb_border"></div>
            </td>
            <td class="border_row">
                <div class="tb_border"></div>
            </td>
        </tr>`;

    for (var i = 0; i < items.length; i++) {

        str += `
            <tr class="BMI_row">
            <td class="record_list record_state" 
            style = "border-left: 5px solid ${items[i].borderColor}">${items[i].state}</td>
            <td class="record_list"> ${items[i].BMI}</td>
            <td class="record_list"> ${items[i].height}cm</td>
            <td class="record_list"> ${items[i].weight}kg</td>
            <td class="record_list date">${items[i].date}</td> 
            <td class="record_list">
                <div class="delete" data-index = "${i}" >
                    <p class="x_txt">x</p>
                </div>
            </td>
            </tr>`;

    }

    BMItable.innerHTML = str;

}


// 刪除資料
function deleteData(e) {
    e.preventDefault();
    // console.log(e.target.nodeName);
    if (e.target.nodeName !== "P") {
        return;
    }

    var index = e.target.dataset.index;
    BMIrecord.splice(index, 1);


    localStorage.setItem('recordList', JSON.stringify(BMIrecord));
    updateList(BMIrecord);
}