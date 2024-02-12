export const formatDate = (date) => {
  if (!date) return null;
  // Create new date object from given date string
  const dateTime = new Date(date);
  // Extract year, month, and day from date object as strings
  const year = dateTime.getFullYear();
  const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
  const day = dateTime.getDate().toString().padStart(2, "0");
  // Return formatted date string using template literals
  return `${month}/${day}/${year}`;
};

export const normalizeString = (str) => {
  return str
    ?.toString()
    ?.trim()
    ?.toLocaleLowerCase()
    ?.normalize("NFD")
    ?.replace(/[\u0300-\u036f]/g, "")
    ?.replace(/\n/g, " ");
};
