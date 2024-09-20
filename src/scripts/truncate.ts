const truncate = (str: string): string => {
  if (str.length > 20) {
    return `${str.slice(0, 20)}...`;
  }

  return str;
}

export default truncate;
