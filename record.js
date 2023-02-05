import "./style.css";
const backendEndpoint = "https://fml228.deta.dev"

document.getElementById("record-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  console.log(formProps);
  // post request to api
  const request = await fetch(`${backendEndpoint}/marker/add`, {
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
