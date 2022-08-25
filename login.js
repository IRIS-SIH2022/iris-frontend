import "./style.css";

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  console.log(formProps);
});
