function getUserDetails() {
    const userDetailContainer = document.getElementById('account-details');
    authAxios.get(`${apiBaseUrl}/api/UserProfile`).then(resp => {
        const adm = resp.data;
        const userDetailsHTML = `
            <b><h3>Account Details</h3></b>
            <p> First name: ${adm.firstName} </p>
            <p> Last name: ${adm.lastName} </p>
            <p> Email: ${adm.email} </p>
            <p> Username: ${adm.userName} </p>
            <p> Role(s): ${adm.userRoles.join(', ')} </p>
        `;
        userDetailContainer.innerHTML = userDetailsHTML;
    });
}

function getUserFullName() {
    let text = ''
    authAxios.get(`${apiBaseUrl}/api/UserProfile`).then(resp => {
        console.log(resp);
        const adm = resp.data
        text += `<p> Hello, ${adm.firstName} ${adm.lastName} </p>`
        
        document.getElementById('hello').innerHTML = text
    })
}



