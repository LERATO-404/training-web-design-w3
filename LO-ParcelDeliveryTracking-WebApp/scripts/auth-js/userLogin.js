const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", function () {

    document.getElementById("uname").focus();
    //assign form data to variables
    const usernameText = document.getElementById("uname").value;
    const passwordText = document.getElementById("pwd").value;

    //Get the value
    let posting = {
        username: usernameText,
        password:passwordText
    };

    localStorage.clear();

    //Post data to the server
    axios.post(`${apiBaseUrl}/api/ApplicationUser/Login`, posting)
        .then(resp => {
            console.log(resp.data);
            var userFullName = resp.data.firstName + ' ' + resp.data.lastName;
            var userrole = resp.data.roles[0];

            localStorage.setItem('user', JSON.stringify(resp.data));
            localStorage.setItem('userName', resp.data.userName);
            localStorage.setItem('fullName', userFullName);
            localStorage.setItem('role', userrole);
            localStorage.setItem('token', resp.data.token);
            localStorage.setItem('tokenExpiration', resp.data.expiration);

            
            if (userrole == "Administrator") {
                
                parent.window.location.replace("../../adm-home.html");
            }
            else if (userrole == "Manager") 
            {
                parent.window.location.replace("../../man-home.html");
            }
            else if (userrole == "Driver") 
            {
                parent.window.location.replace("../../drv-home.html");
            }
            else 
            {    
                //parent.window.location.replace("../../usr-home.html");
            }
        }).catch(error => {console.log(error)  })
});



