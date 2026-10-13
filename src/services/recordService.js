const API_URL = "http://localhost:5001/api/records";
const getAuthHeaders = () => {
  const savedUser = JSON.parse(
    localStorage.getItem("medical_user") || "null"
  );

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${savedUser?.token || ""}`,
  };
};

export const getRecords = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch medical records");
  }

  return await response.json();
};

export const createRecord = async (record) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(record),
  });

  if (!response.ok) {
    throw new Error("Failed to create medical record");
  }

  return await response.json();
};

export const deleteRecord = async (recordId) => {
  const response = await fetch(`${API_URL}/${recordId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to delete medical record");
  }

  return true;
};

export const updateRecord = async (recordId, record) => {
  const response = await fetch(`${API_URL}/${recordId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(record),
  });

  if (!response.ok) {
    throw new Error("Failed to update medical record");
  }

  return await response.json();
};