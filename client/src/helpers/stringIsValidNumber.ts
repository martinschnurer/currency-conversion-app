const regex = /^[0-9]+([,.][0-9]+)?$/;

export const stringIsValidNumber = (str: string) => {
  return regex.test(str);
}