function checkDate(date) {
    let o = date.split('/');
    let d = new Date(o[2], o[1] - 1, o[0]);
    return d && (d.getMonth() + 1) == o[1];
  }
  
$(document).ready(() => {
    $("#Validate").click(()=>{
        let input_date = $("#Date").val();
        let check = checkDate(input_date);
        if (check){
            console.log('true');
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "http://127.0.0.1/lab2.2/main.php",
                data: {age: 'test'}
            });
        }
        if (!check){
            console.log('false');
            alert('Use a real age, OK??')
        }
    });
});