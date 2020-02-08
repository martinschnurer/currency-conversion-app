const buildURL = (first: string, second: string) => {
  return `https://free.currconv.com/api/v7/convert?apiKey=${process.env.CURRENCY_API_KEY}&q=${first}_${second}&compact=ultra`;
}

const fetchRate = async (fromCode: string, toCode: string) => {
  const response = await fetch(buildURL(fromCode, toCode));
  const json = await response.json();
  const keyToTake = `${fromCode}_${toCode}`;
  return json[keyToTake];
}
