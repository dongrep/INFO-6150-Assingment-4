window.onload = () => {
  const dataList = [];

  const regExName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  const regExEmail = /([\w\.]+)@(northeastern.edu)/;
  const regExPhone = /\d{3}-?\d{3}-\d{4}$/;
  const regExZipCode = /\d{5}$/;

  const myForm = document.getElementById("myForm");
  const ratingDropDown = document.getElementById("rating");

  const display = (elementName, isInValid) => {
    if (isInValid) {
      // You cant access non form element like below error field using name
      // Hence use the rudimentary way - getElementById or other
      document.getElementById(`error_${elementName}`).style.display = "block";
      myForm[elementName].style.border = "2px solid red";
    } else {
      document.getElementById(`error_${elementName}`).style.display = "none";
      myForm[elementName].style.border = "";
    }
  };
  let isFirstNameInValid = true,
    isLastNameInValid = true,
    isEmailInValid = true,
    isPhoneNumberInValid = true,
    isAddressInValid = true,
    isCityInValid = true,
    isStateInValid = true,
    isZipCodeInValid = true,
    isCommentsInValid = true;

  const validate = (event) => {
    const { id, value, name } = event.target;
    switch (id) {
      case "firstName":
        if (
          !value.trim().toLowerCase().match(regExName) ||
          value.length < 1 ||
          value.length > 24
        ) {
          display(name, true);
          isFirstNameInValid = true;
        } else {
          display(name, false);
          isFirstNameInValid = false;
        }
        break;
      case "lastName":
        if (
          !value.trim().toLowerCase().match(regExName) ||
          value.length < 1 ||
          value.length > 24
        ) {
          display(name, true);
          isLastNameInValid = true;
        } else {
          display(name, false);
          isLastNameInValid = false;
        }
        break;
      case "email":
        if (!value.trim().toLowerCase().match(regExEmail)) {
          display(name, true);
          isEmailInValid = true;
        } else {
          display(name, false);
          isEmailInValid = false;
        }
        break;
      case "phoneNumber":
        if (!value.trim().toLowerCase().match(regExPhone)) {
          display(name, true);
          isPhoneNumberInValid = true;
        } else {
          display(name, false);
          isPhoneNumberInValid = false;
        }
        break;
      case "address1":
        if (value.length < 1 || value.length > 12) {
          display(name, true);
          isAddressInValid = true;
        } else {
          display(name, false);
          isAddressInValid = false;
        }
        break;
      case "city":
        if (
          !value.trim().toLowerCase().match(regExName) ||
          value.length < 1 ||
          value.length > 12
        ) {
          display(name, true);
          isCityInValid = true;
        } else {
          display(name, false);
          isCityInValid = false;
        }
        break;
      case "state":
        if (
          !value.trim().toLowerCase().match(regExName) ||
          value.length < 1 ||
          value.length > 2
        ) {
          display(name, true);
          isStateInValid = true;
        } else {
          display(name, false);
          isStateInValid = false;
        }
        break;
      case "zipcode":
        if (!value.trim().toLowerCase().match(regExZipCode)) {
          display(name, true);
          isZipCodeInValid = true;
        } else {
          display(name, false);
          isZipCodeInValid = false;
        }
        break;
      case "comments":
        if (value.length < 1) {
          display(name, true);
          isCommentsInValid = true;
        } else {
          display(name, false);
          isCommentsInValid = false;
        }
        break;
    }
    let submit = document.getElementById("submitButton");
    if (
      isFirstNameInValid ||
      isLastNameInValid ||
      isEmailInValid ||
      isPhoneNumberInValid ||
      isAddressInValid ||
      isCityInValid ||
      isStateInValid ||
      isZipCodeInValid ||
      isCommentsInValid ||
      isCheckBoxInvalid()
    ) {
      submit.setAttribute("disabled", true);
    } else {
      submit.removeAttribute("disabled");
    }
  };
  // write a function submitted
  function submitted(e) {
    // To avoid page refresh
    e.preventDefault();

    //check if rating checkbox is checked
    let ratingCheckBox = document.getElementById("ratingCheckBox");
    if (ratingCheckBox && ratingCheckBox.checked) {
      if (
        !(
          isFirstNameInValid &&
          isLastNameInValid &&
          isEmailInValid &&
          isPhoneNumberInValid &&
          isAddressInValid &&
          isCityInValid &&
          isStateInValid &&
          isZipCodeInValid &&
          isCommentsInValid &&
          isCheckBoxInvalid()
        )
      ) {
        //get value of input type radio
        let titleValue = document.querySelector(
          'input[name="title"]:checked',
        ).value;

        //get all selected values of input type checkbox
        let sourceValue = [];
        let source = document.getElementsByName("source");
        for (let i = 0; i < source.length; i++) {
          if (source[i].checked) {
            sourceValue.push(source[i].value);
          }
        }

        let newRow = [
          titleValue,
          myForm.firstName.value,
          myForm.lastName.value,
          myForm.email.value,
          myForm.phoneNumber.value,
          myForm.address1.value,
          myForm.address2.value,
          myForm.city.value,
          myForm.state.value,
          myForm.zipcode.value,
          sourceValue,
          document.getElementById("rating").value,
          ratingCheckBox.value,
          myForm.comments.value,
        ];
        //push all the values to the dataList array
        dataList.push(newRow);
        alert("Data entered successfully");
        addRow(newRow);
        if (document.getElementById("ratingCheckBoxDiv")) {
          document.getElementById("ratingCheckBoxDiv").remove();
        }
        myForm.reset();
      } else {
        alert("Please enter valid details");
      }
    } else {
      alert("Please select a rating");
    }
  }

  ratingDropDown.addEventListener("change", addCheckBox);
  //Function to add a checkbox if dropdown option is other
  function addCheckBox() {
    if (document.getElementById("ratingCheckBoxDiv")) {
      document.getElementById("ratingCheckBoxDiv").remove();
    }
    let dropDownBox = document.getElementById("rating");
    let dropDownValue = dropDownBox.options[dropDownBox.selectedIndex].value;
    let ratingCheckBoxDiv = document.createElement("div");
    let ratingCheckBox = document.createElement("input");

    ratingCheckBoxDiv.setAttribute("id", "ratingCheckBoxDiv");

    ratingCheckBox.setAttribute("type", "checkbox");
    ratingCheckBox.setAttribute("name", "ratingCheckbox");
    ratingCheckBox.setAttribute("id", "ratingCheckBox");

    let label = document.createElement("span");
    label.setAttribute("for", "ratingCheckBox");
    if (dropDownValue == "1") {
      label.innerHTML = "Poor";
    } else if (dropDownValue == "2") {
      label.innerHTML = "Average";
    } else if (dropDownValue == "3") {
      label.innerHTML = "Good";
    } else if (dropDownValue == "4") {
      label.innerHTML = "Very Good";
    } else {
      label.innerHTML = "Excellent";
    }

    ratingCheckBox.value = label.innerHTML;

    dropDownBox.after(ratingCheckBoxDiv);
    ratingCheckBoxDiv.append(ratingCheckBox);
    ratingCheckBoxDiv.append(label);
  }

  //function to make sure at least one check box is checked
  function isCheckBoxInvalid() {
    let checkBoxes = document.getElementsByName("source");
    let isCheckedInvalid = true;
    for (let i = 0; i < checkBoxes.length; i++) {
      if (checkBoxes[i].checked) {
        isCheckedInvalid = false;
        break;
      }
    }
    return isCheckedInvalid;
  }
  // Event Delegation
  // https://javascript.info/event-delegation
  myForm.addEventListener("input", validate);
  myForm.addEventListener("submit", submitted);

  // Add rows to the table
  const addRow = (data) => {
    const table = document.getElementById("myTable");
    const row = table.insertRow(-1);
    const cell1 = row.insertCell(0);
    cell1.innerHTML = data[0];
    const cell2 = row.insertCell(1);
    cell2.innerHTML = data[1];
    const cell3 = row.insertCell(2);
    cell3.innerHTML = data[2];
    const cell4 = row.insertCell(3);
    cell4.innerHTML = data[3];
    const cell5 = row.insertCell(4);
    cell5.innerHTML = data[4];
    const cell6 = row.insertCell(5);
    cell6.innerHTML = data[5];
    const cell7 = row.insertCell(6);
    cell7.innerHTML = data[6];
    const cell8 = row.insertCell(7);
    cell8.innerHTML = data[7];
    const cell9 = row.insertCell(8);
    cell9.innerHTML = data[8];
    const cell10 = row.insertCell(9);
    cell10.innerHTML = data[9];
    const cell11 = row.insertCell(10);
    cell11.innerHTML = data[10];
    const cell12 = row.insertCell(11);
    cell12.innerHTML = data[11];
    const cell13 = row.insertCell(12);
    cell13.innerHTML = data[12];
    const cell14 = row.insertCell(13);
    cell14.innerHTML = data[13];
  };
};
