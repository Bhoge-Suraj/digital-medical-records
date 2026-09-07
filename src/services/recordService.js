const API_URL = "http://localhost:3001/records";

export const getRecords = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch medical records");
  }

  return await response.json();
};

export const createRecord = async (record) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
  });

  if (!response.ok) {
    throw new Error("Failed to delete medical record");
  }

  return true;
};

export const updateRecord = async (recordId, record) => {
  const response = await fetch(`${API_URL}/${recordId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(record),
  });

  if (!response.ok) {
    throw new Error("Failed to update medical record");
  }

  return await response.json();
};