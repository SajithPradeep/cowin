const states = () => {
  fetch("https://cdn-api.co-vin.in/api/v2/admin/location/states", {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return "error";
    });
};

export default states;
