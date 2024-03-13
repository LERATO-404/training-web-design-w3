let registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", function () {

    document.getElementById("fstname").focus();

    //assign form data to variables
    const firstnameText = document.getElementById("fstname").value;
    const lastnameText = document.getElementById("lstname").value;
    const emailText = document.getElementById("eml").value;
    const passText = document.getElementById("pswd").value;
    const usernameText = document.getElementById("usname").value;

    //Get the value
    let posting = {
        username: usernameText,
        email: emailText,
        password: passText,
        firstName: firstnameText,
        lastName: lastnameText,
        
    };

    localStorage.clear();

    //Post data to the server
    axios.post(`${apiBaseUrl}/api/ApplicationUser/Register`, posting)
        .then(resp => {
            console.log(resp.data);
            if(resp.status == 201 || resp.status == 200){
                alert("Account created successfully!")
            }

        }).catch(error => {
            console.log(error)
            alert("Error creating account. Please try again later.")
        });
});

