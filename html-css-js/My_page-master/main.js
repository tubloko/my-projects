var API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImJmYzc4NDYzNTcyNDU3YjBmN2I0MTM1OTdlODJhYjdiNzk2ZGNlYTY1MWZlYjAwZjYxYjI2MzM5ZWU3ODM3YTA0YjU2NDFhNmU3MmE2YzZhIn0.eyJhdWQiOiIxMCIsImp0aSI6ImJmYzc4NDYzNTcyNDU3YjBmN2I0MTM1OTdlODJhYjdiNzk2ZGNlYTY1MWZlYjAwZjYxYjI2MzM5ZWU3ODM3YTA0YjU2NDFhNmU3MmE2YzZhIiwiaWF0IjoxNTcyNDYzNzg1LCJuYmYiOjE1NzI0NjM3ODUsImV4cCI6MTg4ODA4Mjk4NSwic3ViIjoiMTk1NyIsInNjb3BlcyI6WyJ1c2VyQmFzZUluZm8iLCJ1c2VyRGV0YWlsZWRJbmZvIiwidXNlckNvdXJzZUluZm8iXX0.VLXFlQxA8YIxuhlZPrRTERe20ZQ1fM1N0M2dPXvwKc2drGfGxutYCOjywyBqSKRaJNP6KCXCLL9QJmShWMu1VQdRYBD7yFfUvJIr_8pew1DiCVIDP_MxhzVMYDsHAJvzZV4CL5Uy1f6edPFbFm48V2aNMyRAdRuvGxdy0JJfKQhfkM_A7b93FOPWpPfSGhoOvV45KLEJ5ABZpOR-YyuR5gUbyzJEwXZi0_mJHwVVencDqo9-NodLyWx0bM0ZddoueURKkoJEP6BvHmNuWxiagrNhnd0LqRSrVe-qxPW9eiCRJiKMsqftMSCrVeCMnr-B3KyxN_BtMqmTS_ehmTU56QoLhyTCq0jjiEtuIazyOrk2gPrN_q_QfP-XZ378Y0VqytTl3et7qCeEuoJLo5zSMI2i4MtDFaIa3aJ0xy8VesY1uR3i1GZFd_90yQIk0-_S5Ke3KiXg8tIciaA1uKnrgTD3OxHI3z25_DL1Rnb5kEHfUtvk_gLwNGtaaNGJDQvUdcWol-oC6Fh-6jwM6VOjh4o6v2zlCLozFMe29kVAjDmcY6R71i2wZBKQJ3khD76ltr3_I45FyrXElPKlzd-8yVqOeVFILyLATw0CmCz2GP7uSG3-BBCK_Z4UEeAAhAf4SMeQkHGe8BqAwhVYYnSgmkpqcg4iqPPgiCnEc4kjZvI';
var client = new INTITAClient({
  key: API_KEY,
});

client.getUserDetails(function (error, data) {
    let info = document.getElementById('my_info');
    let photo = document.getElementById('MyPhoto');
    let li, i = 0;
    let arr = ["Им'я: ", "Прізвище: ", "Електронна Пошта: ", "Телефон: ", "Адреса: ", "Освіта: ", "Звідки про на дізнався: ", "Skype: ", "Країна: ", "Місто: ", "Форма Навчання: "];
    for(let key in data){
        if(!data[key]) continue;
        if(key === 'avatar'){
            photo.src = data.avatar;
            continue;
        }
        if(key === 'trainers'){
            console.log(key)
            continue;
        }
        li = document.createElement("li");
        li.innerHTML = arr[i] + data[key];
        i++;
        info.appendChild(li);
    }
});

client.getUserCoursesAndModules(function (error, data) {
    let courses = document.getElementById('courses');
    let li = document.createElement('li');
    let coursesId = data.courses[0].id;
    li.innerHTML = data.courses[0].title;
    courses.appendChild(li);

    client.getCourseModules(coursesId,function (error, modules) {
        modules.forEach(element => {
            let button_modules = document.getElementById('button_modules');
            let div = document.createElement('div');
            div.className = 'link';
            div.innerHTML = element.title;
            button_modules.appendChild(div);
            let ul = document.createElement('ul');
            div.appendChild(ul);

            client.getModuleLectures(element.id, function (error, lectures) {
                lectures.forEach(element2 => {
                    console.log(element2.title);
                    li1 = document.createElement('li');
                    li1.innerHTML = element2.title;
                    ul.appendChild(li1);
                });
                div.onclick = () => {
                    ul.classList.toggle('visible');
                }
            });
        });
    });
});




