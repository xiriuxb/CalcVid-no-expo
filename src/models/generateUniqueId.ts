const generateUniqueId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomString = Math.random().toString(36).substr(2, 9);

  return `${timestamp}-${randomString}`;
};

export default generateUniqueId;
