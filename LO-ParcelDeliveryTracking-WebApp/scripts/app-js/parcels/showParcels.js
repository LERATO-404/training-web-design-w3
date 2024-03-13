
function displayParcels(parcels) {
    const parcelTableBody = document.getElementById('parcelTableBody');
    parcelTableBody.innerHTML = ''; // Clear existing table rows

    parcels.forEach(parcel => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${parcel.parcelId}</td>
            <td>${parcel.weight}</td>
            <td>${parcel.parcelStatus}</td>
            <td>${parcel.scheduledDeliveryDate}</td>
            <td>${parcel.additionalNotes}</td>
            <td>
                <button class="delete-button" onclick="updateParcel(${parcel.parcelId})">Update</button>
                <button class="update-button" onclick="deleteParcel(${parcel.parcelId})">Delete</button>
            </td>
        `;
        parcelTableBody.appendChild(row);
    });
}

function getAllParcels() {
    authAxios.get(`${apiBaseUrl}/api/Parcels`)
        .then(resp => {
            displayParcels(resp.data);
        })
        .catch(error => {
            console.error('Error fetching parcels:', error);
            alert('An error occurred while fetching parcels.');
        });
}


function deleteParcel(parcelId) {
    const confirmDeletion = confirm("Are you sure you want to delete this parcel?");
    
    if (confirmDeletion) {
        authAxios.delete(`${apiBaseUrl}/api/Parcels/${parcelId}`)
            .then(response => {
                if (response.status === 204  || response.status == 200) {
                    alert('Parcel deleted successfully.');
                    getAllParcels();
                } else {
                    alert('Failed to delete the parcel. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error deleting parcel:', error);
                alert('An error occurred while deleting the parcel.');
            });
    }
}


function fetchParcelsByStatus(status) {
    var sts = "";
    if(status == "InTransit"){
        sts = "InTransit";
    }
    else if(status == "Delivered"){
        sts = "Delivered"
    }else{
        sts = "OnHold"
    }

    authAxios.get(`${apiBaseUrl}/api/Parcels/${sts}`)
        .then(resp => {
            displayParcels(resp.data);
        })
        .catch(error => {
            console.error('Error fetching parcels by status:', error);
            alert('An error occurred while fetching parcels by status.');
        });
}

// Function to handle dropdown change event
function onDropdownChange() {
    const dropdown = document.getElementById('statusDropdown');
    const selectedStatus = dropdown.value;

    if (selectedStatus === 'All') {
        // Fetch all parcels
        getAllParcels();
    } else {
        // Fetch parcels based on selected status
        fetchParcelsByStatus(selectedStatus);
    }
}



