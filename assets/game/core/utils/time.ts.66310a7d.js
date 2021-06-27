const sleep = async s => {
  await new Promise((e => setTimeout((() => e()), s)))
};
export {sleep as s};
