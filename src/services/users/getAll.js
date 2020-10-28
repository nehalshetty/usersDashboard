import axios from "axios";

export default async function getAll() {
  let result = {
    status: null,
    error: null,
    value: null,
  };

  try {
    const response = await axios(process.env.REACT_APP_API_BASE_URL, {
      validateStatus: (status) => status === 200,
    });
    result.value = response.data;
    result.status = "Success";

    return result;
  } catch (e) {
    console.log(e);
    result.error = e;
    result.status = "Error";

    return result;
  }
}
