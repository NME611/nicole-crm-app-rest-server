const BASE_URL = 'http://localhost:4000/customers';

// Get all customers (pass setCustomers as argument)
export async function getAll(setCustomers) {
  try {
    const response = await fetch(BASE_URL, { method: 'GET', mode: 'cors' });
    if (!response.ok) throw new Error(`Error fetching data: ${response.status}`);
    const data = await response.json();
    setCustomers(data);
  } catch (error) {
    alert("Failed to load customer list: " + error);
  }
}

// Add a new customer (pass postopCallback as second argument)
export async function post(customer, postopCallback) {
  // Remove id if present
  const customerToAdd = { ...customer };
  delete customerToAdd.id;
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customerToAdd)
    });
    if (!response.ok) throw new Error('Failed to add customer');
    await response.json(); // not actually used, but could use it if needed
    if (typeof postopCallback === "function") postopCallback();
  } catch (error) {
    alert("Failed to add customer: " + error);
  }
}

// Update an existing customer (pass postopCallback as second argument)
export async function put(customer, postopCallback) {
  if (!customer.id && customer.id !== 0) {
    alert("No id for customer to update.");
    return;
  }
  try {
    const response = await fetch(`${BASE_URL}/${customer.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer)
    });
    if (!response.ok) throw new Error('Failed to update customer');
    await response.json();
    if (typeof postopCallback === "function") postopCallback();
  } catch (error) {
    alert("Failed to update customer: " + error);
  }
}

// Delete an existing customer by id (pass postopCallback as second argument)
export async function deleteById(id, postopCallback) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE"
    });
    if (!response.ok) throw new Error('Failed to delete customer');
    if (typeof postopCallback === "function") postopCallback();
  } catch (error) {
    alert("Failed to delete customer: " + error);
  }
}
