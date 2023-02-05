import "./style.css";
const backendEndpoint = "https://fml228.deta.dev"

// fetch api on document load
document.addEventListener("DOMContentLoaded", async () => {
  const request = await fetch(`${backendEndpoint}/list_crowd`);
  const response = await request.json();
  const tableBody = document.querySelector("#table-body");
  console.log(response);
  renderTable(response, tableBody);
});

// render table
const getRow = (index, data) =>
  `
    <tr
    id="${data._id}"
    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
  >
    <th
      scope="row"
      class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    >
      ${index}
    </th>
    <td class="py-4 px-6">
      <div class="relative z-0 mb-6 w-40 group">
        <label
          for="acts"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >Select Act</label
        >
        <select
          id="acts"
          data-id="act-${data._id}"
          name="act_type"
          class="actsDropDown bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="" selected>Choose Act</option>
        </select>
      </div>
    </td>
    <td class="py-4 px-6">
      <div class="relative z-0 mb-6 w-40 group">
        <label
          for="primaryTypes"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >Select Crime
        </label>
        <select
          id="primaryTypes"
          data-id="crime-${data._id}"
          name="primary_type"
          class="primaryTypesDropDown bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="" selected>Choose Crime</option>
        </select>
      </div>
    </td>
    <td class="py-4 px-6">
    ${data.description}
    </td>
    <td class="py-4 px-6">${data.StationID}</td>
    <td class="py-4 px-6">${data.date}</td>
    <td class="py-4 px-6">${data.time}</td>
    <td class="py-4 px-6">
    ${data.phno}
    </td>
    <td class="py-4 px-6">${data.address}</td>
    <td class="py-4 px-6">
        <img src="${data.image}" alt="image" class="w-96 aspect-square">
    </td>
    <td class="flex flex-col items-center py-4 px-6 space-x-3">
      <div class="relative items-center z-0 mb-6 w-full group">
        <input
          type="text"
          name="case_number"
          id="cctns"
          data-id="cctns-${data._id}"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required=""
        />
        <label
          for="cctns"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Enter CCTNS</label
        >
      </div>
      <div
        class="flex relative items-center z-0 mb-6 w-full group space-x-3"
        data-id="${data._id}"
      >
        <button
          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          id="verify"
          >Accept
          </button>
        <button
          class="font-medium text-red-600 dark:text-red-500 hover:underline"
          id="reject"
          >Reject
          </button>
      </div>
    </td>
  </tr>
  `;

const renderTable = (data, tableBody) => {
  data.forEach((item, index) => {
    const row = getRow(index + 1, item);
    tableBody.insertAdjacentHTML("beforeend", row);
  }),
    (tableBody.innerHTML = tableBody.innerHTML);
};

// add event listiner to verify
document.addEventListener("click", async (e) => {
  if (e.target.id === "reject") {
    const id = e.target.parentElement.dataset.id;
    const request = await fetch(`${backendEndpoint}/verify/remove/${id}`);
    const response = await request.json();
    console.log(response);
    // remove row from table
    const row = document.getElementById(id);
    row.remove();
    // update serial number
    const rows = document.querySelectorAll("tr");
    rows.forEach((row, index) => {
      row.children[0].innerText = index;
    });
  }
  if (e.target.id === "verify") {
    const id = e.target.parentElement.dataset.id;
    const case_number = document.querySelector(`[data-id="cctns-${id}"]`).value;
    const primary_type = document.querySelector(
      `[data-id="crime-${id}"]`
    ).value;
    const act_type = document.querySelector(`[data-id="act-${id}"]`).value;
    // make json object
    const data = {
      _id: id,
      case_number,
      primary_type,
      act_type,
    };
    const request = await fetch(`${backendEndpoint}/verify/accept`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await request.json();
    console.log(response);
    // remove row from table
    const row = document.getElementById(id);
    row.remove();
    // update serial number
    const rows = document.querySelectorAll("tr");
    rows.forEach((row, index) => {
      row.children[0].innerText = index;
    });
  }
});
