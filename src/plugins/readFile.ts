export const readFile = file => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = ev => {
      resolve(ev.target.result);
    };
  });
};

export const character = {
  code: {
    text: "物资编码",
    type: "string"
  },
  name: {
    text: "物资名称",
    type: "string"
  },
  price: {
    text: "物资价格",
    type: "number"
  }
};
