import axios from "axios";

export default async function deleteUser(id) {
  let result = {
    status: null,
    error: null,
    value: null,
  };

  try {
    const response = await axios.delete(
      process.env.REACT_APP_API_BASE_URL + `/${id}`,
      {
        validateStatus: (status) => status === 204,
      }
    );
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
