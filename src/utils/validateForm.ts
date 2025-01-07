export const validateForm = (fields: { [key: string]: string }): boolean => {
    for (const key in fields) {
      if (fields[key].trim() === '') {
        return false;
      }
    }
    return true;
  };
  