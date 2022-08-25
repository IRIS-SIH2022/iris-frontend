import "./style.css";

document.getElementById("record-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  console.log(formProps);
  // post request to api
  const request = await fetch("http://127.0.0.1:8000/marker/add", {
    method: "POST",
    body: JSON.stringify(formProps),
    headers: {
      "Content-Type": "application/json",
    },
  });
  // check response and show message
  // const response = await request.json();
  // console.log(response);
  // // alert if not 201
  // if (response.status !== 201) {
  //   alert("Error occured while adding record");
  // }
  // clear form
  document.getElementById("record-form").reset();
});
